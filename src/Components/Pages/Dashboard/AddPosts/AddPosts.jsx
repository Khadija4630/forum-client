import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Select from "react-select"; 
import { Helmet } from "react-helmet-async";


const AddPost = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [postCount, setPostCount] = useState(0);
    const [formDisabled, setFormDisabled] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);

    const tagOptions = [
        { value: "General", label: "General" },
        { value: "Programming", label: "Programming" },
        { value: "Design", label: "Design" },
        { value: "Business", label: "Business" },
        { value: "Technology", label: "Technology" },
        { value: "Health", label: "Health" },
    ];

    useEffect(() => {
        axiosPublic.get(`/posts/count/${user.email}`).then((response) => {
            setPostCount(response.data.count);
            setFormDisabled(response.data.count >= 5);
        });
    }, [user.email, axiosPublic]);

    const handleAddPost = (event) => {
        event.preventDefault();
        const form = event.target;
        const post = {
            authorImage: user.photoURL,
            authorName: user.displayName,
            authorEmail: user.email,
            title: form.title.value,
            description: form.description.value,
            tag: selectedTag,
            upVotes: parseInt(form.upVotes.value) || 0, 
            downVotes: parseInt(form.downVotes.value) || 0,
        };

        axiosPublic.post("/posts", post).then((response) => {
            console.log("Post created:", response.data);
            form.reset(); 
                alert("Post added successfully!");
        });
    };
    

    return (
        <div className="md:max-w-4xl mx-auto md:mt-4 md:p-6 bg-gray-100 rounded-lg shadow-md ">
            <Helmet>
                <title>Forum | Add Post</title>
            </Helmet>
   { formDisabled ? (
        <div className="text-center">
            <p className="text-lg font-bold">You have reached your post limit. Become a member to post more.</p>
            <button className="btn bg-lime-500 bg-opacity-50 mt-4" onClick={() => navigate("/membership")}>
                Become a Member to post more.
            </button>
        </div>
    ) : (
        <form onSubmit={handleAddPost}>
            <h2 className="text-2xl font-bold mb-4 text-center">Add A New Post</h2>
            <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Author Image</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            defaultValue={user.photoURL || "No Image Available"}
                            
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Author Name</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            defaultValue={user.displayName || "Anonymous"}
                        
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Author Email</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered"
                            defaultValue={user.email}
                            
                        />
                    </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Post Title</span>
                </label>
                <input type="text" name="title" className="input input-bordered" required />
            </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Post Description</span>
                </label>
                <textarea name="description" className="textarea textarea-bordered" required></textarea>
            </div>
            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text">Tag</span>
                </label>
                        <Select
                            options={tagOptions}
                            onChange={(selectedOption) => setSelectedTag(selectedOption.value)}
                            placeholder="Select a tag"
                        />
                {/* <select name="tag" className="select select-bordered" required>
                    <option value="General">General</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                </select> */}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control mb-4 w-1/2 ">
                <label className="label">
                    <span className="label-text">UpVotes </span>
                </label>
                <input type="number" name="upVotes" className="input input-bordered" min="0" />
            </div>
            <div className="form-control mb-4 w-1/2">
                <label className="label">
                    <span className="label-text">DownVotes </span>
                </label>
                <input type="number" name="downVotes" className="input input-bordered" min="0" />
            </div>
            </div>
          
            <button type="submit" className="btn bg-lime-500 bg-opacity-50 w-full">
                Add Post
            </button>
        </form>
    )}
        </div>
    );
};

export default AddPost;

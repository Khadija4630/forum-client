import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const MyPosts = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get(`/posts/user/${user.email}`).then((response) => {
            setPosts(response.data);
        });
    }, [user.email, axiosPublic]);

    const handleDelete = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
        axiosPublic.delete(`/posts/${postId}`).then(() => {
            setPosts(posts.filter((post) => post.id !== postId));
        })
        .catch((error) => console.error("Error deleting post:", error.message));
    }
};

    return (
        <div className="md:max-w-4xl mx-auto mt-2 md:mt-4 md:p-6 bg-gray-100 rounded-lg shadow-md">
            <Helmet>
                <title>Forum | My Posts</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4 text-center">My Posts</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Post Title</th>
                            <th className="border border-gray-200 px-4 py-2">Votes</th>
                            <th className="border border-gray-200 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post._id} className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2">{post.title}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {post.upVotes - post.downVotes}
                                </td>
                            <td  className="border border-gray-200 px-4 py-2 flex gap-2">
                                <button
                                    className="btn bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 "
                                    onClick={() => navigate(`/comments/${post.id}`)}
                                >
                                {/* Comment */}
                                    <FaComment></FaComment> 
                                </button>
                                <button className="btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => handleDelete(post._id)}>
                                    {/* Delete */}
                                  <FaDeleteLeft></FaDeleteLeft> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyPosts;

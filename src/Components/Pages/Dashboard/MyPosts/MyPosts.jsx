import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const MyPosts = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get(`/posts/user/${user.email}?page=${currentPage}&limit=10`).then((response) => {
            setPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        });
    }, [user.email,currentPage, axiosSecure]);

    const handleDelete = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
        axiosSecure.delete(`/posts/${postId}`).then(() => {
            setPosts(posts.filter((post) => post._id !== postId));

        })
        .catch((error) => console.error("Error deleting post:", error.message));
    }
};
const handlePageChange = (page) => {
    if (page >=1 && page <= totalPages) {
        setCurrentPage(page);
    }
};

    return (
        <div className="md:max-w-4xl mx-auto mt-2 md:mt-4 md:p-6 bg-gray-100 rounded-lg shadow-md dark:text-black">
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
                                    onClick={() => navigate(`/comments/${post._id}`)}
                                >
                                    <FaComment></FaComment> 
                                </button>
                                <button className="btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => handleDelete(post._id)}>
                                  <FaDeleteLeft></FaDeleteLeft> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                        <button
                            className={`px-4 py-2 border rounded-l ${
                                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-lime-500 text-white"
                            }`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 border ${
                                    currentPage === index + 1
                                        ? "bg-lime-500 text-white"
                                        : "bg-white hover:bg-gray-200"
                                }`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className={`px-4 py-2 border rounded-r ${
                                currentPage === totalPages
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-lime-500 text-white"
                            }`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>

    );
};

export default MyPosts;





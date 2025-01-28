import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const CommentsPage = () => {
    const { postId } = useParams();
    const axiosSecure= useAxiosSecure();
    const [comments, setComments] = useState([]);
    const [activeReport, setActiveReport] = useState({});

    useEffect(() => {
        axiosSecure
            .get(`/comments/${postId}`)
            .then((response) => setComments(response.data))
            .catch((error) => console.error("Error fetching comments:", error.message));
    }, [postId, axiosSecure]);

    const handleReport = (commentId) => {
        setActiveReport((prev) => ({ ...prev, [commentId]: false }));
        alert("Comment reported successfully!");
    };

    const Text = (text, length = 20) =>
        text.length > length ? `${text.slice(0, length)}...` : text;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <Helmet>Forum | Comments</Helmet>
            <h2 className="text-3xl font-bold mb-6">Comments</h2>
            {comments.length === 0 ? (
                <p className="text-center text-gray-600">No comments available.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Email</th>
                            <th className="border border-gray-200 px-4 py-2">Comment</th>
                            <th className="border border-gray-200 px-4 py-2">Feedback</th>
                            <th className="border border-gray-200 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment._id} className="hover:bg-gray-50">
                                <td className="border border-gray-200 px-4 py-2">{comment.email}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    {Text(comment.text)}
                                    {comment.text.length > 20 && (
                                        <button
                                            onClick={() => alert(comment.text)}
                                            className="ml-2 text-lime-500 underline"
                                        >
                                            Read More
                                        </button>
                                    )}
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <select
                                        className="select select-bordered w-full"
                                        onChange={(e) =>
                                            setActiveReport((prev) => ({
                                                ...prev,
                                                [comment._id]: true,
                                            }))
                                        }
                                    >
                                        <option value="">Select Feedback</option>
                                        <option value="Spam">Spam</option>
                                        <option value="Inappropriate">Inappropriate</option>
                                        <option value="Off-topic">Off-topic</option>
                                    </select>
                                </td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button
                                        disabled={!activeReport[comment._id]}
                                        onClick={() => handleReport(comment._id)}
                                        className={`btn ${
                                            activeReport[comment._id]
                                                ? "bg-lime-500 hover:bg-lime-600"
                                                : "bg-gray-300"
                                        } text-white px-4 py-2 rounded`}
                                    >
                                        Report
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CommentsPage;

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({ posts: 0, comments: 0, users: 0 });
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        // Fetch statistics for posts, comments, and users
        axiosSecure.get("/admin/stats").then((response) => {
            setStats(response.data);
        });

        // Fetch existing tags
        axiosSecure.get("/tags").then((response) => {
            setTags(response.data);
        });
    }, [axiosSecure]);

    const handleAddTag = () => {
        if (newTag.trim() === "") return;
        axiosSecure.post("/tags", { name: newTag }).then(() => {
            setTags((prev) => [...prev, newTag]);
            setNewTag("");
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>
            <div className="flex gap-6 mb-6">
                {/* Admin Info */}
                <div>
                    <img
                        src="/default-avatar.png"
                        alt="Admin"
                        className="w-24 h-24 rounded-full shadow-md"
                    />
                    <h3 className="text-xl font-bold mt-2">Admin Name</h3>
                    <p className="text-gray-600">admin@example.com</p>
                </div>
                {/* Statistics */}
                <div className="flex-1">
                    <Pie
                        data={{
                            labels: ["Posts", "Comments", "Users"],
                            datasets: [
                                {
                                    label: "Site Statistics",
                                    data: [stats.posts, stats.comments, stats.users],
                                    backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
                                },
                            ],
                        }}
                    />
                </div>
            </div>

            {/* Tag Management */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Add New Tag</h3>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Enter tag name"
                        className="p-2 border rounded w-full"
                    />
                    <button
                        onClick={handleAddTag}
                        className="btn bg-lime-500 hover:bg-lime-600 text-white"
                    >
                        Add Tag
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;

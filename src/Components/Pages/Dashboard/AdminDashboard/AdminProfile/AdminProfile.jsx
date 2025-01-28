import { useContext, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { AuthContext } from "../../../../Providers/AuthProvider";
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ posts: 0, comments: 0, users: 0 });
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
       
        axiosSecure.get("/admin/stats").then((response) => {
            setStats(response.data);
        });

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
                <div>
                    <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="Admin"
                        className="w-24 h-24 rounded-full shadow-md"
                    />
                    <h3 className="text-xl font-bold mt-2">{user.displayName}</h3>
                    <p className="text-gray-600">{user.email}</p>
                </div>
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
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                </div>
            </div>
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

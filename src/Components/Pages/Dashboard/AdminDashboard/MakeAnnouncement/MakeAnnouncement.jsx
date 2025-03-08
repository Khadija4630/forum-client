import { useContext, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MakeAnnouncement = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [announcement, setAnnouncement] = useState({
        title: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAnnouncement = {
            ...announcement,
            authorImage: user.photoURL || "/default-avatar.png",
            authorName: user.displayName || "Admin",
        };

        axiosSecure.post("/make-announcements", newAnnouncement).then(() => {
            alert("Announcement made successfully!");
            setAnnouncement({ title: "", description: "" });
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Make an Announcement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        value={announcement.title}
                        onChange={(e) =>
                            setAnnouncement({ ...announcement, title: e.target.value })
                        }
                        placeholder="Enter announcement title"
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        value={announcement.description}
                        onChange={(e) =>
                            setAnnouncement({
                                ...announcement,
                                description: e.target.value,
                            })
                        }
                        placeholder="Enter announcement description"
                        className="textarea textarea-bordered w-full"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="btn bg-lime-500 hover:bg-lime-600 w-full"
                >
                    Submit Announcement
                </button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;

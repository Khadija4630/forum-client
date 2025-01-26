import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [recentPosts, setRecentPosts] = useState([]);
    const [badge, setBadge] = useState("");

    useEffect(() => {
        axiosPublic.get(`/posts/user/${user.email}?limit=3`).then((response) => {
            setRecentPosts(response.data);
        });

        axiosPublic.get(`/users/${user.email}`).then((response) => {
            const userInfo = response.data;
            setBadge(userInfo.isMember ? "Gold Badge" : "Bronze Badge");
            });
    }, [user, axiosPublic]);

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
            <Helmet>
              <title>  Forum | My Profile</title>
                </Helmet>
            <h2 className="text-3xl font-bold mb-6">My Profile</h2>
            <div className="flex items-center gap-6">
                <img src={user.photoURL || "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full shadow-md" />
                <div>
                    <h3 className="text-2xl font-semibold">{user.displayName || "Anonymous"}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    {badge && (
                        <div className={`badge ${badge === "Gold Badge" ? "bg-yellow-400 text-black" : "bg-gray-400 text-white"} px-4 py-2 mt-2 rounded-full`}>
                            {badge}
                        </div>
                    )}
                    {/* {badge && <span className="badge badge-primary">{badge}</span>} */}
                </div>
            </div>
            <h3 className="text-xl font-semi-bold  mt-8">Recent Posts</h3>
            {recentPosts.length > 0 ? (
            <ul className="mt-4 space-y-4">
                {recentPosts.map((post) => (
                    <li key={post.id} className="p-4 border rounded-lg shadow-sm">
                        {/* <strong>{post.title}</strong>
                        <p>{post.description.slice(0, 50)}...</p> */}
                      <h4 className="text-lg font-bold">{post.title}</h4>
                            <p className="text-gray-700 mb-2">{post.description.slice(0, 50)}...</p>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span className="bg-gray-200 px-2 py-1 rounded">
                                    Tag: {post.tag || "N/A"}
                                </span>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1">
                                        <span className="font-bold">{post.upVotes || 0}</span> Upvotes
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="font-bold">{post.downVotes || 0}</span> Downvotes
                                    </span>
                                </div>
                            </div>
                        </li>
                ))}
            </ul>
            ) : (
                <p className="mt-4 text-gray-500 text-2xl ">No recent posts available.</p>
            )}
        </div>
    );
};

export default MyProfile;

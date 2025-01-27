import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="mt-4 md:mt-8 mb-4 bg-slate-100 rounded-lg flex flex-col items-center justify-center">
            <Helmet>
                <title>Forum | Dashboard</title>
            </Helmet>

            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h2>
                    <p className="text-gray-600 mt-2">Manage your profile, posts, and more!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow">
                        {/* <img
                            src={user.photoURL || "/default-avatar.png"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full shadow-md mb-4"
                        /> */}
                        <p className=" w-12 h-12 rounded-full shadow-md "> <IoPersonCircle className="w-12 h-12"></IoPersonCircle></p>
                        {/* <h3 className="text-lg font-semibold">{user.displayName || "Anonymous"}</h3> */}
                        {/* <p className="text-gray-600">{user.email}</p> */}
                        <h3 className="text-lg font-semibold mt-2">My Profile</h3>
                        <p className="text-gray-600 text-center">You can see your profile details here.</p>
                      <Link to= "/dashboard/my-profile"><button className="mt-4 btn bg-lime-500 bg-opacity-50 w-full">View Profile</button></Link>  
                    </div>

                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow">
                        <div className="text-lime-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 17v-2a4 4 0 014-4h3M9 9l4-4m0 0l4 4m-4-4v12"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mt-2">Manage Posts</h3>
                        <p className="text-gray-600 text-center">View, add, or update your posts easily.</p>
                      <Link to="/dashboard/my-posts"><button className="mt-4 btn bg-lime-500 bg-opacity-50 w-full">Go to Posts</button></Link>  
                    </div>

                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow">
                        <div className="text-yellow-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mt-2">Membership</h3>
                        <p className="text-gray-600 text-center">
                            Upgrade to Gold membership and unlock exclusive features.
                        </p>
                    <button className="mt-4 btn bg-yellow-400 text-black w-full">Upgrade Membership</button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                        Need help?{" "}
                        <a href="/help" className="text-lime-500 hover:underline">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;

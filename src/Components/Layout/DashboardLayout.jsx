import { Outlet, Link } from "react-router-dom";
import { FaUser, FaPlus, FaList, FaHome } from "react-icons/fa";

const DashboardLayout = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        
            <div className="w-full md:w-1/4 bg-lime-500 bg-opacity-30 shadow-lg p-4">
                <h2 className="text-2xl font-bold mb-6 text-center text-lime-500">Dashboard</h2>
                <ul className="space-y-4">
                    <li>
                        <Link to="/dashboard/my-profile"className=" flex items-center gap-3 p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white transition-all duration-200">
                        <FaUser className="text-lg" />
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/add-posts" className="flex items-center gap-3 p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white transition-all duration-200">
                        <FaPlus className="text-lg" />
                            Add Post
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/my-posts" className="flex items-center gap-3 p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white transition-all duration-200">
                        <FaList className="text-lg" />
                            My Posts
                        </Link>
                    </li>
                    <li>
                    <Link to="/" className="flex items-center gap-3 p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white transition-all duration-200">
                        <FaHome className="text-lg" />
                            Home
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;

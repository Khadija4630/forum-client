import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
        
            <div className="w-1/4 bg-gray-200 p-4">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <ul className="space-y-2">
                    <li>
                        <Link to="/dashboard/my-profile" className="block p-2 bg-white rounded hover:bg-gray-100">
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/add-posts" className="block p-2 bg-white rounded hover:bg-gray-100">
                            Add Post
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/my-posts" className="block p-2 bg-white rounded hover:bg-gray-100">
                            My Posts
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="w-3/4 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;

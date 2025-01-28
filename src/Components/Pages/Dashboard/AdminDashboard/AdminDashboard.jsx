import { Outlet, Link } from "react-router-dom";

const AdminDashboard= () => {
    return (
        <div className="flex min-h-screen bg-gray-100">

            <aside className="w-1/4 bg-white shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-lime-500 mb-6">Admin Dashboard</h2>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/dashboard/admin-dashboard/profile"
                            className="block p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white"
                        >
                            Admin Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/admin-dashboard/manage-users"
                            className="block p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white"
                        >
                            Manage Users
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/admin-dashboard/reports"
                            className="block p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white"
                        >
                            Reported Activities/Comments
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/admin-dashboard/make-announcement"
                            className="block p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white"
                        >
                            Make Announcement
                        </Link>
                    </li>
                </ul>
            </aside>

            <main className="w-3/4 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;

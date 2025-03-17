import { Outlet, Link } from "react-router-dom";
import { useState } from "react"; 
import { FaUser, FaUsers, FaBullhorn, FaExclamationTriangle, FaHome, FaBars } from "react-icons/fa";


const AdminDashboard= () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { name: "Admin Profile", path: "/admin-dashboard/profile", icon: <FaUser /> },
        { name: "Manage Users", path: "/admin-dashboard/manage-users", icon: <FaUsers /> },
        { name: "Reported Comments", path: "/admin-dashboard/reports", icon: <FaExclamationTriangle /> },
        { name: "Make Announcement", path: "/admin-dashboard/make-announcement", icon: <FaBullhorn /> },
        { name: "Home", path: "/", icon: <FaHome /> },
    ];
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:text-black">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-4 bg-lime-500 text-white"
            >
                ☰ Menu
            </button>

            <aside className={`${isSidebarOpen ? "block" : "hidden"} md:block w-full md:w-1/4 bg-white shadow-lg p-6`}>
                <h2 className="text-2xl font-bold text-center text-lime-500 mb-6">Admin Dashboard</h2>
                <ul className="space-y-4">
                {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className="flex items-center space-x-3 p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white transition"
                            >
                                {item.icon} <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
                    {/* <li>
                        <Link
                            to="/admin-dashboard/profile"
                            className="block p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white"
                        >
                            Admin Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin-dashboard/manage-users"
                            className="block p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white"
                        >
                            Manage Users
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin-dashboard/reports"
                            className="block p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white"
                        >
                            Reported Activities/Comments
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin-dashboard/make-announcement"
                            className="block p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white"
                        >
                            Make Announcement
                        </Link>
                    </li>
                    <li>
                        
                        <Link
                            to="/"
                            className="block p-3 rounded-md text-gray-700 bg-gray-100 hover:bg-lime-500 hover:text-white"
                        >
                           Home
                        </Link>
                    </li>
                </ul>
            </aside> */}

            <main className="w-full md:w-3/4 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;

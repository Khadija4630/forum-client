import { FaUsers, FaClipboardList, FaBullhorn } from "react-icons/fa";

const AdminOverview = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-lime-500">Admin Dashboard Overview</h1>
            <p className="text-gray-600 mt-2">
                Welcome to the Admin Dashboard! Here, you can manage users, review reports, make announcements, and oversee discussions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
               
                <div className="p-4 bg-gray-100 rounded-lg shadow flex items-center">
                    <FaUsers className="text-4xl text-blue-500 mr-4" />
                    <div>
                        <h3 className="text-xl font-semibold">Manage Users</h3>
                        <p className="text-gray-500">
                            View, edit, and remove users. Assign admin roles and manage user privileges.
                        </p>
                    </div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow flex items-center">
                    <FaClipboardList className="text-4xl text-yellow-500 mr-4" />
                    <div>
                        <h3 className="text-xl font-semibold">Reported Comments</h3>
                        <p className="text-gray-500">
                            Review reported content, moderate discussions, and take action against inappropriate behavior.
                        </p>
                    </div>
                </div>

                
                <div className="p-4 bg-gray-100 rounded-lg shadow flex items-center">
                    <FaBullhorn className="text-4xl text-lime-500 bg-opacity-50 mr-4" />
                    <div>
                        <h3 className="text-xl font-semibold">Make Announcements</h3>
                        <p className="text-gray-500">
                            Post important updates, community guidelines, or feature releases for all users.
                        </p>
                    </div>
                </div>

               
                {/* <div className="p-4 bg-gray-100 rounded-lg shadow flex items-center">
                    <FaComments className="text-4xl text-lime-500 mr-4" />
                    <div>
                        <h3 className="text-xl font-semibold">Forum Discussions</h3>
                        <p className="text-gray-500">
                            Oversee discussions, pin important topics, and ensure a healthy conversation environment.
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default AdminOverview;


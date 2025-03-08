import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        axiosSecure.get("/users").then((response) => {
            setUsers(response.data);
        });
    }, []);

    const handleMakeAdmin = (email) => {
        axiosSecure.patch(`/users/${email}`, { role: "admin" }).then(() => {
            setUsers((prev) =>
                prev.map((user) =>
                    user.email === email ? { ...user, role: "admin" } : user
                )
            );
        });
    };
    const handleNext = () => {
        if (currentPage < users.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentUser = users[currentPage]; 

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div  className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by username"
                className="p-2 border rounded w-full mb-4"
            />
            <div className="overflow-x-auto">
            <table className="lg:w-full bg-white rounded shadow">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Role</th>
                        <th className="p-3 text-left">Membership</th>
                        <th className="p-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((currentUser) => (
                        <tr key={currentUser._id} className="border-b">
                            <td className="p-3">{currentUser.name}</td>
                            <td className="p-3">{currentUser.email}</td>
                            <td className="p-3">{currentUser.role || "User"}</td>
                            <td className="p-3">
                                {currentUser.isMember ? "Member" : "Non-Member"}
                            </td>
                            <td className="p-3">
                                {!currentUser.role || currentUser.role !== "admin" ? (
                                    <button
                                        onClick={() => handleMakeAdmin(currentUser.email)}
                                        className="btn bg-lime-500 bg-opacity-50 hover:bg-lime-600 text-white"
                                    >
                                        Make Admin
                                    </button>
                                ) : (
                                    <span className="text-gray-500">Admin</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 0}
                            className="btn bg-lime-500 bg-opacity-50  hover:bg-lime-600 text-white disabled:bg-gray-300"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === users.length - 1}
                            className="btn bg-lime-500 bg-opacity-50 hover:bg-lime-600 text-white disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
        </div>
    );
};

export default ManageUsers;

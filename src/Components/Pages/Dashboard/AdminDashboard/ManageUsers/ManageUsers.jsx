import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Fetch all users
        axiosSecure.get("/users").then((response) => {
            setUsers(response.data);
        });
    }, [axiosSecure]);

    const handleMakeAdmin = (email) => {
        axiosSecure.patch(`/users/${email}`, { role: "admin" }).then(() => {
            setUsers((prev) =>
                prev.map((user) =>
                    user.email === email ? { ...user, role: "admin" } : user
                )
            );
        });
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by username"
                className="p-2 border rounded w-full mb-4"
            />
            <table className="w-full bg-white rounded shadow">
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
                    {filteredUsers.map((user) => (
                        <tr key={user.email} className="border-b">
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.role || "User"}</td>
                            <td className="p-3">
                                {user.isMember ? "Member" : "Non-Member"}
                            </td>
                            <td className="p-3">
                                {!user.role || user.role !== "admin" ? (
                                    <button
                                        onClick={() => handleMakeAdmin(user.email)}
                                        className="btn bg-blue-500 hover:bg-blue-600 text-white"
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
    );
};

export default ManageUsers;

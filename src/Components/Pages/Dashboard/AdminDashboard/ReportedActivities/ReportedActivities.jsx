import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ReportedActivities = () => {
    const axiosSecure = useAxiosSecure();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        // Fetch all reported activities/comments
        axiosSecure.get("/reports").then((response) => {
            setReports(response.data);
        });
    }, [axiosSecure]);

    const handleResolve = (id) => {
        axiosSecure.patch(`/reports/${id}`, { resolved: true }).then(() => {
            setReports((prev) => prev.filter((report) => report._id !== id));
        });
    };

    const handleDelete = (id) => {
        axiosSecure.delete(`/reports/${id}`).then(() => {
            setReports((prev) => prev.filter((report) => report._id !== id));
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Reported Activities</h2>
            <table className="w-full bg-white rounded shadow">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">Comment</th>
                        <th className="p-3 text-left">Reported By</th>
                        <th className="p-3 text-left">Post Title</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report._id} className="border-b">
                            <td className="p-3">{report.comment}</td>
                            <td className="p-3">{report.reportedBy}</td>
                            <td className="p-3">{report.postTitle}</td>
                            <td className="p-3 flex gap-2">
                                <button
                                    onClick={() => handleResolve(report._id)}
                                    className="btn bg-green-500 hover:bg-green-600 text-white"
                                >
                                    Resolve
                                </button>
                                <button
                                    onClick={() => handleDelete(report._id)}
                                    className="btn bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportedActivities;

import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminSidebar";
const API_URL = import.meta.env.VITE_API_URL;

interface Request {
  _id: string;
  visitor: { name: string; email: string };
  requestType: string;
  newVisitDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const AdminRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/visitrequests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (err) {
      setError("Failed to fetch requests.");
    }
  };

  const updateRequestStatus = async (requestId: string, newStatus: "Approved" | "Rejected") => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/visitrequests/${requestId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests(); // Refresh list after update
    } catch (err) {
      setError("Failed to update request status.");
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Manage Visitor Requests</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl mx-auto">
          {requests.length === 0 ? (
            <p className="text-gray-600 text-center">No visitor requests found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border rounded-lg shadow-md">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="border p-3">Visitor</th>
                    <th className="border p-3">New Visit Date</th>
                    <th className="border p-3">Reason</th>
                    <th className="border p-3">Status</th>
                    <th className="border p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, index) => (
                    <tr key={req._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                      <td className="border p-3">
                        <div className="flex flex-col">
                          <span className="font-semibold">{req.visitor.name}</span>
                          <span className="text-sm text-gray-500">{req.visitor.email}</span>
                        </div>
                      </td>
                      <td className="border p-3">{new Date(req.newVisitDate).toLocaleDateString()}</td>
                      <td className="border p-3">{req.reason}</td>
                      <td className="border p-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            req.status === "Pending"
                              ? "bg-yellow-300 text-yellow-800"
                              : req.status === "Approved"
                              ? "bg-green-300 text-green-800"
                              : "bg-red-300 text-red-800"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="border p-3 text-center">
                        {req.status === "Pending" && (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => updateRequestStatus(req._id, "Approved")}
                              className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateRequestStatus(req._id, "Rejected")}
                              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRequests;

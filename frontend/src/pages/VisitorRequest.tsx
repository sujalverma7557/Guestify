import { useState, useEffect } from "react";
import axios from "axios";
import VisitorSidebar from "../Components/VisitorSidebar";

interface Request {
  _id: string;
  requestType: string;
  newVisitDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const VisitorRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [formData, setFormData] = useState({ newVisitDate: "", reason: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/api/visitrequests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (err) {
      setError("Failed to fetch requests.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5001/api/visitrequests/reschedule", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Request submitted successfully!");
      fetchRequests(); 
    } catch (err) {
      setError("Failed to submit request.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-700 to-gray-800 bg-gray-100">
      <VisitorSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-black text-center mb-6">Visitor Requests</h1>

        {/* Request Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto mb-6">
          <h3 className="text-xl font-bold mb-4">Request Reschedule</h3>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="date"
              name="newVisitDate"
              value={formData.newVisitDate}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
              required
            />
            <textarea
              name="reason"
              placeholder="Reason for reschedule"
              value={formData.reason}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg"
              required
            />
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition w-full">
              Submit Request
            </button>
          </form>
        </div>

        {/* Request List */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Your Requests</h3>
          {requests.length === 0 ? (
            <p className="text-gray-600">No requests found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">New Visit Date</th>
                  <th className="border p-2">Reason</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="text-center">
                    <td className="border p-2">{new Date(req.newVisitDate).toLocaleDateString()}</td>
                    <td className="border p-2">{req.reason}</td>
                    <td className="border p-2">
                      <span className={`px-3 py-1 rounded-full ${
                        req.status === "Pending" ? "bg-yellow-500 text-gray-900" :
                        req.status === "Approved" ? "bg-green-500 text-white" :
                        "bg-red-500 text-white"
                      }`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorRequests;

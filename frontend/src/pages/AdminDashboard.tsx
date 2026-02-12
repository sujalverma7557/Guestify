import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminSidebar";

interface Visitor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

const AdminDashboard: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });

  useEffect(() => {
    fetchVisitors();
  }, [statusFilter, search]);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/visitors?status=${statusFilter}&search=${search}`);
      setVisitors([...response.data]);
      console.log("vis",visitors);
      

      const total = response.data.length;
      const approved = response.data.filter((v: Visitor) => v.status === "Approved").length;
      const pending = response.data.filter((v: Visitor) => v.status === "Pending").length;
      const rejected = response.data.filter((v: Visitor) => v.status === "Rejected").length;
      setStats({ total, approved, pending, rejected });
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  const updateStatus = async (visitorId: string, newStatus: "Approved" | "Rejected") => {
    console.log("in",visitorId,"-> ",newStatus);
    
    try {
      await axios.put(`http://localhost:5001/api/visitors/approve/${visitorId}`, { "status": newStatus });
      fetchVisitors();
      console.log("done")
    } catch (error) {
      console.error("Error updating visitor status:", error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-5 shadow-lg rounded-lg">
            <h3 className="text-xl font-bold">Total Visitors</h3>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </div>
          <div className="bg-green-100 p-5 shadow-lg rounded-lg">
            <h3 className="text-xl font-bold">Approved</h3>
            <p className="text-2xl font-semibold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-yellow-100 p-5 shadow-lg rounded-lg">
            <h3 className="text-xl font-bold">Pending</h3>
            <p className="text-2xl font-semibold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-red-100 p-5 shadow-lg rounded-lg">
            <h3 className="text-xl font-bold">Rejected</h3>
            <p className="text-2xl font-semibold text-red-600">{stats.rejected}</p>
          </div>
        </div>

   
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search visitors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-1/3 shadow-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-3 rounded-lg shadow-sm"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

   
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Visit Date</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor, index) => (
                <tr key={visitor._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  
                  <td className="border p-3">{visitor.name}</td>
                  <td className="border p-3">{visitor.email}</td>
                  <td className="border p-3">{visitor.phone}</td>
                  <td className="border p-3">{new Date(visitor.visitDate).toLocaleDateString()}</td>
                  <td className="border p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        visitor.status === "Pending" ? "bg-yellow-300 text-yellow-800" :
                        visitor.status === "Approved" ? "bg-green-300 text-green-800" :
                        "bg-red-300 text-red-800"
                      }`}>
                      {visitor.status}
                    </span>
                  </td>
                  <td className="border p-3 text-center">
                    {visitor.status === "Pending" && (
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => updateStatus(visitor._id, "Approved")} className="bg-green-500 text-white px-3 py-1 rounded-lg">
                          Approve
                        </button>
                        <button onClick={() => updateStatus(visitor._id, "Rejected")} className="bg-red-500 text-white px-3 py-1 rounded-lg">
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
      </div>
    </div>
  );
};

export default AdminDashboard;

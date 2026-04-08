import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import VisitorSidebar from "../Components/VisitorSidebar";
const API_URL = import.meta.env.VITE_API_URL;

interface Visitor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

const VisitorDashboard: React.FC = () => {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVisitorData();
  }, []);

  const fetchVisitorData = async () => {
    try {
      const visitorId = localStorage.getItem("visitorId");
      const token = localStorage.getItem("token");

      if (!visitorId || !token) {
        return;
      }

      const response = await axios.get(`${API_URL}/api/visitors/${visitorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVisitor(response.data);
    } catch (err) {
      setError("Failed to fetch visitor data.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
      <VisitorSidebar />
      <div className="flex-1 flex items-center justify-center">
       

<div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-700">
  <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Visitor Dashboard</h2>

  {error && <p className="text-red-500 text-center">{error}</p>}

  {visitor ? (
    <div className="text-gray-800 text-lg space-y-4">
      <p className="flex items-center gap-2">
        <FaUser className="text-blue-500" /> <strong>Name:</strong> {visitor.name}
      </p>
      <p className="flex items-center gap-2">
        <FaEnvelope className="text-yellow-500" /> <strong>Email:</strong> {visitor.email}
      </p>
      <p className="flex items-center gap-2">
        <FaPhone className="text-green-500" /> <strong>Phone:</strong> {visitor.phone}
      </p>
      <p className="flex items-center gap-2">
        <FaCalendarAlt className="text-indigo-500" /> <strong>Visit Date:</strong> {new Date(visitor.visitDate).toLocaleDateString()}
      </p>
      <p className="flex items-center gap-2">
        <strong>Status:</strong> 
        <span className={`ml-2 px-3 py-1 rounded-full flex items-center gap-2 ${
          visitor.status === "Pending" ? "bg-yellow-500 text-gray-900" :
          visitor.status === "Approved" ? "bg-green-500 text-gray-900" :
          "bg-red-500 text-gray-900"
        }`}>
          {visitor.status === "Pending" ? <FaClock /> :
           visitor.status === "Approved" ? <FaCheckCircle /> :
           <FaTimesCircle />}
          {visitor.status}
        </span>
      </p>
    </div>
  ) : (
    <p className="text-gray-700 text-center">No visitor data available.</p>
  )}
</div>
      </div>
    </div>
  );
};

export default VisitorDashboard;

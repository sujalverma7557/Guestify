import { useState, useEffect } from "react";
import axios from "axios";
import VisitorSidebar from "../Components/VisitorSidebar";

const VisitorProfile: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVisitorProfile();
  }, []);

  const fetchVisitorProfile = async () => {
    try {
      const visitorId = localStorage.getItem("visitorId");
      const token = localStorage.getItem("token");

      if (!visitorId || !token) {
        return;
      }

      const response = await axios.get(`http://localhost:5001/api/visitors/${visitorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ name: response.data.name, phone: response.data.phone });
    } catch (err) {
      setError("Failed to load profile.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const visitorId = localStorage.getItem("visitorId");
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:5001/api/visitors/update/${visitorId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <VisitorSidebar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Edit Profile</h2>

          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition w-full">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitorProfile;

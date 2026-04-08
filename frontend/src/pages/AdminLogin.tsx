import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, formData);      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/admin/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

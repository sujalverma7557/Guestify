import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const VisitorRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visitDate: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/visitors/register`,
        formData
      );      
      setMessage("Registration successful! You can now log in.");
      navigate("/visitorlogin");
    } catch (err) {
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <div className="bg-white shadow-3xl rounded-lg p-6 w-96">
        <h2 className="text-3xl font-bold mb-4 text-center">Visitor Registration</h2>

        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-2xl"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-2xl"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded-2xl"
            required
          />
          <input
            type="date"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleChange}
            className="border p-2 rounded-2xl"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded-2xl"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-2xl">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitorRegister;

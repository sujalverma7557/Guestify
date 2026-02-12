import { FaHome, FaUser, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VisitorSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="h-screen w-64 bg-white shadow-md text-gray-900 p-6 flex flex-col border-r">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">Visitor Panel</h2>
      <nav className="flex flex-col gap-4">
        <button onClick={() => navigate("/visitordashboard")} className="flex items-center gap-2 hover:bg-gray-200 p-3 rounded transition">
          <FaHome className="text-blue-500" /> Dashboard
        </button>
        <button onClick={() => navigate("/visitor/profile")} className="flex items-center gap-2 hover:bg-gray-200 p-3 rounded transition">
          <FaUser className="text-purple-500" /> Profile
        </button>
        <button onClick={() => navigate("/visitor/requests")} className="flex items-center gap-2 hover:bg-gray-200 p-3 rounded transition">
          <FaClipboardList className="text-green-500" /> Requests
        </button>
        <button onClick={handleLogout} className="flex items-center gap-2 hover:bg-red-500 hover:text-white p-3 rounded transition mt-auto">
          <FaSignOutAlt className="text-red-500" /> Logout
        </button>
      </nav>
    </div>
  );
};

export default VisitorSidebar;

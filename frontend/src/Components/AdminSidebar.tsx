import { FaTachometerAlt, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-64 bg-blue-900 text-white p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        {/* Dashboard */}
        <button onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-2 hover:bg-blue-700 p-3 rounded transition">
          <FaTachometerAlt /> Dashboard
        </button>

        {/* Manage Requests */}
        <button onClick={() => navigate("/admin/requests")} className="flex items-center gap-2 hover:bg-blue-700 p-3 rounded transition">
          <FaClipboardList /> Manage Requests
        </button>

        {/* Logout */}
        <button onClick={handleLogout} className="flex items-center gap-2 hover:bg-red-600 p-3 rounded mt-auto transition">
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;

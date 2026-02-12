import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        <ReactTyped
          strings={["Visitor Management System", "Smart & Secure Access", "Effortless Check-In Experience"]}
          typeSpeed={140}
          backSpeed={140}
          loop
        />
      </h1>

      <p className="text-lg text-gray-300 mb-12 text-center max-w-2xl">
        Secure and seamless visitor tracking for organizations. Empower admins and visitors with an effortless check-in experience.
      </p>

   
      <div className="flex flex-wrap justify-center gap-8">
      
        <div
          className="w-80 bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg hover:scale-105 transition transform cursor-pointer border border-white/20"
          onClick={() => navigate("/visitorlogin")}
        >
          <h3 className="text-2xl font-bold mb-2 text-blue-400">Visitor Panel</h3>
          <p className="text-gray-300">Register, check-in, and manage your visits seamlessly.</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
            Enter as Visitor
          </button>
        </div>


        <div
          className="w-80 bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg hover:scale-105 transition transform cursor-pointer border border-white/20"
          onClick={() => navigate("/admin/login")}
        >
          <h3 className="text-2xl font-bold mb-2 text-purple-400">Admin Panel</h3>
          <p className="text-gray-300">Monitor and control visitor access with ease.</p>
          <button className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition">
            Enter as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

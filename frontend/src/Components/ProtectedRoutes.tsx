import { Navigate } from "react-router-dom";

interface Props {
  Component: React.ComponentType;
  role: "admin";
}

const ProtectedRoute: React.FC<Props> = ({ Component, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token || userRole !== role) {
    return <Navigate to="/admin/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;

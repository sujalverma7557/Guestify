import { Navigate } from "react-router-dom";

interface Props {
  component: React.ComponentType;
}

const VisitorProtectedRoute: React.FC<Props> = ({ component: Component }) => {
  const token = localStorage.getItem("token");


  if (!token ) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default VisitorProtectedRoute;

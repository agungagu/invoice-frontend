
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;

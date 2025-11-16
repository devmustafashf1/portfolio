//@ts-nocheck
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoutes({ children }) {
  const { userData } = useContext(AuthContext);

  if (userData) {
    return <Navigate to="/" replace />;
  }

  return children;
}
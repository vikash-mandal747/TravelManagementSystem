import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function PrivateRoute({ children, allowed }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (allowed && !allowed.includes(user.role))
    return <Navigate to="/" replace />;

  return children;
}

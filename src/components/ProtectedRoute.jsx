import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, currentUser }) {
  // If currentUser is null, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

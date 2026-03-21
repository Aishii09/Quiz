import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { currentUser, children } = props;

  // ✅ safety check (prevents crash)
  if (!children) {
    return null;
  }

  // ✅ if not logged in → redirect
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ if logged in → show page
  return children;
}
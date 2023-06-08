import React from "react";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return (
      <HashLoader
        color="#36d7b7"
        cssOverride={{
          margin: "auto",
          padding: "300px 0",
        }}
      />
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoutes;

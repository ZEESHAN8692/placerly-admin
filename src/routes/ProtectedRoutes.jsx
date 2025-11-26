import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = () => {
  const token = sessionStorage.getItem("token");
  console.log("token", token);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
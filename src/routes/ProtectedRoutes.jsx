import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const token = Cookies.get("token");
  console.log("token", token);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
import React from "react";
import {  Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ isLogin }: any) {
  return isLogin ? <Outlet /> : <Navigate to="/host" />;
}
export default PrivateRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import SignInPage from "../pages/SignInPage";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to={"/signin"} />;
}

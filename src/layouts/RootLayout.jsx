import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="font-poppins">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default RootLayout;

import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

function RootLayout() {
  return (
    <div className="font-poppins">
      <NavBar />
      <div className="bg-black">
        <Outlet />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000 }}
        containerStyle={{ padding: "1rem", fontSize: "1.2rem" }}
      />
    </div>
  );
}

export default RootLayout;

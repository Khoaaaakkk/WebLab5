import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

const BlogWrapper = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default BlogWrapper;

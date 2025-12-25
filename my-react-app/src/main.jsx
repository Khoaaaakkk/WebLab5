import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import UserProfile from "./UserProfile.jsx";
import Layout from "./Layout.jsx";
import BlogDash from "./BlogDash.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // The root layout
    children: [
      // The children array
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users/:userId", // The dynamic route
        element: <UserProfile />,
      },
      { path: "/app", element: <App /> },
      { path: "/blog", element: <BlogDash /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

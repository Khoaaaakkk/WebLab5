import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import About from "./About.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Layout from "./Layout.jsx";
import BlogWrapper from "./components/blog/BlogWrapper.jsx";
import LoginPage from "./components/blog/LoginPage.jsx";
import Dashboard from "./components/blog/Dashboard.jsx";
import PostDetail from "./components/blog/PostDetail.jsx";
import ProtectedRoute from "./components/blog/ProtectedRoute.jsx";

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
      // Blog routes with authentication
      {
        path: "/blog",
        element: <BlogWrapper />,
        children: [
          {
            path: "/blog",
            element: <LoginPage />,
          },
          {
            element: <ProtectedRoute />,
            children: [
              { path: "/blog/dashboard", element: <Dashboard /> },
              { path: "/blog/post/:postId", element: <PostDetail /> },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

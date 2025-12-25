import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { logout } = useAuth();
  const {
    data: posts,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <div style={{ padding: "20px" }}>Loading posts...</div>;
  if (error) return <div style={{ padding: "20px" }}>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Blog Dashboard</h1>
        <button onClick={logout} style={{ padding: "8px 16px" }}>
          Logout
        </button>
      </div>
      <p>Click on any post to view details:</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} style={{ marginBottom: "10px" }}>
            <Link
              to={`/blog/post/${post.id}`}
              style={{ color: "#0066cc", textDecoration: "none" }}
            >
              {post.id}. {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

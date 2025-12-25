import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const PostDetail = () => {
  const { postId } = useParams();
  const {
    data: post,
    loading,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  if (loading)
    return <div style={{ padding: "20px" }}>Loading post details...</div>;
  if (error) return <div style={{ padding: "20px" }}>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Link
        to="/blog/dashboard"
        style={{ color: "#0066cc", textDecoration: "none" }}
      >
        ← Back to Dashboard
      </Link>
      <h1 style={{ marginTop: "20px" }}>{post.title}</h1>
      <p style={{ lineHeight: "1.6", marginTop: "20px" }}>{post.body}</p>
    </div>
  );
};

export default PostDetail;

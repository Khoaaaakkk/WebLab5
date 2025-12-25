import React, { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blog Login Page</h1>
      <p>Enter your username to access the blog dashboard</p>
      <input
        ref={usernameRef}
        type="text"
        placeholder="Username"
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={login} style={{ padding: "8px 16px" }}>
        Log In
      </button>
    </div>
  );
};

export default LoginPage;

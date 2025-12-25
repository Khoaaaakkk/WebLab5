import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

// --- 2. GLOBAL STATE (CONTEXT) ---
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsAuthenticated(true);
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- 4. CUSTOM HOOK: useFetch ---
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

// --- 3. PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  // If authenticated, render child routes via Outlet; else redirect to Login
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

// --- COMPONENTS ---

// 6. LOGIN PAGE (with useRef Bonus)
const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const usernameRef = useRef(null); // useRef for the input

  useEffect(() => {
    usernameRef.current.focus(); // Auto-focus on mount
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Page</h1>
      <input ref={usernameRef} type="text" placeholder="Username" />
      <button onClick={login}>Log In</button>
    </div>
  );
};

// DASHBOARD (List of Posts)
const Dashboard = () => {
  const {
    data: posts,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blog Dashboard</h1>
      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            {/* Link to dynamic route */}
            <Link to={`/dashboard/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 5. POST DETAIL (Dynamic Route & useParams)
const PostDetail = () => {
  const { postId } = useParams(); // Get ID from URL
  const {
    data: post,
    loading,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

  if (loading) return <div>Loading post details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/dashboard">← Back to Dashboard</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

// --- 1. REACT ROUTER SETUP ---
const AppWrapper = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />, // Provides Context to all routes
    children: [
      { path: "/", element: <LoginPage /> },
      {
        element: <ProtectedRoute />, // Wrap dashboard in ProtectedRoute
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/dashboard/post/:postId", element: <PostDetail /> }, // Dynamic route
        ],
      },
    ],
  },
]);

export default function BlogDash() {
  return <RouterProvider router={router} />;
}

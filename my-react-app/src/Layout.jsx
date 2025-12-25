import { Link, Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <nav style={{ borderBottom: "1px solid black", padding: "10px" }}>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
      <Link to="/users/67">User 67</Link> | <Link to="/app">App</Link> |{" "}
      <Link to="/blog">Blog</Link>
    </nav>
    {/* The Outlet is where child routes render */}
    <Outlet />
  </div>
);
export default Layout;

import { useState } from "react";
import "./App.css";
import DependencyArray from "./DependencyArray";
import MouseTracker from "./MouseTracker";
import PostFetcher from "./PostFetcher";
import UncontrolledLogin from "./UncontrolledLogin";
import ControlledSignup from "./ControlledSignup";
import PersistentCounter from "./PersistentCounter";
import { ThemeContext } from "./ThemeContext";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <div className={`app-${theme}`}>
          <h1>Context Theme Switcher</h1>
          <button onClick={toggleTheme}>Toggle Theme</button>

          <h1 style={{ textAlign: "center" }}>1. React useEffect Hook</h1>
          <DependencyArray />

          <MouseTracker />

          <h1 style={{ textAlign: "center" }}>2. React useRef Hook</h1>

          <UncontrolledLogin />

          <h1 style={{ textAlign: "center" }}>3. Data fetching strategies</h1>
          <PostFetcher />
          <h1 style={{ textAlign: "center" }}>4. Architecting Forms</h1>
          <ControlledSignup />
          <h1 style={{ textAlign: "center" }}>7. Custom Hooks</h1>
          <PersistentCounter />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;

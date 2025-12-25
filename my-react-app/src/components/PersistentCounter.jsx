import React from "react";
import { useLocalStorage } from "../useLocalStorage";

const PersistentCounter = () => {
  // 5. Use the custom hook to create a persistent counter
  const [count, setCount] = useLocalStorage("myCounter", 0);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Persistent Counter</h2>
      <p>
        Current Count: <strong>{count}</strong>
      </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>
        <small>Refresh the page to see the count persist!</small>
      </p>
    </div>
  );
};

export default PersistentCounter;

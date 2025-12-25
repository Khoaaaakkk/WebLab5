import { useEffect, useState } from "react";

function DependencyArray() {
  const [countOnMount, setCountOnMount] = useState(0);
  const [count, setCount] = useState(0);
  const [countOnChange, setCountOnChange] = useState(0);

  useEffect(() => {
    console.log("App component mounted");
    setCountOnMount(countOnMount + 1);
  }, []);
  useEffect(() => {
    console.log("App component mounted");
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, [count]);

  useEffect(() => {
    console.log("App component mounted or countOnChange changed");
  }, [countOnChange]);

  return (
    <>
      <div>Scenario A: {countOnMount} only updates on mount (one time)</div>
      <div>
        Scenario B: {count} seconds since mount (updates on mount and every
        second)
      </div>
      <div>
        Scenario C: {countOnChange} updates on mount and every time count
        changes
        <input
          type="number"
          value={countOnChange}
          onChange={(e) => setCountOnChange(Number(e.target.value))}
        />
      </div>
    </>
  );
}
export default DependencyArray;

import React, { useEffect, useRef } from "react";

const MouseTracker = () => {
  // Ref to store the latest mouse position without causing re-renders
  const lastPosRef = useRef({ x: 0, y: 0 });
  // Ref to hold a pending requestAnimationFrame id so we can cancel it
  const rafRef = useRef(null);

  useEffect(() => {
    // Coalesced callback — update lastPosRef and schedule a single rAF to log
    const handleMouseMove = (event) => {
      lastPosRef.current = { x: event.clientX, y: event.clientY };

      // If an rAF is not already scheduled, schedule one to log the position
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(() => {
          const { x, y } = lastPosRef.current;
          console.log(`Mouse Position: X: ${x}, Y: ${y}`);
          // Clear rafRef to allow scheduling the next frame
          rafRef.current = null;
        });
      }
    };

    // Add the event listener on mount
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup: remove event listener and cancel any pending rAF
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      console.log(
        "Cleanup: Event listener removed and animation frame canceled"
      );
    };
  }, []); // Empty dependency array means this runs only on mount/unmount

  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        1.3 Practical exercise: The cleanup function
      </h2>
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <h3>Mouse Tracker Active</h3>
        <p>Check your browser console to see the coordinates.</p>
      </div>
    </>
  );
};

export default MouseTracker;

import { useRef } from "react";
const UncontrolledLogin = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Username: ${usernameRef.current.value}, Password: ${passwordRef.current.value}`
    );
    alert(`Logged in as: ${usernameRef.current.value}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          margin: "0 auto",
        }}
      >
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default UncontrolledLogin;

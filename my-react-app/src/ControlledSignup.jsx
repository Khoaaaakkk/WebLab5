import React, { useState } from "react";

const ControlledSignup = () => {
  // 1. Single state object for all form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 3. Single handleChange function for dynamic updates
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Use functional update and computed property names
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 4. Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    console.log("Form Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        margin: "0 auto",
      }}
    >
      <h2>Signup</h2>

      {/* 2 & 3. Controlled Email Input */}
      <input
        type="email"
        name="email" // Matches state key
        placeholder="Email"
        value={formData.email} // Tied to state
        onChange={handleChange}
        required
      />

      {/* 2 & 3. Controlled Password Input */}
      <input
        type="password"
        name="password" // Matches state key
        placeholder="Password"
        value={formData.password} // Tied to state
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledSignup;

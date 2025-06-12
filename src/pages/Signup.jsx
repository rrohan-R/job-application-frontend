import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../css/auth.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      const token = data.token;

      if (res.ok) {
        localStorage.setItem("token", token);
        login({ username, token });
        alert("Signup successful. Redirecting to home...");
        navigate("/");
      } else {
        alert("Signup failed: " + token);
      }
    } catch (err) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;

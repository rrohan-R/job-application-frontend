import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Welcome to Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

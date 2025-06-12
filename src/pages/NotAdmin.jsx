import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import "../css/auth.css";
const NotAdmin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Not an Admin</h2>
      <p>Login as an admin to post jobs.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default NotAdmin;

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import "../css/header.css";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const menuRef = useRef();
  const dashboardRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDashboardOpen(false);
  };

  const toggleDashboard = () => {
    setDashboardOpen(!dashboardOpen);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false);
      if (!dashboardRef.current?.contains(event.target)) setDashboardOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
  <div className="logo" onClick={() => navigate("/")}>
    HiredIn
  </div>


  <Link to="/" className="home-button">
    Home
  </Link>

  {user && (
    <div className="dropdown" ref={menuRef}>
      <button onClick={toggleMenu} className="dropbtn">Menu ▾</button>
      {menuOpen && (
        <div className="dropdown-content left">
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
          <Link to="/saved-jobs" onClick={() => setMenuOpen(false)}>Saved Jobs</Link>
          <Link to="/resume-builder" onClick={() => setMenuOpen(false)}>Resume Builder</Link>
          <Link to="/post-job" onClick={()=> setMenuOpen(false)}>Post Job</Link>
        </div>
      )}
    </div>
  )}
</div>

      <div className="header-right">
        <div className="dropdown" ref={dashboardRef}>
          <button onClick={toggleDashboard} className="dropbtn">
            {user ? `Hello, ${user.username} ▾` : "Dashboard ▾"}
          </button>
          {dashboardOpen && (
            <div className="dropdown-content right">
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setDashboardOpen(false)}>Login</Link>
                  <Link to="/signup" onClick={() => setDashboardOpen(false)}>Signup</Link>
                </>
              ) : (
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

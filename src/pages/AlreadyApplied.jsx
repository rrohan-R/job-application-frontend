import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/alreadyapplied.css"

function AlreadyApplied() {
  const navigate = useNavigate();

  return (
    <div className="already-applied-container">
      <h2>This job has already been applied!</h2>
      <button onClick={() => navigate("/jobs")} className="browse-button">
        Browse Other Jobs
      </button>
    </div>
  );
}

export default AlreadyApplied;

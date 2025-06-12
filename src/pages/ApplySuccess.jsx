import React from 'react';
import { Link } from 'react-router-dom';
import "../css/applysuccess.css";

function ApplySuccess() {
  return (
    <div className="apply-success-container">
      <h2>✅ Successfully Applied!</h2>
      <p>Your application has been submitted.</p>
      <Link to="/jobs">
        <button className="browse-button">Browse Other Jobs</button>
      </Link>
    </div>
  );
}

export default ApplySuccess;

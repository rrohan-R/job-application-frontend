import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/savedjobs.css";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/getSavedJobs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch saved jobs");
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching saved jobs:", error);
        setLoading(false);
      });
  }, [token]);

  const handleApply = (job) => {
  navigate(`/apply/${job.jobId}`, { state: { job } });
};


  if (loading) {
    return <p className="loading">Loading saved jobs...</p>;
  }

  return (
    <div className="savedjobs-container">
      <h2 className="savedjobs-title">Saved Jobs</h2>
      <div className="savedjobs-list-container">
        {jobs.length === 0 ? (
          <p className="no-jobs">No saved jobs found.</p>
        ) : (
          <div className="savedjobs-cards">
  {jobs.map((job) => (
    <div key={job.jobId} className="savedjob-card">
      <h3 className="savedjob-title">{job.title}</h3>
      <p className="savedjob-company">{job.company}</p>
      <p className="savedjob-location">{job.location}</p>
      <p className="savedjob-description">{job.description}</p>
      <button
        onClick={() => handleApply(job)}
        className="apply-button"
      >
        Apply
      </button>
    </div>
  ))}
</div>

        )}
      </div>
    </div>
  );
}

export default SavedJobs;

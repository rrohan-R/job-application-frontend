import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch('http://localhost:8080/getJobs', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized or failed to fetch jobs");
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });


    fetch('http://localhost:8080/getSavedJobs', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error("Unauthorized or failed to fetch saved jobs");
        return response.json();
      })
      .then(data => {
        const savedIds = new Set(data.map(job => job.jobId));
        setSavedJobs(savedIds);
      })
      .catch(err => console.error("Error fetching saved jobs:", err));
  }, [token]);

  const handleApply = (job) => {
  navigate(`/apply/${job.jobId}`);
};


  const handleSaveJob = (job) => {
    const isSaved = savedJobs.has(job.jobId);

    if (isSaved) {
      fetch(`http://localhost:8080/unsaveJob/${job.jobId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) throw new Error('Unsave failed');
          const updated = new Set(savedJobs);
          updated.delete(job.jobId);
          setSavedJobs(updated);
        })
        .catch(error => {
          console.error('Error unsaving job:', error);
          alert('Failed to unsave job.');
        });
    } else {
      fetch(`http://localhost:8080/saveSavedJob`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: job.jobId,
          title: job.title,
          company: job.company,
          location: job.location,
          description: job.description
        })
      })
        .then(response => {
          if (!response.ok) throw new Error('Save failed');
          const updated = new Set(savedJobs);
          updated.add(job.jobId);
          setSavedJobs(updated);
        })
        .catch(error => {
          console.error('Error saving job:', error);
          alert('Failed to save job.');
        });
    }
  };

  return (
    <div className="job-listings-container">
      <h2 className="job-listings-title">Job Listings</h2>
      <div className="job-listings-wrapper">
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="job-cards">
            {jobs.map((job) => (
              <div key={job.jobId} className="job-card">
                <span
                  className="save-icon"
                  onClick={() => handleSaveJob(job)}
                  title={savedJobs.has(job.jobId) ? "Unsave job" : "Save job"}
                >
                  {savedJobs.has(job.jobId) ? "❤️" : "🤍"}
                </span>
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">{job.company}</p>
                <p className="job-location">{job.location}</p>
                <p className="job-description">{job.description}</p>
                <button onClick={() => handleApply(job)} className="apply-button">
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

export default Jobs;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../css/applyform.css";

function ApplyForm() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [resume, setResume] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:8080/getJobs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const selected = data.find(j => j.jobId === jobId);
        setJob(selected);
      });
  }, [jobId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || resume.type !== "application/pdf") {
      alert("Please upload a valid PDF resume.");
      return;
    }

    const payload = new FormData();
    payload.append("jobId", job.jobId);
    payload.append("title", job.title);
    payload.append("company", job.company);
    payload.append("location", job.location);
    payload.append("description", job.description);
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("mobile", formData.mobile);
    payload.append("resume", resume);

    try {
      const res = await fetch("http://localhost:8080/submitApplication", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload
      });

      if (res.status === 409) {
        navigate("/already-applied");
      } else if (res.ok) {
        navigate("/apply-success");
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  return (
    <div className="apply-form-container">
      <h2>Enter your details</h2>
      {job && (
        <form onSubmit={handleSubmit} className="apply-form">
          <label>Name: <input type="text" value={formData.name} required onChange={e => setFormData({ ...formData, name: e.target.value })} /></label>
          <label>Email: <input type="email" value={formData.email} required onChange={e => setFormData({ ...formData, email: e.target.value })} /></label>
          <label>Mobile: <input type="tel" value={formData.mobile} required onChange={e => setFormData({ ...formData, mobile: e.target.value })} /></label>
          <label>Resume (PDF only): <input type="file" accept="application/pdf" required onChange={e => setResume(e.target.files[0])} /></label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default ApplyForm;

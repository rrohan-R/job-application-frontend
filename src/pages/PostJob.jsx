import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/postjob.css'

function PostJob() {
  const [formData, setFormData] = useState({
    jobId: '',
    title: '',
    company: '',
    location: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || user.role !== "ROLE_ADMIN") {
      navigate("/not-admin");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/postJob", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('✅ Job posted successfully!');
        setFormData({ title: '', company: '', location: '', description: '' });
      } else {
        setMessage('❌ Failed to post job.');
      }
    } catch (error) {
      setMessage('⚠️ An error occurred.');
      console.error(error);
    }
  };

  return (
    <div className="postjob-container">
      <h2 className="postjob-title">Post a New Job</h2>
      <div className="postjob-form-wrapper">
        <form onSubmit={handleSubmit} className="postjob-form">
          <input
            type="text"
            name="jobId"
            placeholder="Job ID"
            value={formData.jobId}
            onChange={handleChange}
            required
            className="postjob-input"
          />
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="postjob-input"
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="postjob-input"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="postjob-input"
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="postjob-textarea"
            rows="4"
          />
          <button type="submit" className="postjob-button">
            Post Job
          </button>
        </form>
        {message && <p className="postjob-message">{message}</p>}
      </div>
    </div>
  );
}

export default PostJob;

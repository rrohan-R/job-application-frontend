import React, { useState } from 'react';
import jsPDF from 'jspdf';
import "../css/resumebuilder.css";

function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    education: '',
    experience: '',
    skills: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(formData.name, 20, 20);
    doc.setFontSize(12);
    doc.text(`Email: ${formData.email}`, 20, 30);
    doc.text(`Phone: ${formData.phone}`, 20, 40);

    doc.setFontSize(14);
    doc.text("Professional Summary", 20, 55);
    doc.setFontSize(12);
    doc.text(formData.summary, 20, 65, { maxWidth: 170 });

    doc.setFontSize(14);
    doc.text("Education", 20, 85);
    doc.setFontSize(12);
    doc.text(formData.education, 20, 95, { maxWidth: 170 });

    doc.setFontSize(14);
    doc.text("Experience", 20, 115);
    doc.setFontSize(12);
    doc.text(formData.experience, 20, 125, { maxWidth: 170 });

    doc.setFontSize(14);
    doc.text("Skills", 20, 145);
    doc.setFontSize(12);
    doc.text(formData.skills, 20, 155, { maxWidth: 170 });

    doc.save(`${formData.name}_Resume.pdf`);
  };

  return (
    <div className="resume-builder-container">
      <h2 className="resume-builder-title">Resume Builder</h2>
      <p className="resume-builder-description">
        Fill in your details below to generate a professional resume.
      </p>

      <div className="resume-builder-form">
        {["name", "email", "phone"].map(field => (
          <input
            key={field}
            type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
          />
        ))}

        <textarea
          name="education"
          placeholder="Education (e.g. B.Tech in CSE, XYZ University, 2023)"
          value={formData.education}
          onChange={handleChange}
          rows="3"
        />

        <textarea
          name="experience"
          placeholder="Experience (e.g. 2 years as Software Developer at ABC Corp)"
          value={formData.experience}
          onChange={handleChange}
          rows="3"
        />

        <div className="summary-section">
          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <textarea
          name="skills"
          placeholder="Skills (e.g. Java, Spring Boot, React)"
          value={formData.skills}
          onChange={handleChange}
          rows="2"
        />

        <button onClick={handleDownload}>Download Resume as PDF</button>
      </div>
    </div>
  );
}

export default ResumeBuilder;

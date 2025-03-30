import React, { useState } from 'react';
import './AddCandidate.css';

const AddCandidate = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !position || !experience || !resume) {
      alert("Please fill all the fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("position", position);
    formData.append("experience", experience);
    formData.append("resume", resume);

    try {
      const response = await fetch("http://localhost:4000/candidate/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error in adding candidate");
      }

      const data = await response.json();
      console.log(data);
      alert('Candidate added successfully');

      // ✅ Reset all fields
      setName("");
      setEmail("");
      setPhone("");
      setPosition("");
      setExperience("");
      setResume(null);

      // ✅ Close modal
      onClose();

    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="add-candidate">
        <div className="popup-header">
          <h1 className="header-title">Add New Candidate</h1>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <form className="popup-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <label>Full Name<span className="required">*</span></label>
            </div>

            <div className="form-group">
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <label>Phone Number<span className="required">*</span></label>
            </div>

            <div className="form-group">
              <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />
              <label>Experience<span className="required">*</span></label>
            </div>

            <div className="form-group">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label>Email Address<span className="required">*</span></label>
            </div>

            <div className="form-group">
              <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
              <label>Position<span className="required">*</span></label>
            </div>

            <div className="form-group file-upload">
              <input type="file" id="resume" className="file-input" onChange={handleFileChange} required />
              <label htmlFor="resume">Upload Resume<span className="required">*</span></label>
            </div>
          </div>

          <div className="declaration">
            <input type="checkbox" id="declaration" required />
            <label htmlFor="declaration">
              I hereby declare that the above information is true to the best of my knowledge and belief.
            </label>
          </div>

          <div className="popup-footer">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;

    // EditEmployee.jsx
    import React, { useState, useEffect } from 'react';
    import './model.css';
    import { FaCalendarAlt } from "react-icons/fa";
    import axios from 'axios';

    const EditAttendance = ({ employeeId, onClose }) => {
    const [status, setStatus] = useState("");  
    const apiUrl = import.meta.env.VITE_API_URL;

      const handleSubmit=async(e)=>{
        e.preventDefault()
       try {
        const response= await axios.post('http://localhost:4000/attendence/markattendence', { employeeId, status });
        alert(response.data.message || "Attendance updated successfully!");
        onClose();
       } catch (error) {
        console.error(error);
       }
      }
    return (
        <div className="popup-overlay">
        <div className="add-candidate">
            <div className="popup-header">
            <h1 className="header-title">Edit Employee Attendance</h1>
            <button onClick={onClose} className="close-btn">&times;</button>
            </div>

            <form className="popup-form" onSubmit={handleSubmit}>
            <div className="form-grid">

                <div className="form-group">
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="" disabled> Status</option>
                    {["Present",  "Absent"].map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
                <label>Status<span className="required">*</span></label>

                </div>

              
            </div>

            <div className="popup-footer">
                <button type="submit" className="save-button">Save</button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default EditAttendance;


    
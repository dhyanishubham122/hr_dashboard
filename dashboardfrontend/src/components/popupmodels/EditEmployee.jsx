    // EditEmployee.jsx
    import React, { useState, useEffect } from 'react';
    import './AddCandidate.css';
    import { FaCalendarAlt } from "react-icons/fa";

    const EditEmployee = ({ employeeId, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [department, setDepartment] = useState("");
    const [joining_Date, setJoining_Date] = useState('');
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
        try {
            const response = await fetch(`http://localhost:4000/employee/${employeeId}`);
            const data = await response.json();
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
            setPosition(data.position);
            setDepartment(data.department);
            setJoining_Date(data.Joining_Date);
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
        };
        if (employeeId) fetchEmployeeDetails();
    }, [employeeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !position || !department || !joining_Date) {
        alert("Please fill all the fields!");
        return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("position", position);
        formData.append("department", department);
        formData.append("Joining_Date", joining_Date);
        if (profile) {
        formData.append("profile", profile);
        }

        try {
        const response = await fetch(`http://localhost:4000/employee/updateemployee/${employeeId}`, {
            method: "PATCH",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error in updating employee");
        }

        const data = await response.json();
        console.log(data);
        alert('Employee updated successfully');
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
            <h1 className="header-title">Edit Employee Details</h1>
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
                <label>Department<span className="required">*</span></label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                    <option value="" disabled>Select Department</option>
                    {["Designer", "Backend Development", "Frontend Development", "Marketing", "Sales", "IT", "Not Assigned"].map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
                </div>

                <div className="form-group">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Email Address<span className="required">*</span></label>
                </div>

                <div className="form-group">
                <label>Position<span className="required">*</span></label>
                <select value={position} onChange={(e) => setPosition(e.target.value)} required>
                    <option value="" disabled>Select Position</option>
                    {["Manager", "Team Lead", "Senior Developer", "Junior Developer", "Intern"].map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
                </div>

                <div className="form-group">
                <label>Joining Date <span className="required">*</span></label>
                <div className="date-input-wrapper">
                    <input type="date" className="date-input" value={joining_Date} onChange={(e) => setJoining_Date(e.target.value)} required />
                    <FaCalendarAlt className="calendar-icon" />
                </div>
                </div>

                <div className="form-group">
                <label>Profile Picture</label>
                <input type="file" accept="image/*" onChange={(e) => setProfile(e.target.files[0])} />
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

    export default EditEmployee;
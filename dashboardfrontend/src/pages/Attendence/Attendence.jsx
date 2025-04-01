
import React, { useState, useEffect } from 'react';
import '../Attendence/Attendence.css';
import { FiMoreVertical } from 'react-icons/fi';
import axios from 'axios';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [menuOpen, setMenuOpen] = useState(null);
    
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:4000/employee/allemployess');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    const handleStatusChange = async (employeeId, status) => {
        try {
            await axios.post('http://localhost:4000/attendence/markattendence', { employeeId, status });
            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) =>
                    emp._id === employeeId ? { ...emp, status } : emp
                )
            );
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };
    
    return (
        <div className="attendance">
            <div className="attendance-header">
                <div className="controls">
                    <div className="filter-group">
                        <select className="status-dropdown">
                            <option>Status</option>
                            <option>Present</option>
                            <option>Absent</option>
                        </select>
                    </div>
                    <div className="search-add-group">
                        <input type="text" placeholder="Search" className="search" />
                    </div>
                </div>
            </div>
            <div className="attendance-table">
                <table>
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee, index) => (
                                <tr key={index}>
                                     <td>
                                     <img src={employee.profile || "https://via.placeholder.com/50"} alt="Profile"style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                     </td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <select
                                            className="status-dropdown"
                                            style={{ color:  "green" }}
                                            value={employee.status || "Present"}
                                            onChange={(e) => {
                                                e.target.style.color = e.target.value === "Absent" ? "red" : "green"; 
                                                handleStatusChange(employee._id, e.target.value)}}
                                        >
                                            {/* <option>{employee.status}</option> */}
                                            <option value="Status">Status</option>
                                            <option value="Present" style={{ color: "green" }}>Present</option>
                                            <option value="Absent" style={{ color: "red" }}>Absent</option>
                                        </select>
                                    </td>
                                    <td className="action-cell">
                                        <button className="menu-btn" onClick={() => setMenuOpen(menuOpen === index ? null : index)}>
                                            <FiMoreVertical />
                                        </button>
                                        {menuOpen === index && (
                                            <div className="dropdown-menu">
                                                <button className="action-btn">Edit</button>
                                                <button className="action-btn delete">Delete</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No Employees Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;




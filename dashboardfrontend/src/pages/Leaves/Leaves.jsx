import React from "react";
import Calendar from "react-calendar"; // Ensure you install: npm install react-calendar
import "react-calendar/dist/Calendar.css";
import '../Leaves/Leaves.css'

const Leaves = () => {
  return (
    <div className="leaves">
      {/* Header */}
      <div className="leaves-header">
        <div className="filter-group">
          <select className="status-dropdown">
            <option>Status</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className="search-add-group">
          <input type="text" placeholder="Search" className="search" />
          <button className="add-leave-btn">Add Leave</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="leaves-content">
        {/* Left Side - Leave Table */}
        <div className="leaves-table">
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Docs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img src="https://res.cloudinary.com/dfksbh3kv/image/upload/v1743346790/1743346788629-profile.jpg" alt="Profile" className="profile-pic" />
                </td>
                <td>Shubham</td>
                <td>30/03/25</td>
                <td>Fever</td>
                <td>
                  <span className="status approved">Approved</span>
                </td>
                <td>
                  <button className="doc-btn">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Side - Calendar */}
        <div className="leaves-calendar">
          <h3>Leave Calendar</h3>
          <Calendar />
          <h4>Approved Leaves</h4>
          <div className="approved-leaves">
            <img src="https://res.cloudinary.com/dfksbh3kv/image/upload/v1743346790/1743346788629-profile.jpg" alt="Profile" className="profile-pic" />
            <p>Shubham - 30/03/25</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;

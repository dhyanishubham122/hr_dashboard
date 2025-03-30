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
            <option>Active</option>
            <option>Inactive</option>
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
                  <img src="profile.jpg" alt="Profile" className="profile-pic" />
                </td>
                <td>John Doe</td>
                <td>08/09/24</td>
                <td>Visiting House</td>
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
            <img src="profile.jpg" alt="Profile" className="profile-pic" />
            <p>John Doe - 08/09/24</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;

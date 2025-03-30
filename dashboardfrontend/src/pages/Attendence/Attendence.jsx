import {React,useState} from 'react';
import '../Attendence/Attendence.css'
import { FiMoreVertical } from 'react-icons/fi';
const Attendance = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="attendance">
    <div className="attendance-header">
  <div className="controls">
    {/* Left-side dropdowns */}
    <div className="filter-group">
      <select className="status-dropdown">
        <option>Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>

    {/* Right-side search bar & button */}
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
            
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows would be populated dynamically */}
            <tr>
              <td>
                <img
                  src="https://via.placeholder.com/40"alt="Profile"className="profile-img"/>
              </td>
              <td>john</td>
             
              <td>Full Time</td>
              <td>Developer</td>
              <td>Building on app</td>
              <td>
              <select className="status-dropdown">
                 <option>Status</option>
                 <option>Present</option>
                <option>Absent</option>
              </select>
              </td>
              <td className="action-cell">
                <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                  <FiMoreVertical />
                </button>
                {menuOpen && (
                  <div className="dropdown-menu">
                    <button className="action-btn">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
import {React,useState} from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import '../Employee/Employee.css'

const Employees = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="employess">
    <div className="employess-header">
  <div className="controls">
    {/* Left-side dropdowns */}
    <div className="filter-group">
      <select className="position-dropdown">
        <option>Position</option>
        <option>Developer</option>
        <option>Designer</option>
      </select>
    </div>

    {/* Right-side search bar & button */}
    <div className="search-add-group">
      <input type="text" placeholder="Search" className="search" />
    </div>
  </div>
</div>

      
      <div className="employess-table">
        <table>
          <thead>
            <tr>
              <th>$sr no.</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows would be populated dynamically */}
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>1234567890</td>
              <td>Developer</td>
              <td>Active</td>
              <td>5 years</td>
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

export default Employees;

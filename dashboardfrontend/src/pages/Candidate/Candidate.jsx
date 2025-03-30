import {React,useState} from 'react';
import '../Candidate/Candidate.css'
import { FiMoreVertical } from 'react-icons/fi';
import AddCandidate from '../../components/popupmodels/AddCandidate.jsx'
const Candidates = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="candidates">
    <div className="candidates-header">
  <div className="controls">
    {/* Left-side dropdowns */}
    <div className="filter-group">
      <select className="status-dropdown">
        <option>Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <select className="position-dropdown">
        <option>Position</option>
        <option>Developer</option>
        <option>Designer</option>
      </select>
    </div>

    {/* Right-side search bar & button */}
    <div className="search-add-group">
      <input type="text" placeholder="Search" className="search" />
      <button className="add-candidate-btn" onClick={() => setShowPopup(true)}>Add Candidate</button>
    </div>
    {showPopup && <AddCandidate onClose={() => setShowPopup(false)} />}

  </div>
</div>

      
      <div className="candidates-table">
        <table>
          <thead>
            <tr>
              <th>$r no.</th>
              <th>Candidates Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
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

export default Candidates;
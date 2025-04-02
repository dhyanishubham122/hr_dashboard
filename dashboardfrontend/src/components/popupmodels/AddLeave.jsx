import React, { useState, useEffect } from 'react';
import './model.css';

const AddLeave = ({ onClose }) => {
  const [designation, setDesignation] = useState('');
  const [document, setDocument] = useState(null);
  const [leave_Date, setLeave_Date] = useState('');
  const [reason, setReason] = useState('');
  const [search, setSearch] = useState('');
  const [employeeId,setEmployeeId]=useState('');
  const [employee, setEmployee] = useState([]); // Store all employee names
  const [filteredNames, setFilteredNames] = useState([]); // Store filtered results
  const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  useEffect(() => {
    const fetchemployees = async () => {
      try {
        const response = await fetch('http://localhost:4000/employee/allemployess', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          alert(data.message);
          throw new Error('Network response was not ok');
        }
        const employeNames = data.map((employee) => ({
            id: employee._id,
            name: employee.name,
        }));
        setEmployee(employeNames);
        setFilteredNames(employeNames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchemployees();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    // Filter employees based on search input
    const filtered = employee.filter((emp) => emp.name.toLowerCase().startsWith(searchTerm));

    setFilteredNames(filtered);
    setShowDropdown(true); // Show dropdown when typing
  };

  // When user selects a name from the dropdown
  const handleSelectName = (emp) => {
    setSearch(emp.name); // Set selected name in input box
    setEmployeeId(emp.id);
    setShowDropdown(false); // Hide dropdown after selection
  };
  const handleleavesubmit=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
        formData.append("employeeId", employeeId);
        formData.append("leaveDate", leave_Date);
        formData.append("reason", reason);
        formData.append("designation", designation);
        formData.append("document", document);
     const response= await fetch('http://localhost:4000/leave/create',{
        method:'POST',
        body:formData,
     })
     const data= await response.json();
     if(!response.ok){
        alert(data.message);
        throw new Error('Network response was not ok');
     }
     alert("Leave Applied Successfully");
     setReason('');
     setDesignation('');
     setDocument(null);
     setLeave_Date('');
     setSearch('');
     onClose();
  }

  return (
    <div className="popup-overlay">
      <div className="add-candidate">
        <div className="popup-header">
          <h1 className="header-title">Add New Leave</h1>
          <button onClick={onClose} className="close-btn">
            &times;
          </button>
        </div>

        <form className="popup-form" onSubmit={handleleavesubmit}>
          <div className="form-grid">
            {/* Search Box */}
            <div className="form-group">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search employee..."
                required
              />
              {/* Show filtered employee names (Dropdown) */}
              {showDropdown && search && (
                <ul className="search-results">
                  {filteredNames.length > 0 ? (
                    filteredNames.map((emp, index) => (
                      <li style={{width:"max-content"}} key={index} onClick={() => handleSelectName(emp)} className="search-item">
                        {emp.name}
                      </li>
                    ))
                  ) : (
                    <li>No results found</li>
                  )}
                </ul>
              )}
            </div>

            {/* Designation Dropdown */}
            <div className="form-group">
              <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
                <option value="" disabled>
                  Select Designation
                </option>
                {['Intern', 'Full Time', 'Developer', 'Junior', 'Senior', 'Team Lead', 'Senior Developer'].map(
                  (pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  )
                )}
              </select>
              <label>
                Designation<span className="required">*</span>
              </label>
            </div>

            {/* Leave Date */}
            <div className="form-group cal">
              <input
                type="date"
                className="date-input"
                value={leave_Date}
                onChange={(e) => setLeave_Date(e.target.value)}
                required
              />
              <label>
                Leave Date <span className="required">*</span>
              </label>
            </div>

            {/* File Upload */}
            <div className="form-group file-upload">
              <input type="file" id="resume" className="file-input" onChange={handleFileChange} required />
              <label htmlFor="resume">
                Document<span className="required">*</span>
              </label>
            </div>
          </div>

          {/* Reason Input */}
          <div className="form-group">
            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />
            <label>
              Reason<span className="required">*</span>
            </label>
          </div>

          {/* Save Button */}
          <div className="popup-footer">
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;

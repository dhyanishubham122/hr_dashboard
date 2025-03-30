// import React, { useState, useEffect } from "react";
// import { FiMoreVertical } from "react-icons/fi";
// import '../Employee/Employee.css';
// import EditEmployee from "../../components/popupmodels/EditEmployee";

// const Employees = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // Store selected employee ID
//   const [menuOpen, setMenuOpen] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [search, setSearch] = useState("");
//   const [position, setPosition] = useState("");

//   useEffect(() => {
//     fetchEmployees();
//   }, [search, position]);

//   const fetchEmployees = async () => {
//     try {
//       let url = `http://localhost:4000/employee/searchemployee?`;
//       if (position) url += `position=${position}&`;
//       if (search) url += `search=${search}`;

//       const response = await fetch(url);
//       const data = await response.json();
//       setEmployees(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   return (
//     <div className="employees">
//       <div className="employees-header">
//         <div className="controls">
//           <div className="filter-group">
//             <select className="position-dropdown" value={position} onChange={(e) => setPosition(e.target.value)}>
//               <option value="">Position</option>
//               <option value="Intern">Intern</option>
//               <option value="Full Time">Full Time</option>
//               <option value="Junior">Junior</option>
//               <option value="Senior">Senior</option>
//               <option value="Team Lead">Team Lead</option>
//               <option value="Senior Developer">Senior Developer</option>
//             </select>
//           </div>
//           <div className="search-add-group">
//             <input type="text" placeholder="Search" className="search" value={search} onChange={(e) => setSearch(e.target.value)} />
//           </div>
//           {showPopup && (
//             <EditEmployee 
//               employeeId={selectedEmployeeId} // Pass selected employee ID
//               onClose={() => setShowPopup(false)} 
//             />
//           )}
//         </div>
//       </div>

//       <div className="employees-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Sr.no</th>
//               <th>Profile</th> 
//               <th>Employee Name</th>
//               <th>Email Address</th>
//               <th>Phone Number</th>
//               <th>Position</th>
//               <th>Department</th>
//               <th>Date of Joining</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length > 0 ? (
//               employees.map((employee, index) => (
//                 <tr key={employee._id}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <img 
//                       src={employee.profile || "https://via.placeholder.com/50"} 
//                       alt="Profile"
//                       style={{ width: "40px", height: "40px", borderRadius: "50%" }} 
//                     />
//                   </td>
//                   <td>{employee.name}</td>
//                   <td>{employee.email}</td>
//                   <td>{employee.phone}</td>
//                   <td>{employee.position}</td>
//                   <td>{employee.department || 'N/A'}</td>
//                   <td>{employee.dateOfJoining || 'N/A'}</td>
//                   <td className="action-cell">
//                     <button className="menu-btn" onClick={() => setMenuOpen(menuOpen === index ? null : index)}>
//                       <FiMoreVertical />
//                     </button>
//                     {menuOpen === index && (
//                       <div className="dropdown-menu">
//                         <button 
//                           className="action-btn"
//                           onClick={() => {
//                             setSelectedEmployeeId(employee._id); // Set selected employee ID
//                             setShowPopup(true);
//                           }}
//                         >
//                           Edit
//                         </button>
//                         <button className="action-btn delete">Delete</button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center" }}>No Employees Found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Employees;

import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import '../Employee/Employee.css';
import EditEmployee from "../../components/popupmodels/EditEmployee";

const Employees = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [search, position,showPopup]);

  const fetchEmployees = async () => {
    try {
      let url = `http://localhost:4000/employee/searchemployee?`;
      if (position) url += `position=${position}&`;
      if (search) url += `search=${search}`;

      const response = await fetch(url);
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const handleDeleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:4000/employee/delete/${employeeId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchEmployees();
      } else {
        console.error('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employess">
      <div className="employess-header">
        <div className="controls">
          <div className="filter-group">
            <select className="position-dropdown" value={position} onChange={(e) => setPosition(e.target.value)}>
              <option value="">Position</option>
              <option value="Intern">Intern</option>
              <option value="Full Time">Full Time</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Senior Developer">Senior Developer</option>
            </select>
          </div>
          <div className="search-add-group">
            <input type="text" placeholder="Search" className="search" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="employess-table-container">
        <div className="employess-table">
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Profile</th>
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
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr key={employee._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img 
                        src={employee.profile || "https://via.placeholder.com/50"} 
                        alt="Profile"
                        style={{ width: "40px", height: "40px", borderRadius: "50%" }} 
                      />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.position}</td>
                    <td>{employee.department || 'N/A'}</td>
                    <td>{employee.dateOfJoining || 'N/A'}</td>
                    <td className="action-cell">
                      <button className="menu-btn" onClick={() => setMenuOpen(menuOpen === index ? null : index)}>
                        <FiMoreVertical />
                      </button>
                      {menuOpen === index && (
                        <div className="dropdown-menu">
                          <button 
                            className="action-btn"
                            onClick={() => {
                              setSelectedEmployeeId(employee._id);
                              setShowPopup(true);
                            }}
                          >
                            Edit
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => {
                              handleDeleteEmployee(employee._id);
                              setMenuOpen(null);
                            }}
                          >
                            Delete
                          </button>                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>No Employees Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <EditEmployee 
          employeeId={selectedEmployeeId}
          onClose={() => setShowPopup(false)} 
        />
      )}
    </div>
  );
};

export default Employees;

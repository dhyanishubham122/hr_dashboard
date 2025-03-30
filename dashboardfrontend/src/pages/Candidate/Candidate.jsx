// import React, { useState, useEffect } from 'react';
// import '../Candidate/Candidate.css';
// import { FiMoreVertical } from 'react-icons/fi';
// import AddCandidate from '../../components/popupmodels/AddCandidate.jsx';
// import axios from 'axios';

// const Candidates = () => {
//     const [menuOpen, setMenuOpen] = useState(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const [candidates, setCandidates] = useState([]);
//     const [filters, setFilters] = useState({ status: '', position: '', search: '' });

//     useEffect(() => {
//         const fetchCandidates = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/candidate/searchfilter', { params: filters });
//                 setCandidates(response.data);
//             } catch (error) {
//                 console.error("Error fetching candidates:", error);
//             }
//         };
//         fetchCandidates();
//     }, [filters]);

//     const handleFilterChange = (e) => {
//         setFilters({ ...filters, [e.target.name]: e.target.value });
//     };

//     const handleStatusChange = async (id, newStatus) => {
//         try {
//             // Update status first
//             await axios.patch(`http://localhost:4000/candidate/update/${id}`, { status: newStatus });

//             // Update the local state immediately
//             setCandidates((prevCandidates) =>
//                 prevCandidates.map((candidate) =>
//                     candidate._id === id ? { ...candidate, status: newStatus } : candidate
//                 )
//             );

//             // If status is changed to "Selected", call the candidate-to-employee API
//             if (newStatus === "Selected") {
//                 const response = await axios.post(`http://localhost:4000/employee/candidatetoemployee/${id}`);
//                 console.log(response.data);

//                 if (response.status === 200) {
//                     alert("Candidate successfully converted to an Employee!");
//                 }
//             }
//         } catch (error) {
//             console.error("Error updating status or converting candidate:", error);
//             alert(error.response?.data?.message || "Something went wrong.");
//         }
//     };

//     return (
//         <div className="candidates">
//             <div className="candidates-header">
//                 <div className="controls">
//                     <div className="filter-group">
//                         <select name="status" className="status-dropdown" onChange={handleFilterChange}>
//                             <option value="">Status</option>
//                             <option value="Active">Active</option>
//                             <option value="Inactive">Inactive</option>
//                         </select>
//                         <select name="position" className="position-dropdown" onChange={handleFilterChange}>
//                             <option value="">Position</option>
//                             <option value="Developer">Developer</option>
//                             <option value="Designer">Designer</option>
//                         </select>
//                     </div>
//                     <div className="search-add-group">
//                         <input 
//                             type="text" 
//                             placeholder="Search" 
//                             className="search" 
//                             name="search" 
//                             onChange={handleFilterChange} 
//                         />
//                         <button className="add-candidate-btn" onClick={() => setShowPopup(true)}>Add Candidate</button>
//                     </div>
//                     {showPopup && <AddCandidate onClose={() => setShowPopup(false)} />}
//                 </div>
//             </div>

//             <div className="candidates-table">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Candidates Name</th>
//                             <th>Email Address</th>
//                             <th>Phone Number</th>
//                             <th>Position</th>
//                             <th>Status</th>
//                             <th>Experience</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {candidates.length > 0 ? (
//                             candidates.map((candidate, index) => (
//                                 <tr key={candidate._id}>
//                                     <td>{index + 1}</td>
//                                     <td>{candidate.name}</td>
//                                     <td>{candidate.email}</td>
//                                     <td>{candidate.phone}</td>
//                                     <td>{candidate.position}</td>
//                                     <td>
//                                         <select className='status-dropdowns' value={candidate.status} onChange={(e) => handleStatusChange(candidate._id, e.target.value)}>
//                                             <option value="New">New</option>
//                                             <option value="Scheduled">Scheduled</option>
//                                             <option value="Ongoing">Ongoing</option>
//                                             <option value="Selected">Selected</option>
//                                             <option value="Rejected">Rejected</option>
//                                         </select>
//                                     </td>
//                                     <td>{candidate.experience} years</td>
//                                     <td className="action-cell">
//                                         <button className="menu-btn" onClick={() => setMenuOpen(menuOpen === index ? null : index)}>
//                                             <FiMoreVertical />
//                                         </button>
//                                         {menuOpen === index && (
//                                             <div className="dropdown-menu">
//                                                 <button className="action-btn">Edit</button>
//                                                 <button className="action-btn delete">Delete</button>
//                                             </div>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="8" style={{ textAlign: 'center' }}>No candidates found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Candidates;
import React, { useState, useEffect } from 'react';
import '../Candidate/Candidate.css';
import { FiMoreVertical } from 'react-icons/fi';
import AddCandidate from '../../components/popupmodels/AddCandidate.jsx';
import axios from 'axios';

const Candidates = () => {
    const [menuOpen, setMenuOpen] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [filters, setFilters] = useState({ status: '', position: '', search: '' });

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:4000/candidate/searchfilter', { params: filters });
                setCandidates(response.data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };
        fetchCandidates();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:4000/candidate/update/${id}`, { status: newStatus });
            setCandidates((prevCandidates) =>
                prevCandidates.map((candidate) =>
                    candidate._id === id ? { ...candidate, status: newStatus } : candidate
                )
            );

            if (newStatus === "Selected") {
                const response = await axios.post(`http://localhost:4000/employee/candidatetoemployee/${id}`);
                console.log(response.data);

                if (response.status === 200) {
                    alert("Candidate successfully converted to an Employee!");
                }
            }
        } catch (error) {
            console.error("Error updating status or converting candidate:", error);
            alert(error.response?.data?.message || "Something went wrong.");
        }
    };

    const deleteCandidate = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/candidate/delete/${id}`);
            setCandidates((prevCandidates) => prevCandidates.filter(candidate => candidate._id !== id));
            alert("Candidate deleted successfully");
        } catch (error) {
            console.error("Error deleting candidate:", error);
            alert(error.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="candidates">
            <div className="candidates-header">
                <div className="controls">
                    <div className="filter-group">
                        <select name="status" className="status-dropdown" onChange={handleFilterChange}>
                            <option value="">Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <select name="position" className="position-dropdown" onChange={handleFilterChange}>
                            <option value="">Position</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                        </select>
                    </div>
                    <div className="search-add-group">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="search" 
                            name="search" 
                            onChange={handleFilterChange} 
                        />
                        <button className="add-candidate-btn" onClick={() => setShowPopup(true)}>Add Candidate</button>
                    </div>
                    {showPopup && <AddCandidate onClose={() => setShowPopup(false)} />}
                </div>
            </div>

            <div className="candidates-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
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
                        {candidates.length > 0 ? (
                            candidates.map((candidate, index) => (
                                <tr key={candidate._id}>
                                    <td>{index + 1}</td>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.email}</td>
                                    <td>{candidate.phone}</td>
                                    <td>{candidate.position}</td>
                                    <td>
                                        <select className='status-dropdowns' value={candidate.status} onChange={(e) => handleStatusChange(candidate._id, e.target.value)}>
                                            <option value="New">New</option>
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Selected">Selected</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td>{candidate.experience} years</td>
                                    <td className="action-cell">
                                        <button className="menu-btn" onClick={() => setMenuOpen(menuOpen === index ? null : index)}>
                                            <FiMoreVertical />
                                        </button>
                                        {menuOpen === index && (
                                            <div className="dropdown-menu">
                                                <button className="action-btn">
                                                    
                                                <a href={candidate.resume} target="_blank" rel="noopener noreferrer" downloadstyle={{ textDecoration: 'none', color: 'inherit' }}> Download Resume</a></button>
                                                <button className="action-btn delete" onClick={() => deleteCandidate(candidate._id)}>Delete</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center' }}>No candidates found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Candidates;

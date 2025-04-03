import React from "react";
import Calendar from "react-calendar"; // Ensure you install: npm install react-calendar
import "react-calendar/dist/Calendar.css";
import '../Leaves/Leaves.css'
import {useState,useEffect} from 'react';
import AddLeave from "../../components/popupmodels/AddLeave";
const Leaves = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [showPopup, setShowPopup] = useState(false);
  const [date,setDate]=useState(new Date().toISOString().split("T")[0]);
  console.log("date is p :",date);
  const [status,setStatus]=useState('');
  const [leaves,setLeaves]=useState();
  const [search,setSearch]=useState('');
   useEffect(()=>{
  const fetchleaves=async()=>{
    try {
      console.log("status is :",status);
      console.log("date  is :",date);
         const response = await fetch(`${apiUrl}/leave/leavefilter?Status=${status}&&date=${date}&&search=${search}`,{
          method:'GET',
         })
  
         const data= await response.json();
         if(!response.ok){
          alert(data.message);
          setLeaves('');
          throw new Error('Failed to fetch data')
         }
         console.log("data us :",data);
        setLeaves(data);
         console.log(data);
       
    } catch (error) {
      console.error(`error in detching leaves :${error}`);
    }
  }
  fetchleaves();
   },[status,date,showPopup]);
   const handleStatusChange=async(leaveId, status)=>{
     console.log("leaveId",leaveId);
     console.log("status",status);
     const response=await fetch(`${apiUrl}/leave/leavestatus/${leaveId}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json',
        },
        body:JSON.stringify({status:status})
     });
     const data =await response.json();
     if(!response.ok){
      alert(data.message);
      throw new Error('Failed to update status')
     }
     alert(data.message);
     setLeaves((preleaves)=>
    preleaves.map((leave)=>leave._id===leaveId?{...leave,status:status}:leave));
   }
  return (
    <div className="leaves">
      {/* Header */}
      <div className="leaves-header">
        <div className="filter-group">
          <select className="status-dropdown" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value=''>Status</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>

          </select>
        </div>
        <div className="search-add-group">
          <input type="text" placeholder="Search"  className="search" />
          <button className="add-leave-btn" onClick={()=>setShowPopup(true)}>Add Leave</button>
        </div>
      </div>
        {showPopup && <AddLeave onClose={()=>setShowPopup(false)}/>}
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
              {leaves&& leaves.length>0?(
                 leaves.map((leave, index) => (
                <tr key={index}>
                <td>
                  <img src={leave.employee.profile} alt="Profile" className="profile-pic" />
                </td>
                <td>{leave.employee.name}</td>
                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td>{leave.reason}</td>
                {/* <td>
                  <span className="status approved">Approved</span>
                </td> */}
                <td>
                  <select className={`status-dropdowns ${leave.status}`} value={leave.status} onChange={(e) => handleStatusChange(leave._id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    </select>
                                    </td>
                <td>
                <a href={leave.document} target="_blank" rel="noopener noreferrer" className="doc-btn">View</a>
                </td>
              </tr>))):(<tr>
        <td colSpan="2" style={{ textAlign: "center" }}>No leaves found</td> 
      </tr>)}
              
            </tbody>
          </table>
        </div>

        {/* Right Side - Calendar */}
        <div className="leaves-calendar">
          <h3>Leave Calendar</h3>
          {/* <Calendar onChange={(selectedDate)=>setDate(new Date(selectedDate).toISOString().split("T")[0])}/> */}
          <Calendar 
  onChange={(selectedDate) => {
    const utcDate = new Date(selectedDate);
    utcDate.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC
    setDate(utcDate.toISOString().split("T")[0]); // Store in YYYY-MM-DD format
  }} 
/>
          <h4>Approved Leaves</h4>
          {leaves&&leaves.length>0?(
            leaves.filter((leave)=>leave.status==="Approved")
            .map((leave,index)=>(
              <div key={index} className="approved-leaves">
                <img src={leave.employee.profile} alt="Profile" className="profile-pic" />
                <p>{leave.employee.name}      -     {new Date(leave.startDate).toLocaleDateString()}</p>
              </div>))
            ):(
            <p>No approved leaves</p>
          )}
      
        </div>
      </div>
    </div>
  );
};

export default Leaves;

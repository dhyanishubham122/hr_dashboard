import { React, useContext, useEffect, useState } from 'react';
import { FaUsers, FaUserClock, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { BsBarChartFill } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import '../partial/navigation.css'
import { AuthContext } from '../../context/AuthContext.jsx';

import { useRef } from 'react';

const Sidebar = ({ setShowLogoutModal }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar
  const { logout } = useContext(AuthContext);
  const sidebarRef =useRef(null);
  function handleClickOutside(event){
    if(sidebarRef.current && !sidebarRef.current.contains(event.target)){
      setIsSidebarOpen(false);
  }}
  useEffect(()=>{
   
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FaBars />
      </div>
      
      {/* Sidebar */}
      <div  ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>

        <div className="logo"  style={{ marginLeft: window.innerWidth <= 768 ? '70px' : '0' }}>LOGO</div>
        
        <div className="search-container">
          <IoSearch className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        
        {/* Recruitment Section */}
        <div className="simple-text">Recruitment</div>
        <div className="menu-item purple" onClick={() => navigate('/candidates')}>
          <FaUsers className="icon" />
          <span>Candidates</span>
        </div>

        {/* Organization Section */}
        <div className="simple-text">Organization</div>
        <div className="menu-item purple" onClick={() => navigate('/employees')}>
          <FaUserClock className="icon" />
          <span>Employees</span>
        </div>
        <div className="menu-item purple" onClick={() => navigate('/attendance')}>
          <BsBarChartFill className="icon" />
          <span>Attendance</span>
        </div>
        <div className="menu-item purple" onClick={() => navigate('/leaves')}>
          <HiOutlineSparkles className="icon" />
          <span>Leaves</span>
        </div>
        
        {/* Others Section */}
        <div className="simple-text">Others</div>
        <div className="menu-item purple" onClick={() => setShowLogoutModal(true)}>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </div>
        
        {/* {showLogoutModal && (
          <Logout onCancel={() => setShowLogoutModal(false)} onLogout={handleLogout} />
        )} */}
      </div>
    </>
  );
};

export default Sidebar;

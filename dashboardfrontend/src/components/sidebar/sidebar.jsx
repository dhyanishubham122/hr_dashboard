import {React,useState} from 'react';
import { FaUsers, FaUserClock, FaSignOutAlt } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { BsBarChartFill } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Logout from '../../pages/Logout/Logout.jsx'
const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
    // Your logout logic here
      navigate('/login')
    setShowLogoutModal(false);
  };
  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>

      <div className="search-container">
        <IoSearch className="search-icon" />
        <input type="text" placeholder="Search" className="search-input" />
      </div>

      {/* Recruitment Section */}
      <div className="simple-text">Recruitment</div>
      <div className="menu-item purple">
        <FaUsers className="icon" />
        <span onClick={()=>navigate('/candidates')}>Candidates</span>
      </div>

      {/* Organization Section */}
      <div className="simple-text">Organization</div>
      <div className="menu-item purple">
        <FaUserClock className="icon" />
        <span onClick={()=>navigate('/employees')}>Employees</span>
      </div>
      <div className="menu-item purple">
      <BsBarChartFill className="icon"/>

        <span onClick={()=>navigate('/attendance')}>Attendance</span>
      </div>
      <div className="menu-item purple">
      <HiOutlineSparkles className="icon"/>
        <span onClick={()=>navigate('/leaves')}>Leaves</span>
      </div>

      {/* Others Section */}
      <div className="simple-text">Others</div>
      <div className="menu-item purple" onClick={() => setShowLogoutModal(true)}>
      <FaSignOutAlt className="icon" />
      <span>Logout</span>   
         </div>
         {showLogoutModal && (
        <Logout 
          onCancel={() => setShowLogoutModal(false)} 
          onLogout={handleLogout} 
        />
      )}
   
      
      
    </div>
  );
};

export default Sidebar;

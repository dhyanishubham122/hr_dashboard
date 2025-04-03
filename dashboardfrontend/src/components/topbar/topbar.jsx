import React from 'react';
import { FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import '../topbar/Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
      
      </div>
      <div className="topbar-right">
        <div className="icon-container">
          <FaBell className="icon" />
          <FaEnvelope className="icon" />
          <FaUserCircle className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
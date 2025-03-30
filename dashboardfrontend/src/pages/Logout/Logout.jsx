import React from 'react';
import './Logout.css';

const Logout = ({ onCancel, onLogout }) => {

  
  return (
    <div className="logout-modal">
    <div className="logout-content">
      <div className="logout-header">Log Out</div>
      <p className="logout-text">Are you sure you want to log out?</p>
      <div className="logout-actions">
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  </div>
  );
};

export default Logout;
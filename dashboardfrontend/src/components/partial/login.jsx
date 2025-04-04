import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PiEyeBold } from "react-icons/pi";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { AuthContext } from '../context/AuthContext.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [message,setMessage]=useState('');
  const navigate=useNavigate();
  const {login} =useContext(AuthContext);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response= await fetch(`${apiUrl}/user/login`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({email,password})
    });
    const data=await response.json();

    if(!response.ok){
      // console.log(message);
      setMessage(data.message);
      throw new Error('faied to login');
    }
    alert(data.message);
    login(data.accessToken);
    setEmail('');
    setPassword('');
    navigate('/candidates');
  }
  return (
    <div className="main-container">
      <div className="logo">LOGO</div>
      <div className="box">
        {/* Left Section */}
        <div className="left-section">
        <div className="dashboard-image">
            <div className="image-placeholder">
              <img src='/dashboardpreview.jpg' alt='dashboard-preview'/>
              </div>
          </div>
          <div className="text-content">
            <h2>Manage Your Employee Records</h2>
              <p> 
                Simplify employee management, track attendance, and handle leave requests  
                  effortlessly—all in one place. Stay organized and boost productivity with our HRMS.
              </p>
          </div>

          <div className="dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <h2>Welcome to Dashboard</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group-signup">
              <label htmlFor="email">EMAIL ADDRESS*</label>
              <input type="email" id="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="form-group-signup">
              <label htmlFor="password">PASSWORD*</label>
              <div className="password-input">
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <span className="eye-icon"><PiEyeBold /></span>
              </div>
            </div>
            <button type="submit" className="register-btn">LOGIN</button>
          </form>
          <p style={{ paddingLeft:'24px', marginTop:'10px',  color:'red'}}>{message}</p>
          <p className="toggle-link">
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
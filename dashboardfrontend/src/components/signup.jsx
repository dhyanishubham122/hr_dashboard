import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiEyeBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmpassword,setConfirmPassword]=useState('');
  const api_url = import.meta.env.VITE_API_URI;
  const navigate=useNavigate();
 const handleformsubmit=async(e)=>{
  e.preventDefault();
  if(password!==confirmpassword){
    alert("Passwords don't match");
    }
      try {
        const response=await fetch(`http://localhost:4000/user/signup`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            },
            body:JSON.stringify({name,email,password,confirmpassword})
            });
            console.log("respone is :",response)
            if(!response.ok){
              alert("Failed to create account");
            }
            const data=await response.json();
            console.log(data);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            navigate('/login');
      } catch (error) {
        console.log(error);
      }
 }

  return (
    <div className="main-container">
      <div className="logo">LOGO</div>
      <div className="box">
        <div className="left-section">
          <div className="dashboard-image">
            <div className="image-placeholder">Dashboard Preview</div>
          </div>
          <div className="text-content">
            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
            <p>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
          <form onSubmit={handleformsubmit}>
            <div className="form-group-signup">
              <label htmlFor="fullName">FULL NAME*</label>
              <input type="text" id="fullName" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} required />
            </div>
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
            <div className="form-group-signup">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD*</label>
              <div className="password-input">
                <input type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
                <span className="eye-icon"><PiEyeBold /></span>
              </div>
            </div>
            <button type="submit" className="register-btn">REGISTER</button>
          </form>
          <p className="toggle-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiEyeBold,PiEyeSlash } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmpassword,setConfirmPassword]=useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
 const handleformsubmit=async(e)=>{
  e.preventDefault();
  if(password!==confirmpassword){
    alert("Passwords don't match");
    }
      try {
        const response=await fetch(`${apiUrl}/user/signup`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            },
            body:JSON.stringify({name,email,password,confirmpassword})
            });
            console.log("respone is :",response)
            const data=await response.json();

            if(!response.ok){
              alert(data.message);
            }
            console.log(data);
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            alert(data.message);
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
            <div className="image-placeholder">
              <img src='/dashboardpreview.jpg'  alt='dashboard-preview'/>
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
                  <input type={showPassword ? "text" : "password"} id="password"placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                  <span className="eye-icon" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                    {showPassword ? <PiEyeSlash /> : <PiEyeBold />}
                  </span>
                </div>
              </div>
            <div className="form-group-signup">
                <label htmlFor="confirmPassword">CONFIRM PASSWORD*</label>
                <div className="password-input">
                  <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="Confirm Password"  value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                  <span className="eye-icon" onClick={() => setShowConfirmPassword((prev) => !prev)} style={{ cursor: "pointer" }}>
                    {showConfirmPassword ? <PiEyeSlash /> : <PiEyeBold />}
                  </span>
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
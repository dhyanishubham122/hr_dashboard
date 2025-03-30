import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/signup.jsx';
import Login from './components/login.jsx';
import Candidates from './pages/Candidate/Candidate.jsx'
import Sidebar from './components/sidebar/sidebar.jsx';
import Topbar from './components/topbar/topbar.jsx';
import './App.css';
import Employees from './pages/Employee/Employee.jsx';
import Attendance from './pages/Attendence/Attendence.jsx'
import Leave from './pages/Leaves/Leaves.jsx';  
import Logout from './pages/Logout/Logout.jsx';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Navigate to="/signup" />} />

      <Route element={<Layout />}>
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leaves" element={<Leave />} />
      </Route>
    </Routes>
  </Router>
  );
}
const Layout = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <Routes>
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leaves" element={<Leave />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
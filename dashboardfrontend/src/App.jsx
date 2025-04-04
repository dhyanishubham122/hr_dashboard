import React,{useState,useContext} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/partial/login.jsx'
import Signup from './components/partial/signup.jsx'
import Candidates from './pages/Candidate.jsx'
import Sidebar from './components/partial/sidebar.jsx';
import Topbar from './components/partial/topbar.jsx';
import './App.css';
import Employees from './pages/Employee.jsx';
import Attendance from './pages/Attendence.jsx'
import Leave from './pages/Leaves.jsx';  
import Logout from './pages/Logout.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import { AuthContext } from './context/AuthContext.jsx';
function App() {

  
  return (
 
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Navigate to="/signup" />} />

      <Route path="/*" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
      </Route>
    </Routes>

  );
}
const Layout = () => {
  const { logout } = useContext(AuthContext);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };
  return (
    <div className="app">
      
      <div className="main-content">
      <Sidebar setShowLogoutModal={setShowLogoutModal} />
        <Topbar />
        <Routes>
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leaves" element={<Leave />} />
        </Routes>
      </div>
       {/* Render Logout Modal at the top level */}
       {showLogoutModal && (
        <Logout 
          onCancel={() => setShowLogoutModal(false)} 
          onLogout={() => {
            console.log("Logging out...");
            handleLogout();
          }} 
        />
      )}
    </div>
  );
};

export default App;
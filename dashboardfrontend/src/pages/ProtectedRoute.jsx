import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      setMessage("To access this you have to login first. Redirecting to login...");
      setIsTokenValid(false);
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        setMessage("Your session has expired. Please log in again.");
        setIsTokenValid(false);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setIsTokenValid(true);
      }
    } catch (error) {
      console.error("Error decoding token:", error.message);
      setMessage("Invalid token. Redirecting to login...");
      setIsTokenValid(false);
      setTimeout(() => navigate("/login"), 3000);
    }
  }, [user, navigate]); // `user` ensures re-run on login/logout

  if (!isTokenValid && message) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh" }}>
        <h3 style={{ color: "red" }}>{message}</h3>
      </div>
    );
  }

  return isTokenValid ? children : null;
};

export default ProtectedRoute;

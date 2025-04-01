import React from "react";
import { useEffect,useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext =createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const login=(userdata)=>{
        console.log("userdata in authcontect is:",userdata);
        setUser(userdata);
        localStorage.setItem("user",JSON.stringify(userdata));
    };
    const logout =()=>{
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    }
    const initializeAuth=()=>{
       try {
         const storedUser=localStorage.getItem("user");
         if(storedUser){
             setUser(JSON.parse(storedUser));
             }
       } catch (error) {
        console.error("Failed to initialize authentication:", error);
       }
       finally{
        setLoading(false);
       }         
    };
    useEffect(() => {
        initializeAuth();
        }, []);
        return (
            <AuthContext.Provider value={{ user, login, logout, initializeAuth,loading }}>
                {children}
            </AuthContext.Provider>
            );

}
export default AuthProvider;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav>
      <h1>My App</h1>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;

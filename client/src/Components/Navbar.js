import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4 top-0 w-full shadow-md">
      <div className="max-w-6xl mx-auto flex items-center">

        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold text-white">
            <img src="/FR_logo_transparent.png" alt="FryReads Logo" className="h-20 w-auto" />
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex justify-center">
          <button
            onClick={() => navigate("/search")}
            className="text-lg font-semibold hover:text-gray-300 transition"
          >
            Search
          </button>
        </div>

        {/* Right: Nav Links */}
        <div className="flex-1 flex justify-end items-center space-x-6 text-lg font-semibold">
          <Link to="/" className="hover:text-gray-300">Home</Link>

          {isAuthenticated && (
            <Link to="/profile" className="hover:text-gray-300 transition">Profile</Link>
          )}

          <Link to="/info" className="hover:text-gray-300">Info</Link>

          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-[#2ac9ff] px-5 py-2 rounded-lg transition hover:shadow-lg hover:shadow-[0_0_10px_#2ac9ff]"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#2ac9ff] px-5 py-2 rounded-lg transition hover:shadow-lg hover:shadow-[0_0_10px_#2ac9ff]"
            >
              Login
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;





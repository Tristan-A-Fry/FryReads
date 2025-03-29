import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4 top-0 w-full shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* App Name / Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          <img src="/FR_logo_transparent.png" alt="FryReads Logo" className="h-20 w-auto" />
        </Link>



        {/* Center Navigation Links*/}
        <nav>
        <div className="flex-1 flex justify-center text-lg font-semibold">
          <button
            onClick={() => {
              navigate("/search");

            }}
            className="hover:text-gray-300 transition"
          >
            Search
          </button>
        </div>
        </nav>

        {/* Right Side Navigation Links */}
        <div className="space-x-12 text-lg font-semibold">
          <Link to="/" className="hover:text-gray-300">Home</Link>

          {isAuthenticated && (
            <Link
              to="/profile"
              className="hover:text-gray-300 transition"
            >
              Profile
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-[#2ac9ff] px-5 py-2 rounded-lg transition hover:bg-[#2ac9ff] hover:shadow-lg hover:shadow-[0_0_10px_#2ac9ff]"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#2ac9ff] px-5 py-2 rounded-lg transition hover:bg-[#2ac9ff] hover:shadow-lg hover:shadow-[0_0_10px_#2ac9ff]"
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





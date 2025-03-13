

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use AuthContext login function

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL;
    // const apiUrl = "https://fryreads-api-eyfpafgvenetcxgn.centralus-01.azurewebsites.net";
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      login(data.token); // Use AuthContext login function
      navigate("/"); // Redirect to home page after login
    } else {
      alert("Login failed: " + data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button
            //TODO : Change styling of logout button to match login button
            type="submit"
            className="w-full bg-[#2ac9ff] hover:bg-[#4494c0] text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-blue-400 hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="text-center mt-2 text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

 


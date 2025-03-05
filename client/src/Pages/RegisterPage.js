
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:5186/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("Registration successful! Please log in.");
      navigate("/login");
    } else {
      const data = await response.json();
      alert("Registration failed: " + data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded mb-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
        <p className="mt-2">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;

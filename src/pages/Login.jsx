import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://quiz-backend-w5cm.onrender.com/api/auth/login",
        { email, password }
      );

      // Save token & user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Update currentUser in App.jsx
      if (setCurrentUser) setCurrentUser(res.data.user);

      setIsSuccess(true);
setMessage("Login Successful ✅");

navigate("/home");


    } catch (err) {
      setIsSuccess(false);
      setMessage("Invalid email or password ❌");
    }
  };

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar showAuth />

      <div className="flex items-center justify-center py-20 px-6">
        <div className="glass-card p-10 rounded-3xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">
            Login to Continue
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none"
            />

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="rounded-xl h-12 bg-gradient-to-r from-primary to-accent-purple font-bold mt-2 hover:opacity-90 transition"
            >
              Login
            </button>

            {message && (
              <p
                className={`text-center mt-3 font-medium ${
                  isSuccess ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <p className="text-sm text-center text-white/50 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

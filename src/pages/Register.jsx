import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "https://quiz-backend-w5cm.onrender.com/api/auth/register",
        { name, email, password }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      alert("Registration successful!");
      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] to-[#050614] text-white flex flex-col">
      
      {/* ✅ SAME HEADER AS LANDING */}
      <Navbar showAuth />

      {/* Register Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

          <div className="flex flex-col items-center mb-6">
  <h2 className="text-2xl font-bold">Create your account</h2>
  <p className="text-white/50 text-sm mt-1">
    Sign up to join the Quiz Master community.
  </p>
</div>

          <form onSubmit={handleRegister}>

            <label className="text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="text-sm mb-1 block">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="text-sm mb-1 block">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full mb-6 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold mb-4"
            >
              Register
            </button>

          </form>

          <p className="text-white/50 text-sm mt-6">
            Already registered?{" "}
            <Link to="/login" className="text-blue-500 font-semibold">
              Login here
            </Link>
          </p>

        </div>
      </div>

      <footer className="text-center text-white/30 text-xs py-4 border-t border-white/10">
        © 2024 Quiz Master Platform. Designed for Excellence.
      </footer>
    </div>
  );
}

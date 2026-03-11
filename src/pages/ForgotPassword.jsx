import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email })

      ;

      alert("Password reset link sent to your email.");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] to-[#050614] text-white flex flex-col">

      {/* SAME HEADER AS LANDING */}
      <header className="flex items-center justify-between px-10 py-5 border-b border-white/10">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-blue-500">⬤</span> Quiz Master
        </h1>
        <nav className="flex items-center gap-8 text-sm text-white/70">
          <Link to="/">Home</Link>
          <Link to="/quizzes">Quizzes</Link>
          <Link to="/results">Results</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header> 

      {/* FORM */}
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleForgotPassword}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold">Forgot Password</h2>
            <p className="text-white/50 text-sm mt-1 text-center">
              Enter your registered email to receive a reset link.
            </p>
          </div>

          <label className="text-sm mb-1 block">Email address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mb-6 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold mb-4"
          >
            Send Reset Link
          </button>

          <p className="text-white/50 text-sm text-center">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-500 font-semibold">
              Back to Login
            </Link>
          </p>
        </form>
      </div>

      <footer className="text-center text-white/30 text-xs py-4 border-t border-white/10">
        © 2024 Quiz Master Platform. Designed for Excellence.
      </footer>
    </div>
  );
}

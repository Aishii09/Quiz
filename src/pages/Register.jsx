import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] to-[#050614] text-white flex flex-col">
      
      {/* Navbar */}
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

      {/* Register Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
              🛡️
            </div>
            <h2 className="text-2xl font-bold">Create your account</h2>
            <p className="text-white/50 text-sm mt-1">
              Sign up to join the Quiz Master community.
            </p>
          </div>

          {/* Name */}
          <label className="text-sm mb-1 block">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
          />

          {/* Email */}
          <label className="text-sm mb-1 block">Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
          />

          {/* Password */}
          <label className="text-sm mb-1 block">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
          />

          {/* Confirm Password */}
          <label className="text-sm mb-1 block">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full mb-6 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
          />

          {/* Register Button */}
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold mb-4">
            Register
          </button>

          {/* Divider */}
          <div className="text-center text-white/40 text-xs mb-4">
            OR CONTINUE WITH
          </div>

          {/* OAuth */}
          <div className="flex gap-4">
            <button className="flex-1 py-3 rounded-lg border border-white/10">
              Google
            </button>
            <button className="flex-1 py-3 rounded-lg border border-white/10">
              GitHub
            </button>
          </div>

          {/* Login */}
          <p className="text-white/50 text-sm mt-6">
            Already registered?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white/30 text-xs py-4 border-t border-white/10">
        © 2024 Quiz Master Platform. Designed for Excellence.
      </footer>
    </div>
  );
}

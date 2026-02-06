import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  githubProvider,
  signInWithPopup,
} from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  // ✅ AFTER LOGIN SUCCESS (COMMON FUNCTION)
  const saveUserAndRedirect = (user) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.displayName || "User",
        email: user.email,
        avatar: user.photoURL || "https://i.pravatar.cc/150",
      })
    );

    navigate("/home");
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      saveUserAndRedirect(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ GITHUB LOGIN
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      saveUserAndRedirect(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ NORMAL LOGIN (DUMMY FOR NOW)
  const handleLogin = (e) => {
    e.preventDefault();

    // ⚠️ Replace with real auth later
    saveUserAndRedirect({
      displayName: "Aishi",
      email: "aishi@example.com",
      photoURL: "https://i.pravatar.cc/150?img=5",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] to-[#050614] text-white flex flex-col">
      
      {/* HEADER (ONLY FOR LANDING / LOGIN) */}
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

      {/* LOGIN CARD */}
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
              🛡️
            </div>
            <h2 className="text-2xl font-bold">Quiz Master</h2>
            <p className="text-white/50 text-sm mt-1">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          {/* EMAIL */}
          <label className="text-sm mb-1 block">Email address</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
          />

          {/* PASSWORD */}
          <div className="flex justify-between items-center">
            <label className="text-sm mb-1 block">Password</label>
            <Link className="text-blue-500 text-xs" to="/forgot-password">
              Forgot?
            </Link>
          </div>
          <input
            type="password"
            required
            placeholder="Enter your password"
            className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 outline-none focus:border-blue-500"
          />

          {/* REMEMBER */}
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <input type="checkbox" />
            Remember me for 30 days
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold mb-4"
          >
            Login
          </button>

          {/* DIVIDER */}
          <div className="text-center text-white/40 text-xs mb-4">
            OR CONTINUE WITH
          </div>

          {/* OAUTH */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex-1 py-3 rounded-lg border border-white/10"
            >
              Google
            </button>

            <button
              type="button"
              onClick={handleGithubLogin}
              className="flex-1 py-3 rounded-lg border border-white/10"
            >
              GitHub
            </button>
          </div>

          {/* REGISTER */}
          <p className="text-white/50 text-sm mt-6 text-center">
            Not registered yet?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Join the competition
            </Link>
          </p>
        </form>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-white/30 text-xs py-4 border-t border-white/10">
        © 2024 Quiz Master Platform. Designed for Excellence.
      </footer>
    </div>
  );
}

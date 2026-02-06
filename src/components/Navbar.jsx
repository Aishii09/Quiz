import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar({ showAuth = false }) {
  const location = useLocation();

  // ❌ hide profile ONLY on landing page
  const isLandingPage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 px-6 md:px-20 py-4 backdrop-blur-md bg-background-dark/80">

      {/* LOGO */}
      <Link to="/" className="flex items-center gap-3">
        <div className="size-8 bg-gradient-to-br from-primary to-accent-purple rounded-lg flex items-center justify-center">
          🚀
        </div>
        <h2 className="text-white text-xl font-bold">
          Quiz Master
        </h2>
      </Link>

      {/* NAV LINKS */}
      <div className="hidden md:flex items-center gap-10">
        <nav className="flex gap-8">
          <NavLink to="/home" className="nav-link">Home</NavLink>
          <NavLink to="/quizzes" className="nav-link">Quizzes</NavLink>
          <NavLink to="/results" className="nav-link">Results</NavLink>
          <NavLink to="/leaderboard" className="nav-link">Leaderboard</NavLink>

          {/* ✅ SHOW PROFILE ON EVERY PAGE EXCEPT LANDING */}
          {!isLandingPage && (
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          )}
        </nav>

        {/* ✅ Login / Register ONLY on landing page */}
        {showAuth && isLandingPage && (
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-white/70 hover:text-white text-sm">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

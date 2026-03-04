import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ showAuth = false }) {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  // ✅ Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 px-6 md:px-20 py-4 backdrop-blur-md bg-background-dark/80">

      {/* LOGO LEFT */}
      <Link to="/" className="flex items-center gap-3">
        <div className="size-8 bg-gradient-to-br from-primary to-accent-purple rounded-lg flex items-center justify-center">
          🚀
        </div>
        <h2 className="text-white text-xl font-bold">
          Quiz Master
        </h2>
      </Link>

      {/* RIGHT SIDE (NAV + AUTH) */}
      <div className="flex items-center gap-8">

        {/* ✅ Mobile Hamburger Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* NAV LINKS */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 right-6 md:right-0 bg-background-dark md:bg-transparent p-6 md:p-0 rounded-xl md:rounded-none gap-6 md:gap-8`}
        >
          <NavLink to="/home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/quizzes" className="nav-link" onClick={() => setMenuOpen(false)}>Quizzes</NavLink>
          <NavLink to="/results" className="nav-link" onClick={() => setMenuOpen(false)}>Results</NavLink>
          <NavLink to="/leaderboard" className="nav-link" onClick={() => setMenuOpen(false)}>Leaderboard</NavLink>

          {!isLandingPage && (
            <NavLink to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
              Profile
            </NavLink>
          )}

          {/* ✅ Login / Register for Mobile */}
          {showAuth && isLandingPage && (
            <div className="flex flex-col md:hidden gap-4">
              <Link
                to="/login"
                className="text-white/70 hover:text-white text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* ✅ Desktop Login / Register */}
        {showAuth && isLandingPage && (
          <div className="hidden md:flex items-center gap-6">
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

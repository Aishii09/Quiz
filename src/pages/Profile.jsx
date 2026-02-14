import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);

  // Fetch user info and activity from localStorage/backend
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchUserActivity(storedUser.email);
    } else {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  const fetchUserActivity = async (email) => {
    try {
      const res = await axios.get(
        `https://quiz-backend-w5cm.onrender.com/api/attempt/activity/${email}`
      );
      setActivity(res.data.activities || []);
    } catch (err) {
      console.error("Failed to fetch activity:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (!user) return null; // loading state

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      {/* Navbar */}
      <Navbar showAuth />

      {/* PROFILE HEADER */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* AVATAR */}
            <div className="size-32 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-5xl font-black">
              {user.name.charAt(0)}
            </div>

            {/* USER INFO */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black">{user.name}</h1>
              <p className="text-white/50">{user.email}</p>
              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-primary/20 text-primary font-bold text-sm">
                Preparing for {user.exam || "Your Exam"}
              </span>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="border border-red-500/40 text-red-400 px-6 py-3 rounded-xl font-bold hover:bg-red-500/10 transition"
          >
            Logout
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-[1000px] mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Global Rank" value={`#${user.rank || "-"}`} />
          <StatCard title="Accuracy" value={user.accuracy || "-"} />
          <StatCard title="Tests Taken" value={user.totalTests || 0} />
          <StatCard title="Bookmarks" value={user.bookmarked || 0} />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="max-w-[1000px] mx-auto px-6 mb-24">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/results"
            className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition block"
          >
            <span className="material-symbols-outlined text-primary text-3xl mb-4 block">
              insights
            </span>
            <p className="font-bold text-lg">View Results</p>
            <p className="text-sm text-white/50">Analyze your performance</p>
          </Link>

          <Link
            to="/bookmarks"
            className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition block"
          >
            <span className="material-symbols-outlined text-blue-400 text-3xl mb-4 block">
              bookmark
            </span>
            <p className="font-bold text-lg">Bookmarks</p>
            <p className="text-sm text-white/50">Revise saved questions</p>
          </Link>

          <Link
            to="/leaderboard"
            className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition block"
          >
            <span className="material-symbols-outlined text-accent-purple text-3xl mb-4 block">
              trophy
            </span>
            <p className="font-bold text-lg">Leaderboard</p>
            <p className="text-sm text-white/50">See where you stand</p>
          </Link>
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section className="max-w-[1000px] mx-auto px-6 mb-24">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-6">
          Recent Activity
        </h3>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          {activity.length > 0 ? (
            activity.map((act, index) => (
              <Activity key={index} text={act.text} time={act.time} />
            ))
          ) : (
            <p className="text-white/50 text-sm">No recent activity yet.</p>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-white/40">
        © 2024 Quiz Master. All rights reserved.
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */
function StatCard({ title, value }) {
  return (
    <div className="glass-card p-6 rounded-2xl text-center">
      <p className="text-white/50 text-sm mb-2">{title}</p>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
}

function Activity({ text, time }) {
  return (
    <div className="flex justify-between text-sm">
      <p>{text}</p>
      <span className="text-white/40">{time}</span>
    </div>
  );
}

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [totalBookmarks, setTotalBookmarks] = useState(0);

  const user = {
    name: "Aishi",
    email: "aishi@gmail.com",
    exam: "NEET",
  };

  /* ================= LOAD DATA FUNCTION ================= */
  const loadProfileData = () => {
    // Load quiz results
    const savedResults =
      JSON.parse(localStorage.getItem("quiz_results")) || [];
    setResults(savedResults);

    // Count all bookmarks_* keys
    let bookmarkCount = 0;

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("bookmarks_")) {
        const items = JSON.parse(localStorage.getItem(key)) || [];
        bookmarkCount += items.length;
      }
    });

    setTotalBookmarks(bookmarkCount);
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    loadProfileData();

    // Refresh when returning to page
    window.addEventListener("focus", loadProfileData);

    return () => {
      window.removeEventListener("focus", loadProfileData);
    };
  }, []);

  /* ================= CALCULATIONS ================= */
  const totalTests = results.length;

  const averageAccuracy =
    totalTests > 0
      ? (
          results.reduce((acc, r) => acc + Number(r.percentage), 0) /
          totalTests
        ).toFixed(0)
      : 0;

  const latestScore =
    results.length > 0
      ? `${results[results.length - 1].score}/${
          results[results.length - 1].total
        }`
      : "-";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar showAuth />

      {/* ================= PROFILE HEADER ================= */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="size-32 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-5xl font-black">
              {user.name.charAt(0)}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black">{user.name}</h1>
              <p className="text-white/50">{user.email}</p>
              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-primary/20 text-primary font-bold text-sm">
                Preparing for {user.exam}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="border border-red-500/40 text-red-400 px-6 py-3 rounded-xl font-bold hover:bg-red-500/10 transition"
          >
            Logout
          </button>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="max-w-[1000px] mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Tests Taken" value={totalTests} />
          <StatCard title="Average Accuracy" value={`${averageAccuracy}%`} />
          <StatCard title="Bookmarks" value={totalBookmarks} />
          <StatCard title="Latest Score" value={latestScore} />
        </div>
      </section>

      {/* ================= QUICK ACTIONS ================= */}
      <section className="max-w-[1000px] mx-auto px-6 mb-24">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-6">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/results"
            className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition block"
          >
            <p className="font-bold text-lg">View Results</p>
            <p className="text-sm text-white/50">
              Analyze your performance
            </p>
          </Link>

          <Link
            to="/bookmarks"
            className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition block"
          >
            <p className="font-bold text-lg">Bookmarks</p>
            <p className="text-sm text-white/50">
              Revise saved questions
            </p>
          </Link>
        </div>
      </section>

      {/* ================= RECENT RESULTS ================= */}
      <section className="max-w-[1000px] mx-auto px-6 mb-24">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-6">
          Recent Results
        </h3>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          {results.length === 0 && (
            <p className="text-white/40">No quiz attempted yet.</p>
          )}

          {results
            .slice(-5)
            .reverse()
            .map((res, index) => (
              <div
                key={index}
                className="flex justify-between text-sm border-b border-white/10 pb-2"
              >
                <p>
                  {res.examId} - {res.subject}
                </p>
                <span className="text-white/40">
                  {res.score}/{res.total} ({res.percentage}%)
                </span>
              </div>
            ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-white/40">
        © 2024 Quiz Master. All rights reserved.
      </footer>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatCard({ title, value }) {
  return (
    <div className="glass-card p-6 rounded-2xl text-center">
      <p className="text-white/50 text-sm mb-2">{title}</p>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
}
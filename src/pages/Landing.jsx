import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();

  const exams = ["NEET", "CET", "JEE"];

  const openDemo = (exam) => {
    setShowDemo(false);
    navigate(`/demo/${exam}`);
  };

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar showAuth />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Master Your Future with{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-purple">
              Intelligent Practice
            </span>
          </h1>

          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            Experience competitive exams before you commit.
          </p>

          {/* PRIMARY CTA */}
          <button
            onClick={() => setShowDemo(true)}
            className="animate-pulse-glow rounded-xl h-16 px-12 bg-gradient-to-r from-primary to-accent-purple text-white text-lg font-bold mb-5"
          >
            Try Free Demo
          </button>

          {/* SECONDARY CTA */}
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="rounded-xl h-14 px-10 bg-white text-background-dark font-bold flex items-center justify-center"
            >
              Register
            </Link>

            <span className="text-white/50 text-sm">or</span>

            <Link
              to="/login"
              className="rounded-xl h-14 px-10 border border-white/20 font-bold flex items-center justify-center"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Advanced Study Tools
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mt-3">
            Experience the next generation of exam preparation with premium
            features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl flex flex-col gap-6">
            <span className="material-symbols-outlined text-primary text-4xl">
              insights
            </span>
            <h3 className="text-xl font-bold">Real-time Analytics</h3>
            <p className="text-white/50 text-sm">
              Track progress with precision and identify weak areas instantly.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col gap-6">
            <span className="material-symbols-outlined text-accent-purple text-4xl">
              trophy
            </span>
            <h3 className="text-xl font-bold">Global Leaderboard</h3>
            <p className="text-white/50 text-sm">
              Compete with top candidates worldwide in real-time.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl flex flex-col gap-6">
            <span className="material-symbols-outlined text-blue-400 text-4xl">
              psychology
            </span>
            <h3 className="text-xl font-bold">Smart Bookmarks</h3>
            <p className="text-white/50 text-sm">
              AI-driven bookmarking to revise your weakest topics.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4">Pro Access</h2>
            <p className="text-white/50 mb-6">
              Unlock full mock tests, analytics & leaderboard.
            </p>

            <ul className="space-y-3">
              <li>✔ Unlimited quizzes</li>
              <li>✔ Performance analytics</li>
              <li>✔ Global rankings</li>
            </ul>
          </div>

          <div className="flex-1 max-w-md">
            <div className="bg-gradient-to-br from-primary to-accent-purple p-1 rounded-3xl">
              <div className="bg-background-dark rounded-2xl p-8 text-center">
                <div className="text-5xl font-black mb-6">
                  ₹1999<span className="text-lg text-white/50">/month</span>
                </div>

                <Link
                  to="/register"
                  className="block mb-4 rounded-xl h-14 bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center font-bold"
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="block rounded-xl h-14 border border-white/20 flex items-center justify-center font-bold"
                >
                  Login
                </Link>

                <p className="text-xs text-white/40 mt-4">
                  Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEMO MODAL ================= */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-background-dark border border-white/10 rounded-3xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 text-white/40"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-center mb-6">
              Select Demo Exam
            </h3>

            {/* 🔥 VERTICAL BUTTONS */}
            <div className="grid grid-cols-1 gap-4">
              {exams.map((exam) => (
                <button
                  key={exam}
                  onClick={() => openDemo(exam)}
                  className="glass-card py-4 rounded-xl font-bold text-lg hover:scale-105 transition"
                >
                  {exam}
                </button>
              ))}
            </div>

            <p className="text-xs text-white/40 text-center mt-6">
              Demo questions only
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

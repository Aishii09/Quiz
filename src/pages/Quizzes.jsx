import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Quizzes() {
  /* ================= MOTIVATION DATA ================= */
  const visuals = [
    { icon: "school", color: "text-blue-400" },
    { icon: "rocket_launch", color: "text-purple-400" },
    { icon: "psychology", color: "text-pink-400" },
    { icon: "insights", color: "text-teal-400" },
    { icon: "emoji_events", color: "text-yellow-400" },
  ];

  const quotes = [
    "Success is the sum of small efforts, repeated day in and day out.",
    "Discipline is choosing between what you want now and what you want most.",
    "Every question you practice makes you stronger than yesterday.",
    "Dream big. Prepare smart. Perform better.",
    "Winners are not born, they are prepared.",
  ];

  const headlines = [
    "Your Journey to Excellence Starts Here",
    "Practice Today Lead Tomorrow",
    "Turn Preparation Into Performance",
    "Consistency Creates Champions",
    "Prepare Smart Compete Strong",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  /* ================= ROTATE EVERY 15 SECONDS ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [quotes.length]); // ✅ added quotes.length to satisfy ESLint

  /* ================= SAVE LAST QUIZ ================= */
  const startQuiz = (quizId) => {
    localStorage.setItem(
      "lastQuiz",
      JSON.stringify({
        quizId,
        route: `/quiz/${quizId}`,
      })
    );
  };

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        {/* TITLE */}
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Quiz Master</h1>
          <p className="text-slate-400 max-w-2xl">
            Choose your competitive exam and start your journey towards excellence.
          </p>
        </div>

        {/* ================= FEATURED MOTIVATION ================= */}
        <div className="mb-14">
          <div className="relative rounded-2xl overflow-hidden bg-[#1c2127] shadow-2xl border border-white/10">
            <div className="relative grid md:grid-cols-2 gap-10 p-10 items-center">
              <div className="relative hidden md:flex items-center justify-center">
                <div className="absolute w-72 h-72 rounded-full border border-blue-500/20 animate-spin-slow" />
                <div className="absolute w-48 h-48 rounded-full border border-white/10" />

                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/20 backdrop-blur">
                  <span
                    className={`material-symbols-outlined text-4xl ${visuals[activeIndex].color}`}
                  >
                    {visuals[activeIndex].icon}
                  </span>
                </div>
              </div>

              <div>
                <span className="inline-block mb-4 px-4 py-1 text-xs font-bold tracking-widest rounded-full bg-primary/20 text-primary">
                  PREP MODE ACTIVE
                </span>

                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  {headlines[activeIndex].split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-purple">
                    {headlines[activeIndex].split(" ").slice(-1)}
                  </span>
                </h2>

                <p className="text-white/60 italic max-w-xl">
                  “{quotes[activeIndex]}”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ALL QUIZZES ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Competitive Exams</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* JEE */}
            <div className="bg-[#1c2127] rounded-xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl">
                  engineering
                </span>
                <h3 className="text-xl font-bold mt-4">JEE Main & Advanced</h3>
                <p className="text-slate-400 text-sm mt-2">IIT & NIT entrance preparation.</p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link
                  to="/quiz/jee1"
                  onClick={() => startQuiz("jee1")}
                  className="flex-1 bg-primary h-10 rounded-lg font-bold flex items-center justify-center"
                >
                  Attend
                </Link>
                <Link
                  to="/quiz/jee1"
                  onClick={() => startQuiz("jee1")}
                  className="flex-1 bg-teal-accent/20 border border-teal-accent/30 text-teal-accent h-10 rounded-lg font-bold flex items-center justify-center"
                >
                  Practice
                </Link>
              </div>
            </div>

            {/* NEET */}
            <div className="bg-[#1c2127] rounded-xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-teal-accent text-4xl">
                  medical_services
                </span>
                <h3 className="text-xl font-bold mt-4">NEET (UG)</h3>
                <p className="text-slate-400 text-sm mt-2">Medical entrance preparation.</p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link
                  to="/quiz/neet1"
                  onClick={() => startQuiz("neet1")}
                  className="flex-1 bg-primary h-10 rounded-lg font-bold flex items-center justify-center"
                >
                  Attend
                </Link>
                <Link
                  to="/quiz/neet1"
                  onClick={() => startQuiz("neet1")}
                  className="flex-1 bg-teal-accent/20 border border-teal-accent/30 text-teal-accent h-10 rounded-lg font-bold flex items-center justify-center"
                >
                  Practice
                </Link>
              </div>
            </div>

            {/* CET */}
            <div className="bg-[#1c2127] rounded-xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl">school</span>
                <h3 className="text-xl font-bold mt-4">CET</h3>
                <p className="text-slate-400 text-sm mt-2">Karnataka CET preparation.</p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link
                  to="/quiz/cet1"
                  onClick={() => startQuiz("cet1")}
                  className="flex-1 bg-primary h-10 rounded-lg font-bold flex items-center justify-center"
                >
                  Attend
                </Link>
                <Link
                  to="/quiz/cet1"
                  onClick={() => startQuiz("cet1")}
                  className="flex-1 bg-teal-accent/20 border border-teal-accent/30 text-teal-accent h-10 rounded-lg font-bold flex items-center justify-center"
                >
                  Practice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-white/40">
        © 2024 Quiz Master. All rights reserved.
      </footer>
    </div>
  );
}

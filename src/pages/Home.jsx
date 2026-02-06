import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  // Get user data
  const user = JSON.parse(localStorage.getItem("user"));

  // Get progress data (can be updated after quizzes)
  const progress = localStorage.getItem("weeklyProgress") || 85;
  const remaining = localStorage.getItem("remainingQuizzes") || 2;

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">

      {/* ================= HEADER ================= */}
      <Navbar />

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ================= WELCOME CARD ================= */}
        <div className="mb-10 bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
          <div className="size-12 rounded-full overflow-hidden border border-white/20">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKxQS9TEkupcafPmi7d4HmHk19BlSroNWjimJIG4TiC_a3vLbZOF7Fehdk-3FOgDmRC4x_3AfKJVBBDAQMt2bSOh4kjWhFSmEggX5VArmGbhBjCmfA1k0-nkLW4WwMxpMV39HDsZAhQuPub8GjRPnEqeHTDZpvbCYMLFuN5hoZkLQSme-YhbIC8yr6DPc8QeMIR4JW4lmvOf9Z8IGEd4a1833M_xOGHjZiucOxaSfhcEIgDT12mhTo9JtrUnUrR-BsO4LeLdj4jSoO"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Welcome back 👋, {user ? user.name : "Guest"}
            </h2>
            <p className="text-sm text-white/60">
              Ready to conquer your next challenge today?
            </p>
          </div>
        </div>

        {/* ================= PERFORMANCE SNAPSHOT ================= */}
<h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
  Performance Snapshot
</h3>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">

  {/* Accuracy */}
  <div className="glass-card p-6 rounded-2xl text-center">
    <span className="material-symbols-outlined text-green-400 text-3xl mb-2 block">
      target
    </span>
    <p className="text-2xl font-bold">{performance.accuracy}%</p>
    <p className="text-sm text-white/50">Avg Accuracy</p>
  </div>

  {/* Quizzes Taken */}
  <div className="glass-card p-6 rounded-2xl text-center">
    <span className="material-symbols-outlined text-blue-400 text-3xl mb-2 block">
      checklist
    </span>
    <p className="text-2xl font-bold">{performance.quizzesTaken}</p>
    <p className="text-sm text-white/50">Quizzes Taken</p>
  </div>

  {/* Avg Speed */}
  <div className="glass-card p-6 rounded-2xl text-center">
    <span className="material-symbols-outlined text-yellow-400 text-3xl mb-2 block">
      speed
    </span>
    <p className="text-2xl font-bold">{performance.avgSpeed}s</p>
    <p className="text-sm text-white/50">Avg Speed</p>
  </div>

  {/* Global Rank */}
  <div className="glass-card p-6 rounded-2xl text-center">
    <span className="material-symbols-outlined text-purple-400 text-3xl mb-2 block">
      leaderboard
    </span>
    <p className="text-2xl font-bold">#{performance.globalRank}</p>
    <p className="text-sm text-white/50">Global Rank</p>
  </div>

</div>


        {/* ================= QUICK ACTIONS ================= */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {/* START PRACTICE → QUIZZES PAGE */}
          <Link
            to="/quizzes"
            className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition block"
          >
            <span className="material-symbols-outlined text-primary text-3xl mb-4 block">
              rocket_launch
            </span>
            <p className="font-bold text-lg">Start Practice</p>
            <p className="text-sm text-white/50">Customizable sessions</p>
          </Link>

          <button className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition">
            <span className="material-symbols-outlined text-accent-purple text-3xl mb-4 block">
              play_circle
            </span>
            <p className="font-bold text-lg">Resume Quiz</p>
            <p className="text-sm text-white/50">Bioenergetics</p>
          </button>

          <Link
            to="/results"
            className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition block"
          >
            <span className="material-symbols-outlined text-blue-400 text-3xl mb-4 block">
              insights
            </span>
            <p className="font-bold text-lg">View Results</p>
            <p className="text-sm text-white/50">Review mistakes</p>
          </Link>

        </div>

        <Link
  to="/bookmarks"
  className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition block"
>
  <span className="material-symbols-outlined text-yellow-400 text-3xl mb-4 block">
    bookmark
  </span>
  <p className="font-bold text-lg">Bookmarks</p>
  <p className="text-sm text-white/50">
    Saved questions
  </p>
</Link>


        {/* ================= MOTIVATION CARD ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent-purple p-10 text-white">
          <h3 className="text-3xl font-bold mb-2">
            Small steps every day lead to big results 🚀
          </h3>

          <p className="text-white/80 max-w-xl mb-6">
            You’ve completed {progress}% of your weekly goal.
            {remaining > 0
              ? ` Just ${remaining} more quizzes to reach your target!`
              : " 🎉 Weekly goal completed!"}
          </p>

          <Link
            to="/quizzes"
            className="bg-white text-primary font-bold px-6 py-3 rounded-xl inline-block"
          >
            Keep Going
          </Link>
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-8 text-center text-white/40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="size-6 bg-primary rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">
              school
            </span>
          </div>
          <span className="text-sm font-bold text-white">Quiz Master</span>
        </div>
        <p className="text-xs">© 2024 Quiz Master. All rights reserved.</p>
      </footer>

    </div>
  );
}

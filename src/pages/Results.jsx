import Navbar from "../components/Navbar";

export default function Results() {

  const score = 85; // you can later replace with dynamic value

  const getBadge = (score) => {
    if (score >= 85) return "Excellent 🔥";
    if (score >= 65) return "Good 👍";
    return "Needs Improvement ⚡";
  };

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">

      {/* SAME HEADER AS LANDING */}
      <Navbar />

      {/* MAIN */}
      <main className="flex justify-center py-20 px-4">
        <div className="max-w-[1000px] w-full">

          <div className="text-center mb-12">
            <h1 className="text-[42px] font-bold">Test Completed</h1>
            <p className="text-white/60 text-lg">
              Advanced Physics Mastery - Batch A-102
            </p>
          </div>

          {/* SCORE RING */}
          <div className="flex justify-center mb-6">
            <div className="relative size-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[12px] border-white/10" />
              <div
                className="absolute inset-0 rounded-full border-[12px] border-primary"
                style={{
                  clipPath:
                    "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 35% 0%)",
                }}
              />
              <div className="z-10 text-center">
                <p className="text-6xl font-bold">{score}%</p>
                <p className="text-primary text-sm uppercase tracking-widest">
                  Overall Score
                </p>
              </div>
            </div>
          </div>

          {/* PERFORMANCE BADGE */}
          <div className="text-center mb-10">
            <span className="inline-block px-6 py-2 rounded-full bg-primary/20 text-primary font-bold">
              {getBadge(score)}
            </span>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center mb-12">
            <button className="px-8 py-3 bg-primary text-background-dark font-bold rounded-full hover:scale-105 transition">
              Generate Certificate
            </button>
          </div>

          {/* PERCENTILE */}
          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span>Percentile Rank</span>
              <span className="text-primary font-bold">98th Percentile</span>
            </div>
            <div className="h-2 bg-white/10 rounded">
              <div className="h-2 bg-primary rounded" style={{ width: "98%" }} />
            </div>
            <p className="text-xs italic text-center text-white/50 mt-2">
              You are in the top 2% performers 🔥
            </p>
          </div>

        </div>
      </main>
{/* ================= QUIZ HISTORY ================= */}
<div className="mt-16 mx-auto max-w-[1000px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
  <h2 className="text-xl font-bold px-6 py-4 border-b border-white/10">
    Previous Quiz Attempts
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-white/5 text-white/60 text-sm">
        <tr>
          <th className="px-6 py-3">Date</th>
          <th className="px-6 py-3">Exam</th>
          <th className="px-6 py-3">Start Time</th>
          <th className="px-6 py-3">End Time</th>
          <th className="px-6 py-3 text-right">Score</th>
          <th className="px-6 py-3 text-center">View</th>
        </tr>
      </thead>

      <tbody>
        {JSON.parse(localStorage.getItem("quizHistory") || "[]").length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-8 text-white/40">
              No previous attempts found
            </td>
          </tr>
        )}

        {JSON.parse(localStorage.getItem("quizHistory") || "[]").map(
          (item, index) => (
            <tr
              key={index}
              className="border-t border-white/10 hover:bg-white/5 transition"
            >
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4 font-bold">{item.exam}</td>
              <td className="px-6 py-4">{item.startTime}</td>
              <td className="px-6 py-4">{item.endTime}</td>

              {/* SCORE */}
              <td className="px-6 py-4 text-right font-bold text-primary">
                {item.percentage}%
              </td>

              {/* ACTION BUTTON */}
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "selectedAttempt",
                      JSON.stringify(item)
                    );
                    window.location.href = "/review";
                  }}
                  className="px-4 py-1.5 rounded-full text-sm font-bold 
                             text-blue-400 border border-blue-400/40
                             hover:bg-blue-400 hover:text-background-dark
                             transition"
                >
                  View
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
</div>



      {/* SAME FOOTER STYLE AS LANDING */}
      <footer className="border-t border-white/10 py-8 text-center text-white/40 mt-16">
        © 2024 Quiz Master. All rights reserved.
      </footer>

    </div>
  );
}

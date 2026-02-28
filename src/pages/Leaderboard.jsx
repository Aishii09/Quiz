import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const results =
      JSON.parse(localStorage.getItem("quiz_results")) || [];

    if (results.length === 0) return;

    // Sort by percentage (highest first)
    const sorted = [...results].sort(
      (a, b) => Number(b.percentage) - Number(a.percentage)
    );

    setLeaderboard(sorted);
  }, []);

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar />

      <main className="max-w-[1000px] mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Leaderboard 🏆
        </h1>

        {leaderboard.length === 0 ? (
          <div className="text-center text-white/50 mt-20">
            No quiz attempts yet.
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-white/60 text-sm">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Exam</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4 text-right">Score</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4 font-bold">
                      #{index + 1}
                    </td>

                    <td className="px-6 py-4">
                      {item.examId}
                    </td>

                    <td className="px-6 py-4">
                      {item.subject}
                    </td>

                    <td className="px-6 py-4 text-right font-bold text-primary">
                      {item.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-white/40">
        © 2024 Quiz Master. All rights reserved.
      </footer>
    </div>
  );
}
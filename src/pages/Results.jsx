import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const savedResults =
      JSON.parse(localStorage.getItem("quiz_results")) || [];

    setResults(savedResults.reverse()); // latest first
  }, []);

  if (results.length === 0) {
    return (
      <div className="bg-background-dark text-white min-h-screen font-display">
        <Navbar />
        <div className="text-center mt-40 text-white/50">
          No quiz attempts yet.
        </div>
      </div>
    );
  }

  const latest = results[0];

  const getBadge = (score) => {
    if (score >= 85) return "Excellent 🔥";
    if (score >= 65) return "Good 👍";
    return "Needs Improvement ⚡";
  };

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar />

      {/* ================= LATEST RESULT ================= */}
      <main className="flex justify-center py-20 px-4">
        <div className="max-w-[1000px] w-full">
          <div className="text-center mb-12">
            <h1 className="text-[42px] font-bold">Latest Test Result</h1>
            <p className="text-white/60 text-lg">
              {latest.examId} - {latest.subject}
            </p>
          </div>

          {/* SCORE DISPLAY */}
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <p className="text-6xl font-bold text-primary">
                {latest.percentage}%
              </p>
              <p className="text-sm text-white/50">
                {latest.score} / {latest.total}
              </p>
            </div>
          </div>

          <div className="text-center mb-10">
            <span className="inline-block px-6 py-2 rounded-full bg-primary/20 text-primary font-bold">
              {getBadge(Number(latest.percentage))}
            </span>
          </div>
        </div>
      </main>

      {/* ================= QUIZ HISTORY ================= */}
      <div className="mt-10 mx-auto max-w-[1000px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <h2 className="text-xl font-bold px-6 py-4 border-b border-white/10">
          Previous Quiz Attempts
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-white/60 text-sm">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Exam</th>
                <th className="px-6 py-3">Subject</th>
                <th className="px-6 py-3 text-right">Score</th>
              </tr>
            </thead>

            <tbody>
              {results.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 font-bold">{item.examId}</td>
                  <td className="px-6 py-4">{item.subject}</td>

                  <td className="px-6 py-4 text-right font-bold text-primary">
                    {item.score}/{item.total} ({item.percentage}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="border-t border-white/10 py-8 text-center text-white/40 mt-16">
        © 2024 Quiz Master. All rights reserved.
      </footer>
    </div>
  );
}
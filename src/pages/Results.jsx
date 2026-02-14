import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Results() {
  const [quizHistory, setQuizHistory] = useState([]);
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentId");
  const studentName = localStorage.getItem("studentName");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`/api/attempt/user/${studentId}`);
        setQuizHistory(res.data || []);
      } catch (err) {
        console.error("Failed to fetch quiz history:", err);
      }
    };

    if (studentId) fetchHistory();
  }, [studentId]);

  const getBadge = (score) => {
    if (score >= 85) return "Excellent 🔥";
    if (score >= 65) return "Good 👍";
    return "Needs Improvement ⚡";
  };

  const handleCertificate = () => {
  const attemptToUse = quizHistory[0];

  if (!attemptToUse) {
    alert("You must complete a quiz before generating a certificate.");
    return;
  }

  navigate("/certificate", {
    state: {
      name: studentName || "Student",
      subject: attemptToUse.quiz?.title,
      percentage: attemptToUse.score + "%",
      date: new Date(
        attemptToUse.completedAt || attemptToUse.createdAt
      ).toLocaleDateString(),
    },
  });
};

  const latestScore = quizHistory[0]?.score ?? 0;

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar />

      <main className="flex justify-center py-20 px-4">
        <div className="max-w-[1000px] w-full">
          <div className="text-center mb-12">
            <h1 className="text-[42px] font-bold">Test Completed</h1>
            <p className="text-white/60 text-lg">
              {quizHistory[0]?.quiz?.title || "Quiz Summary"}
            </p>
          </div>

          {/* SCORE RING */}
          <div className="flex justify-center mb-6">
            <div className="relative size-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[12px] border-white/10" />
              <div className="absolute inset-0 rounded-full border-[12px] border-primary" />
              <div className="z-10 text-center">
                <p className="text-6xl font-bold">
                  {latestScore}%
                </p>
                <p className="text-primary text-sm uppercase tracking-widest">
                  Overall Score
                </p>
              </div>
            </div>
          </div>

          {/* PERFORMANCE BADGE */}
          <div className="text-center mb-10">
            <span className="inline-block px-6 py-2 rounded-full bg-primary/20 text-primary font-bold">
              {getBadge(latestScore)}
            </span>
          </div>

          {/* GENERATE CERTIFICATE BUTTON */}
          <div className="flex justify-center mb-10">
            <button
              onClick={handleCertificate}
              className="px-8 py-3 bg-primary text-background-dark font-bold rounded-full hover:scale-105 transition"
            >
              Generate Certificate
            </button>
          </div>

          {/* PERCENTILE */}
          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span>Percentile Rank</span>
              <span className="text-primary font-bold">
                {quizHistory[0]?.percentile || "N/A"}
              </span>
            </div>

            <div className="h-2 bg-white/10 rounded">
              <div
                className="h-2 bg-primary rounded"
                style={{
                  width: quizHistory[0]?.percentile || "0%",
                }}
              />
            </div>

            <p className="text-xs italic text-center text-white/50 mt-2">
              {quizHistory[0]
                ? `You are in the top ${
                    100 - parseInt(quizHistory[0].percentile || 0)
                  }% performers 🔥`
                : "You haven’t attempted any quiz yet"}
            </p>
          </div>
        </div>
      </main>

      {/* QUIZ HISTORY */}
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
              {quizHistory.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-white/40">
                    No previous attempts found
                  </td>
                </tr>
              ) : (
                quizHistory.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {item.quiz?.title}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(
                        item.completedAt || item.createdAt
                      ).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-primary">
                      {item.score}%
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => navigate("/review", { state: item })}
                        className="px-4 py-1.5 rounded-full text-sm font-bold text-blue-400 border border-blue-400/40 hover:bg-blue-400 hover:text-background-dark transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="border-t border-white/10 py-8 text-center text-white/40 mt-16">
        © 2026 Quiz Master. All rights reserved.
      </footer>
    </div>
  );
}

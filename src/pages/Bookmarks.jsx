import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Bookmarks() {
  const allBookmarks = JSON.parse(
    localStorage.getItem("bookmarks") || "[]"
  );

  const [selectedExam, setSelectedExam] = useState("ALL");

  const filteredBookmarks =
    selectedExam === "ALL"
      ? allBookmarks
      : allBookmarks.filter((b) => b.exam === selectedExam);

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar />

      <main className="max-w-[1000px] mx-auto px-4 py-20">
        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-10">
          Bookmarked Questions
        </h1>

        {/* FILTER TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {["ALL", "NEET", "CET", "JEE", "DCET"].map((exam) => {
            const count =
              exam === "ALL"
                ? allBookmarks.length
                : allBookmarks.filter((b) => b.exam === exam).length;

            return (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`rounded-2xl p-4 text-left transition border
                  ${
                    selectedExam === exam
                      ? "bg-primary text-background-dark border-primary"
                      : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                  }`}
              >
                <p className="font-bold text-lg">{exam}</p>
                <p
                  className={`text-sm mt-1 ${
                    selectedExam === exam
                      ? "text-background-dark/80"
                      : "text-white/50"
                  }`}
                >
                  {count} question{count !== 1 ? "s" : ""}
                </p>
              </button>
            );
          })}
        </div>

        {/* BOOKMARK LIST */}
        {filteredBookmarks.length === 0 ? (
          <div className="text-center text-white/50 mt-24">
            <span className="material-symbols-outlined text-6xl mb-4 block">
              bookmark_remove
            </span>
            <p className="text-lg font-semibold">
              No bookmarked questions
            </p>
            <p className="text-sm">
              Bookmark questions to revise later 📘
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookmarks.map((q, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="flex justify-between mb-3">
                  <p className="font-semibold">
                    Q{index + 1}. {q.question}
                  </p>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-bold">
                    {q.exam}
                  </span>
                </div>

                <ul className="text-sm text-white/70 space-y-1">
                  {q.options.map((opt, i) => (
                    <li key={i}>• {opt}</li>
                  ))}
                </ul>

                <p className="mt-3 text-sm text-green-400 font-semibold">
                  Correct Answer: {q.correctAnswer}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-white/40">
        © 2024 Quiz Master. All rights reserved.
      </footer>
    </div>
  );
}

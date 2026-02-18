import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function QuizPage() {
  const { examType, subject } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/admin/exams/${examType}/${subject}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("BACKEND RESPONSE:", data);
        setQuestions(data.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, [examType, subject]);

  return (
    <div className="bg-background-dark text-white min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          {examType} - {subject}
        </h1>

        {loading ? (
          <p>Loading questions...</p>
        ) : questions.length === 0 ? (
          <p>No questions found for this quiz.</p>
        ) : (
          questions.map((q, index) => (
            <div key={index} className="mb-6 p-4 bg-[#1c2127] rounded-lg">
              <h2 className="font-semibold mb-3">
                {index + 1}. {q.question}
              </h2>

              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                  >
                    {opt.text}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { demoQuestions } from "../data/demoQuestions";
import { useState } from "react";
import Timer from "../components/Timer";

export default function DemoQuiz() {
  const { exam, subject } = useParams();
  const navigate = useNavigate();

  const examKey = exam?.toLowerCase();

  // ✅ Decide questions FIRST (no return yet)
  const questions =
    examKey === "dcet"
      ? demoQuestions.dcet
      : demoQuestions[examKey]?.[subject];

  // ✅ ALL HOOKS MUST COME BEFORE ANY RETURN
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const TOTAL_TIME = 150;
  const [timeLeft, setTimeLeft] = useState(120);
  

  // ✅ Now it's safe to return conditionally
  if (!questions) {
    return (
      <div className="min-h-screen bg-background-dark text-white flex items-center justify-center text-xl">
        Invalid Quiz
      </div>
    );
  }

  const submitQuiz = () => {
    navigate("/demo/result", {
  state: {
    questions,
    answers,
    timeUsed: 120 - timeLeft, // ✅ correct calculation

      },
    });
  };

  return (
    <div className="min-h-screen bg-background-dark text-white p-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold uppercase">
          {examKey}
          {subject ? ` - ${subject}` : ""}
        </h2>

        <Timer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          onTimeUp={submitQuiz}
        />
      </div>

      {/* QUESTION */}
      <h3 className="text-lg mb-4">
        Q{current + 1}. {questions[current].question}
      </h3>

      {/* OPTIONS */}
      <div className="space-y-3">
        {questions[current].options.map((opt, index) => (
          <button
            key={index}
            onClick={() =>
              setAnswers({ ...answers, [current]: index })
            }
            className={`w-full p-3 rounded text-left transition
              ${
                answers[current] === index
                  ? "bg-primary"
                  : "bg-[#1c2127]"
              }
              hover:bg-primary/40`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* NAVIGATION */}
      <div className="flex justify-between mt-8">
        <button
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
          className="px-6 py-2 rounded bg-[#1c2127] hover:bg-primary/40 disabled:opacity-40"
        >
          Previous
        </button>

        {current === questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            className="bg-primary px-6 py-2 rounded hover:opacity-90"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrent(current + 1)}
            className="px-6 py-2 rounded bg-[#1c2127] hover:bg-primary/40"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import demoQuestions from "../data/demoQuestions";
import { useState, useEffect, useMemo } from "react";
import Timer from "../components/Timer";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function DemoQuiz() {
  const { examType, subject, quizId } = useParams();
  const navigate = useNavigate();

  // Create quiz key (supports both formats)
  const quizKey =
    quizId || `${examType?.toLowerCase()}-${subject?.toLowerCase()}`;

  const [backendExam, setBackendExam] = useState(null);

  // Get questions from demo data
  const questions = useMemo(() => {
    return demoQuestions[quizKey] || [];
  }, [quizKey]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    if (examType && subject) {
      axios
        .get(`http://localhost:5000/api/admin/exams/${examType}/${subject}`)
        .then((res) => {
          setBackendExam(res.data);
        })
        .catch(() => {
          console.log("No backend exam found, using demo questions.");
        });
    }
  }, [examType, subject]);

  /* ================= AUTO SUBMIT ================= */
  useEffect(() => {
    if (timeLeft === 0) {
      navigate(`/result/${quizKey}`, {
        state: { questions, answers },
      });
    }
  }, [timeLeft, navigate, quizKey, questions, answers]);

  if (questions.length === 0) {
    return (
      <>
        <Navbar />
        <div className="p-6 text-center text-white">
          <h1 className="text-2xl font-bold">
            No questions found for this quiz.
          </h1>

          {backendExam && (
            <p className="mt-4 text-green-400">
              Backend exam found: {backendExam.examType} -{" "}
              {backendExam.subject}
            </p>
          )}
        </div>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: index,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      navigate(`/result/${quizKey}`, {
        state: { questions, answers },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background-dark text-white px-6 py-16">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black uppercase">
            {quizKey.replace("-", " ")}
          </h1>
          <p className="text-white/60 mt-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        {/* TIMER */}
        <div className="flex justify-center mb-8">
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            onTimeUp={() =>
              navigate(`/result/${quizKey}`, {
                state: { questions, answers },
              })
            }
          />
        </div>

        {/* QUESTION CARD */}
        <div className="max-w-2xl mx-auto glass-card p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full p-3 rounded-xl text-left transition-all duration-300
                  ${
                    answers[currentQuestionIndex] === idx
                      ? "bg-primary text-white scale-105"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* NAVIGATION */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-xl bg-primary hover:scale-105 transition"
            >
              {currentQuestionIndex + 1 === questions.length
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
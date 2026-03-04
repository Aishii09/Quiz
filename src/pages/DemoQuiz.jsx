import { useParams, useNavigate } from "react-router-dom";
import demoQuestions from "../data/demoQuestions";
import { useState, useEffect, useMemo } from "react";
import Timer from "../components/Timer";
<<<<<<< HEAD
import axios from "axios"; // ✅ ADDED
=======
import Navbar from "../components/Navbar";
>>>>>>> ffd439699dd86b475521d74d97c7531ae9d792e6

export default function DemoQuiz() {
  const { examType, subject, quizId } = useParams(); // ✅ updated
  const navigate = useNavigate();

<<<<<<< HEAD
  // ✅ decide key (fallback support)
  const quizKey = quizId || `${examType?.toLowerCase()}-${subject?.toLowerCase()}`;

  const [backendExam, setBackendExam] = useState(null); // ✅ ADDED
  const [questions, setQuestions] = useState(demoQuestions[quizKey] || []); // ✅ modified

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    if (examType && subject) {
      axios
        .get(`http://localhost:5000/api/admin/exams/${examType}/${subject}`)
        .then((res) => {
          setBackendExam(res.data);
          // ⚡ Later you will generate MCQs from PDF here
        })
        .catch(() => {
          console.log("No backend exam found, using demo questions.");
        });
    }
  }, [examType, subject]);
=======
  const examKey = exam?.toLowerCase();
  const subjectKey = subject?.toLowerCase();

  // ✅ Use useMemo to prevent unnecessary re-renders / ESLint warning
  const questions = useMemo(() => {
    return demoQuestions[examKey]?.[subjectKey] || [];
  }, [examKey, subjectKey]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 🔥 Total exam time
>>>>>>> ffd439699dd86b475521d74d97c7531ae9d792e6

  // ✅ Auto submit when timer reaches 0
  useEffect(() => {
<<<<<<< HEAD
    if (timeLeft <= 0) {
      navigate(`/result/${quizKey}`, { state: { score } });
    }
  }, [timeLeft, navigate, quizKey, score]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(60);
    } else {
      navigate(`/result/${quizKey}`, { state: { score } });
    }
  };
=======
    if (timeLeft === 0) {
      navigate(`/result/${exam}/${subject}`, {
        state: { questions, answers },
      });
    }
  }, [timeLeft, navigate, exam, subject, questions, answers]);
>>>>>>> ffd439699dd86b475521d74d97c7531ae9d792e6

  // If no questions, show nothing (or you can show a message)
  if (questions.length === 0) {
<<<<<<< HEAD
    return (
      <div className="p-6 text-center text-white">
        <h1 className="text-2xl font-bold">No questions found for this quiz.</h1>
        {backendExam && (
          <p className="mt-4 text-green-400">
            Backend exam found: {backendExam.examType} - {backendExam.subject}
          </p>
        )}
      </div>
    );
=======
    return null;
>>>>>>> ffd439699dd86b475521d74d97c7531ae9d792e6
  }

  const currentQuestion = questions[currentQuestionIndex];

  // ✅ Select option
  const handleOptionSelect = (index) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: index,
    });
  };

  // ✅ Next question / Finish
  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Manual submit
      navigate(`/result/${exam}/${subject}`, {
        state: { questions, answers },
      });
    }
  };

  // ✅ Previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">
        {(quizId || `${examType} ${subject}`).toUpperCase()} Quiz
      </h1>

      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        onTimeUp={() =>
          navigate(`/result/${quizKey}`, { state: { score } })
        }
      />

      <div className="mt-6 w-full max-w-xl bg-white/10 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {currentQuestion.question}
        </h2>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => (
=======
    <>
      <Navbar />

      <div className="min-h-screen bg-background-dark text-white px-6 py-16">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black uppercase">
            {exam} - {subject}
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
              navigate(`/result/${exam}/${subject}`, {
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
>>>>>>> ffd439699dd86b475521d74d97c7531ae9d792e6
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
<<<<<<< HEAD

      <p className="mt-6">
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
      <p>Score: {score}</p>
    </div>
=======
    </>
>>>>>>> ffd439699dd86b475521d74d97c7531ae9d792e6
  );
}

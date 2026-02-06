import { useParams, useNavigate } from "react-router-dom";
import { demoQuestions } from "../data/demoQuestions";
import { useState, useEffect } from "react";
import Timer from "../components/Timer";

export default function DemoQuiz() {
  const { exam, subject } = useParams();
  const navigate = useNavigate();

  const examKey = exam?.toLowerCase();
  const questions = demoQuestions[examKey]?.[subject] || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // total quiz time per question (seconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      // Time's up, navigate to result
      navigate(`/result/${exam}/${subject}`, { state: { score } });
    }
  }, [timeLeft, navigate, exam, subject, score]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(60); // reset timer for next question
    } else {
      navigate(`/result/${exam}/${subject}`, { state: { score } });
    }
  };

  if (questions.length === 0) {
    return (
      <div className="p-4 text-center text-white">
        <h1 className="text-2xl font-bold">No questions found!</h1>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">{exam} - {subject} Quiz</h1>

      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        onTimeUp={() => navigate(`/result/${exam}/${subject}`, { state: { score } })}
      />

      <div className="mt-6 w-full max-w-xl bg-white/10 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              className="bg-white/20 hover:bg-white/40 transition rounded p-2 text-left"
              onClick={() => handleAnswer(option.isCorrect)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6">Question {currentQuestionIndex + 1} of {questions.length}</p>
      <p>Score: {score}</p>
    </div>
  );
}

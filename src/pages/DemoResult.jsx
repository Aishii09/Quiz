import { useLocation, useNavigate } from "react-router-dom";

export default function DemoResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/"); // Redirect if no state is passed
    return null;
  }

  const { questions, answers, timeUsed } = state;

  let correct = 0;
  let wrong = 0;
  let notAnswered = 0;

  // ✅ Calculate results safely, works whether correctAnswer is index or text
  questions.forEach((q, i) => {
    const userIndex = answers[i]; // may be undefined
    if (userIndex === undefined) {
      notAnswered++;
      return;
    }

    const userAnswerText = q.options[userIndex]; // convert index to text
    const correctAnswerText =
      typeof q.correctAnswer === "number"
        ? q.options[q.correctAnswer]
        : q.correctAnswer;

    if (userAnswerText === correctAnswerText) correct++;
    else wrong++;
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b1e] to-[#050614] text-white p-8 md:p-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
        🏆 Your Demo Result
      </h1>

      {/* Summary Card */}
      <div className="bg-gray-800/60 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-around items-center mb-10 shadow-lg">
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl font-semibold">⏱ Time Taken</p>
          <p className="text-2xl md:text-3xl font-bold text-primary">{formatTime(timeUsed)}</p>
        </div>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl font-semibold">✅ Correct</p>
          <p className="text-2xl md:text-3xl font-bold text-green-400">{correct}</p>
        </div>
        <div className="text-center mb-4 md:mb-0">
          <p className="text-xl font-semibold">❌ Wrong</p>
          <p className="text-2xl md:text-3xl font-bold text-red-400">{wrong}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">⚠️ Not Answered</p>
          <p className="text-2xl md:text-3xl font-bold text-yellow-400">{notAnswered}</p>
        </div>
      </div>

      {/* Questions Review */}
      <div className="space-y-6">
        {questions.map((q, i) => {
          const userIndex = answers[i];
          const userAnswerText = userIndex !== undefined ? q.options[userIndex] : "Not Answered";
          const correctAnswerText =
            typeof q.correctAnswer === "number"
              ? q.options[q.correctAnswer]
              : q.correctAnswer;

          const isCorrect = userAnswerText === correctAnswerText;

          return (
            <div
              key={i}
              className={`p-5 md:p-6 rounded-xl border-l-4 ${
                userIndex === undefined
                  ? "border-yellow-400 bg-yellow-500/10"
                  : isCorrect
                  ? "border-green-400 bg-green-500/10"
                  : "border-red-400 bg-red-500/10"
              } shadow-md hover:scale-[1.02] transition-transform duration-200`}
            >
              <h3 className="font-bold mb-2 text-lg md:text-xl">
                Q{i + 1}. {q.question}
              </h3>

              <p>
                <span className="font-semibold">Your Answer:</span> {userAnswerText}
              </p>

              <p className={`mt-1 font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                Correct Answer: {correctAnswerText}
              </p>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
        <button
          onClick={() => navigate("/")}
          className="bg-primary px-6 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition-transform duration-200"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/demo")}
          className="bg-yellow-500 px-6 py-3 rounded-lg text-lg font-semibold text-black hover:scale-105 transition-transform duration-200"
        >
          Review Again
        </button>
      </div>
    </div>
  );
}

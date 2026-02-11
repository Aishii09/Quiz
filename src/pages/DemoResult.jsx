import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DemoResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions = [], answers = {} } = location.state || {};

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold">No result data found!</h1>
      </div>
    );
  }

  // ✅ Calculate Results
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;

  questions.forEach((q, index) => {
    if (answers[index] === undefined) {
      unattempted++;
    } else if (q.options[answers[index]] === q.correctAnswer) {
      correct++;
    } else {
      wrong++;
    }
  });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background-dark text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">

          {/* 🔥 Summary Section */}
          <div className="glass-card p-8 rounded-2xl shadow-xl mb-10 text-center">
            <h1 className="text-4xl font-black mb-6">Your Result</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg">
              <div className="bg-white/10 p-4 rounded-xl">
                <p>Total</p>
                <p className="text-2xl font-bold">{questions.length}</p>
              </div>

              <div className="bg-green-500/20 p-4 rounded-xl">
                <p>Correct</p>
                <p className="text-2xl font-bold text-green-400">
                  {correct}
                </p>
              </div>

              <div className="bg-red-500/20 p-4 rounded-xl">
                <p>Wrong</p>
                <p className="text-2xl font-bold text-red-400">
                  {wrong}
                </p>
              </div>

              <div className="bg-yellow-500/20 p-4 rounded-xl">
                <p>Unattempted</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {unattempted}
                </p>
              </div>
            </div>
          </div>

          {/* 📌 Question Review Section */}
          <div className="space-y-6">
            {questions.map((q, index) => {
              const userAnswerIndex = answers[index];
              const userAnswer =
                userAnswerIndex !== undefined
                  ? q.options[userAnswerIndex]
                  : null;

              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div
                  key={index}
                  className={`p-6 rounded-2xl shadow-lg ${
                    userAnswer === null
                      ? "bg-yellow-500/10"
                      : isCorrect
                      ? "bg-green-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  <h2 className="font-semibold mb-2">
                    Q{index + 1}. {q.question}
                  </h2>

                  <p>
                    Your Answer:{" "}
                    {userAnswer ? (
                      <span
                        className={`font-bold ${
                          isCorrect ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {userAnswer}
                      </span>
                    ) : (
                      <span className="text-yellow-400">
                        Not Attempted
                      </span>
                    )}
                  </p>

                  {!isCorrect && (
                    <p className="mt-1">
                      Correct Answer:{" "}
                      <span className="text-green-400 font-bold">
                        {q.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* 🔙 Back to Landing Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-primary rounded-xl hover:scale-105 transition-all duration-300"
            >
              Go Back to Landing Page
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

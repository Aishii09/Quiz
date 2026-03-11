import React, { useEffect, useState } from "react";  
import axios from "axios";  
import { useParams } from "react-router-dom";  
  
export default function QuizPage() {  
  const { examId, subject } = useParams();  
  
  const [questions, setQuestions] = useState([]);  
  const [currentIndex, setCurrentIndex] = useState(0);  
  const [selectedAnswers, setSelectedAnswers] = useState({});  
  const [bookmarks, setBookmarks] = useState([]);  

  // ✅ CHANGED: 90 minutes timer (90 * 60 = 5400 seconds)
  const [timeLeft, setTimeLeft] = useState(5400);  

  const [finished, setFinished] = useState(false);  
  const [score, setScore] = useState(0);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState("");  
  
  /* ================= FINISH QUIZ ================= */  
  function finishQuiz() {  
    let calculatedScore = 0;  
  
    questions.forEach((q, i) => {  
      if (  
        selectedAnswers[i] !== undefined &&  
        q.options[selectedAnswers[i]]?.isCorrect  
      ) {  
        calculatedScore++;  
      }  
    });  
  
    setScore(calculatedScore);  
    setFinished(true);  
  
    const resultData = {  
      examId,  
      subject,  
      score: calculatedScore,  
      total: questions.length,  
      percentage: ((calculatedScore / questions.length) * 100).toFixed(0),  
      date: new Date().toLocaleString(),  
    };  
  
    const previousResults =
      JSON.parse(localStorage.getItem("quiz_results")) || [];  
  
    localStorage.setItem(  
      "quiz_results",  
      JSON.stringify([...previousResults, resultData])  
    );  
  
    axios  
      .post("http://localhost:5000/api/admin/save-result", {  
        examType: examId.toUpperCase(),  
        subject,  
        score: calculatedScore,  
        totalQuestions: questions.length,  
      })  
      .catch((err) => console.log(err));  
  }  
  
  /* ================= FETCH QUESTIONS ================= */  
  useEffect(() => {  
    const fetchQuestions = async () => {  
      try {  
        setLoading(true);  
        const formattedExam = examId.toUpperCase();  
  
        const res = await axios.get(  
          `http://localhost:5000/api/admin/exams/${formattedExam}/${subject}`  
        );  
  
        let fetchedQuestions = res.data.questions || [];  
  
        const shuffledQuestions = fetchedQuestions  
          .sort(() => 0.5 - Math.random())  

          // ✅ CHANGED: 60 questions instead of 15
          .slice(0, 60)  

          .map((q) => ({  
            ...q,  
            options: [...q.options].sort(() => 0.5 - Math.random()),  
          }));  
  
        setQuestions(shuffledQuestions);  
  
        const savedBookmarks = JSON.parse(  
          localStorage.getItem(`bookmarks_${examId}_${subject}`)  
        );  
        if (savedBookmarks) {  
          setBookmarks(savedBookmarks);  
        }  
      } catch (err) {  
        setError("Failed to load questions");  
      } finally {  
        setLoading(false);  
      }  
    };  
  
    fetchQuestions();  
  }, [examId, subject]);  
  
  /* ================= TIMER ================= */  
  useEffect(() => {  
    if (!finished && timeLeft > 0) {  
      const timer = setInterval(() => {  
        setTimeLeft((prev) => prev - 1);  
      }, 1000);  
      return () => clearInterval(timer);  
    }  
  
    if (timeLeft === 0) finishQuiz();  
  }, [timeLeft, finished]);  
  
  const formatTime = () => {  
    const m = Math.floor(timeLeft / 60);  
    const s = timeLeft % 60;  
    return `${m}:${s < 10 ? "0" : ""}${s}`;  
  };  
  
  const handleSelect = (index) => {  
    setSelectedAnswers({  
      ...selectedAnswers,  
      [currentIndex]: index,  
    });  
  };  
  
  /* ================= BOOKMARK ================= */  
  const toggleBookmark = () => {  
    let updatedBookmarks;  
  
    if (bookmarks.includes(currentIndex)) {  
      updatedBookmarks = bookmarks.filter((q) => q !== currentIndex);  
    } else {  
      updatedBookmarks = [...bookmarks, currentIndex];  
    }  
  
    setBookmarks(updatedBookmarks);  
  
    localStorage.setItem(  
      `bookmarks_${examId}_${subject}`,  
      JSON.stringify(updatedBookmarks)  
    );  
  };  
  
  /* ================= LOADING ================= */  
  if (loading)  
    return <div className="text-white text-center mt-20">Loading...</div>;  
  
  if (error)  
    return <div className="text-red-400 text-center mt-20">{error}</div>;  
  
  if (questions.length === 0)  
    return (  
      <div className="text-white text-center mt-20">  
        No Questions Available  
      </div>  
    );  
  
  /* ================= RESULT PAGE ================= */  
  if (finished) {  
    const percentage = ((score / questions.length) * 100).toFixed(0);  
  
    const notAnswered = questions.filter(  
      (_, index) => selectedAnswers[index] === undefined  
    );  
  
    return (  
      <div className="min-h-screen bg-black text-white p-8">  
        <h2 className="text-3xl text-green-400 mb-6 text-center">  
          Quiz Completed 🎉  
        </h2>  
  
        <div className="text-center mb-8">  
          <p className="text-xl">  
            Score: {score} / {questions.length}  
          </p>  
          <p>Percentage: {percentage}%</p>  
        </div>  
  
        <h3 className="text-2xl mb-4">Answer Review</h3>  
  
        {questions.map((q, qIndex) => {  
          const selectedIndex = selectedAnswers[qIndex];  
  
          return (  
            <div key={qIndex} className="mb-6 bg-white/10 p-4 rounded">  
              <h3 className="mb-3 font-semibold">  
                {qIndex + 1}. {q.question}  
              </h3>  
  
              {q.options.map((opt, i) => {  
                const isCorrect = opt.isCorrect;  
                const isSelected = selectedIndex === i;  
  
                let bg = "bg-gray-700";  
                if (isCorrect) bg = "bg-green-600";  
                else if (isSelected) bg = "bg-red-600";  
  
                return (  
                  <div key={i} className={`p-2 rounded mb-2 ${bg}`}>  
                    {opt.text}  
                  </div>  
                );  
              })}  
  
              <p className="mt-2 text-sm text-yellow-400">  
                Your Answer:{" "}  
                {selectedIndex !== undefined  
                  ? q.options[selectedIndex].text  
                  : "Not Answered"}  
              </p>  
            </div>  
          );  
        })}  
  
        {notAnswered.length > 0 && (  
          <div className="mt-10 bg-red-900/40 p-6 rounded">  
            <h3 className="text-2xl text-red-400 mb-4">  
              ❌ Not Answered Questions ({notAnswered.length})  
            </h3>  
  
            {notAnswered.map((q, index) => (  
              <p key={index} className="mb-2">  
                • {q.question}  
              </p>  
            ))}  
          </div>  
        )}  
      </div>  
    );  
  }  
  
  const currentQuestion = questions[currentIndex];  
  
  /* ================= QUIZ UI ================= */  
  return (  
    <div className="min-h-screen bg-black text-white p-6">  
  
      <div className="flex justify-between mb-6">  
        <p>  
          Question {currentIndex + 1} / {questions.length}  
        </p>  
        <div>⏳ {formatTime()}</div>  
      </div>  
  
      <div className="grid grid-cols-8 gap-2 mb-8">  
        {questions.map((_, index) => {  
          const isCurrent = index === currentIndex;  
          const isAnswered = selectedAnswers[index] !== undefined;  
  
          let bg = "bg-gray-700";  
          if (isCurrent) bg = "bg-yellow-500 text-black";  
          else if (isAnswered) bg = "bg-green-500";  
          else bg = "bg-red-500";  
  
          return (  
            <div  
              key={index}  
              onClick={() => setCurrentIndex(index)}  
              className={`text-center py-2 rounded cursor-pointer text-sm font-bold ${bg}`}  
            >  
              {index + 1}  
            </div>  
          );  
        })}  
      </div>  
  
      <h2 className="mb-4 text-xl">{currentQuestion.question}</h2>  
  
      <div className="space-y-3">  
        {currentQuestion.options.map((option, index) => (  
          <div  
            key={index}  
            onClick={() => handleSelect(index)}  
            className={`p-3 rounded cursor-pointer ${  
              selectedAnswers[currentIndex] === index  
                ? "bg-green-400 text-black"  
                : "bg-gray-700"  
            }`}  
          >  
            {option.text}  
          </div>  
        ))}  
      </div>  
  
      <div className="flex justify-between mt-8">  
        <button  
          disabled={currentIndex === 0}  
          onClick={() => setCurrentIndex((prev) => prev - 1)}  
          className="bg-blue-500 px-4 py-2 rounded disabled:opacity-40"  
        >  
          Previous  
        </button>  
  
        <button  
          onClick={toggleBookmark}  
          className="bg-yellow-500 px-4 py-2 rounded"  
        >  
          {bookmarks.includes(currentIndex)  
            ? "Remove Bookmark"  
            : "Bookmark"}  
        </button>  
  
        {currentIndex === questions.length - 1 ? ( 
          <button  
            onClick={finishQuiz}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Submit
          </button>
        ) : (
          <button  
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

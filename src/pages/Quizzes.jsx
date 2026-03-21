import { useEffect, useState } from "react";    
import { Link } from "react-router-dom";    
import Navbar from "../components/Navbar";    
    
export default function Quizzes() {    
  const visuals = [    
    { icon: "school", color: "text-blue-400" },    
    { icon: "rocket_launch", color: "text-purple-400" },    
    { icon: "psychology", color: "text-pink-400" },    
    { icon: "insights", color: "text-teal-400" },    
    { icon: "emoji_events", color: "text-yellow-400" },    
  ];    
    
  const quotes = [    
    "Success is the sum of small efforts, repeated day in and day out.",    
    "Discipline is choosing between what you want now and what you want most.",    
    "Every question you practice makes you stronger than yesterday.",    
    "Dream big. Prepare smart. Perform better.",    
    "Winners are not born, they are prepared.",    
  ];    
    
  const headlines = [    
    "Your Journey to Excellence Starts Here",    
    "Practice Today Lead Tomorrow",    
    "Turn Preparation Into Performance",    
    "Consistency Creates Champions",    
    "Prepare Smart Compete Strong",    
  ];    
    
  const [activeIndex, setActiveIndex] = useState(0);    
  const [selectedExam, setSelectedExam] = useState(null);    
    
  const examSubjects = {    
    jee: ["Maths", "Physics", "Chemistry"],    
    neet: ["Physics", "Chemistry", "Biology"],    
    cet: ["Physics", "Chemistry", "Maths", "Biology"],    
  };    
    
  useEffect(() => {    
    const interval = setInterval(() => {    
      setActiveIndex((prev) => (prev + 1) % quotes.length);    
    }, 15000);    
    
    return () => clearInterval(interval);    
  }, [quotes.length]);    
    
  // ✅ FIX ADDED HERE
  const normalizeSubject = (subject) => {
    if (subject.toLowerCase() === "maths") return "mathematics";
    return subject.toLowerCase();
  };
    
  const startQuiz = (exam, subject) => {    
    const normalized = normalizeSubject(subject);

    localStorage.setItem(    
      "lastQuiz",    
      JSON.stringify({    
        exam,    
        subject: normalized,    
        route: `/quiz/${exam}/${normalized}`,    
      })    
    );    
  };    
    
  const renderExamCard = (examKey, title, description, icon, iconColor) => (    
    <div className="bg-[#1c2127] rounded-xl p-6 border border-white/5 flex flex-col justify-between transition hover:border-primary/40">    
      <div>    
        <span className={`material-symbols-outlined ${iconColor} text-4xl`}>    
          {icon}    
        </span>    
        <h3 className="text-xl font-bold mt-4">{title}</h3>    
        <p className="text-slate-400 text-sm mt-2">{description}</p>    
      </div>    
    
      {selectedExam !== examKey ? (    
        <button    
          onClick={() => setSelectedExam(examKey)}    
          className="mt-6 bg-primary h-10 rounded-lg font-bold hover:opacity-90 transition"    
        >    
          Select    
        </button>    
      ) : (    
        <div className="mt-6 space-y-2">    
          {examSubjects[examKey].map((subject) => {    
            const normalized = normalizeSubject(subject);

            return (
              <Link    
                key={subject}    
                to={`/quiz/${examKey}/${normalized}`}    
                onClick={() => startQuiz(examKey, subject)}    
                className="block bg-primary h-10 rounded-lg font-bold flex items-center justify-center hover:opacity-90 transition"    
              >    
                {subject}    
              </Link>    
            );
          })}    
        </div>    
      )}    
    </div>    
  );    
    
  return (    
    <div className="bg-background-dark text-white min-h-screen font-display">    
      <Navbar />    
    
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-20">    
        <div className="mb-10">    
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Quiz Master</h1>    
          <p className="text-slate-400 max-w-2xl">    
            Choose your competitive exam and start your journey towards excellence.    
          </p>    
        </div>    
    
        <div className="mb-16">    
          <div className="relative rounded-2xl overflow-hidden bg-[#1c2127] shadow-2xl border border-white/10">    
            <div className="relative grid md:grid-cols-2 gap-10 p-10 items-center">    
              <div className="relative hidden md:flex items-center justify-center">    
                <div className="absolute w-72 h-72 rounded-full border border-blue-500/20 animate-spin-slow" />    
                <div className="absolute w-48 h-48 rounded-full border border-white/10" />    
    
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/20 backdrop-blur">    
                  <span    
                    className={`material-symbols-outlined text-4xl ${visuals[activeIndex].color}`}    
                  >    
                    {visuals[activeIndex].icon}    
                  </span>    
                </div>    
              </div>    
    
              <div>    
                <span className="inline-block mb-4 px-4 py-1 text-xs font-bold tracking-widest rounded-full bg-primary/20 text-primary">    
                  PREP MODE ACTIVE    
                </span>    
    
                <h2 className="text-4xl md:text-5xl font-black mb-6">    
                  {headlines[activeIndex].split(" ").slice(0, -1).join(" ")}{" "}    
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-purple">    
                    {headlines[activeIndex].split(" ").slice(-1)}    
                  </span>    
                </h2>    
    
                <p className="text-white/60 italic max-w-xl">    
                  “{quotes[activeIndex]}”    
                </p>    
              </div>    
            </div>    
          </div>    
        </div>    
    
        <h2 className="text-2xl font-bold mb-6">All Competitive Exams</h2>    
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">    
          {renderExamCard("jee","JEE Main & Advanced","IIT & NIT entrance preparation.","engineering","text-primary")}    
          {renderExamCard("neet","NEET (UG)","Medical entrance preparation.","medical_services","text-teal-accent")}    
          {renderExamCard("cet","CET","Karnataka CET preparation.","school","text-primary")}    
        </div>    
      </main>    
    
      <footer className="border-t border-white/10 py-8 text-center text-white/40">    
        © 2026 Quiz Master. All rights reserved.    
      </footer>    
    </div>    
  );    
}
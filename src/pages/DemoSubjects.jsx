import { useParams, useNavigate } from "react-router-dom";
import { demoQuestions } from "../data/demoQuestions";

export default function DemoSubjects() {
  const { exam } = useParams();
  const navigate = useNavigate();

  const examKey = exam?.toLowerCase();
  const examData = demoQuestions[examKey];

  if (!examData) {
    return (
      <div className="min-h-screen bg-background-dark text-white flex items-center justify-center text-xl">
        Invalid Exam
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-white px-6 py-16 overflow-hidden">
      
      {/* ================= HEADER ================= */}
      <div className="max-w-4xl mx-auto text-center mb-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
          {examKey} Demo Subjects
        </h1>
        <p className="text-white/60">
          Choose a subject and experience the real exam feel
        </p>
      </div>

      {/* ================= ANIMATION SECTION ================= */}
      <div className="relative flex justify-center mb-14">
        {/* Glow */}
        <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />

        {/* Floating Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Study Animation"
          className="relative w-40 md:w-52 animate-float"
        />
      </div>

      {/* ================= SUBJECT LIST ================= */}
      <div className="max-w-md mx-auto space-y-5">
        {Object.keys(examData).map((subject, index) => (
          <button
            key={subject}
            onClick={() => navigate(`/demo/${examKey}/${subject}`)}
            className="w-full glass-card py-5 rounded-2xl font-bold text-xl uppercase
                       hover:scale-105 hover:bg-primary/20 transition-all duration-300
                       animate-slide-up"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function DemoHome() {
  const navigate = useNavigate();
  const exams = ["neet", "jee", "cet"];

  return (
    <div className="min-h-screen bg-background-dark text-white p-10">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Try Free Demo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {exams.map((exam) => (
          <div
            key={exam}
            onClick={() => navigate(`/demo/${exam}`)}
            className="bg-[#1c2127] p-8 rounded-xl text-center cursor-pointer hover:bg-primary/20 hover:scale-105 transition"
          >
            <h2 className="text-2xl font-bold uppercase">{exam}</h2>
            <p className="text-white/60 mt-2">
              5 Questions • 2.5 Minutes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

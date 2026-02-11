import { useState } from "react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="min-h-screen bg-[#070B1F] text-white flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0D1228] p-6 border-r border-white/10">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <div className="space-y-4">
          <button
            onClick={() => setActiveTab("add")}
            className={`block w-full text-left p-3 rounded-xl ${
              activeTab === "add"
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : "hover:bg-white/10"
            }`}
          >
            Add Question
          </button>

          <button
            onClick={() => setActiveTab("view")}
            className={`block w-full text-left p-3 rounded-xl ${
              activeTab === "view"
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : "hover:bg-white/10"
            }`}
          >
            View Questions
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`block w-full text-left p-3 rounded-xl ${
              activeTab === "stats"
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : "hover:bg-white/10"
            }`}
          >
            Stats
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">
        {activeTab === "add" && <AddQuestion />}
        {activeTab === "view" && <ViewQuestions />}
        {activeTab === "stats" && <Stats />}
      </div>
    </div>
  );
}

/* ================= ADD QUESTION ================= */

function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [exam, setExam] = useState("NEET");

  const handleSubmit = () => {
    alert("Question saved (backend later)");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add Question</h1>

      <select
        value={exam}
        onChange={(e) => setExam(e.target.value)}
        className="mb-4 p-3 rounded bg-[#0D1228] border border-white/20"
      >
        <option>NEET</option>
        <option>CET</option>
        <option>JEE</option>
      </select>

      <textarea
        placeholder="Enter Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-4 rounded bg-[#0D1228] border border-white/20 mb-4"
      />

      <button
        onClick={handleSubmit}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"
      >
        Save Question
      </button>
    </div>
  );
}

/* ================= VIEW QUESTIONS ================= */

function ViewQuestions() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Questions</h1>
      <p className="text-white/50">
        Questions will appear here after backend connection.
      </p>
    </div>
  );
}

/* ================= STATS ================= */

function Stats() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Platform Stats</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-2xl">
          <h2>Total Users</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <h2>Total Questions</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <h2>Active Exams</h2>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>
      </div>
    </div>
  );
}

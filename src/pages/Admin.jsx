import React, { useState } from "react";  
import axios from "axios";  
import { Home, FileText, BarChart3, Trophy, Zap } from "lucide-react";  
import { useNavigate } from "react-router-dom";  
  
export default function Admin() {  
  const navigate = useNavigate();  
  
  const [selectedExam, setSelectedExam] = useState("");  
  const [subjects, setSubjects] = useState([]);  
  const [selectedSubject, setSelectedSubject] = useState("");  
  const [file, setFile] = useState(null);  
  const [loading, setLoading] = useState(false);  
  
  const handleExamChange = (exam) => {  
    setSelectedExam(exam);  
    setSelectedSubject("");  
  
    if (exam === "CET") {  
      setSubjects(["physics", "chemistry", "mathematics", "biology"]);  
    } else if (exam === "NEET") {  
      setSubjects(["physics", "chemistry", "biology"]);  
    } else if (exam === "JEE") {  
      setSubjects(["physics", "chemistry", "mathematics"]);  
    } else {  
      setSubjects([]);  
    }  
  };  
  
  const handleGenerate = async () => {  
    if (!selectedExam || !selectedSubject || !file) {  
      alert("Please fill all fields");  
      return;  
    }  
  
    const formData = new FormData();  
    formData.append("examType", selectedExam);  
    formData.append("subject", selectedSubject); // already lowercase  
    formData.append("file", file);  
  
    try {  
      setLoading(true);  
  
      const response = await axios.post(  
        "http://localhost:5000/api/admin/upload-exam",  
        formData  
      );  
  
      if (response.status >= 200 && response.status < 300) {  
        alert("MCQs Generated Successfully 🚀");  
  
        setFile(null);  
        setSelectedExam("");  
        setSelectedSubject("");  
        setSubjects([]);  
  
        navigate("/quizzes");  
      } else {  
        alert("Upload Failed ❌");  
      }  
    } catch (error) {  
      console.error("Upload error:", error.response?.data || error.message);  
      alert(error.response?.data?.message || "Upload Failed ❌");  
    } finally {  
      setLoading(false);  
    }  
  };  
  
  return (  
    <div  
      className="flex min-h-screen text-white"  
      style={{  
        background: "linear-gradient(135deg, #071b1b 0%, #0d2f2f 100%)",  
      }}  
    >  
      {/* SIDEBAR */}  
      <div className="w-64 bg-[#081f1f] border-r border-[#123737] p-6 flex flex-col justify-between">  
        <div>  
          <h1 className="text-xl font-bold mb-8">  
            Quiz Master <br />  
            <span className="text-[#20e3e3] text-sm">ADMIN PANEL</span>  
          </h1>  
  
          <nav className="space-y-4">  
            <SidebarItem icon={<Home size={18} />} text="Dashboard" onClick={() => navigate("/admin")} />  
            <SidebarItem icon={<FileText size={18} />} text="Quizzes" active onClick={() => navigate("/quizzes")} />  
            <SidebarItem icon={<BarChart3 size={18} />} text="Results" onClick={() => navigate("/results")} />  
            <SidebarItem icon={<Trophy size={18} />} text="Leaderboard" onClick={() => navigate("/leaderboard")} />  
          </nav>  
        </div>  
  
        <div className="bg-[#0f2a2a] p-3 rounded-xl border border-[#1e4d4d]">  
          <p className="text-sm font-semibold">Admin</p>  
          <p className="text-xs text-[#20e3e3]">Profile</p>  
        </div>  
      </div>  
  
      {/* MAIN */}  
      <div className="flex-1 p-10">  
        <div className="grid grid-cols-4 gap-6 mb-10">  
          <StatCard title="TOTAL EXAMS" value="3" change="+0%" />  
          <StatCard title="ACTIVE STUDENTS" value="45,200" change="+5%" />  
          <StatCard title="AVG SCORE" value="72.4%" change="-2%" />  
          <StatCard title="AI QUESTIONS" value="12,402" change="+24%" />  
        </div>  
  
        <div className="grid grid-cols-2 gap-8">  
          {/* MCQ GENERATOR */}  
          <div className="bg-[#0f2a2a] p-10 rounded-3xl border border-[#1e4d4d] min-h-[600px]">  
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">  
              <Zap size={22} className="text-[#20e3e3]" />  
              Auto MCQ Generator  
            </h3>  
  
            {/* EXAM */}  
            <div className="mb-6">  
              <label className="text-sm text-gray-400 block mb-2">Select Exam Type</label>  
              <select  
                value={selectedExam}  
                onChange={(e) => handleExamChange(e.target.value)}  
                className="w-full bg-[#0b1f1f] border border-[#1e4d4d] rounded-xl p-4 outline-none focus:border-[#20e3e3]"  
              >  
                <option value="">Choose Exam</option>  
                <option value="CET">CET</option>  
                <option value="NEET">NEET</option>  
                <option value="JEE">JEE</option>  
              </select>  
            </div>  
  
            {/* SUBJECT */}  
            {subjects.length > 0 && (  
              <div className="mb-6">  
                <label className="text-sm text-gray-400 block mb-2">Select Subject</label>  
                <select  
                  value={selectedSubject}  
                  onChange={(e) => setSelectedSubject(e.target.value)}  
                  className="w-full bg-[#0b1f1f] border border-[#1e4d4d] rounded-xl p-4 outline-none focus:border-[#20e3e3]"  
                >  
                  <option value="">Choose Subject</option>  
                  {subjects.map((subject, index) => (  
                    <option key={index} value={subject}>  
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}  
                    </option>  
                  ))}  
                </select>  
              </div>  
            )}  
  
            {/* FILE */}  
            <div className="mb-6">  
              <label className="text-sm text-gray-400 block mb-2">Upload Question Paper (PDF)</label>  
              <input  
                type="file"  
                accept=".pdf"  
                onChange={(e) => setFile(e.target.files[0])}  
                className="w-full bg-[#0b1f1f] border border-[#1e4d4d] rounded-xl p-4"  
              />  
            </div>  
  
            <button  
              onClick={handleGenerate}  
              disabled={loading}  
              className="w-full bg-[#20e3e3] hover:bg-[#18cfcf] text-black py-4 rounded-xl font-semibold text-lg transition duration-300 disabled:opacity-50"  
            >  
              {loading ? "Generating..." : "GENERATE MCQs NOW"}  
            </button>  
          </div>  
  
          {/* RECENT RESULTS */}  
          <div className="bg-[#0f2a2a] p-8 rounded-3xl border border-[#1e4d4d]">  
            <h3 className="text-xl font-semibold mb-6">Recent Quiz Results</h3>  
  
            <div className="space-y-5 text-sm">  
              <ResultRow title="JEE Examination" candidates="4,281" status="LIVE" score="9.4" />  
              <ResultRow title="CET Examination" candidates="3,120" status="SCHEDULED" score="8.7" />  
              <ResultRow title="NEET Examination" candidates="6,540" status="COMPLETED" score="9.1" />  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
}  
  
function SidebarItem({ icon, text, active, onClick }) {  
  return (  
    <div  
      onClick={onClick}  
      className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition ${  
        active  
          ? "bg-[#0e3b3b] border border-[#20e3e3] shadow-[0_0_12px_rgba(32,227,227,0.4)]"  
          : "hover:bg-[#123737]"  
      }`}  
    >  
      {icon}  
      <span>{text}</span>  
    </div>  
  );  
}  
  
function StatCard({ title, value, change }) {  
  return (  
    <div className="bg-[#0f2a2a] p-6 rounded-2xl border border-[#1e4d4d]">  
      <p className="text-xs text-gray-400">{title}</p>  
      <div className="flex justify-between items-center mt-3">  
        <h2 className="text-3xl font-bold">{value}</h2>  
        <span className="text-[#20e3e3] text-sm">{change}</span>  
      </div>  
    </div>  
  );  
}  
  
function ResultRow({ title, candidates, status, score }) {  
  return (  
    <div className="flex justify-between items-center bg-[#0b1f1f] p-4 rounded-xl border border-[#123737]">  
      <div>  
        <p className="font-medium">{title}</p>  
        <p className="text-gray-400 text-xs">{candidates} Candidates</p>  
      </div>  
      <div className="text-[#20e3e3] text-sm">{status}</div>  
      <div className="font-semibold">{score}</div>  
    </div>  
  );  
}
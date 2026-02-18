import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// MAIN PAGES
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Quizzes from "./pages/Quizzes";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";

// ✅ REAL QUIZ PAGE (NEW)
import QuizPage from "./pages/QuizPage";
import DemoResult from "./pages/DemoResult";

// DEMO HOME
import DemoHome from "./pages/DemoHome";

// ADMIN
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>

        {/* DEFAULT */}
        <Route path="/" element={<Landing />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/home" element={<Home />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/results" element={<Results />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />

        {/* DEMO */}
        <Route path="/demo" element={<DemoHome />} />

        {/* ✅ REAL QUIZ ROUTE */}
        <Route path="/quiz/:examType/:subject" element={<QuizPage />} />
        <Route path="/result/:examType/:subject" element={<DemoResult />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;

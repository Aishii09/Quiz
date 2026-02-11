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

// DEMO
import DemoHome from "./pages/DemoHome";
import DemoQuiz from "./pages/DemoQuiz";
import DemoResult from "./pages/DemoResult";

// ADMIN (ONLY THIS)
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
        <Route path="/quiz/:quizId" element={<DemoQuiz />} />
        <Route path="/result/:quizId" element={<DemoResult />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;

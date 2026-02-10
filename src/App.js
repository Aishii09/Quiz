import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Quizzes from "./pages/Quizzes";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";

// DEMO / QUIZ FLOW
import DemoHome from "./pages/DemoHome";
import DemoQuiz from "./pages/DemoQuiz";
import DemoResult from "./pages/DemoResult";

function App() {
  return (
    <Router>
      <Routes>
        {/* AUTH & MAIN */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/results" element={<Results />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />

        {/* DEMO */}
        <Route path="/demo" element={<DemoHome />} />

        {/* QUIZ ROUTES (IMPORTANT) */}
        <Route path="/quiz/:quizId" element={<DemoQuiz />} />
        <Route path="/result/:quizId" element={<DemoResult />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
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
import DemoHome from "./pages/DemoHome";
import DemoSubjects from "./pages/DemoSubjects";
import DemoQuiz from "./pages/DemoQuiz";
import DemoResult from "./pages/DemoResult";
import ProtectedRoute from "./components/ProtectedRoute";
import Certificate from "./pages/Certificate";

function App() {
  const [currentUser, setCurrentUser] = useState(null); // ✅ inside component

  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />

        {/* PROTECTED ROUTES */}
        <Route path="/home" element={<ProtectedRoute currentUser={currentUser}><Home /></ProtectedRoute>} />
        <Route path="/quizzes" element={<ProtectedRoute currentUser={currentUser}><Quizzes /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute currentUser={currentUser}><Results /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute currentUser={currentUser}><Leaderboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute currentUser={currentUser}><Profile /></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute currentUser={currentUser}><Bookmarks /></ProtectedRoute>} />
<Route
  path="/certificate"
  element={
    <ProtectedRoute>
      <Certificate />
    </ProtectedRoute>
  }
/>
        {/* DEMO ROUTES */}
        <Route path="/demo" element={<DemoHome />} />
        <Route path="/demo/:exam" element={<DemoSubjects />} />
        <Route path="/demo/:exam/:subject" element={<DemoQuiz />} />
        <Route path="/result/:exam/:subject" element={<DemoResult />} />

      </Routes>
    </Router>
  );
}

export default App;

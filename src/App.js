<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// MAIN PAGES
=======
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



>>>>>>> ffd439699dd86b475521d74d97c7531ae9d792e6
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Quizzes from "./pages/Quizzes";
import Results from "./pages/Results";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";

// QUIZ PAGE
import QuizPage from "./pages/QuizPage";

// DEMO
import DemoHome from "./pages/DemoHome";
<<<<<<< HEAD
=======
import DemoSubjects from "./pages/DemoSubjects";
import DemoQuiz from "./pages/DemoQuiz";
import DemoResult from "./pages/DemoResult";
import Certificate from "./pages/Certificate";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
>>>>>>> ffd439699dd86b475521d74d97c7531ae9d792e6

// ADMIN
import Admin from "./pages/Admin";

function App() {
  // Track logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  

  // Check if user already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <Router>
    

      <Routes>

<<<<<<< HEAD
        {/* DEFAULT */}
        <Route path="/" element={<Landing />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/home" element={<Home />} />

        {/* QUIZ SELECTION PAGE */}
        <Route path="/quizzes" element={<Quizzes />} />

        {/* ✅ FIXED QUIZ ROUTES */}
        <Route path="/quiz/:examId/:subject" element={<QuizPage />} />
        <Route path="/quiz/:examId" element={<QuizPage />} />
        <Route path="/quiz" element={<QuizPage />} />

        <Route path="/results" element={<Results />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />

        {/* DEMO */}
        <Route path="/demo" element={<DemoHome />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

=======
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Home currentUser={currentUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quizzes"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Quizzes currentUser={currentUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Results currentUser={currentUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Leaderboard currentUser={currentUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Bookmarks currentUser={currentUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificate"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Certificate currentUser={currentUser} />
            </ProtectedRoute>
          }
        />

        {/* DEMO ROUTES */}
        <Route path="/demo" element={<DemoHome />} />
        <Route path="/demo/:exam" element={<DemoSubjects />} />
        <Route path="/demo/:exam/:subject" element={<DemoQuiz />} />
        <Route path="/result/:exam/:subject" element={<DemoResult />} />

>>>>>>> ffd439699dd86b475521d74d97c7531ae9d792e6
      </Routes>
    </Router>
  );
}

export default App;
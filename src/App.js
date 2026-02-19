import React, { useState, useEffect } from "react";
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
import Certificate from "./pages/Certificate";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";


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

      </Routes>
    </Router>
  );
}

export default App;

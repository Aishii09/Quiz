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




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/results" element={<Results />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/demo" element={<DemoHome />} />
        <Route path="/demo/:exam" element={<DemoSubjects />} />
        <Route path="/demo/:exam/:subject" element={<DemoQuiz />} />
        <Route path="/demo/result" element={<DemoResult />} />
        <Route path="/demo/:exam/start" element={<DemoQuiz />} />
<Route path="/demo/:exam/:subject" element={<DemoQuiz />} />

        
        
      </Routes>
    </Router>
  );
}

export default App;

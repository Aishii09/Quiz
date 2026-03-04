import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import axios from "axios";

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard from backend
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          "https://your-backend-name.onrender.com/api/attempt/leaderboard"
        );
        setTopUsers(res.data || []);
      } catch (err) {
        console.log("Error fetching leaderboard:", err);
        setTopUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const podium = [
    topUsers[0] || { name: "Rank 1", accuracy: "0%", points: "0" },
    topUsers[1] || { name: "Rank 2", accuracy: "0%", points: "0" },
    topUsers[2] || { name: "Rank 3", accuracy: "0%", points: "0" },
  ];

  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      <Navbar />

      <main className="px-6 py-20 flex justify-center">
        <div className="max-w-[1200px] w-full">
          {/* TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-between items-end gap-6 mb-14"
          >
            <div>
              <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Global Leaderboard
              </h1>
              <p className="text-white/60 text-lg">
                Real-time rankings of top performers
              </p>
            </div>

            <div className="text-right">
              <p className="text-primary text-2xl font-black">
                {topUsers.length}
              </p>
              <p className="text-xs uppercase text-white/50">Active Users</p>
            </div>
          </motion.div>

          {/* PODIUM */}
          <div className="grid grid-cols-3 gap-8 mb-16 items-end">
            <RankCard rank={2} {...podium[1]} />
            <RankCard rank={1} {...podium[0]} champion />
            <RankCard rank={3} {...podium[2]} />
          </div>

          {/* TABLE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-white/60 text-sm">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Participant</th>
                    <th className="px-6 py-4">Accuracy</th>
                    <th className="px-6 py-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-white/40">
                        Loading...
                      </td>
                    </tr>
                  ) : topUsers.length <= 3 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-white/40">
                        No other users yet
                      </td>
                    </tr>
                  ) : (
                    topUsers.slice(3).map((u, i) => (
                      <tr
                        key={i}
                        className="border-t border-white/10 hover:bg-white/5 transition"
                      >
                        <td className="px-6 py-4 font-bold">{u.rank}</td>
                        <td className="px-6 py-4">{u.name}</td>
                        <td className="px-6 py-4">{u.accuracy}</td>
                        <td className="px-6 py-4 text-right font-bold text-primary">
                          {u.points}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-white/40">
        © 2026 Quiz Master. All rights reserved.
      </footer>
    </div>
  );
}

/* ================= RANK CARD ================= */
function RankCard({ rank, name, accuracy, points, champion }) {
  const styles = {
    1: {
      bg: "from-[#2c2f1f] to-[#1a1c14]",
      border: "border-yellow-500",
      text: "text-yellow-400",
      badge: "👑",
    },
    2: {
      bg: "from-[#2a2a2a] to-[#1c1c1c]",
      border: "border-gray-400",
      text: "text-gray-300",
      badge: "🥈",
    },
    3: {
      bg: "from-[#2a1f1a] to-[#1c1410]",
      border: "border-orange-500",
      text: "text-orange-400",
      badge: "🥉",
    },
  };

  const current = styles[rank];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative rounded-2xl p-8 text-center border shadow-xl
        bg-gradient-to-br ${current.bg} ${current.border}
        ${champion ? "scale-110 shadow-yellow-500/30" : ""}
      `}
    >
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl">
        {current.badge}
      </div>

      <p className="text-sm uppercase tracking-widest text-white/60 mb-2">
        Rank #{rank}
      </p>

      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-sm text-white/50 mt-1">{accuracy} Accuracy</p>

      <div className={`mt-6 text-3xl font-black ${current.text}`}>
        {points} <span className="text-sm text-white/40 ml-1">PTS</span>
      </div>
    </motion.div>
  );
}
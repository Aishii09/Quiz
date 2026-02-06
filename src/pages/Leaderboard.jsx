import Navbar from "../components/Navbar";

export default function Leaderboard() {
  return (
    <div className="bg-background-dark text-white min-h-screen font-display">
      
      {/* HEADER */}
      <Navbar />

      {/* MAIN */}
      <main className="px-6 py-20 flex justify-center">
        <div className="max-w-[1200px] w-full">

          {/* TITLE */}
          <div className="flex flex-wrap justify-between items-end gap-6 mb-14">
            <div>
              <h1 className="text-5xl font-black tracking-tight">
                Global Leaderboard
              </h1>
              <p className="text-white/60 text-lg">
                Real-time rankings of top performers
              </p>
            </div>

            <div className="flex gap-10">
              <div className="text-right">
                <p className="text-primary text-2xl font-black">12,840</p>
                <p className="text-xs uppercase text-white/50">Active Users</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black">Top 5%</p>
                <p className="text-xs uppercase text-green-400">Your Status</p>
              </div>
            </div>
          </div>

          {/* PODIUM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <RankCard
              rank={2}
              name="Alex Rivera"
              accuracy="98.2%"
              points="14,205"
            />

            <RankCard
              rank={1}
              name="Sarah Jenkins"
              accuracy="99.8%"
              points="15,890"
              champion
            />

            <RankCard
              rank={3}
              name="David Chen"
              accuracy="97.5%"
              points="13,950"
            />
          </div>

          {/* TABLE */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-white/60 text-sm">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Participant</th>
                  <th className="px-6 py-4">Accuracy</th>
                  <th className="px-6 py-4">Time Avg</th>
                  <th className="px-6 py-4 text-right">Score</th>
                </tr>
              </thead>

              <tbody>
                {[
                  { r: 4, n: "Marcus Holloway", a: "95%", t: "12m 45s", s: "12,400" },
                  { r: 42, n: "You (AlphaUser)", a: "82%", t: "14m 20s", s: "8,240", highlight: true },
                  { r: 43, n: "Elena Rodriguez", a: "79%", t: "13m 55s", s: "8,195" },
                  { r: 44, n: "Kenji Sato", a: "76%", t: "15m 10s", s: "7,880" }
                ].map((u, i) => (
                  <tr
                    key={i}
                    className={`border-t border-white/10 ${
                      u.highlight ? "bg-primary/10" : "hover:bg-white/5"
                    }`}
                  >
                    <td className="px-6 py-4 font-bold">{u.r}</td>
                    <td className="px-6 py-4">{u.n}</td>
                    <td className="px-6 py-4">{u.a}</td>
                    <td className="px-6 py-4">{u.t}</td>
                    <td className="px-6 py-4 text-right font-bold text-primary">
                      {u.s}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center py-4 text-primary font-semibold cursor-pointer hover:underline">
              View Full Rankings ↓
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-white/40">
        © 2024 Quiz Master. All rights reserved.
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
      badge: "👑"
    },
    2: {
      bg: "from-[#2a2a2a] to-[#1c1c1c]",
      border: "border-gray-400",
      text: "text-gray-300",
      badge: "🥈"
    },
    3: {
      bg: "from-[#2a1f1a] to-[#1c1410]",
      border: "border-orange-500",
      text: "text-orange-400",
      badge: "🥉"
    }
  };

  const current = styles[rank];

  return (
    <div
      className={`relative rounded-2xl p-8 text-center border shadow-xl transition
        bg-gradient-to-br ${current.bg} ${current.border}
        ${champion ? "scale-110" : ""}
      `}
    >
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl">
        {current.badge}
      </div>

      <p className="text-sm uppercase tracking-widest text-white/60 mb-2">
        Rank #{rank}
      </p>

      <h3 className="text-xl font-bold">{name}</h3>

      <p className="text-sm text-white/50 mt-1">
        {accuracy} Accuracy
      </p>

      <div className={`mt-6 text-3xl font-black ${current.text}`}>
        {points}
        <span className="text-sm text-white/40 ml-1">PTS</span>
      </div>
    </div>
  );
}

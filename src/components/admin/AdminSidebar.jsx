export default function AdminSidebar() {
  return (
    <div className="w-64 bg-[#0c1719] p-6 flex flex-col justify-between">

      <div>
        <h1 className="text-xl font-bold mb-10">Quiz Master</h1>

        <ul className="space-y-4 text-gray-400">
          <li className="hover:text-white cursor-pointer">Home</li>
          <li className="text-cyan-400 font-semibold">Quizzes</li>
          <li className="hover:text-white cursor-pointer">Results</li>
          <li className="hover:text-white cursor-pointer">Leaderboard</li>
        </ul>
      </div>

      <div className="text-sm text-gray-500">
        Admin Panel
      </div>
    </div>
  );
}

export default function ResultsTable() {
  return (
    <div className="bg-[#162629] p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Recent Quiz Results</h3>

      <div className="space-y-4 text-gray-300">
        <div className="flex justify-between">
          <span>JEE Mock</span>
          <span className="text-green-400">LIVE</span>
        </div>

        <div className="flex justify-between">
          <span>AIMS 2024</span>
          <span className="text-blue-400">SCHEDULED</span>
        </div>

        <div className="flex justify-between">
          <span>UPSC Mock</span>
          <span className="text-red-400">COMPLETED</span>
        </div>
      </div>
    </div>
  );
}

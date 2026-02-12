export default function StatsCard({ title, value }) {
  return (
    <div className="bg-[#162629] p-6 rounded-xl shadow-lg">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      <div className="h-1 bg-cyan-500 mt-4 rounded"></div>
    </div>
  );
}

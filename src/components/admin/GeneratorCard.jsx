export default function GeneratorCard() {
  return (
    <div className="bg-[#162629] p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Auto MCQ Generator</h3>

      <textarea
        placeholder="Paste academic content here..."
        className="w-full h-32 bg-[#0f1c1f] p-3 rounded mb-4"
      />

      <button className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-semibold">
        Generate MCQs Now
      </button>
    </div>
  );
}

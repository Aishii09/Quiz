import { useEffect, useRef } from "react";

export default function Timer({ timeLeft, setTimeLeft, onTimeUp }) {
  const hasSubmitted = useRef(false);

  useEffect(() => {
    // 🔥 If time finished → auto submit only once
    if (timeLeft <= 0 && !hasSubmitted.current) {
      hasSubmitted.current = true;
      onTimeUp();
      return;
    }

    // ⏳ Countdown every 1 second
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // 🧹 Cleanup
    return () => clearInterval(interval);
  }, [timeLeft, setTimeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 rounded-xl shadow-lg border border-white/10">
      ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}

import { useEffect } from "react";

export default function Timer({ timeLeft, setTimeLeft, onTimeUp }) {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-lg font-bold bg-[#1c2127] px-4 py-2 rounded-lg border border-white/10">
      ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}

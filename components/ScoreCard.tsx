"use client";

interface Score {
  label: string;
  value: number;
  color: string;
}

interface Props {
  review: string;
}

function parseScores(review: string): Score[] {
  const map = [
    { label: "Readability", key: "Readability", color: "bg-blue-500" },
    { label: "Performance", key: "Performance", color: "bg-green-500" },
    { label: "Security", key: "Security", color: "bg-red-500" },
    { label: "Overall", key: "Overall", color: "bg-purple-500" },
  ];

  return map.map(({ label, key, color }) => {
    const regex = new RegExp(`${key}[:\\s]+([0-9]+)(?:\\/10)?`, "i");
    const match = review.match(regex);
    const value = match ? Math.min(10, parseInt(match[1])) : 0;
    return { label, value, color };
  });
}

function getVerdict(overall: number) {
  if (overall >= 9) return { text: "Excellent", color: "text-green-400" };
  if (overall >= 7) return { text: "Good", color: "text-blue-400" };
  if (overall >= 5) return { text: "Needs Work", color: "text-yellow-400" };
  return { text: "Poor", color: "text-red-400" };
}

export default function ScoreCard({ review }: Props) {
  const scores = parseScores(review);
  const overall = scores.find((s) => s.label === "Overall")?.value ?? 0;
  const verdict = getVerdict(overall);

  if (scores.every((s) => s.value === 0)) return null;

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-300">Code Scores</h3>
        <span className={`text-sm font-bold ${verdict.color}`}>{verdict.text}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {scores.map((score) => (
          <div key={score.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">{score.label}</span>
              <span className="text-white font-mono font-semibold">{score.value}/10</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${score.color}`}
                style={{ width: `${score.value * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-2">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2937" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#a855f7"
              strokeWidth="3"
              strokeDasharray={`${overall * 10}, 100`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-white">{overall}</span>
            <span className="text-[10px] text-gray-500">/ 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}


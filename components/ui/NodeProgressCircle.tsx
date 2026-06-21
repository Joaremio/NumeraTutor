"use client";

// <NodeProgressCircle /> — Circular progress indicator for domain nodes
interface NodeProgressCircleProps {
  proficiency: number; // 0–100
  size?: number;
  strokeWidth?: number;
  status: "locked" | "in_progress" | "completed";
}

export default function NodeProgressCircle({
  proficiency,
  size = 48,
  strokeWidth = 4,
  status,
}: NodeProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (proficiency / 100) * circumference;

  const colorMap = {
    locked: "#475569",
    in_progress: "#8B5CF6",
    completed: "#22C55E",
  };

  const color = colorMap[status];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1E293B"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {status === "locked" ? (
          <span className="text-slate-500" style={{ fontSize: size * 0.3 }}>🔒</span>
        ) : status === "completed" ? (
          <span className="text-emerald-400" style={{ fontSize: size * 0.3 }}>✓</span>
        ) : (
          <span
            className="font-bold tabular-nums"
            style={{ fontSize: size * 0.22, color }}
          >
            {proficiency}%
          </span>
        )}
      </div>
    </div>
  );
}

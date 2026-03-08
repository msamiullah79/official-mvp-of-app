import { currentUser, subjects } from "@/data/mockData";

const ProblemsSolved = () => {
  const total = currentUser.totalSolved;
  const available = currentUser.totalAvailable;
  const pct = (total / available) * 100;

  // SVG ring
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate subject segments
  const subjectAngles = subjects.map((s) => ({
    ...s,
    pct: (s.solved / available) * 100,
  }));

  let cumulativeOffset = 0;

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Problems Solved
      </h3>
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="-rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
            />
            {/* Subject segments */}
            {subjectAngles.map((s) => {
              const segmentLength = (s.pct / 100) * circumference;
              const offset = circumference - (cumulativeOffset / 100) * circumference;
              cumulativeOffset += s.pct;
              return (
                <circle
                  key={s.slug}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{total}</span>
            <span className="text-xs text-muted-foreground">/ {available} solved</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-6 w-full">
          {subjects.map((s) => (
            <div key={s.slug} className="text-center p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
              <span className="text-lg font-bold text-foreground">{s.solved}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemsSolved;

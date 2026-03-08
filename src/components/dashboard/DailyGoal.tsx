import { Target } from "lucide-react";

const DAILY_GOAL = 20;
const COMPLETED = 12; // mock

const DailyGoal = () => {
  const pct = Math.round((COMPLETED / DAILY_GOAL) * 100);

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Daily Goal
        </h3>
      </div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-2xl font-bold text-foreground">{COMPLETED}</span>
        <span className="text-sm text-muted-foreground">/ {DAILY_GOAL} MCQs</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full gradient-orange transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default DailyGoal;

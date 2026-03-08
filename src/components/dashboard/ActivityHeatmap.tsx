import { useMemo, useState } from "react";
import { generateHeatmapData } from "@/data/mockData";
import { BookOpen, Target, Clock } from "lucide-react";

const ActivityHeatmap = () => {
  const data = useMemo(() => generateHeatmapData(), []);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 5) return 1;
    if (count <= 10) return 2;
    if (count <= 20) return 3;
    return 4;
  };

  const weeks: { date: string; count: number }[][] = [];
  let currentWeek: { date: string; count: number }[] = [];

  data.forEach((d, i) => {
    const dayOfWeek = new Date(d.date).getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(d);
    if (i === data.length - 1) weeks.push(currentWeek);
  });

  const totalSolved = data.reduce((s, d) => s + d.count, 0);

  // Weekly stats (last 7 days)
  const last7 = data.slice(-7);
  const weekSolved = last7.reduce((s, d) => s + d.count, 0);
  const weekActive = last7.filter(d => d.count > 0).length;
  const avgPerDay = weekActive > 0 ? Math.round(weekSolved / weekActive) : 0;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  return (
    <div className="glass-card p-5 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Activity
        </h3>
        <span className="text-xs text-muted-foreground">
          {totalSolved} questions in the last year
        </span>
      </div>

      {/* Weekly stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-1.5 mb-1">
            <BookOpen className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">This Week</span>
          </div>
          <p className="text-lg font-bold text-foreground">{weekSolved}</p>
          <p className="text-[10px] text-muted-foreground">questions solved</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg / Day</span>
          </div>
          <p className="text-lg font-bold text-foreground">{avgPerDay}</p>
          <p className="text-[10px] text-muted-foreground">questions</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Active Days</span>
          </div>
          <p className="text-lg font-bold text-foreground">{weekActive}/7</p>
          <p className="text-[10px] text-muted-foreground">this week</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-[720px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-[11px] h-[11px] rounded-[2px] heatmap-${getLevel(day.count)} transition-colors cursor-pointer hover:ring-1 hover:ring-foreground/30`}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const parent = e.currentTarget.closest('.glass-card')?.getBoundingClientRect();
                    if (parent) {
                      setTooltip({
                        x: rect.left - parent.left + rect.width / 2,
                        y: rect.top - parent.top - 8,
                        text: `${day.count} questions solved on ${formatDate(day.date)}`,
                      });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {tooltip && (
        <div
          className="absolute z-50 px-3 py-1.5 rounded-md bg-popover border border-border text-xs text-popover-foreground shadow-lg pointer-events-none whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.text}
        </div>
      )}
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-[10px] text-muted-foreground">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div key={level} className={`w-[11px] h-[11px] rounded-[2px] heatmap-${level}`} />
        ))}
        <span className="text-[10px] text-muted-foreground">More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;

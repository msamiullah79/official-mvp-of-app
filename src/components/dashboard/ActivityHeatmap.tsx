import { useMemo } from "react";
import { generateHeatmapData } from "@/data/mockData";

const ActivityHeatmap = () => {
  const data = useMemo(() => generateHeatmapData(), []);

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 10) return 3;
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

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Activity
        </h3>
        <span className="text-xs text-muted-foreground">
          {totalSolved} questions in the last year
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-[720px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-[11px] h-[11px] rounded-[2px] heatmap-${getLevel(day.count)} transition-colors`}
                  title={`${day.date}: ${day.count} questions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
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

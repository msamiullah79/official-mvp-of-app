import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { subjects } from "@/data/mockData";

const subjectColorMap: Record<string, string> = {
  Anatomy: "bg-anatomy",
  Physiology: "bg-physiology",
  Biochemistry: "bg-biochemistry",
};

// Mock accuracy & trend data per subject
const subjectMeta: Record<string, { accuracy: number; trend: "up" | "down" | "flat" }> = {
  Anatomy: { accuracy: 74, trend: "up" },
  Physiology: { accuracy: 81, trend: "up" },
  Biochemistry: { accuracy: 62, trend: "down" },
};

const SubjectProgress = () => {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Subjects Progress
      </h3>
      <div className="space-y-2">
        {subjects.map((subject) => {
          const pct = Math.round((subject.solved / subject.total) * 100);
          const meta = subjectMeta[subject.name] || { accuracy: 0, trend: "flat" };
          return (
            <button
              key={subject.slug}
              onClick={() => navigate(`/practice?subject=${subject.name}`)}
              className="w-full p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group text-left"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${subjectColorMap[subject.name]}`} />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {subject.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Solved: {subject.solved} / {subject.total}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden mb-1.5">
                <div
                  className={`h-full rounded-full ${subjectColorMap[subject.name]}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  Accuracy: <span className="font-medium text-foreground">{meta.accuracy}%</span>
                </span>
                <div className="flex items-center gap-0.5">
                  {meta.trend === "up" && <TrendingUp className="w-3 h-3 text-success" />}
                  {meta.trend === "down" && <TrendingDown className="w-3 h-3 text-destructive" />}
                  {meta.trend === "flat" && <Minus className="w-3 h-3 text-muted-foreground" />}
                  <span className={`text-xs font-medium ${
                    meta.trend === "up" ? "text-success" : meta.trend === "down" ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    {meta.trend === "up" ? "Improving" : meta.trend === "down" ? "Declining" : "Stable"}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectProgress;

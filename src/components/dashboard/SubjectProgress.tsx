import { useNavigate } from "react-router-dom";
import { subjects } from "@/data/mockData";

const subjectColorMap: Record<string, string> = {
  Anatomy: "bg-anatomy",
  Physiology: "bg-physiology",
  Biochemistry: "bg-biochemistry",
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
          return (
            <button
              key={subject.slug}
              onClick={() => navigate(`/practice?subject=${subject.name}`)}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${subjectColorMap[subject.name]}`} />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {subject.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {subject.solved} / {subject.total}
                </span>
                <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${subjectColorMap[subject.name]}`}
                    style={{ width: `${pct}%` }}
                  />
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

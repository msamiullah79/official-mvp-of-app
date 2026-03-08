import { useNavigate } from "react-router-dom";
import { PlayCircle } from "lucide-react";

const mockSession = {
  module: "Cardiovascular System",
  subject: "Physiology",
  topic: "Cardiac Cycle",
  yearSlug: "year-1",
  moduleSlug: "cardiovascular",
  subjectSlug: "physiology",
  progress: 24,
  total: 60,
};

const ContinuePractice = () => {
  const navigate = useNavigate();
  const pct = Math.round((mockSession.progress / mockSession.total) * 100);

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Continue Practice
      </h3>
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm text-foreground font-medium">
            {mockSession.module} → {mockSession.subject} → {mockSession.topic}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-32 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full gradient-orange"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {mockSession.progress} / {mockSession.total}
            </span>
          </div>
        </div>
        <button
          onClick={() =>
            navigate(
              `/practice/${mockSession.yearSlug}/${mockSession.moduleSlug}/${mockSession.subjectSlug}/session?mode=practice`
            )
          }
          className="shrink-0 ml-4 px-4 py-2 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <PlayCircle className="w-4 h-4" />
          Resume
        </button>
      </div>
    </div>
  );
};

export default ContinuePractice;

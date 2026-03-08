import { Link } from "react-router-dom";
import { currentUser, catchUpStudents } from "@/data/mockData";

const CatchUpPanel = () => {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Catch Up
      </h3>
      <div className="space-y-2">
        {catchUpStudents.map((student, i) => {
          const gap = student.solved - currentUser.totalSolved;
          return (
            <Link
              key={i}
              to={`/profile/${student.username}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {student.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {student.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {student.solved} solved · <span className="text-destructive font-medium">{gap} ahead</span>
                </p>
              </div>
              <Link
                to="/practice"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 text-xs px-2.5 py-1 rounded-md gradient-orange text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Practice
              </Link>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CatchUpPanel;

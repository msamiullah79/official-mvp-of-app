import { Link } from "react-router-dom";
import { currentUser, catchUpStudents } from "@/data/mockData";

const CatchUpPanel = () => {
  // Filter to only show students from the same college
  const samCollegePeers = catchUpStudents.filter(
    (student) => student.university === currentUser.university.replace("King Edward Medical University", "KEMU")
  );

  // Fallback: if no exact match, show all (for mock data flexibility)
  const peers = samCollegePeers.length > 0 ? samCollegePeers : catchUpStudents;

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Catch Your College Peers
      </h3>
      <div className="space-y-2">
        {peers.map((student, i) => {
          const gap = student.solved - currentUser.totalSolved;
          return (
            <div
              key={i}
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
                to={`/profile/${student.username}`}
                className="shrink-0 text-xs px-2.5 py-1 rounded-md bg-secondary text-foreground font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                See Profile
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatchUpPanel;

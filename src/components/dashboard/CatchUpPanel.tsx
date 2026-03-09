import { Link } from "react-router-dom";
import { currentUser, catchUpStudents } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const CatchUpPanel = () => {
  // Filter to students from the same college who are ahead
  const collegePeers = catchUpStudents
    .filter(
      (student) =>
        student.university === currentUser.college &&
        student.solved > currentUser.totalSolved
    )
    .sort((a, b) => a.solved - b.solved) // Sort by closest ahead first
    .slice(0, 3); // Take top 3

  if (collegePeers.length === 0) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Catch Your College Peers
        </h3>
        <p className="text-sm text-muted-foreground">
          You're leading! No peers ahead of you right now.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Catch Your College Peers
      </h3>
      <div className="space-y-2">
        {collegePeers.map((student) => {
          const gap = student.solved - currentUser.totalSolved;
          const initials = student.name
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <div
              key={student.username}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {student.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {student.solved} solved ·{" "}
                  <span className="text-destructive font-medium">
                    {gap} ahead
                  </span>
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

import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Trophy, Globe, Flame } from "lucide-react";
import { currentUser, catchUpStudents } from "@/data/mockData";

const RankingPanel = () => {
  return (
    <div className="space-y-4">
      {/* College Ranking */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            College Rank
          </h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">
            #{currentUser.collegeRank}
          </span>
          <span className="text-sm text-muted-foreground">
            / {currentUser.collegeTotalStudents}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {currentUser.university}
        </p>
        <div className="flex items-center gap-1 mt-2">
          {currentUser.rankChange > 0 ? (
            <>
              <TrendingUp className="w-3.5 h-3.5 text-success" />
              <span className="text-xs font-medium text-success">+{currentUser.rankChange}</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-3.5 h-3.5 text-destructive" />
              <span className="text-xs font-medium text-destructive">{currentUser.rankChange}</span>
            </>
          )}
        </div>
      </div>

      {/* Global Ranking */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Global Rank
          </h3>
        </div>
        <span className="text-3xl font-bold text-foreground">#{currentUser.globalRank}</span>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Percentile</span>
            <span>Top {100 - currentUser.percentile}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full gradient-orange transition-all duration-700"
              style={{ width: `${currentUser.percentile}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            You are in the top {100 - currentUser.percentile}% of students
          </p>
        </div>
      </div>

      {/* Catch Up */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Catch Up
        </h3>
        <div className="space-y-3">
          {catchUpStudents.map((student, i) => (
            <Link
              key={i}
              to={`/profile/${student.username}`}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {student.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {student.name}
                </p>
                <p className="text-xs text-muted-foreground">{student.solved} solved</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Flame className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-foreground">{student.streak}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingPanel;

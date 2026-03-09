import { useNavigate } from "react-router-dom";
import { Trophy, Globe, TrendingUp, TrendingDown } from "lucide-react";
import { currentUser } from "@/data/mockData";

const RankCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* College Rank */}
      <div 
        className="glass-card p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
        onClick={() => navigate("/leaderboard?view=college")}
      >
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            College Rank
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-foreground">#{currentUser.collegeRank}</span>
          <span className="text-sm text-muted-foreground">/ {currentUser.collegeTotalStudents}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {currentUser.rankChange > 0 ? (
            <>
              <TrendingUp className="w-3 h-3 text-success" />
              <span className="text-xs font-medium text-success">+{currentUser.rankChange}</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-3 h-3 text-destructive" />
              <span className="text-xs font-medium text-destructive">{currentUser.rankChange}</span>
            </>
          )}
        </div>
      </div>

      {/* Global Rank */}
      <div 
        className="glass-card p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
        onClick={() => navigate("/leaderboard?view=global")}
      >
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Global Rank
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-foreground">#{currentUser.globalRank}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Top {100 - currentUser.percentile}% of {currentUser.globalTotal.toLocaleString()} students
        </p>
      </div>
    </div>
  );
};

export default RankCards;

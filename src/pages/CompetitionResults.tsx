import { useNavigate, useParams, useLocation } from "react-router-dom";
import { competitions, generateCompetitionLeaderboard, currentUser } from "@/data/mockData";
import { Trophy, Target, Clock, Users, Medal, ChevronRight, Home, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface ResultState {
  score: number;
  accuracy: number;
  timeTaken: number;
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
}

const CompetitionResults = () => {
  const navigate = useNavigate();
  const { competitionId } = useParams();
  const location = useLocation();
  
  const competition = competitions.find(c => c.id === competitionId);
  const resultState = location.state as ResultState | null;
  
  // Generate mock leaderboard with user included
  const leaderboard = generateCompetitionLeaderboard(competitionId || "");
  
  // Calculate user's estimated rank based on score
  const userRank = resultState 
    ? Math.max(1, leaderboard.filter(u => u.score > resultState.score).length + 1)
    : 50;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (!competition || !resultState) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <p className="text-muted-foreground">Results not found.</p>
        <button onClick={() => navigate("/compete")} className="mt-4 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm">
          Back to Competitions
        </button>
      </div>
    );
  }

  const typeLabels = {
    daily: "Daily Challenge",
    weekly: "Weekly Contest",
    topic: "Topic Battle",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-orange mb-4">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">{typeLabels[competition.type]} Complete!</h1>
        <p className="text-muted-foreground">{competition.title}</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="glass-card p-4 text-center">
          <Medal className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">#{userRank}</p>
          <p className="text-xs text-muted-foreground">Your Rank</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Trophy className="w-6 h-6 text-gold mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{resultState.score}</p>
          <p className="text-xs text-muted-foreground">Score</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Target className="w-6 h-6 text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{resultState.accuracy}%</p>
          <p className="text-xs text-muted-foreground">Accuracy</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{formatTime(resultState.timeTaken)}</p>
          <p className="text-xs text-muted-foreground">Time Taken</p>
        </div>
      </motion.div>

      {/* Detailed Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 mb-8"
      >
        <h2 className="font-semibold text-foreground mb-4">Performance Breakdown</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-success">{resultState.correct}</p>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-destructive">{resultState.incorrect}</p>
            <p className="text-xs text-muted-foreground">Incorrect</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gold">{resultState.skipped}</p>
            <p className="text-xs text-muted-foreground">Skipped</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Questions</span>
            <span className="text-foreground font-medium">{resultState.total}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-muted-foreground">Participants</span>
            <span className="text-foreground font-medium">{competition.participants.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Top 10 Leaderboard
          </h2>
          <button 
            onClick={() => navigate("/leaderboard")}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            View Full <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        
        <div className="space-y-2">
          {leaderboard.slice(0, 10).map((user, i) => {
            const isCurrentUser = user.username === currentUser.username || i + 1 === userRank;
            return (
              <div 
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isCurrentUser ? "bg-primary/10 border border-primary/30" : "bg-secondary/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0 ? "bg-gold text-gold-foreground" :
                    i === 1 ? "bg-silver text-silver-foreground" :
                    i === 2 ? "bg-bronze text-bronze-foreground" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </span>
                  <span className={`text-sm ${isCurrentUser ? "font-semibold text-foreground" : "text-foreground"}`}>
                    {isCurrentUser && i + 1 !== userRank ? currentUser.name : user.name}
                    {isCurrentUser && <span className="text-primary ml-1">(You)</span>}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{user.accuracy}%</span>
                  <span className="font-semibold text-foreground">{user.score} pts</span>
                </div>
              </div>
            );
          })}
          
          {/* Show user if not in top 10 */}
          {userRank > 10 && (
            <>
              <div className="text-center text-muted-foreground text-xs py-2">• • •</div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {userRank}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {currentUser.name} <span className="text-primary">(You)</span>
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{resultState.accuracy}%</span>
                  <span className="font-semibold text-foreground">{resultState.score} pts</span>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <button
          onClick={() => navigate("/compete")}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Competitions
        </button>
        {competition.type === "daily" && (
          <button
            onClick={() => navigate("/compete")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-orange text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again Tomorrow
          </button>
        )}
        {competition.type !== "daily" && (
          <button
            onClick={() => navigate("/leaderboard")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-orange text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <Trophy className="w-4 h-4" />
            View Full Leaderboard
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default CompetitionResults;

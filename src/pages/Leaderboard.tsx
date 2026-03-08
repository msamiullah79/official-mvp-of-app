import { useState } from "react";
import { leaderboardData } from "@/data/mockData";
import { Trophy, Flame } from "lucide-react";
import { motion } from "framer-motion";

const colleges = ["All", "KEMU", "Aga Khan", "AIMC", "Dow Medical"];

const Leaderboard = () => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? leaderboardData
    : leaderboardData.filter(u => u.college === filter);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">Leaderboard</h1>
      <p className="text-muted-foreground mb-6">See how you rank against other MBBS students.</p>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {colleges.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              filter === c
                ? "gradient-orange text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-muted-foreground font-medium">Rank</th>
                <th className="text-left p-4 text-muted-foreground font-medium">User</th>
                <th className="text-left p-4 text-muted-foreground font-medium">College</th>
                <th className="text-right p-4 text-muted-foreground font-medium">Solved</th>
                <th className="text-right p-4 text-muted-foreground font-medium">Accuracy</th>
                <th className="text-right p-4 text-muted-foreground font-medium">Streak</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <motion.tr
                  key={user.rank}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4">
                    {user.rank <= 3 ? (
                      <div className="w-7 h-7 rounded-full gradient-orange flex items-center justify-center">
                        <Trophy className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                    ) : (
                      <span className="text-muted-foreground font-mono">#{user.rank}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{user.college}</td>
                  <td className="p-4 text-right font-mono text-foreground">{user.solved}</td>
                  <td className="p-4 text-right font-mono text-foreground">{user.accuracy.toFixed(1)}%</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Flame className="w-3.5 h-3.5 text-primary" />
                      <span className="font-mono text-foreground">{user.streak}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

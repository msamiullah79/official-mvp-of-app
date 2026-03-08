import { Flame } from "lucide-react";
import { currentUser } from "@/data/mockData";

const StreakBanner = () => {
  return (
    <div className="glass-card p-4 flex items-center gap-3 glow-orange">
      <div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center shrink-0">
        <Flame className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <span className="text-2xl font-bold text-foreground">{currentUser.streak}</span>
        <span className="text-sm text-muted-foreground ml-1.5">Day Streak</span>
      </div>
    </div>
  );
};

export default StreakBanner;

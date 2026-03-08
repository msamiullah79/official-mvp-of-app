import ProfileCard from "@/components/dashboard/ProfileCard";
import SubjectProgress from "@/components/dashboard/SubjectProgress";
import ModuleProgress from "@/components/dashboard/ModuleProgress";
import RankCards from "@/components/dashboard/RankCards";
import ProblemsSolved from "@/components/dashboard/ProblemsSolved";
import ContinuePractice from "@/components/dashboard/ContinuePractice";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import CatchUpPanel from "@/components/dashboard/CatchUpPanel";
import { Flame } from "lucide-react";
import { currentUser } from "@/data/mockData";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Dashboard Header with Streak */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">{currentUser.streak}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
          {/* Left Column — Profile + Progress */}
          <div className="space-y-6">
            <ProfileCard />
            <SubjectProgress />
            <ModuleProgress />
          </div>

          {/* Right Column — Analytics + Activity */}
          <div className="space-y-6">
            <RankCards />
            <ProblemsSolved />
            <ContinuePractice />
            <CatchUpPanel />
            <ActivityHeatmap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

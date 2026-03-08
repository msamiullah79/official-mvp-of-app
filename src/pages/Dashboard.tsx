import StreakBanner from "@/components/dashboard/StreakBanner";
import DailyGoal from "@/components/dashboard/DailyGoal";
import QuickPractice from "@/components/dashboard/QuickPractice";
import RankCards from "@/components/dashboard/RankCards";
import SubjectProgress from "@/components/dashboard/SubjectProgress";
import ProblemsSolved from "@/components/dashboard/ProblemsSolved";
import WeakAreas from "@/components/dashboard/WeakAreas";
import ContinuePractice from "@/components/dashboard/ContinuePractice";
import CatchUpPanel from "@/components/dashboard/CatchUpPanel";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Top Row: Streak / Daily Goal / Quick Practice */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StreakBanner />
          <DailyGoal />
          <QuickPractice />
        </div>

        {/* Rank Cards */}
        <RankCards />

        {/* Middle Row: Subject Progress / Problems Solved */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SubjectProgress />
          <ProblemsSolved />
        </div>

        {/* Weak Areas + Continue Practice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeakAreas />
          <ContinuePractice />
        </div>

        {/* Bottom: Catch Up + Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CatchUpPanel />
          <ActivityHeatmap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

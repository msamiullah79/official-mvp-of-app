import ProfileCard from "@/components/dashboard/ProfileCard";
import SubjectProgress from "@/components/dashboard/SubjectProgress";
import WeakAreas from "@/components/dashboard/WeakAreas";
import StreakBanner from "@/components/dashboard/StreakBanner";
import DailyGoal from "@/components/dashboard/DailyGoal";
import QuickPractice from "@/components/dashboard/QuickPractice";
import RankCards from "@/components/dashboard/RankCards";
import ProblemsSolved from "@/components/dashboard/ProblemsSolved";
import ContinuePractice from "@/components/dashboard/ContinuePractice";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import CatchUpPanel from "@/components/dashboard/CatchUpPanel";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
          {/* Left Column — Profile + Progress */}
          <div className="space-y-6">
            <ProfileCard />
            <SubjectProgress />
            <WeakAreas />
          </div>

          {/* Right Column — Analytics + Activity */}
          <div className="space-y-6">
            {/* Streak + Daily Goal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StreakBanner />
              <DailyGoal />
            </div>

            <QuickPractice />
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

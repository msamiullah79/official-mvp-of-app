import ProfileCard from "@/components/dashboard/ProfileCard";
import SubjectProgress from "@/components/dashboard/SubjectProgress";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import ProblemsSolved from "@/components/dashboard/ProblemsSolved";
import RankingPanel from "@/components/dashboard/RankingPanel";

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1400px] mx-auto">
        {/* Left Panel */}
        <div className="lg:col-span-3 space-y-4">
          <ProfileCard />
          <SubjectProgress />
        </div>

        {/* Center Panel */}
        <div className="lg:col-span-6 space-y-4">
          <ActivityHeatmap />
          <ProblemsSolved />
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3">
          <RankingPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { currentUser, subjects } from "@/data/mockData";
import { MapPin, GraduationCap, Building, Trophy, Globe, Flame, Target } from "lucide-react";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";

const Profile = () => {
  const initials = currentUser.name.split(" ").map(n => n[0]).join("");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-full gradient-orange flex items-center justify-center text-3xl font-bold text-primary-foreground shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
            <p className="text-muted-foreground">@{currentUser.username}</p>
            <p className="text-sm text-secondary-foreground/70 italic mt-2">"{currentUser.bio}"</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-primary" />
                {currentUser.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-primary" />
                {currentUser.university}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                {currentUser.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Solved", value: currentUser.totalSolved, icon: Target, color: "text-primary" },
          { label: "Accuracy", value: `${currentUser.accuracy}%`, icon: Target, color: "text-success" },
          { label: "Global Rank", value: `#${currentUser.globalRank}`, icon: Globe, color: "text-primary" },
          { label: "College Rank", value: `#${currentUser.collegeRank}`, icon: Trophy, color: "text-primary" },
          { label: "Streak", value: currentUser.streak, icon: Flame, color: "text-primary" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <ActivityHeatmap />
    </div>
  );
};

export default Profile;

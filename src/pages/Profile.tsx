import { useParams } from "react-router-dom";
import { currentUser, subjects, getUserByUsername } from "@/data/mockData";
import { MapPin, GraduationCap, Building, Trophy, Globe, Flame, Target } from "lucide-react";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";

const Profile = () => {
  const { username } = useParams();
  const user = username ? getUserByUsername(username) : currentUser;

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">User not found</h1>
        <p className="text-muted-foreground">This profile doesn't exist.</p>
      </div>
    );
  }

  const initials = user.name.split(" ").map(n => n[0]).join("");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-full gradient-orange flex items-center justify-center text-3xl font-bold text-primary-foreground shrink-0">
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="text-sm text-secondary-foreground/70 italic mt-2">"{user.bio}"</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-primary" />
                {user.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-primary" />
                {user.university}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                {user.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total Solved", value: user.totalSolved, icon: Target, color: "text-primary" },
          { label: "Accuracy", value: `${user.accuracy}%`, icon: Target, color: "text-success" },
          { label: "Global Rank", value: `#${user.globalRank}`, icon: Globe, color: "text-primary" },
          { label: "College Rank", value: `#${user.collegeRank}`, icon: Trophy, color: "text-primary" },
          { label: "Streak", value: user.streak, icon: Flame, color: "text-primary" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <ActivityHeatmap />

      {/* Subject Progress Bars */}
      <div className="glass-card p-5 mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Subject Progress
        </h3>
        <div className="space-y-4">
          {subjects.map(s => {
            const pct = Math.round((s.solved / s.total) * 100);
            return (
              <div key={s.slug}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-sm text-foreground">{s.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{s.solved} / {s.total}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: s.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;

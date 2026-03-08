import { Link, useLocation } from "react-router-dom";
import { BookOpen, Trophy, BarChart3, User, Flame, GraduationCap } from "lucide-react";
import { currentUser } from "@/data/mockData";

const navItems = [
  { label: "Practice", path: "/practice", icon: BookOpen },
  { label: "Exam", path: "/exam", icon: GraduationCap },
  { label: "Compete", path: "/compete", icon: Trophy },
  { label: "Leaderboard", path: "/leaderboard", icon: BarChart3 },
  { label: "Profile", path: "/profile", icon: User },
];

const TopNav = () => {
  const location = useLocation();

  return (
    <header className="h-14 border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-orange flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-lg font-bold text-foreground">AcadRank</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path) ||
              (item.path === "/practice" && location.pathname === "/");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-sm">
            <Flame className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">{currentUser.streak}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">
              {currentUser.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;

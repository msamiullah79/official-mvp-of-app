import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, BarChart3, User } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Practice", path: "/practice", icon: BookOpen },
  { label: "Leaderboard", path: "/leaderboard", icon: BarChart3 },
  { label: "Profile", path: "/profile", icon: User },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-56 border-r border-border bg-card/40 shrink-0">
      <nav className="flex flex-col gap-1 p-3 pt-4">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path === "/practice" && location.pathname.startsWith("/practice"));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AppSidebar;

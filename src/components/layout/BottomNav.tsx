import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, GraduationCap, Trophy, User } from "lucide-react";

const bottomNavItems = [
  { label: "Home", path: "/", icon: LayoutDashboard },
  { label: "Practice", path: "/practice", icon: BookOpen },
  { label: "Exam", path: "/exam", icon: GraduationCap },
  { label: "Compete", path: "/compete", icon: Trophy },
  { label: "Profile", path: "/profile", icon: User },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-card/80 backdrop-blur-md safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {bottomNavItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/practice" && location.pathname.startsWith("/practice")) ||
            (item.path === "/exam" && location.pathname.startsWith("/exam")) ||
            (item.path === "/compete" && location.pathname.startsWith("/compete"));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-10 h-0.5 rounded-b-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

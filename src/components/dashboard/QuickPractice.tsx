import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

const QuickPractice = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/practice/year-1/musculoskeletal/anatomy/session?mode=practice&count=10&randomize=true")}
      className="glass-card p-4 flex items-center gap-3 hover:glow-orange transition-all duration-300 group w-full text-left"
    >
      <div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <Zap className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <span className="text-sm font-bold text-foreground">Quick Practice</span>
        <p className="text-xs text-muted-foreground">10 random MCQs</p>
      </div>
    </button>
  );
};

export default QuickPractice;

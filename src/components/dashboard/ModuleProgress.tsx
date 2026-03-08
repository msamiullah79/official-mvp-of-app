import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Target, BookOpen } from "lucide-react";
import { academicYears } from "@/data/curriculumData";
import { currentUser } from "@/data/mockData";

const getUserYearSlug = () => {
  const yearMatch = currentUser.year.match(/(\d)/);
  const yearNum = yearMatch ? parseInt(yearMatch[1]) : 1;
  return `year-${yearNum}`;
};

const ModuleProgress = () => {
  const navigate = useNavigate();
  const yearSlug = getUserYearSlug();
  const year = academicYears.find((y) => y.slug === yearSlug);
  const modules = year?.modules || [];

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Module Progress
        </h3>
        <span className="text-xs text-muted-foreground">{year?.name}</span>
      </div>
      <div className="space-y-2">
        {modules.map((mod) => {
          const pct = mod.mcqCount > 0 ? Math.round((mod.solved / mod.mcqCount) * 100) : 0;
          return (
            <button
              key={mod.slug}
              onClick={() => navigate(`/practice/${yearSlug}/${mod.slug}`)}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {mod.name}
                  </p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
                <Progress value={pct} className="h-1.5 mb-1.5" />
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {mod.solved} / {mod.mcqCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {mod.accuracy}%
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleProgress;

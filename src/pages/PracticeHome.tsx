import { Link } from "react-router-dom";
import { academicYears } from "@/data/curriculumData";
import { currentUser } from "@/data/mockData";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const getUserYearSlug = () => {
  const yearMatch = currentUser.year.match(/(\d)/);
  const yearNum = yearMatch ? parseInt(yearMatch[1]) : 1;
  return `year-${yearNum}`;
};

const PracticeHome = () => {
  const yearSlug = getUserYearSlug();
  const year = academicYears.find((y) => y.slug === yearSlug);
  const modules = year?.modules || [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-1">Practice</h1>
      <p className="text-muted-foreground mb-8">
        {year?.name} · Select a module to start practicing.
      </p>

      <div className="space-y-4">
        {modules.map((mod, i) => {
          const pct = mod.mcqCount > 0 ? Math.round((mod.solved / mod.mcqCount) * 100) : 0;

          return (
            <motion.div
              key={mod.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/practice/${yearSlug}/${mod.slug}`}
                className="glass-card p-5 flex items-center gap-5 hover:glow-orange transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-primary">
                    {mod.name[0]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {mod.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>

                  <Progress value={pct} className="h-2 mb-2" />

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-mono">{mod.solved} / {mod.mcqCount} solved</span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" /> Accuracy: {mod.accuracy}%
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeHome;

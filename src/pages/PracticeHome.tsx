import { Link } from "react-router-dom";
import { academicYears } from "@/data/curriculumData";
import { motion } from "framer-motion";
import { ChevronRight, Lock } from "lucide-react";

const PracticeHome = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">Practice</h1>
      <p className="text-muted-foreground mb-8">
        Select your academic year to start practicing MCQs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {academicYears.map((year, i) => {
          const hasContent = year.modules.length > 0;
          const pct = year.totalMCQs > 0 ? Math.round((year.solved / year.totalMCQs) * 100) : 0;
          const ringSize = 72;
          const sw = 5;
          const r = (ringSize - sw) / 2;
          const circ = 2 * Math.PI * r;

          return (
            <motion.div
              key={year.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {hasContent ? (
                <Link
                  to={`/practice/${year.slug}`}
                  className="glass-card p-5 flex flex-col hover:glow-orange transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative shrink-0">
                      <svg width={ringSize} height={ringSize} className="-rotate-90">
                        <circle
                          cx={ringSize / 2} cy={ringSize / 2} r={r}
                          fill="none" stroke="hsl(var(--muted))" strokeWidth={sw}
                        />
                        <circle
                          cx={ringSize / 2} cy={ringSize / 2} r={r}
                          fill="none" stroke="hsl(var(--primary))" strokeWidth={sw}
                          strokeDasharray={`${(pct / 100) * circ} ${circ - (pct / 100) * circ}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-foreground">{pct}%</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {year.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {year.solved} / {year.totalMCQs} solved
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span>{year.modules.length} modules</span>
                    <span>Accuracy: {year.accuracy}%</span>
                  </div>
                </Link>
              ) : (
                <div className="glass-card p-5 opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-[72px] h-[72px] rounded-full bg-muted/30 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground">{year.name}</h3>
                      <p className="text-sm text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeHome;

import { Link, useSearchParams } from "react-router-dom";
import { blocks, subjects } from "@/data/mockData";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";

const PracticeHome = () => {
  const [searchParams] = useSearchParams();
  const subjectFilter = searchParams.get("subject");

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-1">Practice</h1>
      <p className="text-muted-foreground mb-8">
        {subjectFilter
          ? `Filtered by ${subjectFilter}. Select a block to start.`
          : "Select a block to begin practicing MCQs."}
      </p>

      {subjectFilter && (
        <Link
          to="/practice"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
        >
          ✕ Clear filter: {subjectFilter}
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blocks.map((block, i) => {
          const pct = Math.round((block.solved / block.totalMCQs) * 100);
          const ringSize = 80;
          const sw = 6;
          const r = (ringSize - sw) / 2;
          const circ = 2 * Math.PI * r;

          return (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/practice/block/${block.id}`}
                className="glass-card p-5 flex flex-col hover:glow-orange transition-all duration-300 group"
              >
                {/* Header with ring */}
                <div className="flex items-center gap-4 mb-4">
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
                        className="transition-all duration-700"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">{pct}%</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {block.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {block.solved} / {block.totalMCQs} solved
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>

                {/* Subject breakdown */}
                <div className="space-y-2 border-t border-border pt-3">
                  {subjects
                    .filter(s => !subjectFilter || s.name === subjectFilter)
                    .map(subject => {
                      const blockData = subject.blocks[block.id - 1];
                      return (
                        <div key={subject.slug} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ background: subject.color }}
                            />
                            <span className="text-sm text-secondary-foreground">{subject.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">
                            {blockData?.solved || 0} / {blockData?.total || 0}
                          </span>
                        </div>
                      );
                    })}
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

import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { blocks, subjects } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

const PracticeHome = () => {
  const [searchParams] = useSearchParams();
  const subjectFilter = searchParams.get("subject");
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">Practice</h1>
      <p className="text-muted-foreground mb-8">
        {subjectFilter
          ? `Filtered by ${subjectFilter}. Select a block to start.`
          : "Select a block to start practicing MCQs."}
      </p>

      {subjectFilter && (
        <Link
          to="/practice"
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
        >
          ✕ Clear filter: {subjectFilter}
        </Link>
      )}

      <div className="flex flex-wrap justify-center gap-10">
        {blocks.map((block, i) => {
          const pct = Math.round((block.solved / block.totalMCQs) * 100);
          const isExpanded = expandedBlock === block.id;
          const ringSize = 160;
          const sw = 8;
          const r = (ringSize - sw) / 2;
          const circ = 2 * Math.PI * r;

          return (
            <div key={block.id} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setExpandedBlock(isExpanded ? null : block.id)}
              >
                <div className="relative">
                  <svg width={ringSize} height={ringSize} className="-rotate-90">
                    <circle cx={ringSize / 2} cy={ringSize / 2} r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth={sw} />
                    <circle
                      cx={ringSize / 2}
                      cy={ringSize / 2}
                      r={r}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth={sw}
                      strokeDasharray={`${(pct / 100) * circ} ${circ - (pct / 100) * circ}`}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {block.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {block.solved} / {block.totalMCQs}
                    </span>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-6"
                  >
                    <div className="flex gap-6 justify-center">
                      {subjects
                        .filter(s => !subjectFilter || s.name === subjectFilter)
                        .map((subject, si) => {
                          const blockData = subject.blocks[block.id - 1];
                          const sPct = blockData ? Math.round((blockData.solved / blockData.total) * 100) : 0;
                          const sSize = 100;
                          const sSw = 5;
                          const sR = (sSize - sSw) / 2;
                          const sCirc = 2 * Math.PI * sR;

                          return (
                            <motion.div
                              key={subject.slug}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: si * 0.1 }}
                            >
                              <Link
                                to={`/practice/block/${block.id}/subject/${subject.slug}`}
                                className="flex flex-col items-center group/s"
                              >
                                <div className="relative" style={{ filter: `drop-shadow(0 0 8px ${subject.color}40)` }}>
                                  <svg width={sSize} height={sSize} className="-rotate-90">
                                    <circle cx={sSize / 2} cy={sSize / 2} r={sR} fill="none" stroke="hsl(var(--muted))" strokeWidth={sSw} />
                                    <circle
                                      cx={sSize / 2}
                                      cy={sSize / 2}
                                      r={sR}
                                      fill="none"
                                      stroke={subject.color}
                                      strokeWidth={sSw}
                                      strokeDasharray={`${(sPct / 100) * sCirc} ${sCirc - (sPct / 100) * sCirc}`}
                                      strokeLinecap="round"
                                      className="transition-all duration-500"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xs font-bold text-foreground group-hover/s:text-primary transition-colors">
                                      {subject.name.slice(0, 4)}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                      {blockData?.total || 0}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground mt-1 group-hover/s:text-primary transition-colors">
                                  {subject.name}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeHome;

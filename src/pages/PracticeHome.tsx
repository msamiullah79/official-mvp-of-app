import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { blocks } from "@/data/mockData";
import { motion } from "framer-motion";

const PracticeHome = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">Practice</h1>
      <p className="text-muted-foreground mb-6">Select a block to start practicing MCQs.</p>
      <div className="space-y-4">
        {blocks.map((block, i) => {
          const pct = Math.round((block.solved / block.totalMCQs) * 100);
          return (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/practice/block/${block.id}`}
                className="glass-card p-6 block hover:glow-orange transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {block.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {block.totalMCQs} MCQs • {block.subjects.join(", ")}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {block.solved} / {block.totalMCQs}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-orange transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
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

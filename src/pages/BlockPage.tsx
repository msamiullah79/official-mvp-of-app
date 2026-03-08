import { Link, useParams } from "react-router-dom";
import { subjects } from "@/data/mockData";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const BlockPage = () => {
  const { blockId } = useParams();
  const blockIdx = Number(blockId) - 1;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/practice"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blocks
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-1">Block {blockId}</h1>
      <p className="text-muted-foreground mb-8">Choose a subject to practice.</p>

      <div className="space-y-4">
        {subjects.map((subject, i) => {
          const block = subject.blocks[blockIdx];
          const solved = block?.solved || 0;
          const total = block?.total || 0;
          const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
          // derive accuracy from topic averages
          const topicAccuracies = subject.topics.filter(t => t.accuracy != null).map(t => t.accuracy!);
          const avgAccuracy = topicAccuracies.length > 0
            ? Math.round(topicAccuracies.reduce((a, b) => a + b, 0) / topicAccuracies.length)
            : 0;

          return (
            <motion.div
              key={subject.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/practice/block/${blockId}/subject/${subject.slug}`}
                className="glass-card p-5 flex items-center gap-5 hover:glow-orange transition-all duration-300 group"
              >
                {/* Color accent */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${subject.color}20`, border: `2px solid ${subject.color}40` }}
                >
                  <span className="text-xl font-bold" style={{ color: subject.color }}>
                    {subject.name[0]}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {subject.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>

                  <Progress value={pct} className="h-2 mb-2" />

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-mono">{solved} / {total} solved</span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      Accuracy: {avgAccuracy}%
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

export default BlockPage;

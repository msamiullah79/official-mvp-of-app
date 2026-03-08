import { Link, useParams } from "react-router-dom";
import { subjects } from "@/data/mockData";
import { motion } from "framer-motion";

const BlockPage = () => {
  const { blockId } = useParams();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">Block {blockId}</h1>
      <p className="text-muted-foreground mb-8">Choose a subject to practice.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {subjects.map((subject, i) => {
          const blockIdx = Number(blockId) - 1;
          const block = subject.blocks[blockIdx];
          return (
            <motion.div
              key={subject.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/practice/block/${blockId}/subject/${subject.slug}`}
                className="glass-card p-6 flex flex-col items-center text-center hover:glow-orange transition-all duration-300 group"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 transition-colors"
                  style={{
                    borderColor: subject.color,
                    background: `${subject.color}15`,
                  }}
                >
                  <span className="text-2xl font-bold" style={{ color: subject.color }}>
                    {subject.name[0]}
                  </span>
                </div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {subject.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {block?.total || 0} questions
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {block?.solved || 0} solved
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BlockPage;

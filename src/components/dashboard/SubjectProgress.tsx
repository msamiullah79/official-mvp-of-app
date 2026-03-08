import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { subjects, SubjectData } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

const subjectColorMap: Record<string, string> = {
  Anatomy: "bg-anatomy",
  Physiology: "bg-physiology",
  Biochemistry: "bg-biochemistry",
};

const SubjectProgress = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setExpanded(prev => (prev === slug ? null : slug));
  };

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Subjects Progress
      </h3>
      <div className="space-y-2">
        {subjects.map((subject) => (
          <SubjectRow
            key={subject.slug}
            subject={subject}
            isExpanded={expanded === subject.slug}
            onToggle={() => toggle(subject.slug)}
          />
        ))}
      </div>
    </div>
  );
};

const SubjectRow = ({
  subject,
  isExpanded,
  onToggle,
}: {
  subject: SubjectData;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const pct = Math.round((subject.solved / subject.total) * 100);

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${subjectColorMap[subject.name]}`} />
          <span className="text-sm font-medium text-foreground">{subject.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {subject.solved} / {subject.total}
          </span>
          <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full ${subjectColorMap[subject.name]}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-8 pr-3 py-2 space-y-1.5">
              {subject.blocks.map((block) => {
                const bPct = Math.round((block.solved / block.total) * 100);
                return (
                  <div key={block.name} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{block.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {block.solved} / {block.total}
                      </span>
                      <div className="w-12 h-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${subjectColorMap[subject.name]}`}
                          style={{ width: `${bPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubjectProgress;

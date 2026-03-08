import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { CurriculumModule } from "@/data/curriculumData";

interface CircularModuleNodeProps {
  module: CurriculumModule;
  linkTo: string;
  delay?: number;
}

const getAccuracyStyle = (accuracy: number) => {
  if (accuracy >= 80) return { bg: "hsla(142, 71%, 45%, 0.15)", border: "hsl(var(--success))", text: "text-success" };
  if (accuracy >= 65) return { bg: "hsla(45, 93%, 47%, 0.15)", border: "hsl(45 93% 47%)", text: "text-yellow-400" };
  return { bg: "hsla(0, 72%, 51%, 0.15)", border: "hsl(var(--destructive))", text: "text-destructive" };
};

const CircularModuleNode = ({ module, linkTo, delay = 0 }: CircularModuleNodeProps) => {
  const navigate = useNavigate();
  const pct = module.mcqCount > 0 ? Math.round((module.solved / module.mcqCount) * 100) : 0;
  const accStyle = getAccuracyStyle(module.accuracy);

  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (pct / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      onClick={() => navigate(linkTo)}
      className="group cursor-pointer flex flex-col items-center gap-3"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.97 }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Hover glow - orange */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-primary" style={{ transform: "scale(0.7)" }} />

        {/* SVG ring - always orange for progress */}
        <svg width={size} height={size} className="relative z-10 -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progressOffset }}
            transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
          />
        </svg>

        {/* Inner circle - accuracy colored */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div
            className="w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center border"
            style={{ background: accStyle.bg, borderColor: accStyle.border }}
          >
            <span className="text-2xl font-bold font-mono text-foreground">{pct}%</span>
            <span className="text-[11px] text-muted-foreground font-mono mt-0.5">
              {module.solved} / {module.mcqCount}
            </span>
          </div>
        </div>
      </motion.div>

      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-center max-w-[140px] leading-tight">
        {module.name}
      </span>
      <span className={`text-xs -mt-2 font-medium ${accStyle.text}`}>
        {module.accuracy}% accuracy
      </span>
    </motion.div>
  );
};

export default CircularModuleNode;

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { CurriculumModule } from "@/data/curriculumData";

interface CircularModuleNodeProps {
  module: CurriculumModule;
  linkTo: string;
  delay?: number;
}

const getAccuracyColor = (accuracy: number) => {
  if (accuracy >= 70) return { ring: "hsl(var(--success))", bg: "hsl(var(--success) / 0.12)", text: "text-success" };
  if (accuracy >= 50) return { ring: "hsl(45 93% 47%)", bg: "hsl(45 93% 47% / 0.12)", text: "text-yellow-400" };
  return { ring: "hsl(var(--destructive))", bg: "hsl(var(--destructive) / 0.12)", text: "text-destructive" };
};

const CircularModuleNode = ({ module, linkTo, delay = 0 }: CircularModuleNodeProps) => {
  const navigate = useNavigate();
  const total = module.mcqCount;
  const solved = module.solved;
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  const accuracy = module.accuracy;
  const colors = getAccuracyColor(accuracy);

  // SVG circle math
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
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: colors.ring, transform: "scale(0.7)" }}
        />

        {/* SVG ring */}
        <svg width={size} height={size} className="relative z-10 -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.ring}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progressOffset }}
            transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <div
            className="w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center border border-border/50"
            style={{ background: colors.bg }}
          >
            <span className={`text-2xl font-bold font-mono ${colors.text}`}>
              {pct}%
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5">
              {solved}/{total}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Module name below */}
      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-center max-w-[140px] leading-tight">
        {module.name}
      </span>
      <span className="text-xs text-muted-foreground -mt-2">
        {accuracy}% accuracy
      </span>
    </motion.div>
  );
};

export default CircularModuleNode;

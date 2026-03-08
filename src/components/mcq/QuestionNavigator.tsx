import { useRef, useEffect } from "react";
import { QuestionResult } from "@/pages/MCQSession";

interface Props {
  results: QuestionResult[];
  currentIndex: number;
  onNavigate: (idx: number) => void;
}

const QuestionNavigator = ({ results, currentIndex, onNavigate }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [currentIndex]);

  const getColor = (state: string, idx: number) => {
    if (idx === currentIndex) {
      // Current question gets blue outline on top of its state color
      const base = getBaseColor(state);
      return `${base} ring-2 ring-blue-500 ring-offset-1 ring-offset-background`;
    }
    return getBaseColor(state);
  };

  const getBaseColor = (state: string) => {
    switch (state) {
      case "correct":
        return "bg-emerald-500 text-white";
      case "incorrect":
        return "bg-destructive text-destructive-foreground";
      case "skipped":
        return "bg-yellow-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex items-center gap-1.5 overflow-x-auto py-2 px-1 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {results.map((r, idx) => (
        <button
          key={idx}
          ref={idx === currentIndex ? activeRef : null}
          onClick={() => onNavigate(idx)}
          className={`w-8 h-8 rounded-lg text-xs font-bold shrink-0 transition-all duration-200 hover:opacity-80 ${getColor(r.state, idx)}`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default QuestionNavigator;

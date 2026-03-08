import { MCQ } from "@/data/mockData";
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, SkipForward, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  question: MCQ;
  index: number;
  total: number;
  selectedOption: number | null;
  submitted: boolean;
  isMarked: boolean;
  showExplanation: boolean;
  onSelect: (idx: number) => void;
  onSubmit: () => void;
  onSkip: () => void;
  onNext: () => void;
  onPrev: () => void;
  onToggleMark: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const MCQQuestion = ({
  question, index, total, selectedOption, submitted, isMarked, showExplanation,
  onSelect, onSubmit, onSkip, onNext, onPrev, onToggleMark, hasPrev, hasNext,
}: Props) => {
  const pct = ((index + 1) / total) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {index + 1} of {total}</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full gradient-orange transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="glass-card p-6"
        >
          {/* Question header */}
          <div className="flex items-start justify-between mb-4">
            <p className="text-foreground font-medium leading-relaxed flex-1">{question.question}</p>
            <button
              onClick={onToggleMark}
              className={`ml-3 p-2 rounded-lg transition-colors shrink-0 ${
                isMarked ? "bg-primary/20 text-primary" : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
              title="Mark for review"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              let optionClass = "border-border bg-secondary/30 hover:bg-secondary/60";
              if (submitted) {
                if (idx === question.correctAnswer) optionClass = "border-success bg-success/10";
                else if (idx === selectedOption) optionClass = "border-destructive bg-destructive/10";
                else optionClass = "border-border bg-secondary/20 opacity-50";
              } else if (selectedOption === idx) {
                optionClass = "border-primary bg-primary/10";
              }

              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => onSelect(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${optionClass}`}
                >
                  <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">{letter}</span>
                  <span className="text-sm text-foreground">{option}</span>
                  {submitted && idx === question.correctAnswer && <CheckCircle2 className="w-5 h-5 text-success ml-auto shrink-0" />}
                  {submitted && idx === selectedOption && idx !== question.correctAnswer && <XCircle className="w-5 h-5 text-destructive ml-auto shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {submitted && showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border"
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Explanation</p>
              <p className="text-sm text-secondary-foreground leading-relaxed">{question.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <button
            onClick={onSkip}
            disabled={submitted}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors disabled:opacity-30"
          >
            <SkipForward className="w-4 h-4" /> Skip
          </button>
        </div>

        {!submitted ? (
          <button
            onClick={onSubmit}
            disabled={selectedOption === null}
            className="px-6 py-2.5 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {hasNext ? "Next" : "Finish"} <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MCQQuestion;

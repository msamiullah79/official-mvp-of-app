import { MCQ } from "@/data/mockData";
import { AnswerState, QuestionResult } from "@/pages/MCQSession";
import { X, CheckCircle2, XCircle, Flag, SkipForward, Circle } from "lucide-react";

interface Props {
  questions: MCQ[];
  results: QuestionResult[];
  marked: Set<string>;
  currentIndex: number;
  onNavigate: (idx: number) => void;
  onClose: () => void;
}

const stateIcon = (state: AnswerState, isMarked: boolean) => {
  if (isMarked) return <Flag className="w-3 h-3 text-primary" />;
  switch (state) {
    case "correct": return <CheckCircle2 className="w-3 h-3 text-success" />;
    case "incorrect": return <XCircle className="w-3 h-3 text-destructive" />;
    case "skipped": return <SkipForward className="w-3 h-3 text-muted-foreground" />;
    default: return null;
  }
};

const MCQSidebar = ({ questions, results, marked, currentIndex, onNavigate, onClose }: Props) => {
  const answered = results.filter(r => r.state === "correct" || r.state === "incorrect").length;
  const correct = results.filter(r => r.state === "correct").length;
  const markedCount = marked.size;

  return (
    <div className="w-64 border-r border-border bg-card/60 flex flex-col shrink-0 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Questions</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 p-3 border-b border-border text-center">
        <div>
          <p className="text-lg font-bold text-foreground">{answered}</p>
          <p className="text-[10px] text-muted-foreground">Answered</p>
        </div>
        <div>
          <p className="text-lg font-bold text-success">{correct}</p>
          <p className="text-[10px] text-muted-foreground">Correct</p>
        </div>
        <div>
          <p className="text-lg font-bold text-primary">{markedCount}</p>
          <p className="text-[10px] text-muted-foreground">Marked</p>
        </div>
      </div>

      {/* Question grid */}
      <div className="flex-1 overflow-auto p-3">
        <div className="grid grid-cols-5 gap-1.5">
          {questions.map((q, idx) => {
            const result = results[idx];
            const isMarked = marked.has(q.id);
            const isCurrent = idx === currentIndex;

            let bg = "bg-secondary/50 text-muted-foreground";
            if (result.state === "correct") bg = "bg-success/20 text-success";
            else if (result.state === "incorrect") bg = "bg-destructive/20 text-destructive";
            else if (result.state === "skipped") bg = "bg-muted text-muted-foreground";
            if (isCurrent) bg += " ring-2 ring-primary";
            if (isMarked && result.state === "unanswered") bg = "bg-primary/20 text-primary";

            return (
              <button
                key={q.id}
                onClick={() => onNavigate(idx)}
                className={`w-full aspect-square rounded-md text-xs font-semibold flex items-center justify-center transition-all hover:opacity-80 ${bg}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="p-3 border-t border-border space-y-1">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <div className="w-3 h-3 rounded-sm bg-success/20" /> Correct
          <div className="w-3 h-3 rounded-sm bg-destructive/20 ml-2" /> Incorrect
          <div className="w-3 h-3 rounded-sm bg-primary/20 ml-2" /> Marked
        </div>
      </div>
    </div>
  );
};

export default MCQSidebar;

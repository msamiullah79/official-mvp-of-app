import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MCQ } from "@/data/mockData";
import { QuestionResult } from "@/pages/MCQSession";
import { CheckCircle2, XCircle, SkipForward, Clock, BarChart3, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  questions: MCQ[];
  results: QuestionResult[];
  timeTaken: number;
  blockId?: string;
  subjectSlug?: string;
  onNavigateToQuestion: (idx: number) => void;
}

type Filter = "all" | "correct" | "incorrect" | "skipped" | "unanswered";

const MCQResults = ({ questions, results, timeTaken, blockId, subjectSlug, onNavigateToQuestion }: Props) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");
  const [showReview, setShowReview] = useState(false);

  const correct = results.filter(r => r.state === "correct").length;
  const incorrect = results.filter(r => r.state === "incorrect").length;
  const skipped = results.filter(r => r.state === "skipped").length;
  const unanswered = results.filter(r => r.state === "unanswered").length;
  const attempted = correct + incorrect;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  // Subject-wise breakdown
  const subjectMap = new Map<string, { correct: number; total: number }>();
  questions.forEach((q, i) => {
    const r = results[i];
    if (!subjectMap.has(q.subject)) subjectMap.set(q.subject, { correct: 0, total: 0 });
    const entry = subjectMap.get(q.subject)!;
    entry.total++;
    if (r.state === "correct") entry.correct++;
  });

  const filtered = questions.map((q, i) => ({ question: q, result: results[i], index: i }))
    .filter(item => filter === "all" || item.result.state === filter);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Summary header */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Session Complete</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-secondary/50 text-center">
              <p className="text-2xl font-bold text-foreground">{questions.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="p-4 rounded-lg bg-success/10 text-center">
              <p className="text-2xl font-bold text-success">{correct}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 text-center">
              <p className="text-2xl font-bold text-destructive">{incorrect}</p>
              <p className="text-xs text-muted-foreground">Incorrect</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 text-center">
              <p className="text-2xl font-bold text-muted-foreground">{skipped + unanswered}</p>
              <p className="text-xs text-muted-foreground">Skipped</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 text-center">
              <p className="text-2xl font-bold text-primary">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <p className="text-lg font-bold text-foreground">{formatTime(timeTaken)}</p>
              </div>
              <p className="text-xs text-muted-foreground">Time Taken</p>
            </div>
          </div>

          {/* Subject breakdown */}
          {subjectMap.size > 1 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Subject Breakdown
              </h3>
              <div className="space-y-2">
                {Array.from(subjectMap.entries()).map(([subject, data]) => {
                  const acc = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                  return (
                    <div key={subject} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <span className="text-sm font-medium text-foreground capitalize">{subject}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">{data.correct}/{data.total}</span>
                        <span className={`text-sm font-bold ${acc >= 70 ? "text-success" : acc >= 50 ? "text-primary" : "text-destructive"}`}>{acc}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowReview(!showReview)}
              className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> {showReview ? "Hide" : "Review"} Answers
            </button>
            {blockId && subjectSlug && (
              <button
                onClick={() => navigate(`/practice/block/${blockId}/subject/${subjectSlug}`)}
                className="px-5 py-2.5 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Practice Again
              </button>
            )}
          </div>
        </div>

        {/* Review section */}
        {showReview && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {(["all", "correct", "incorrect", "skipped", "unanswered"] as Filter[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                    filter === f ? "gradient-orange text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filtered.map(({ question, result, index }) => (
                <div
                  key={question.id}
                  className="p-4 rounded-lg bg-secondary/30 border border-border/50 cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => onNavigateToQuestion(index)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-muted-foreground mt-1">Q{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-2">{question.question}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        {result.state === "correct" && <span className="text-xs text-success flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Correct</span>}
                        {result.state === "incorrect" && <span className="text-xs text-destructive flex items-center gap-1"><XCircle className="w-3 h-3" /> Incorrect</span>}
                        {result.state === "skipped" && <span className="text-xs text-muted-foreground flex items-center gap-1"><SkipForward className="w-3 h-3" /> Skipped</span>}
                        {result.state === "unanswered" && <span className="text-xs text-muted-foreground">Unanswered</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MCQResults;

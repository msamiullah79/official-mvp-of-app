import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MCQ } from "@/data/mockData";
import { QuestionResult } from "@/pages/MCQSession";
import { CheckCircle2, XCircle, SkipForward, Clock, BarChart3, Eye, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  questions: MCQ[];
  results: QuestionResult[];
  timeTaken: number;
  backPath?: string;
}

type Filter = "all" | "correct" | "incorrect" | "skipped" | "unanswered";

const MCQResults = ({ questions, results, timeTaken, backPath }: Props) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("all");
  const [showReview, setShowReview] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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

  const toggleExpand = (index: number) => {
    setExpandedIndex(prev => prev === index ? null : index);
  };

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

          <div className="text-center mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm text-muted-foreground">Score</p>
            <p className="text-3xl font-bold text-foreground">{correct} / {questions.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Accuracy: <span className="font-semibold text-primary">{accuracy}%</span></p>
            <p className="text-sm font-semibold text-primary mt-1">+{correct * 5} Points Earned</p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowReview(!showReview)}
              className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" /> {showReview ? "Hide" : "Review"} Questions
            </button>
            {backPath && (
              <button
                onClick={() => navigate(backPath)}
                className="px-5 py-2.5 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Go Back to Module
              </button>
            )}
          </div>
        </div>

        {/* Review section - inline accordion */}
        {showReview && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {(["all", "correct", "incorrect", "skipped", "unanswered"] as Filter[]).map(f => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setExpandedIndex(null); }}
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
                <div key={question.id} className="rounded-lg bg-secondary/30 border border-border/50 overflow-hidden">
                  {/* Question header - clickable */}
                  <button
                    className="w-full p-4 flex items-start gap-3 text-left hover:bg-secondary/50 transition-colors"
                    onClick={() => toggleExpand(index)}
                  >
                    <span className="text-xs font-bold text-muted-foreground mt-1 shrink-0">Q{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-2">{question.question}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        {result.state === "correct" && <span className="text-xs text-success flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Correct</span>}
                        {result.state === "incorrect" && <span className="text-xs text-destructive flex items-center gap-1"><XCircle className="w-3 h-3" /> Incorrect</span>}
                        {result.state === "skipped" && <span className="text-xs text-muted-foreground flex items-center gap-1"><SkipForward className="w-3 h-3" /> Skipped</span>}
                        {result.state === "unanswered" && <span className="text-xs text-muted-foreground">Unanswered</span>}
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-200 ${expandedIndex === index ? "rotate-180" : ""}`} />
                  </button>

                  {/* Expanded review content */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 border-t border-border/30 space-y-3">
                          {/* User's answer - only for incorrect */}
                          {result.state === "incorrect" && result.selectedOption !== undefined && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                              <p className="text-xs font-medium text-muted-foreground mb-1">Your Answer</p>
                              <p className="text-sm font-medium text-destructive flex items-center gap-1.5">
                                <XCircle className="w-3.5 h-3.5" />
                                {question.options[result.selectedOption]}
                              </p>
                            </div>
                          )}

                          {/* Correct answer - always show */}
                          <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Correct Answer</p>
                            <p className="text-sm font-medium text-success flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {question.options[question.correctAnswer]}
                            </p>
                          </div>

                          {/* Explanation */}
                          {question.explanation && (
                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                              <p className="text-xs font-medium text-muted-foreground mb-1">Explanation</p>
                              <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

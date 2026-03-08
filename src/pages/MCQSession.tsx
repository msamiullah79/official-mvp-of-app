import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sampleMCQs } from "@/data/mockData";
import { ArrowLeft, X, SkipForward, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AnswerState = "unanswered" | "correct" | "incorrect" | "skipped";

interface QuestionResult {
  questionId: string;
  state: AnswerState;
  selectedOption?: number;
}

const MCQSession = () => {
  const navigate = useNavigate();
  const { blockId, subjectSlug } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const questions = sampleMCQs;
  const question = questions[currentIndex];
  const pct = ((currentIndex + 1) / questions.length) * 100;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    const isCorrect = selectedOption === question.correctAnswer;
    setResults(prev => [...prev, {
      questionId: question.id,
      state: isCorrect ? "correct" : "incorrect",
      selectedOption,
    }]);
  };

  const handleSkip = () => {
    setResults(prev => [...prev, { questionId: question.id, state: "skipped" }]);
    goNext();
  };

  const goNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setShowSummary(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
    }
  };

  const handleExit = () => {
    setShowSummary(true);
  };

  if (showSummary) {
    const attempted = results.filter(r => r.state !== "skipped").length;
    const correct = results.filter(r => r.state === "correct").length;
    const incorrect = results.filter(r => r.state === "incorrect").length;
    const skipped = results.filter(r => r.state === "skipped").length;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    return (
      <div className="p-6 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Session Summary</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold text-foreground">{results.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold text-foreground">{attempted}</p>
              <p className="text-xs text-muted-foreground">Attempted</p>
            </div>
            <div className="p-4 rounded-lg bg-success/10">
              <p className="text-2xl font-bold text-success">{correct}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10">
              <p className="text-2xl font-bold text-destructive">{incorrect}</p>
              <p className="text-xs text-muted-foreground">Incorrect</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-2xl font-bold text-muted-foreground">{skipped}</p>
              <p className="text-xs text-muted-foreground">Skipped</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10">
              <p className="text-2xl font-bold text-primary">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(`/practice/block/${blockId}/subject/${subjectSlug}`)}
              className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              Return to Subject
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const isCorrect = submitted && selectedOption === question.correctAnswer;
  const isIncorrect = submitted && selectedOption !== question.correctAnswer;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button onClick={handleExit} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
          <X className="w-4 h-4" />
          Exit
        </button>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full gradient-orange transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="glass-card p-6"
        >
          <p className="text-foreground font-medium mb-6 leading-relaxed">{question.question}</p>
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx);
              let optionClass = "border-border bg-secondary/30 hover:bg-secondary/60";
              if (submitted) {
                if (idx === question.correctAnswer) {
                  optionClass = "border-success bg-success/10";
                } else if (idx === selectedOption && idx !== question.correctAnswer) {
                  optionClass = "border-destructive bg-destructive/10";
                } else {
                  optionClass = "border-border bg-secondary/20 opacity-50";
                }
              } else if (selectedOption === idx) {
                optionClass = "border-primary bg-primary/10";
              }

              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-3 ${optionClass}`}
                >
                  <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                    {letter}
                  </span>
                  <span className="text-sm text-foreground">{option}</span>
                  {submitted && idx === question.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-success ml-auto shrink-0" />
                  )}
                  {submitted && idx === selectedOption && idx !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-destructive ml-auto shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {submitted && (
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

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSkip}
          disabled={submitted}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors disabled:opacity-40"
        >
          <SkipForward className="w-4 h-4" />
          Skip
        </button>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-6 py-2.5 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={goNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MCQSession;

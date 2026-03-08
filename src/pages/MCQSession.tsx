import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { sampleMCQs, MCQ } from "@/data/mockData";
import MCQSidebar from "@/components/mcq/MCQSidebar";
import MCQQuestion from "@/components/mcq/MCQQuestion";
import MCQResults from "@/components/mcq/MCQResults";
import { ArrowLeft, X, Clock } from "lucide-react";

export type AnswerState = "unanswered" | "correct" | "incorrect" | "skipped";

export interface QuestionResult {
  questionId: string;
  state: AnswerState;
  selectedOption?: number;
}

const MCQSession = () => {
  const navigate = useNavigate();
  const { yearSlug, moduleSlug, subjectSlug } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "practice";
  const topics = searchParams.get("topics")?.split(",").filter(Boolean) || [];
  const showExplanations = searchParams.get("explanations") !== "false";
  const isExamMode = searchParams.get("examMode") === "true";

  const questions = useMemo(() => {
    let filtered = sampleMCQs;
    if (subjectSlug) filtered = filtered.filter(q => q.subject === subjectSlug);
    if (topics.length > 0) filtered = filtered.filter(q => topics.includes(q.topic));
    if (filtered.length === 0) filtered = sampleMCQs;
    const customCount = searchParams.get("count");
    if (customCount) filtered = filtered.slice(0, Number(customCount));
    const randomize = searchParams.get("randomize");
    if (randomize === "true") filtered = [...filtered].sort(() => Math.random() - 0.5);
    return filtered;
  }, [subjectSlug, topics, searchParams]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>(
    () => questions.map(q => ({ questionId: q.id, state: "unanswered" as AnswerState }))
  );
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [showSummary, setShowSummary] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mode === "timed" ? 40 * 60 : 0);
  const [startTime] = useState(Date.now());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (mode !== "timed") return;
    if (timeLeft <= 0) { setShowSummary(true); return; }
    const t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [mode, timeLeft]);

  const question = questions[currentIndex];
  const currentResult = results[currentIndex];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    const isCorrect = selectedOption === question.correctAnswer;
    setResults(prev => prev.map((r, i) =>
      i === currentIndex ? { ...r, state: isCorrect ? "correct" : "incorrect", selectedOption } : r
    ));
  };

  const handleSkip = () => {
    setResults(prev => prev.map((r, i) =>
      i === currentIndex ? { ...r, state: "skipped" } : r
    ));
    goNext();
  };

  const goNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setShowSummary(true);
    } else {
      navigateTo(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) navigateTo(currentIndex - 1);
  };

  const navigateTo = (idx: number) => {
    setCurrentIndex(idx);
    const r = results[idx];
    if (r.state !== "unanswered" && r.state !== "skipped") {
      setSelectedOption(r.selectedOption ?? null);
      setSubmitted(true);
    } else {
      setSelectedOption(null);
      setSubmitted(false);
    }
  };

  const toggleMark = () => {
    setMarked(prev => {
      const next = new Set(prev);
      next.has(question.id) ? next.delete(question.id) : next.add(question.id);
      return next;
    });
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const backPath = subjectSlug
    ? `/practice/${yearSlug}/${moduleSlug}/${subjectSlug}`
    : `/practice/${yearSlug}/${moduleSlug}`;

  if (showSummary) {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    return (
      <MCQResults
        questions={questions}
        results={results}
        timeTaken={elapsed}
        backPath={backPath}
        onNavigateToQuestion={(idx) => { setShowSummary(false); navigateTo(idx); }}
      />
    );
  }

  if (!question) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <p className="text-muted-foreground">No questions available for this selection.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm">Go Back</button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {sidebarOpen && (
        <MCQSidebar
          questions={questions}
          results={results}
          marked={marked}
          currentIndex={currentIndex}
          onNavigate={navigateTo}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/40">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="text-xs px-2.5 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                Questions
              </button>
            )}
            <button onClick={() => navigate(backPath)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {questions.length}
            </span>
            {mode === "timed" && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className={`font-mono font-semibold ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
            <button onClick={() => setShowSummary(true)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-4 h-4" /> End
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
          <MCQQuestion
            question={question}
            index={currentIndex}
            total={questions.length}
            selectedOption={selectedOption}
            submitted={submitted}
            isMarked={marked.has(question.id)}
            showExplanation={showExplanations || !isExamMode}
            onSelect={setSelectedOption}
            onSubmit={handleSubmit}
            onSkip={handleSkip}
            onNext={goNext}
            onPrev={goPrev}
            onToggleMark={toggleMark}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < questions.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default MCQSession;

import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { sampleMCQs, MCQ } from "@/data/mockData";
import MCQQuestion from "@/components/mcq/MCQQuestion";
import MCQResults from "@/components/mcq/MCQResults";
import QuestionNavigator from "@/components/mcq/QuestionNavigator";
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
  const topicsParam = searchParams.get("topics") || "";
  const showExplanations = searchParams.get("explanations") !== "false";
  const isExamMode = searchParams.get("examMode") === "true";
  const timerMinutes = searchParams.get("timer");
  const timeLimitSecs = searchParams.get("timeLimitSecs");
  const customCount = searchParams.get("count");
  const randomize = searchParams.get("randomize");

  const [questions] = useState(() => {
    const topics = topicsParam.split(",").filter(Boolean);
    let filtered = sampleMCQs;
    if (subjectSlug) filtered = filtered.filter(q => q.subject === subjectSlug);
    if (topics.length > 0) filtered = filtered.filter(q => topics.includes(q.topic));
    if (filtered.length === 0) filtered = sampleMCQs;
    if (customCount) filtered = filtered.slice(0, Number(customCount));
    if (randomize === "true") filtered = [...filtered].sort(() => Math.random() - 0.5);
    return filtered;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>(
    () => questions.map(q => ({ questionId: q.id, state: "unanswered" as AnswerState }))
  );
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [showSummary, setShowSummary] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    if (timerMinutes) return Number(timerMinutes) * 60;
    if (mode === "timed") return 40 * 60;
    return 0;
  });
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);

  const isTimed = mode === "timed" || !!timerMinutes;

  useEffect(() => {
    if (!isTimed) return;
    if (timeLeft <= 0) { endSession(); return; }
    const t = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(t);
  }, [isTimed, timeLeft]);

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
    // Only mark as skipped if not already answered
    setResults(prev => prev.map((r, i) =>
      i === currentIndex && r.state === "unanswered" ? { ...r, state: "skipped" } : r
    ));
    goNext();
  };

  const endSession = () => {
    if (!endTime) setEndTime(Date.now());
    setShowSummary(true);
  };

  const goNext = () => {
    if (currentIndex + 1 >= questions.length) {
      endSession();
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
    if (r.state === "correct" || r.state === "incorrect") {
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
    const elapsed = Math.round(((endTime || Date.now()) - startTime) / 1000);
    return (
      <MCQResults
        questions={questions}
        results={results}
        timeTaken={elapsed}
        backPath={backPath}
        
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
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/40">
        <button onClick={() => navigate(backPath)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-4">
          {isTimed && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className={`font-mono font-semibold ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
          <button onClick={endSession} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <X className="w-4 h-4" /> End
          </button>
        </div>
      </div>

      {/* Question navigator */}
      <div className="px-4 py-2 border-b border-border bg-card/20">
        <QuestionNavigator
          results={results}
          currentIndex={currentIndex}
          onNavigate={navigateTo}
        />
      </div>

      {/* Question area */}
      <div className="flex-1 overflow-auto p-6 max-w-3xl mx-auto w-full">
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
  );
};

export default MCQSession;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { competitions, sampleMCQs, MCQ } from "@/data/mockData";
import MCQQuestion from "@/components/mcq/MCQQuestion";
import QuestionNavigator from "@/components/mcq/QuestionNavigator";
import { ArrowLeft, Clock, Trophy, AlertTriangle } from "lucide-react";
import { AnswerState, QuestionResult } from "@/pages/MCQSession";

const CompetitionSession = () => {
  const navigate = useNavigate();
  const { competitionId } = useParams();
  
  const competition = competitions.find(c => c.id === competitionId);
  
  const [questions] = useState<MCQ[]>(() => {
    if (!competition) return [];
    
    let filtered = [...sampleMCQs];
    
    // Filter by topic if specified
    if (competition.topicFilter && competition.topicFilter.length > 0) {
      filtered = filtered.filter(q => competition.topicFilter!.includes(q.topic));
    }
    
    // Shuffle and limit to mcqCount
    filtered = filtered.sort(() => Math.random() - 0.5);
    
    // If not enough questions, repeat some
    while (filtered.length < competition.mcqCount) {
      filtered = [...filtered, ...sampleMCQs.sort(() => Math.random() - 0.5)];
    }
    
    return filtered.slice(0, competition.mcqCount);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>(
    () => questions.map(q => ({ questionId: q.id, state: "unanswered" as AnswerState }))
  );
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(() => (competition?.timeLimit || 10) * 60);
  const [startTime] = useState(Date.now());
  const [isEnding, setIsEnding] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 && !isEnding) {
      handleEndSession();
      return;
    }
    const t = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(t);
  }, [timeLeft, isEnding]);

  const question = questions[currentIndex];
  
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    const isCorrect = selectedOption === question.correctAnswer;
    setResults(prev => prev.map((r, i) =>
      i === currentIndex ? { ...r, state: isCorrect ? "correct" : "incorrect", selectedOption } : r
    ));
  };

  const handleSkip = () => {
    setResults(prev => prev.map((r, i) =>
      i === currentIndex && r.state === "unanswered" ? { ...r, state: "skipped" } : r
    ));
    goNext();
  };

  const handleEndSession = () => {
    if (isEnding) return;
    setIsEnding(true);
    
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const correct = results.filter(r => r.state === "correct").length;
    const incorrect = results.filter(r => r.state === "incorrect").length;
    const score = Math.max(0, correct * 2 - incorrect * 0.5) * 10;
    const accuracy = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
    
    // Navigate to results with state
    navigate(`/compete/${competitionId}/results`, {
      state: {
        score: Math.round(score),
        accuracy,
        timeTaken,
        correct,
        incorrect,
        skipped: results.filter(r => r.state === "skipped" || r.state === "unanswered").length,
        total: questions.length,
      }
    });
  };

  const goNext = () => {
    if (currentIndex + 1 >= questions.length) {
      handleEndSession();
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

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!competition) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <p className="text-muted-foreground">Competition not found.</p>
        <button onClick={() => navigate("/compete")} className="mt-4 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm">
          Back to Competitions
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <p className="text-muted-foreground">No questions available for this competition.</p>
        <button onClick={() => navigate("/compete")} className="mt-4 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm">
          Back to Competitions
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (confirm("Are you sure you want to leave? Your progress will be submitted.")) {
                handleEndSession();
              }
            }} 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground text-sm">{competition.title}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${timeLeft < 60 ? "bg-destructive/20" : "bg-secondary"} text-sm`}>
            <Clock className={`w-4 h-4 ${timeLeft < 60 ? "text-destructive" : "text-primary"}`} />
            <span className={`font-mono font-semibold ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            Q {currentIndex + 1} / {questions.length}
          </span>
          <button 
            onClick={() => {
              if (confirm("Submit your answers and end the competition?")) {
                handleEndSession();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Submit All
          </button>
        </div>
      </div>

      {/* Warning for low time */}
      {timeLeft > 0 && timeLeft <= 60 && (
        <div className="px-4 py-2 bg-destructive/10 border-b border-destructive/20 flex items-center gap-2 text-sm text-destructive">
          <AlertTriangle className="w-4 h-4" />
          <span>Less than 1 minute remaining!</span>
        </div>
      )}

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
          showExplanation={false} // No explanations during competition
          onSelect={setSelectedOption}
          onSubmit={handleSubmitAnswer}
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

export default CompetitionSession;

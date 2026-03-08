import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getModuleSubject, getModule } from "@/data/curriculumData";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Play, Zap, Settings2, Target, BookOpen, Clock, AlertTriangle, Timer
} from "lucide-react";

type PracticeType = "learning" | "timed" | "custom";
type Difficulty = "easy" | "medium" | "hard" | "mixed";
type TimedQuestionCount = 10 | 20 | 50 | "custom";
type TimeLimitMode = "auto" | "custom";

const SubjectPage = () => {
  const { yearSlug, moduleSlug, subjectSlug } = useParams();
  const navigate = useNavigate();
  const mod = getModule(yearSlug || "", moduleSlug || "");
  const subject = getModuleSubject(yearSlug || "", moduleSlug || "", subjectSlug || "");
  const topics = subject?.topics || [];

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [practiceType, setPracticeType] = useState<PracticeType>("learning");
  const [customCount, setCustomCount] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("mixed");
  const [randomize, setRandomize] = useState(true);
  const [showExplanations, setShowExplanations] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Timed mode settings
  const [timedQuestionCount, setTimedQuestionCount] = useState<TimedQuestionCount>(10);
  const [timedCustomCount, setTimedCustomCount] = useState(20);
  const [timeLimitMode, setTimeLimitMode] = useState<TimeLimitMode>("auto");
  const [customTimeLimit, setCustomTimeLimit] = useState(15);
  const [showResultsAfterExam, setShowResultsAfterExam] = useState(true);
  const [allowMarking, setAllowMarking] = useState(true);
  const [lockPreviousQuestions, setLockPreviousQuestions] = useState(false);

  const actualTimedCount = timedQuestionCount === "custom" ? timedCustomCount : timedQuestionCount;
  const estimatedTime = timeLimitMode === "auto" ? actualTimedCount : customTimeLimit;

  const allSelected = selectedTopics.length === topics.length && topics.length > 0;

  const weakTopics = useMemo(
    () => topics.filter(t => t.accuracy < 60).map(t => t.slug),
    [topics]
  );
  const unsolvedTopics = useMemo(
    () => topics.filter(t => t.solved < t.mcqCount).map(t => t.slug),
    [topics]
  );

  const toggleTopic = (slug: string) =>
    setSelectedTopics(prev =>
      prev.includes(slug) ? prev.filter(t => t !== slug) : [...prev, slug]
    );

  const toggleAll = () => setSelectedTopics(allSelected ? [] : topics.map(t => t.slug));
  const selectWeak = () => setSelectedTopics(weakTopics);
  const selectUnsolved = () => setSelectedTopics(unsolvedTopics);

  const basePath = `/practice/${yearSlug}/${moduleSlug}/${subjectSlug}`;

  const startSession = () => {
    const params = new URLSearchParams();
    if (selectedTopics.length > 0) params.set("topics", selectedTopics.join(","));

    if (practiceType === "timed") {
      params.set("mode", "timed");
      params.set("count", String(actualTimedCount));
      params.set("timeLimit", String(estimatedTime));
      if (!showResultsAfterExam) params.set("explanations", "false");
      if (!allowMarking) params.set("allowMarking", "false");
      if (lockPreviousQuestions) params.set("lockPrev", "true");
      params.set("examMode", "true");
    } else {
      params.set("mode", "practice");
      if (practiceType === "custom") params.set("count", String(customCount));
      if (!showExplanations) params.set("explanations", "false");
    }

    if (randomize) params.set("randomize", "true");
    if (difficulty !== "mixed") params.set("difficulty", difficulty);
    navigate(`${basePath}/session?${params.toString()}`);
  };

  const startQuickPractice = () => {
    const params = new URLSearchParams();
    params.set("mode", "practice");
    params.set("count", "10");
    params.set("randomize", "true");
    navigate(`${basePath}/session?${params.toString()}`);
  };

  const buttonLabel = practiceType === "timed"
    ? "Start Timed Practice"
    : practiceType === "custom"
      ? "Start Custom Practice"
      : "Start Practice";

  if (!subject || !mod) {
    return <div className="p-6 text-center text-muted-foreground">Subject not found.</div>;
  }

  const questionCountOptions: { value: TimedQuestionCount; label: string }[] = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: "custom", label: "Custom" },
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(`/practice/${yearSlug}/${moduleSlug}`)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {mod.name}
        </button>
        <h1 className="text-2xl font-bold text-foreground">{subject.name}</h1>
        <p className="text-muted-foreground text-sm">{mod.name} · Select topics and configure your session</p>
      </div>

      {/* Quick Practice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 flex items-center justify-between glow-orange"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Quick Practice</h3>
            <p className="text-xs text-muted-foreground">10 random questions · Mixed topics</p>
          </div>
        </div>
        <button
          onClick={startQuickPractice}
          className="px-4 py-2 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Start
        </button>
      </motion.div>

      {/* Topic Selection */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Select Topics
          </h2>
          <div className="flex gap-2">
            <button
              onClick={toggleAll}
              className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </button>
            {weakTopics.length > 0 && (
              <button
                onClick={selectWeak}
                className="text-xs px-2.5 py-1 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex items-center gap-1"
              >
                <AlertTriangle className="w-3 h-3" /> Weak Topics
              </button>
            )}
            <button
              onClick={selectUnsolved}
              className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              Unsolved
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {topics.map((topic, i) => {
            const selected = selectedTopics.includes(topic.slug);
            const isWeak = topic.accuracy < 60;

            return (
              <motion.div
                key={topic.slug}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selected
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
                onClick={() => toggleTopic(topic.slug)}
              >
                <Checkbox
                  checked={selected}
                  onCheckedChange={() => toggleTopic(topic.slug)}
                  className="shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{topic.name}</span>
                    {isWeak && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive font-medium">
                        Weak
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {topic.solved} / {topic.mcqCount}
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${isWeak ? "text-destructive" : "text-muted-foreground"}`}>
                      <Target className="w-3 h-3" /> {topic.accuracy}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Practice Type */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Practice Type
        </h2>
        <div className="space-y-2">
          {([
            { key: "learning" as PracticeType, icon: BookOpen, label: "Learning Mode", desc: "Immediate feedback and explanation after each question" },
            { key: "timed" as PracticeType, icon: Clock, label: "Timed Mode", desc: "Simulates exam conditions with a timer" },
            { key: "custom" as PracticeType, icon: Settings2, label: "Custom Set", desc: "Choose the number of questions" },
          ]).map(m => {
            const active = practiceType === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setPracticeType(m.key)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg text-left transition-colors ${
                  active
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-secondary/50 hover:bg-secondary border border-transparent"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  active ? "gradient-orange" : "bg-muted"
                }`}>
                  <m.icon className={`w-4 h-4 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </div>
                <div className="min-w-0">
                  <span className={`text-sm font-medium ${active ? "text-foreground" : "text-secondary-foreground"}`}>
                    {m.label}
                  </span>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
                <div className={`ml-auto w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  active ? "border-primary" : "border-muted-foreground/40"
                }`}>
                  {active && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Timed Mode Settings */}
        <AnimatePresence>
          {practiceType === "timed" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <Timer className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Timed Practice Settings</h3>
                </div>

                {/* Question Count */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Questions
                  </label>
                  <div className="flex gap-2">
                    {questionCountOptions.map(opt => (
                      <button
                        key={String(opt.value)}
                        onClick={() => setTimedQuestionCount(opt.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          timedQuestionCount === opt.value
                            ? "gradient-orange text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {timedQuestionCount === "custom" && (
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        type="number"
                        min={5}
                        max={100}
                        value={timedCustomCount}
                        onChange={e => setTimedCustomCount(Number(e.target.value))}
                        className="w-24 px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-foreground"
                      />
                      <span className="text-xs text-muted-foreground">questions</span>
                    </div>
                  )}
                </div>

                {/* Time Limit */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                    Time Limit
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setTimeLimitMode("auto")}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        timeLimitMode === "auto"
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-secondary/50 hover:bg-secondary border border-transparent"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        timeLimitMode === "auto" ? "border-primary" : "border-muted-foreground/40"
                      }`}>
                        {timeLimitMode === "auto" && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">Auto</span>
                        <p className="text-xs text-muted-foreground">
                          1 min per question · {actualTimedCount} questions → {actualTimedCount} minutes
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => setTimeLimitMode("custom")}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        timeLimitMode === "custom"
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-secondary/50 hover:bg-secondary border border-transparent"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        timeLimitMode === "custom" ? "border-primary" : "border-muted-foreground/40"
                      }`}>
                        {timeLimitMode === "custom" && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">Custom</span>
                        {timeLimitMode === "custom" && (
                          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                            <input
                              type="number"
                              min={1}
                              max={180}
                              value={customTimeLimit}
                              onChange={e => setCustomTimeLimit(Number(e.target.value))}
                              className="w-20 px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-foreground"
                            />
                            <span className="text-xs text-muted-foreground">minutes</span>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Exam Options */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
                    Exam Options
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={showResultsAfterExam} onCheckedChange={(v) => setShowResultsAfterExam(!!v)} />
                      <div>
                        <span className="text-sm text-foreground">Show results after exam</span>
                        <p className="text-xs text-muted-foreground">View explanations and correct answers after finishing</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={allowMarking} onCheckedChange={(v) => setAllowMarking(!!v)} />
                      <div>
                        <span className="text-sm text-foreground">Allow marking questions</span>
                        <p className="text-xs text-muted-foreground">Flag questions for review during the exam</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={lockPreviousQuestions} onCheckedChange={(v) => setLockPreviousQuestions(!!v)} />
                      <div>
                        <span className="text-sm text-foreground">Lock previous questions</span>
                        <p className="text-xs text-muted-foreground">Prevent going back to already answered questions</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Estimated Time */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground font-medium">
                    Estimated time: {estimatedTime} minutes
                  </span>
                  <span className="text-xs text-muted-foreground">
                    · {actualTimedCount} questions
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {practiceType === "custom" && (
          <div className="mt-4 flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
            <label className="text-sm text-muted-foreground">Number of questions:</label>
            <input
              type="number"
              min={5}
              max={50}
              value={customCount}
              onChange={e => setCustomCount(Number(e.target.value))}
              className="w-20 px-3 py-1.5 rounded-lg bg-muted border border-border text-sm text-foreground"
            />
          </div>
        )}
      </div>

      {/* Advanced Settings */}
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-5 hover:bg-secondary/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Advanced Settings</span>
          </div>
          <span className="text-xs text-muted-foreground">{showAdvanced ? "Hide" : "Show"}</span>
        </button>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="px-5 pb-5 space-y-5 border-t border-border pt-4"
          >
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Difficulty
              </label>
              <div className="flex gap-2">
                {(["easy", "medium", "hard", "mixed"] as Difficulty[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
                      difficulty === d
                        ? "gradient-orange text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-foreground">Randomize Questions</label>
                <p className="text-xs text-muted-foreground">Shuffle question order</p>
              </div>
              <Switch checked={randomize} onCheckedChange={setRandomize} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-foreground">Show Explanations</label>
                <p className="text-xs text-muted-foreground">Display explanation after answering</p>
              </div>
              <Switch checked={showExplanations} onCheckedChange={setShowExplanations} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Start Button */}
      <motion.button
        onClick={startSession}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl gradient-orange text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity"
      >
        <Play className="w-5 h-5" />
        {buttonLabel}
      </motion.button>
    </div>
  );
};

export default SubjectPage;

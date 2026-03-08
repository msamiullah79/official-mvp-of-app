import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Clock, Target, GraduationCap, Zap, ChevronRight } from "lucide-react";

const mockExams = [
  { id: "mock-1", title: "1st Year Annual Mock", questions: 100, time: 120, passing: 60, attempts: 3, type: "mock" },
  { id: "mock-2", title: "Anatomy Midterm Mock", questions: 50, time: 60, passing: 55, attempts: 5, type: "mock" },
  { id: "model-1", title: "UHS Model Paper 2025", questions: 100, time: 120, passing: 65, attempts: 2, type: "model" },
  { id: "model-2", title: "KEMU Internal Paper", questions: 80, time: 90, passing: 60, attempts: 3, type: "model" },
  { id: "timed-1", title: "Speed Round: Biochemistry", questions: 30, time: 20, passing: 50, attempts: 10, type: "timed" },
  { id: "timed-2", title: "Physiology Sprint", questions: 40, time: 30, passing: 55, attempts: 10, type: "timed" },
];

type Tab = "mock" | "model" | "timed";
type ExamStyle = "student" | "exam";

const ExamMode = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("mock");
  const [examStyle, setExamStyle] = useState<ExamStyle>("exam");

  const filteredExams = mockExams.filter(e => e.type === tab);

  const tabs: { key: Tab; label: string; icon: typeof FileText }[] = [
    { key: "mock", label: "Mock Tests", icon: FileText },
    { key: "model", label: "Model Papers", icon: GraduationCap },
    { key: "timed", label: "Timed Exams", icon: Zap },
  ];

  const startExam = (examId: string, questions: number, time: number) => {
    const params = new URLSearchParams();
    params.set("mode", "timed");
    params.set("count", String(questions));
    if (examStyle === "exam") params.set("examMode", "true");
    params.set("explanations", examStyle === "student" ? "true" : "false");
    // For now route to a generic session — in future, exams will have their own question banks
    navigate(`/practice/block/1/subject/anatomy/session?${params.toString()}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">Exam Mode</h1>
      <p className="text-muted-foreground mb-6">Simulate real exam conditions with timed papers and no instant feedback.</p>

      {/* Exam style toggle */}
      <div className="glass-card p-4 mb-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Exam Style</p>
        <div className="flex gap-3">
          <button
            onClick={() => setExamStyle("student")}
            className={`flex-1 p-4 rounded-lg border transition-colors text-left ${
              examStyle === "student" ? "border-primary bg-primary/10" : "border-border bg-secondary/30 hover:bg-secondary/50"
            }`}
          >
            <p className="text-sm font-semibold text-foreground mb-1">Student Mode</p>
            <p className="text-xs text-muted-foreground">Instant feedback & explanations after each question</p>
          </button>
          <button
            onClick={() => setExamStyle("exam")}
            className={`flex-1 p-4 rounded-lg border transition-colors text-left ${
              examStyle === "exam" ? "border-primary bg-primary/10" : "border-border bg-secondary/30 hover:bg-secondary/50"
            }`}
          >
            <p className="text-sm font-semibold text-foreground mb-1">Exam Mode</p>
            <p className="text-xs text-muted-foreground">Timer enabled, results shown only after submission</p>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key ? "gradient-orange text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {/* Exam cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExams.map((exam, i) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 flex flex-col"
          >
            <h3 className="text-base font-semibold text-foreground mb-3">{exam.title}</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-3.5 h-3.5" /> {exam.questions} questions
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5" /> {exam.time} min
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="w-3.5 h-3.5" /> {exam.passing}% to pass
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-3.5 h-3.5" /> {exam.attempts} attempts
              </div>
            </div>
            <button
              onClick={() => startExam(exam.id, exam.questions, exam.time)}
              className="mt-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start Exam <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExamMode;

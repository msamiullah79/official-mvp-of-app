import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getModuleSubject, getModule } from "@/data/curriculumData";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const QUESTION_OPTIONS = [20, 30, 40, 60];
const MIN_QUESTIONS = 15;

const SubjectRevisionSetup = () => {
  const navigate = useNavigate();
  const { yearSlug, moduleSlug, subjectSlug } = useParams();
  const [selected, setSelected] = useState(30);
  const [error, setError] = useState("");

  const mod = getModule(yearSlug || "", moduleSlug || "");
  const subject = getModuleSubject(yearSlug || "", moduleSlug || "", subjectSlug || "");

  const handleStart = () => {
    if (selected < MIN_QUESTIONS) {
      setError(`Minimum ${MIN_QUESTIONS} questions required.`);
      return;
    }
    setError("");
    navigate(
      `/practice/${yearSlug}/${moduleSlug}/${subjectSlug}/session?mode=timed&count=${selected}&randomize=true&timer=${selected}`
    );
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8"
      >
        <h1 className="text-xl font-bold text-foreground mb-1">Subject Revision Setup</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {subject?.name || "Subject"} · {mod?.name || "Module"}
        </p>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1">
            Total available questions: <span className="font-semibold text-foreground">60</span>
          </p>
          <p className="text-sm font-medium text-foreground mb-3">Choose number of questions:</p>

          <div className="grid grid-cols-2 gap-3">
            {QUESTION_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => { setSelected(n); setError(""); }}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                  selected === n
                    ? "border-primary bg-primary/10 text-primary font-bold"
                    : "border-border bg-secondary/30 text-foreground hover:border-primary/40"
                }`}
              >
                <span className="text-2xl font-bold">{n}</span>
                <p className="text-xs text-muted-foreground mt-1">{n} min timer</p>
              </button>
            ))}
          </div>

          {error && (
            <p className="text-sm text-destructive mt-3">{error}</p>
          )}
        </div>

        <button
          onClick={handleStart}
          className="w-full py-3 rounded-xl gradient-orange text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Start Session
        </button>
      </motion.div>
    </div>
  );
};

export default SubjectRevisionSetup;

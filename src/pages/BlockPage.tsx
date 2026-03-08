import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { getModule } from "@/data/curriculumData";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Target, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const BlockPage = () => {
  const { yearSlug, moduleSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const subjectFilter = searchParams.get("subject");

  const mod = getModule(yearSlug || "", moduleSlug || "");

  if (!mod) {
    return (
      <div className="p-6 text-center text-muted-foreground">Module not found.</div>
    );
  }

  // If a subject filter is active, find that subject and show its topics directly
  const filteredSubject = subjectFilter
    ? mod.subjects.find(
        (s) => s.name.toLowerCase() === subjectFilter.toLowerCase()
      )
    : null;

  const startRevision = () => {
    navigate(`/practice/${yearSlug}/${moduleSlug}/revision?mode=practice&count=50&randomize=true`);
  };

  // Build back link preserving subject filter
  const practiceLink = subjectFilter
    ? `/practice?subject=${encodeURIComponent(subjectFilter)}`
    : "/practice";

  // If subject filter is active, show topics directly (skip subject selection)
  if (filteredSubject) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 flex-wrap">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <span className="text-muted-foreground/40">›</span>
          <Link to={practiceLink} className="text-muted-foreground hover:text-foreground transition-colors">
            {subjectFilter}
          </Link>
          <span className="text-muted-foreground/40">›</span>
          <span className="text-foreground font-medium">{mod.name}</span>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-1">
          {mod.name} — {filteredSubject.name}
        </h1>
        <p className="text-muted-foreground mb-6">
          Choose a topic to practice.
        </p>

        {/* Quick Practice for this subject */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 flex items-center justify-between glow-orange mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Quick Practice</h3>
              <p className="text-xs text-muted-foreground">
                10 random {filteredSubject.name} questions
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              navigate(
                `/practice/${yearSlug}/${moduleSlug}/${filteredSubject.slug}/session?mode=practice&count=10&randomize=true`
              )
            }
            className="px-4 py-2 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start
          </button>
        </motion.div>

        {/* Topics list */}
        <div className="space-y-3">
          {filteredSubject.topics.map((topic, i) => {
            const pct = topic.mcqCount > 0 ? Math.round((topic.solved / topic.mcqCount) * 100) : 0;
            const isWeak = topic.accuracy < 60;

            return (
              <motion.div
                key={topic.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/practice/${yearSlug}/${moduleSlug}/${filteredSubject.slug}?subject=${encodeURIComponent(subjectFilter)}`}
                  className="glass-card p-4 flex items-center gap-4 hover:glow-orange transition-all duration-300 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {topic.name}
                      </h3>
                      {isWeak && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive font-medium">
                          Weak
                        </span>
                      )}
                    </div>

                    <Progress value={pct} className="h-1.5 mb-1.5" />

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono">{topic.solved} / {topic.mcqCount}</span>
                      <span className={`flex items-center gap-1 ${isWeak ? "text-destructive" : ""}`}>
                        <Target className="w-3 h-3" /> {topic.accuracy}%
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default: show all subjects in the module (no filter)
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <span className="text-muted-foreground/40">·</span>
        <Link
          to="/practice"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Practice
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-1">{mod.name}</h1>
      <p className="text-muted-foreground mb-6">Choose a subject to practice.</p>

      {/* Module Revision Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 flex items-center justify-between glow-orange mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Module Revision</h3>
            <p className="text-xs text-muted-foreground">
              50 mixed MCQs · Anatomy + Physiology + Biochemistry
            </p>
          </div>
        </div>
        <button
          onClick={startRevision}
          className="px-4 py-2 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Start
        </button>
      </motion.div>

      <div className="space-y-4">
        {mod.subjects.map((subject, i) => {
          const pct = subject.total > 0 ? Math.round((subject.solved / subject.total) * 100) : 0;

          return (
            <motion.div
              key={subject.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/practice/${yearSlug}/${moduleSlug}/${subject.slug}`}
                className="glass-card p-5 flex items-center gap-5 hover:glow-orange transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-primary/10 border-2 border-primary/20"
                >
                  <span className="text-xl font-bold text-primary">
                    {subject.name[0]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {subject.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>

                  <Progress value={pct} className="h-2 mb-2" />

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-mono">{subject.solved} / {subject.total} solved</span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" /> Accuracy: {subject.accuracy}%
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BlockPage;

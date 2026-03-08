import { useNavigate } from "react-router-dom";
import { PlayCircle, Clock, Rocket } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PracticeSession {
  id: string;
  module: string;
  subject: string;
  topic: string;
  yearSlug: string;
  moduleSlug: string;
  subjectSlug: string;
  answered: number;
  total: number;
  completed: boolean;
  lastActiveAt: Date;
}

const mockSessions: PracticeSession[] = [
  {
    id: "s1",
    module: "Cardiovascular System",
    subject: "Physiology",
    topic: "Cardiac Cycle",
    yearSlug: "year-1",
    moduleSlug: "cardiovascular",
    subjectSlug: "physiology",
    answered: 6,
    total: 10,
    completed: false,
    lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "s2",
    module: "Musculoskeletal System",
    subject: "Anatomy",
    topic: "Upper Limb",
    yearSlug: "year-1",
    moduleSlug: "musculoskeletal",
    subjectSlug: "anatomy",
    answered: 20,
    total: 20,
    completed: true,
    lastActiveAt: new Date(Date.now() - 26 * 60 * 60 * 1000), // yesterday
  },
];

const getLatestSession = (): PracticeSession | null => {
  if (mockSessions.length === 0) return null;
  const unfinished = mockSessions
    .filter((s) => !s.completed)
    .sort((a, b) => b.lastActiveAt.getTime() - a.lastActiveAt.getTime());
  if (unfinished.length > 0) return unfinished[0];
  return [...mockSessions].sort(
    (a, b) => b.lastActiveAt.getTime() - a.lastActiveAt.getTime()
  )[0];
};

const ContinuePractice = () => {
  const navigate = useNavigate();
  const session = getLatestSession();

  if (!session) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Continue Practice
        </h3>
        <div className="flex flex-col items-center py-4 text-center">
          <Rocket className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-3">
            You haven't started practicing yet.
          </p>
          <button
            onClick={() => navigate("/practice")}
            className="px-4 py-2 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start Practicing
          </button>
        </div>
      </div>
    );
  }

  const pct = Math.round((session.answered / session.total) * 100);
  const timeAgo = formatDistanceToNow(session.lastActiveAt, { addSuffix: true });
  const resumePath = `/practice/${session.yearSlug}/${session.moduleSlug}/${session.subjectSlug}/session?mode=practice&sessionId=${session.id}&startFrom=${session.answered}`;

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Continue Practice
      </h3>
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm text-foreground font-medium">
            {session.module} → {session.subject} → {session.topic}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-32 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full gradient-orange"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {session.answered} / {session.total} completed
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Last practiced: {timeAgo}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(session.completed ? `/practice/${session.yearSlug}/${session.moduleSlug}/${session.subjectSlug}` : resumePath)}
          className="shrink-0 ml-4 px-4 py-2 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <PlayCircle className="w-4 h-4" />
          {session.completed ? "Practice Again" : "Resume"}
        </button>
      </div>
    </div>
  );
};

export default ContinuePractice;

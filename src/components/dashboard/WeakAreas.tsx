import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const weakTopics = [
  { topic: "Renal Physiology", subject: "physiology", accuracy: 42 },
  { topic: "Upper Limb", subject: "anatomy", accuracy: 51 },
  { topic: "Glycolysis", subject: "biochemistry", accuracy: 48 },
];

const WeakAreas = () => {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-destructive" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Weak Topics
        </h3>
      </div>
      <div className="space-y-2">
        {weakTopics.map((t) => (
          <div
            key={t.topic}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{t.topic}</p>
              <p className="text-xs text-muted-foreground capitalize">{t.subject}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm font-bold text-destructive">{t.accuracy}%</span>
              <button
                onClick={() => navigate(`/practice?subject=${t.subject}`)}
                className="text-xs px-3 py-1 rounded-md gradient-orange text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Practice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeakAreas;

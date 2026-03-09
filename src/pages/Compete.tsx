import { useNavigate } from "react-router-dom";
import { competitions, Competition } from "@/data/mockData";
import { useCompetitionState } from "@/hooks/useCompetitionState";
import { Trophy, Users, Calendar, Clock, Zap, Target, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

const typeIcons = {
  daily: Zap,
  weekly: Clock,
  topic: Target,
};

const typeLabels = {
  daily: "Daily Challenge",
  weekly: "Weekly Contest",
  topic: "Topic Battle",
};

const Compete = () => {
  const navigate = useNavigate();
  const { isCompleted, isRegistered, register, getState } = useCompetitionState();

  const grouped = {
    daily: competitions.filter(c => c.type === "daily"),
    weekly: competitions.filter(c => c.type === "weekly"),
    topic: competitions.filter(c => c.type === "topic"),
  };

  const handleJoinOrRegister = (comp: Competition) => {
    if (comp.status === "upcoming") {
      // Register for upcoming competition
      register(comp.id);
      toast({
        title: "Registered Successfully!",
        description: `You are registered for ${comp.title}. You will be notified when it starts.`,
      });
    } else if (comp.status === "active") {
      if (isCompleted(comp.id)) {
        // View results
        const state = getState(comp.id);
        navigate(`/compete/${comp.id}/results`, {
          state: {
            score: state?.score || 0,
            accuracy: state?.accuracy || 0,
            timeTaken: state?.timeTaken || 0,
            correct: 0,
            incorrect: 0,
            skipped: 0,
            total: comp.mcqCount,
          }
        });
      } else {
        // Start competition
        navigate(`/compete/${comp.id}/session`);
      }
    }
  };

  const getButtonText = (comp: Competition) => {
    if (comp.status === "upcoming") {
      return isRegistered(comp.id) ? "Registered ✓" : "Register";
    }
    if (isCompleted(comp.id)) {
      return "View Results";
    }
    return "Join Now";
  };

  const getButtonStyle = (comp: Competition) => {
    if (isRegistered(comp.id) && comp.status === "upcoming") {
      return "bg-success/20 text-success cursor-default";
    }
    if (isCompleted(comp.id)) {
      return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    }
    return "gradient-orange text-primary-foreground hover:opacity-90";
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">Competitions</h1>
      <p className="text-muted-foreground mb-8">Join competitive MCQ challenges and test your skills.</p>

      {(["daily", "weekly", "topic"] as const).map(type => {
        const Icon = typeIcons[type];
        const comps = grouped[type];
        if (comps.length === 0) return null;

        return (
          <div key={type} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">{typeLabels[type]}</h2>
            </div>
            <div className="space-y-4">
              {comps.map((comp, i) => {
                const completed = isCompleted(comp.id);
                const registered = isRegistered(comp.id);
                
                return (
                  <motion.div
                    key={comp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`glass-card p-6 hover:glow-orange transition-all duration-300 ${completed ? "opacity-80" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          completed ? "bg-success/20" : "gradient-orange"
                        }`}>
                          {completed ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : (
                            <Trophy className="w-5 h-5 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg">{comp.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{comp.description}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" />
                              {comp.participants.toLocaleString()} participants
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(comp.deadline).toLocaleDateString()}
                            </span>
                            <span className="text-xs">
                              {comp.mcqCount} MCQs • {comp.timeLimit} min
                            </span>
                          </div>
                          {completed && (
                            <div className="mt-2 text-xs text-success flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Completed - Score: {getState(comp.id)?.score || 0} pts
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
                        comp.status === "active"
                          ? "bg-success/10 text-success"
                          : "bg-primary/10 text-primary"
                      }`}>
                        {comp.status === "active" ? "Active" : "Upcoming"}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleJoinOrRegister(comp)}
                      disabled={registered && comp.status === "upcoming"}
                      className={`mt-4 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${getButtonStyle(comp)}`}
                    >
                      {getButtonText(comp)}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Compete;

import { competitions } from "@/data/mockData";
import { Trophy, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Compete = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">Competitions</h1>
      <p className="text-muted-foreground mb-6">Join competitive MCQ challenges and test your skills.</p>
      <div className="space-y-4">
        {competitions.map((comp, i) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 hover:glow-orange transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{comp.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {comp.participants} participants
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(comp.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                comp.status === "active"
                  ? "bg-success/10 text-success"
                  : "bg-primary/10 text-primary"
              }`}>
                {comp.status === "active" ? "Active" : "Upcoming"}
              </span>
            </div>
            <button className="mt-4 px-5 py-2 rounded-lg gradient-orange text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              {comp.status === "active" ? "Join Now" : "Register"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Compete;

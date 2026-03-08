import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { subjects, sampleMCQs } from "@/data/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

type SessionMode = "practice" | "timed" | "custom";

const SubjectPage = () => {
  const { blockId, subjectSlug } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find(s => s.slug === subjectSlug);
  const subjectName = subject?.name || "";
  const topics = subject?.topics || [];

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [mode, setMode] = useState<SessionMode>("practice");
  const [customCount, setCustomCount] = useState(10);

  const allSelected = selectedTopics.length === topics.length;

  const toggleTopic = (name: string) => {
    setSelectedTopics(prev =>
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    );
  };

  const toggleAll = () => {
    setSelectedTopics(allSelected ? [] : topics.map(t => t.name));
  };

  const startSession = () => {
    const params = new URLSearchParams();
    if (selectedTopics.length > 0) params.set("topics", selectedTopics.join(","));
    params.set("mode", mode);
    if (mode === "custom") params.set("count", String(customCount));
    navigate(`/practice/block/${blockId}/subject/${subjectSlug}/session?${params.toString()}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">{subjectName} — Block {blockId}</h1>
      <p className="text-muted-foreground mb-6">Select topics and mode to start practicing.</p>

      {/* Session Mode */}
      <div className="flex gap-3 mb-6">
        {([
          { key: "practice", label: "Practice Mode" },
          { key: "timed", label: "Timed Mode" },
          { key: "custom", label: "Custom Set" },
        ] as const).map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m.key
                ? "gradient-orange text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "custom" && (
        <div className="glass-card p-4 mb-6 flex items-center gap-4">
          <label className="text-sm text-muted-foreground">Number of questions:</label>
          <input
            type="number"
            min={5}
            max={50}
            value={customCount}
            onChange={e => setCustomCount(Number(e.target.value))}
            className="w-20 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm text-foreground"
          />
        </div>
      )}

      {/* Topic Selection */}
      <div className="glass-card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Topics</h3>
          <button
            onClick={toggleAll}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {allSelected ? "Deselect All" : "Select All"}
          </button>
        </div>
        <div className="space-y-2">
          {topics.map((topic, i) => {
            const mcqCount = sampleMCQs.filter(q => q.topic === topic.name).length || topic.count;
            return (
              <motion.div
                key={topic.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                  selectedTopics.includes(topic.name)
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
                onClick={() => toggleTopic(topic.name)}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedTopics.includes(topic.name)}
                    onCheckedChange={() => toggleTopic(topic.name)}
                  />
                  <span className="text-sm font-medium text-foreground">{topic.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{mcqCount} MCQs</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <button
        onClick={startSession}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-orange text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        Start {mode === "timed" ? "Timed " : mode === "custom" ? "Custom " : ""}Practice
      </button>
    </div>
  );
};

export default SubjectPage;

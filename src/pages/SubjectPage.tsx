import { Link, useParams } from "react-router-dom";
import { sampleMCQs } from "@/data/mockData";

const topics = ["Upper Limb", "Lower Limb", "Neurophysiology", "Renal Physiology", "Carbohydrate Metabolism", "Vitamins", "Immunology"];

const SubjectPage = () => {
  const { blockId, subjectSlug } = useParams();
  const subjectName = subjectSlug ? subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1) : "";

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-2">{subjectName} — Block {blockId}</h1>
      <p className="text-muted-foreground mb-6">Topics available for practice.</p>
      <div className="space-y-2 mb-6">
        {topics.map((topic) => {
          const count = sampleMCQs.filter(q => q.topic === topic).length;
          return (
            <div key={topic} className="glass-card p-4 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{topic}</span>
              <span className="text-xs text-muted-foreground">{count || Math.floor(Math.random() * 10 + 3)} MCQs</span>
            </div>
          );
        })}
      </div>
      <Link
        to={`/practice/block/${blockId}/subject/${subjectSlug}/session`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-orange text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
      >
        Start Practice
      </Link>
    </div>
  );
};

export default SubjectPage;

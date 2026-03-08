import { Link, useSearchParams } from "react-router-dom";
import { academicYears } from "@/data/curriculumData";
import { currentUser } from "@/data/mockData";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import CircularModuleNode from "@/components/practice/CircularModuleNode";

const getUserYearSlug = () => {
  const yearMatch = currentUser.year.match(/(\d)/);
  const yearNum = yearMatch ? parseInt(yearMatch[1]) : 1;
  return `year-${yearNum}`;
};

const PracticeHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const subjectFilter = searchParams.get("subject");

  const yearSlug = getUserYearSlug();
  const year = academicYears.find((y) => y.slug === yearSlug);
  const allModules = year?.modules || [];

  const modules = subjectFilter
    ? allModules.filter((mod) =>
        mod.subjects.some(
          (s) => s.name.toLowerCase() === subjectFilter.toLowerCase()
        )
      )
    : allModules;

  const clearFilter = () => {
    searchParams.delete("subject");
    setSearchParams(searchParams);
  };

  // Build path layout rows: 1, 2, 2, 2, ...
  const rows: typeof modules[] = [];
  let idx = 0;
  if (modules.length > 0) {
    rows.push([modules[idx++]]);
  }
  while (idx < modules.length) {
    const pair = [];
    pair.push(modules[idx++]);
    if (idx < modules.length) pair.push(modules[idx++]);
    rows.push(pair);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-foreground mb-1">
        {subjectFilter ? `${subjectFilter} — Practice` : "Practice"}
      </h1>
      <p className="text-muted-foreground mb-8">
        {year?.name} · {subjectFilter ? `Modules containing ${subjectFilter}` : "Choose a module to begin your journey."}
      </p>

      {subjectFilter && (
        <div className="flex items-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
            {subjectFilter}
            <button
              onClick={clearFilter}
              className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
          <span className="text-xs text-muted-foreground">
            {modules.length} module{modules.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Journey path layout */}
      <div className="flex flex-col items-center gap-6">
        {rows.map((row, rowIdx) => {
          // Connecting line between rows
          const showConnector = rowIdx > 0;
          return (
            <div key={rowIdx} className="flex flex-col items-center">
              {showConnector && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: rowIdx * 0.15, duration: 0.4 }}
                  className="w-px h-8 bg-border mb-4 origin-top"
                />
              )}
              <div
                className={`flex items-start gap-12 ${
                  row.length === 1 ? "justify-center" : "justify-center"
                }`}
              >
                {row.map((mod, colIdx) => {
                  const globalIdx = rowIdx === 0 ? 0 : 1 + (rowIdx - 1) * 2 + colIdx;
                  const subjectData = subjectFilter
                    ? mod.subjects.find(
                        (s) => s.name.toLowerCase() === subjectFilter.toLowerCase()
                      )
                    : null;

                  const linkTo =
                    subjectFilter && subjectData
                      ? `/practice/${yearSlug}/${mod.slug}/${subjectData.slug}?subject=${encodeURIComponent(subjectFilter)}`
                      : `/practice/${yearSlug}/${mod.slug}`;

                  return (
                    <CircularModuleNode
                      key={mod.slug}
                      module={mod}
                      linkTo={linkTo}
                      delay={globalIdx * 0.12}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticeHome;

export interface TopicData {
  name: string;
  slug: string;
  mcqCount: number;
  solved: number;
  accuracy: number;
}

export interface ModuleSubject {
  name: string;
  slug: string;
  solved: number;
  total: number;
  accuracy: number;
  topics: TopicData[];
}

export interface CurriculumModule {
  id: string;
  name: string;
  slug: string;
  mcqCount: number;
  solved: number;
  accuracy: number;
  subjects: ModuleSubject[];
}

export interface AcademicYear {
  id: number;
  name: string;
  slug: string;
  totalMCQs: number;
  solved: number;
  accuracy: number;
  modules: CurriculumModule[];
}

const year1Modules: CurriculumModule[] = [
  {
    id: "y1m1",
    name: "Foundation Module",
    slug: "foundation",
    mcqCount: 120,
    solved: 45,
    accuracy: 71,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 18,
        total: 40,
        accuracy: 68,
        topics: [
          { name: "General Anatomy", slug: "general-anatomy", mcqCount: 15, solved: 8, accuracy: 65 },
          { name: "Histology Basics", slug: "histology-basics", mcqCount: 12, solved: 5, accuracy: 58 },
          { name: "Embryology Basics", slug: "embryology-basics", mcqCount: 13, solved: 5, accuracy: 72 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 15,
        total: 40,
        accuracy: 74,
        topics: [
          { name: "Cell Physiology", slug: "cell-physiology", mcqCount: 14, solved: 6, accuracy: 70 },
          { name: "Body Fluids", slug: "body-fluids", mcqCount: 13, solved: 5, accuracy: 76 },
          { name: "Blood Physiology", slug: "blood-physiology", mcqCount: 13, solved: 4, accuracy: 75 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 12,
        total: 40,
        accuracy: 66,
        topics: [
          { name: "Amino Acids & Proteins", slug: "amino-acids-proteins", mcqCount: 14, solved: 5, accuracy: 62 },
          { name: "Enzymes", slug: "enzymes", mcqCount: 13, solved: 4, accuracy: 58 },
          { name: "Vitamins & Minerals", slug: "vitamins-minerals", mcqCount: 13, solved: 3, accuracy: 70 },
        ],
      },
    ],
  },
  {
    id: "y1m2",
    name: "Hematopoietic & Lymphatic System",
    slug: "hematopoietic-lymphatic",
    mcqCount: 100,
    solved: 32,
    accuracy: 64,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 12,
        total: 35,
        accuracy: 60,
        topics: [
          { name: "Lymph Nodes & Spleen", slug: "lymph-nodes-spleen", mcqCount: 12, solved: 5, accuracy: 55 },
          { name: "Thymus & Bone Marrow", slug: "thymus-bone-marrow", mcqCount: 11, solved: 4, accuracy: 62 },
          { name: "Histology of Blood", slug: "histology-blood", mcqCount: 12, solved: 3, accuracy: 58 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 10,
        total: 30,
        accuracy: 68,
        topics: [
          { name: "Hematopoiesis", slug: "hematopoiesis", mcqCount: 10, solved: 4, accuracy: 72 },
          { name: "Hemostasis", slug: "hemostasis", mcqCount: 10, solved: 3, accuracy: 60 },
          { name: "Immunity", slug: "immunity", mcqCount: 10, solved: 3, accuracy: 66 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 10,
        total: 35,
        accuracy: 62,
        topics: [
          { name: "Hemoglobin Biochemistry", slug: "hemoglobin-biochemistry", mcqCount: 12, solved: 4, accuracy: 58 },
          { name: "Iron Metabolism", slug: "iron-metabolism", mcqCount: 12, solved: 3, accuracy: 55 },
          { name: "Immunoglobulins", slug: "immunoglobulins", mcqCount: 11, solved: 3, accuracy: 68 },
        ],
      },
    ],
  },
  {
    id: "y1m3",
    name: "Musculoskeletal System",
    slug: "musculoskeletal",
    mcqCount: 150,
    solved: 48,
    accuracy: 66,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 20,
        total: 60,
        accuracy: 65,
        topics: [
          { name: "Upper Limb", slug: "upper-limb", mcqCount: 15, solved: 8, accuracy: 65 },
          { name: "Lower Limb", slug: "lower-limb", mcqCount: 15, solved: 6, accuracy: 60 },
          { name: "Joints", slug: "joints", mcqCount: 15, solved: 4, accuracy: 58 },
          { name: "Muscles & Fascia", slug: "muscles-fascia", mcqCount: 15, solved: 2, accuracy: 72 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 15,
        total: 45,
        accuracy: 70,
        topics: [
          { name: "Muscle Physiology", slug: "muscle-physiology", mcqCount: 15, solved: 6, accuracy: 72 },
          { name: "Nerve-Muscle Junction", slug: "nerve-muscle-junction", mcqCount: 15, solved: 5, accuracy: 68 },
          { name: "Motor System", slug: "motor-system", mcqCount: 15, solved: 4, accuracy: 65 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 13,
        total: 45,
        accuracy: 61,
        topics: [
          { name: "Calcium Metabolism", slug: "calcium-metabolism", mcqCount: 15, solved: 5, accuracy: 58 },
          { name: "Collagen & Connective Tissue", slug: "collagen-connective-tissue", mcqCount: 15, solved: 4, accuracy: 55 },
          { name: "Bone Biochemistry", slug: "bone-biochemistry", mcqCount: 15, solved: 4, accuracy: 64 },
        ],
      },
    ],
  },
  {
    id: "y1m4",
    name: "Cardiovascular System",
    slug: "cardiovascular",
    mcqCount: 130,
    solved: 38,
    accuracy: 69,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 14,
        total: 45,
        accuracy: 66,
        topics: [
          { name: "Heart Anatomy", slug: "heart-anatomy", mcqCount: 15, solved: 6, accuracy: 70 },
          { name: "Blood Vessels", slug: "blood-vessels", mcqCount: 15, solved: 4, accuracy: 60 },
          { name: "Mediastinum", slug: "mediastinum", mcqCount: 15, solved: 4, accuracy: 62 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 14,
        total: 45,
        accuracy: 74,
        topics: [
          { name: "Cardiac Cycle", slug: "cardiac-cycle", mcqCount: 15, solved: 6, accuracy: 76 },
          { name: "ECG & Arrhythmias", slug: "ecg-arrhythmias", mcqCount: 15, solved: 4, accuracy: 70 },
          { name: "Blood Pressure Regulation", slug: "bp-regulation", mcqCount: 15, solved: 4, accuracy: 72 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 10,
        total: 40,
        accuracy: 64,
        topics: [
          { name: "Lipid Metabolism", slug: "lipid-metabolism", mcqCount: 14, solved: 4, accuracy: 58 },
          { name: "Cardiac Biomarkers", slug: "cardiac-biomarkers", mcqCount: 13, solved: 3, accuracy: 62 },
          { name: "Lipoproteins", slug: "lipoproteins", mcqCount: 13, solved: 3, accuracy: 68 },
        ],
      },
    ],
  },
  {
    id: "y1m5",
    name: "Respiratory System",
    slug: "respiratory",
    mcqCount: 120,
    solved: 35,
    accuracy: 72,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 12,
        total: 40,
        accuracy: 70,
        topics: [
          { name: "Thoracic Wall", slug: "thoracic-wall", mcqCount: 14, solved: 5, accuracy: 68 },
          { name: "Lungs & Pleura", slug: "lungs-pleura", mcqCount: 13, solved: 4, accuracy: 72 },
          { name: "Diaphragm & Intercostals", slug: "diaphragm-intercostals", mcqCount: 13, solved: 3, accuracy: 66 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 13,
        total: 40,
        accuracy: 78,
        topics: [
          { name: "Pulmonary Ventilation", slug: "pulmonary-ventilation", mcqCount: 14, solved: 5, accuracy: 80 },
          { name: "Gas Exchange", slug: "gas-exchange", mcqCount: 13, solved: 4, accuracy: 76 },
          { name: "Oxygen Transport", slug: "oxygen-transport", mcqCount: 13, solved: 4, accuracy: 74 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 10,
        total: 40,
        accuracy: 66,
        topics: [
          { name: "Acid-Base Balance", slug: "acid-base-balance", mcqCount: 14, solved: 4, accuracy: 62 },
          { name: "Hemoglobin & O2", slug: "hemoglobin-o2", mcqCount: 13, solved: 3, accuracy: 68 },
          { name: "Surfactant Biochemistry", slug: "surfactant-biochemistry", mcqCount: 13, solved: 3, accuracy: 64 },
        ],
      },
    ],
  },
];

const year2Modules: CurriculumModule[] = [
  {
    id: "y2m1",
    name: "Gastrointestinal System",
    slug: "gastrointestinal",
    mcqCount: 140,
    solved: 28,
    accuracy: 58,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 10,
        total: 50,
        accuracy: 55,
        topics: [
          { name: "Abdominal Wall", slug: "abdominal-wall", mcqCount: 13, solved: 4, accuracy: 52 },
          { name: "GI Tract Anatomy", slug: "gi-tract-anatomy", mcqCount: 12, solved: 3, accuracy: 55 },
          { name: "Liver & Pancreas", slug: "liver-pancreas", mcqCount: 13, solved: 2, accuracy: 48 },
          { name: "Peritoneum", slug: "peritoneum", mcqCount: 12, solved: 1, accuracy: 58 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 10,
        total: 45,
        accuracy: 60,
        topics: [
          { name: "GI Motility", slug: "gi-motility", mcqCount: 15, solved: 4, accuracy: 58 },
          { name: "GI Secretions", slug: "gi-secretions", mcqCount: 15, solved: 3, accuracy: 55 },
          { name: "Digestion & Absorption", slug: "digestion-absorption", mcqCount: 15, solved: 3, accuracy: 62 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 8,
        total: 45,
        accuracy: 56,
        topics: [
          { name: "Carbohydrate Metabolism", slug: "carb-metabolism", mcqCount: 15, solved: 3, accuracy: 52 },
          { name: "Protein Metabolism", slug: "protein-metabolism", mcqCount: 15, solved: 3, accuracy: 55 },
          { name: "Bile Acid Metabolism", slug: "bile-acid-metabolism", mcqCount: 15, solved: 2, accuracy: 58 },
        ],
      },
    ],
  },
  {
    id: "y2m2",
    name: "Endocrine System",
    slug: "endocrine",
    mcqCount: 110,
    solved: 20,
    accuracy: 55,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 6,
        total: 35,
        accuracy: 52,
        topics: [
          { name: "Pituitary & Hypothalamus", slug: "pituitary-hypothalamus", mcqCount: 12, solved: 2, accuracy: 50 },
          { name: "Thyroid & Parathyroid", slug: "thyroid-parathyroid", mcqCount: 12, solved: 2, accuracy: 55 },
          { name: "Adrenal Glands", slug: "adrenal-glands", mcqCount: 11, solved: 2, accuracy: 48 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 8,
        total: 40,
        accuracy: 58,
        topics: [
          { name: "Thyroid Hormones", slug: "thyroid-hormones", mcqCount: 14, solved: 3, accuracy: 55 },
          { name: "Adrenal Hormones", slug: "adrenal-hormones", mcqCount: 13, solved: 3, accuracy: 58 },
          { name: "Insulin & Glucagon", slug: "insulin-glucagon", mcqCount: 13, solved: 2, accuracy: 52 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 6,
        total: 35,
        accuracy: 54,
        topics: [
          { name: "Hormone Biochemistry", slug: "hormone-biochemistry", mcqCount: 12, solved: 2, accuracy: 50 },
          { name: "Diabetes Biochemistry", slug: "diabetes-biochemistry", mcqCount: 12, solved: 2, accuracy: 55 },
          { name: "Steroid Hormones", slug: "steroid-hormones", mcqCount: 11, solved: 2, accuracy: 52 },
        ],
      },
    ],
  },
  {
    id: "y2m3",
    name: "Renal System",
    slug: "renal",
    mcqCount: 120,
    solved: 18,
    accuracy: 52,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 6,
        total: 40,
        accuracy: 50,
        topics: [
          { name: "Kidney Anatomy", slug: "kidney-anatomy", mcqCount: 14, solved: 2, accuracy: 48 },
          { name: "Urinary Tract", slug: "urinary-tract", mcqCount: 13, solved: 2, accuracy: 50 },
          { name: "Histology of Kidney", slug: "histology-kidney", mcqCount: 13, solved: 2, accuracy: 45 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 7,
        total: 40,
        accuracy: 55,
        topics: [
          { name: "Glomerular Filtration", slug: "glomerular-filtration", mcqCount: 14, solved: 3, accuracy: 52 },
          { name: "Tubular Reabsorption", slug: "tubular-reabsorption", mcqCount: 13, solved: 2, accuracy: 55 },
          { name: "Acid-Base & Electrolytes", slug: "acid-base-electrolytes", mcqCount: 13, solved: 2, accuracy: 48 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 5,
        total: 40,
        accuracy: 50,
        topics: [
          { name: "Renal Biochemistry", slug: "renal-biochemistry", mcqCount: 14, solved: 2, accuracy: 48 },
          { name: "Electrolyte Balance", slug: "electrolyte-balance", mcqCount: 13, solved: 2, accuracy: 50 },
          { name: "Urea Cycle", slug: "urea-cycle", mcqCount: 13, solved: 1, accuracy: 42 },
        ],
      },
    ],
  },
  {
    id: "y2m4",
    name: "Reproductive System",
    slug: "reproductive",
    mcqCount: 110,
    solved: 15,
    accuracy: 54,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 5,
        total: 38,
        accuracy: 52,
        topics: [
          { name: "Male Reproductive", slug: "male-reproductive", mcqCount: 13, solved: 2, accuracy: 50 },
          { name: "Female Reproductive", slug: "female-reproductive", mcqCount: 13, solved: 2, accuracy: 55 },
          { name: "Perineum & Pelvis", slug: "perineum-pelvis", mcqCount: 12, solved: 1, accuracy: 48 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 5,
        total: 36,
        accuracy: 56,
        topics: [
          { name: "Menstrual Cycle", slug: "menstrual-cycle", mcqCount: 12, solved: 2, accuracy: 55 },
          { name: "Pregnancy Physiology", slug: "pregnancy-physiology", mcqCount: 12, solved: 2, accuracy: 58 },
          { name: "Reproductive Hormones", slug: "reproductive-hormones", mcqCount: 12, solved: 1, accuracy: 50 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 5,
        total: 36,
        accuracy: 52,
        topics: [
          { name: "Sex Hormones Biochemistry", slug: "sex-hormones-biochemistry", mcqCount: 12, solved: 2, accuracy: 50 },
          { name: "Placental Biochemistry", slug: "placental-biochemistry", mcqCount: 12, solved: 2, accuracy: 52 },
          { name: "Fetal Biochemistry", slug: "fetal-biochemistry", mcqCount: 12, solved: 1, accuracy: 48 },
        ],
      },
    ],
  },
  {
    id: "y2m5",
    name: "Neuroscience",
    slug: "neuroscience",
    mcqCount: 140,
    solved: 22,
    accuracy: 56,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 8,
        total: 50,
        accuracy: 54,
        topics: [
          { name: "Brain Anatomy", slug: "brain-anatomy", mcqCount: 13, solved: 3, accuracy: 52 },
          { name: "Spinal Cord", slug: "spinal-cord", mcqCount: 12, solved: 2, accuracy: 55 },
          { name: "Cranial Nerves", slug: "cranial-nerves", mcqCount: 13, solved: 2, accuracy: 48 },
          { name: "Head & Neck", slug: "head-neck", mcqCount: 12, solved: 1, accuracy: 58 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 8,
        total: 45,
        accuracy: 58,
        topics: [
          { name: "Neurophysiology", slug: "neurophysiology", mcqCount: 15, solved: 3, accuracy: 55 },
          { name: "Sensory System", slug: "sensory-system", mcqCount: 15, solved: 3, accuracy: 58 },
          { name: "Autonomic Nervous System", slug: "autonomic-ns", mcqCount: 15, solved: 2, accuracy: 52 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 6,
        total: 45,
        accuracy: 54,
        topics: [
          { name: "Neurotransmitters", slug: "neurotransmitters", mcqCount: 15, solved: 2, accuracy: 52 },
          { name: "CSF Biochemistry", slug: "csf-biochemistry", mcqCount: 15, solved: 2, accuracy: 55 },
          { name: "Neuro Pharmacology Basics", slug: "neuro-pharma-basics", mcqCount: 15, solved: 2, accuracy: 50 },
        ],
      },
    ],
  },
  {
    id: "y2m6",
    name: "Immunology",
    slug: "immunology",
    mcqCount: 90,
    solved: 12,
    accuracy: 58,
    subjects: [
      {
        name: "Anatomy",
        slug: "anatomy",
        solved: 4,
        total: 30,
        accuracy: 55,
        topics: [
          { name: "Lymphoid Organs", slug: "lymphoid-organs", mcqCount: 15, solved: 2, accuracy: 52 },
          { name: "MALT & GALT", slug: "malt-galt", mcqCount: 15, solved: 2, accuracy: 55 },
        ],
      },
      {
        name: "Physiology",
        slug: "physiology",
        solved: 4,
        total: 30,
        accuracy: 60,
        topics: [
          { name: "Innate Immunity", slug: "innate-immunity", mcqCount: 15, solved: 2, accuracy: 58 },
          { name: "Adaptive Immunity", slug: "adaptive-immunity", mcqCount: 15, solved: 2, accuracy: 62 },
        ],
      },
      {
        name: "Biochemistry",
        slug: "biochemistry",
        solved: 4,
        total: 30,
        accuracy: 56,
        topics: [
          { name: "Antibody Structure", slug: "antibody-structure", mcqCount: 15, solved: 2, accuracy: 55 },
          { name: "Complement System", slug: "complement-system", mcqCount: 15, solved: 2, accuracy: 52 },
        ],
      },
    ],
  },
];

export const academicYears: AcademicYear[] = [
  {
    id: 1,
    name: "Year 1",
    slug: "year-1",
    totalMCQs: year1Modules.reduce((a, m) => a + m.mcqCount, 0),
    solved: year1Modules.reduce((a, m) => a + m.solved, 0),
    accuracy: Math.round(year1Modules.reduce((a, m) => a + m.accuracy, 0) / year1Modules.length),
    modules: year1Modules,
  },
  {
    id: 2,
    name: "Year 2",
    slug: "year-2",
    totalMCQs: year2Modules.reduce((a, m) => a + m.mcqCount, 0),
    solved: year2Modules.reduce((a, m) => a + m.solved, 0),
    accuracy: Math.round(year2Modules.reduce((a, m) => a + m.accuracy, 0) / year2Modules.length),
    modules: year2Modules,
  },
  {
    id: 3,
    name: "Year 3",
    slug: "year-3",
    totalMCQs: 0,
    solved: 0,
    accuracy: 0,
    modules: [],
  },
  {
    id: 4,
    name: "Year 4",
    slug: "year-4",
    totalMCQs: 0,
    solved: 0,
    accuracy: 0,
    modules: [],
  },
  {
    id: 5,
    name: "Year 5",
    slug: "year-5",
    totalMCQs: 0,
    solved: 0,
    accuracy: 0,
    modules: [],
  },
];

export const getYear = (slug: string) => academicYears.find(y => y.slug === slug);
export const getModule = (yearSlug: string, moduleSlug: string) =>
  getYear(yearSlug)?.modules.find(m => m.slug === moduleSlug);
export const getModuleSubject = (yearSlug: string, moduleSlug: string, subjectSlug: string) =>
  getModule(yearSlug, moduleSlug)?.subjects.find(s => s.slug === subjectSlug);

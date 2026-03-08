export const currentUser = {
  id: "u1",
  name: "Ahmed Raza",
  username: "ahmedraza",
  avatar: "",
  year: "1st Year MBBS",
  university: "King Edward Medical University",
  location: "Lahore, Pakistan",
  bio: "Aspiring cardiologist passionate about evidence-based medicine.",
  totalSolved: 154,
  totalAvailable: 480,
  accuracy: 78.5,
  globalRank: 1247,
  collegeRank: 12,
  collegeTotalStudents: 180,
  rankChange: 3,
  streak: 23,
  percentile: 85,
};

export interface SubjectData {
  name: string;
  slug: string;
  solved: number;
  total: number;
  color: string;
  blocks: { name: string; solved: number; total: number }[];
}

export const subjects: SubjectData[] = [
  {
    name: "Anatomy",
    slug: "anatomy",
    solved: 56,
    total: 160,
    color: "hsl(210, 90%, 56%)",
    blocks: [
      { name: "Block 1", solved: 20, total: 50 },
      { name: "Block 2", solved: 18, total: 55 },
      { name: "Block 3", solved: 18, total: 55 },
    ],
  },
  {
    name: "Physiology",
    slug: "physiology",
    solved: 60,
    total: 160,
    color: "hsl(142, 71%, 45%)",
    blocks: [
      { name: "Block 1", solved: 22, total: 50 },
      { name: "Block 2", solved: 20, total: 55 },
      { name: "Block 3", solved: 18, total: 55 },
    ],
  },
  {
    name: "Biochemistry",
    slug: "biochemistry",
    solved: 38,
    total: 160,
    color: "hsl(280, 65%, 60%)",
    blocks: [
      { name: "Block 1", solved: 14, total: 50 },
      { name: "Block 2", solved: 12, total: 55 },
      { name: "Block 3", solved: 12, total: 55 },
    ],
  },
];

export const blocks = [
  { id: 1, name: "Block 1", totalMCQs: 150, solved: 56, subjects: ["Anatomy", "Physiology", "Biochemistry"] },
  { id: 2, name: "Block 2", totalMCQs: 165, solved: 50, subjects: ["Anatomy", "Physiology", "Biochemistry"] },
  { id: 3, name: "Block 3", totalMCQs: 165, solved: 48, subjects: ["Anatomy", "Physiology", "Biochemistry"] },
];

export const generateHeatmapData = () => {
  const data: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const count = Math.random() > 0.3 ? Math.floor(Math.random() * 15) : 0;
    data.push({ date: date.toISOString().split("T")[0], count });
  }
  return data;
};

export const catchUpStudents = [
  { name: "Fatima Khan", avatar: "", solved: 923, streak: 45 },
  { name: "Ali Hassan", avatar: "", solved: 890, streak: 32 },
  { name: "Sana Mirza", avatar: "", solved: 856, streak: 28 },
];

export const leaderboardData = Array.from({ length: 30 }, (_, i) => ({
  rank: i + 1,
  name: [
    "Fatima Khan", "Ali Hassan", "Sana Mirza", "Usman Ali", "Ayesha Noor",
    "Bilal Ahmed", "Hira Malik", "Zain Ul Abideen", "Maryam Tariq", "Hassan Shah",
    "Nida Farooq", "Ahmed Raza", "Sara Qureshi", "Kamran Javed", "Rabia Nawaz",
    "Imran Hussain", "Zunaira Siddiqui", "Talha Mehmood", "Amina Bibi", "Faisal Hayat",
    "Sadia Akhtar", "Waqas Anwar", "Mahira Khan", "Rizwan Ahmed", "Lubna Pervez",
    "Adnan Malik", "Bushra Rehman", "Shahid Iqbal", "Nazia Parveen", "Umar Farooq",
  ][i],
  college: [
    "KEMU", "Aga Khan", "AIMC", "KEMU", "Dow Medical",
    "KEMU", "AIMC", "Aga Khan", "KEMU", "Dow Medical",
    "AIMC", "KEMU", "Aga Khan", "KEMU", "Dow Medical",
    "AIMC", "KEMU", "Aga Khan", "Dow Medical", "KEMU",
    "AIMC", "Aga Khan", "KEMU", "Dow Medical", "AIMC",
    "KEMU", "Aga Khan", "AIMC", "Dow Medical", "KEMU",
  ][i],
  solved: 980 - i * 28,
  accuracy: Math.max(65, 95 - i * 0.8),
  streak: Math.max(1, 50 - i),
}));

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export const sampleMCQs: MCQ[] = [
  {
    id: "1",
    question: "Which of the following muscles is NOT part of the rotator cuff?",
    options: ["Supraspinatus", "Infraspinatus", "Deltoid", "Teres Minor", "Subscapularis"],
    correctAnswer: 2,
    explanation: "The rotator cuff consists of Supraspinatus, Infraspinatus, Teres Minor, and Subscapularis (SITS). Deltoid is a separate muscle.",
    topic: "Upper Limb",
  },
  {
    id: "2",
    question: "The normal resting membrane potential of a neuron is approximately:",
    options: ["-90 mV", "-70 mV", "-55 mV", "0 mV", "+30 mV"],
    correctAnswer: 1,
    explanation: "The resting membrane potential of a typical neuron is approximately -70 mV, maintained by the Na+/K+ ATPase pump.",
    topic: "Neurophysiology",
  },
  {
    id: "3",
    question: "Which enzyme catalyzes the rate-limiting step of glycolysis?",
    options: ["Hexokinase", "Phosphofructokinase-1", "Pyruvate kinase", "Aldolase", "Enolase"],
    correctAnswer: 1,
    explanation: "Phosphofructokinase-1 (PFK-1) catalyzes the conversion of fructose-6-phosphate to fructose-1,6-bisphosphate, which is the committed and rate-limiting step.",
    topic: "Carbohydrate Metabolism",
  },
  {
    id: "4",
    question: "The brachial plexus is formed by the ventral rami of which spinal nerves?",
    options: ["C3-C7", "C5-T1", "C4-C8", "C6-T2", "C5-C8"],
    correctAnswer: 1,
    explanation: "The brachial plexus is formed by the ventral rami of C5, C6, C7, C8, and T1 spinal nerves.",
    topic: "Upper Limb",
  },
  {
    id: "5",
    question: "Which of the following is the most abundant immunoglobulin in serum?",
    options: ["IgA", "IgD", "IgE", "IgG", "IgM"],
    correctAnswer: 3,
    explanation: "IgG is the most abundant immunoglobulin in serum, constituting about 75-80% of total serum immunoglobulins.",
    topic: "Immunology",
  },
  {
    id: "6",
    question: "ADH (Antidiuretic Hormone) primarily acts on which part of the nephron?",
    options: ["Proximal convoluted tubule", "Loop of Henle", "Distal convoluted tubule", "Collecting duct", "Bowman's capsule"],
    correctAnswer: 3,
    explanation: "ADH primarily acts on the collecting ducts, increasing water permeability by inserting aquaporin-2 channels.",
    topic: "Renal Physiology",
  },
  {
    id: "7",
    question: "Which vitamin deficiency causes Wernicke-Korsakoff syndrome?",
    options: ["Vitamin B6", "Vitamin B1 (Thiamine)", "Vitamin B12", "Vitamin C", "Vitamin B3 (Niacin)"],
    correctAnswer: 1,
    explanation: "Thiamine (Vitamin B1) deficiency causes Wernicke-Korsakoff syndrome, commonly seen in chronic alcoholism.",
    topic: "Vitamins",
  },
  {
    id: "8",
    question: "The femoral triangle is bounded laterally by the:",
    options: ["Adductor longus", "Sartorius", "Inguinal ligament", "Pectineus", "Gracilis"],
    correctAnswer: 1,
    explanation: "The femoral triangle is bounded laterally by the sartorius, medially by the adductor longus, and superiorly by the inguinal ligament.",
    topic: "Lower Limb",
  },
];

export const competitions = [
  { id: "c1", title: "Anatomy Sprint Challenge", participants: 234, deadline: "2026-03-15", status: "active" as const },
  { id: "c2", title: "Physiology Mastery Cup", participants: 189, deadline: "2026-03-20", status: "active" as const },
  { id: "c3", title: "Biochemistry Blitz", participants: 156, deadline: "2026-03-25", status: "upcoming" as const },
  { id: "c4", title: "All Subjects Marathon", participants: 312, deadline: "2026-04-01", status: "upcoming" as const },
];

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
  globalTotal: 12500,
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
  topics: { name: string; count: number }[];
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
    topics: [
      { name: "Upper Limb", count: 15 },
      { name: "Lower Limb", count: 18 },
      { name: "Thorax", count: 12 },
      { name: "Abdomen", count: 14 },
      { name: "Head & Neck", count: 16 },
      { name: "Neuroanatomy", count: 10 },
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
    topics: [
      { name: "Neurophysiology", count: 12 },
      { name: "Cardiovascular", count: 15 },
      { name: "Respiratory", count: 10 },
      { name: "Renal Physiology", count: 13 },
      { name: "GI Physiology", count: 11 },
      { name: "Endocrine", count: 9 },
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
    topics: [
      { name: "Carbohydrate Metabolism", count: 14 },
      { name: "Lipid Metabolism", count: 12 },
      { name: "Protein Metabolism", count: 10 },
      { name: "Vitamins", count: 8 },
      { name: "Enzymes", count: 11 },
      { name: "Immunology", count: 9 },
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
  { name: "Fatima Khan", username: "fatimakhan", avatar: "", solved: 923, streak: 45, university: "KEMU", accuracy: 89.2 },
  { name: "Ali Hassan", username: "alihassan", avatar: "", solved: 890, streak: 32, university: "Aga Khan", accuracy: 85.6 },
  { name: "Sana Mirza", username: "sanamirza", avatar: "", solved: 856, streak: 28, university: "AIMC", accuracy: 82.1 },
];

export const leaderboardData = Array.from({ length: 30 }, (_, i) => {
  const names = [
    "Fatima Khan", "Ali Hassan", "Sana Mirza", "Usman Ali", "Ayesha Noor",
    "Bilal Ahmed", "Hira Malik", "Zain Ul Abideen", "Maryam Tariq", "Hassan Shah",
    "Nida Farooq", "Ahmed Raza", "Sara Qureshi", "Kamran Javed", "Rabia Nawaz",
    "Imran Hussain", "Zunaira Siddiqui", "Talha Mehmood", "Amina Bibi", "Faisal Hayat",
    "Sadia Akhtar", "Waqas Anwar", "Mahira Khan", "Rizwan Ahmed", "Lubna Pervez",
    "Adnan Malik", "Bushra Rehman", "Shahid Iqbal", "Nazia Parveen", "Umar Farooq",
  ];
  const usernames = names.map(n => n.toLowerCase().replace(/\s+/g, ""));
  const colleges = [
    "KEMU", "Aga Khan", "AIMC", "KEMU", "Dow Medical",
    "KEMU", "AIMC", "Aga Khan", "KEMU", "Dow Medical",
    "AIMC", "KEMU", "Aga Khan", "KEMU", "Dow Medical",
    "AIMC", "KEMU", "Aga Khan", "Dow Medical", "KEMU",
    "AIMC", "Aga Khan", "KEMU", "Dow Medical", "AIMC",
    "KEMU", "Aga Khan", "AIMC", "Dow Medical", "KEMU",
  ];
  return {
    rank: i + 1,
    name: names[i],
    username: usernames[i],
    college: colleges[i],
    solved: 980 - i * 28,
    accuracy: Math.max(65, 95 - i * 0.8),
    streak: Math.max(1, 50 - i),
  };
});

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  subject: string;
}

export const sampleMCQs: MCQ[] = [
  {
    id: "1",
    question: "Which of the following muscles is NOT part of the rotator cuff?",
    options: ["Supraspinatus", "Infraspinatus", "Deltoid", "Teres Minor", "Subscapularis"],
    correctAnswer: 2,
    explanation: "The rotator cuff consists of Supraspinatus, Infraspinatus, Teres Minor, and Subscapularis (SITS). Deltoid is a separate muscle.",
    topic: "Upper Limb",
    subject: "anatomy",
  },
  {
    id: "2",
    question: "The normal resting membrane potential of a neuron is approximately:",
    options: ["-90 mV", "-70 mV", "-55 mV", "0 mV", "+30 mV"],
    correctAnswer: 1,
    explanation: "The resting membrane potential of a typical neuron is approximately -70 mV, maintained by the Na+/K+ ATPase pump.",
    topic: "Neurophysiology",
    subject: "physiology",
  },
  {
    id: "3",
    question: "Which enzyme catalyzes the rate-limiting step of glycolysis?",
    options: ["Hexokinase", "Phosphofructokinase-1", "Pyruvate kinase", "Aldolase", "Enolase"],
    correctAnswer: 1,
    explanation: "Phosphofructokinase-1 (PFK-1) catalyzes the conversion of fructose-6-phosphate to fructose-1,6-bisphosphate, which is the committed and rate-limiting step.",
    topic: "Carbohydrate Metabolism",
    subject: "biochemistry",
  },
  {
    id: "4",
    question: "The brachial plexus is formed by the ventral rami of which spinal nerves?",
    options: ["C3-C7", "C5-T1", "C4-C8", "C6-T2", "C5-C8"],
    correctAnswer: 1,
    explanation: "The brachial plexus is formed by the ventral rami of C5, C6, C7, C8, and T1 spinal nerves.",
    topic: "Upper Limb",
    subject: "anatomy",
  },
  {
    id: "5",
    question: "Which of the following is the most abundant immunoglobulin in serum?",
    options: ["IgA", "IgD", "IgE", "IgG", "IgM"],
    correctAnswer: 3,
    explanation: "IgG is the most abundant immunoglobulin in serum, constituting about 75-80% of total serum immunoglobulins.",
    topic: "Immunology",
    subject: "biochemistry",
  },
  {
    id: "6",
    question: "ADH (Antidiuretic Hormone) primarily acts on which part of the nephron?",
    options: ["Proximal convoluted tubule", "Loop of Henle", "Distal convoluted tubule", "Collecting duct", "Bowman's capsule"],
    correctAnswer: 3,
    explanation: "ADH primarily acts on the collecting ducts, increasing water permeability by inserting aquaporin-2 channels.",
    topic: "Renal Physiology",
    subject: "physiology",
  },
  {
    id: "7",
    question: "Which vitamin deficiency causes Wernicke-Korsakoff syndrome?",
    options: ["Vitamin B6", "Vitamin B1 (Thiamine)", "Vitamin B12", "Vitamin C", "Vitamin B3 (Niacin)"],
    correctAnswer: 1,
    explanation: "Thiamine (Vitamin B1) deficiency causes Wernicke-Korsakoff syndrome, commonly seen in chronic alcoholism.",
    topic: "Vitamins",
    subject: "biochemistry",
  },
  {
    id: "8",
    question: "The femoral triangle is bounded laterally by the:",
    options: ["Adductor longus", "Sartorius", "Inguinal ligament", "Pectineus", "Gracilis"],
    correctAnswer: 1,
    explanation: "The femoral triangle is bounded laterally by the sartorius, medially by the adductor longus, and superiorly by the inguinal ligament.",
    topic: "Lower Limb",
    subject: "anatomy",
  },
  {
    id: "9",
    question: "Which ion is primarily responsible for the depolarization phase of the cardiac action potential?",
    options: ["Potassium", "Sodium", "Calcium", "Chloride", "Magnesium"],
    correctAnswer: 1,
    explanation: "Sodium influx through fast voltage-gated Na+ channels causes the rapid depolarization (phase 0) of the cardiac action potential.",
    topic: "Cardiovascular",
    subject: "physiology",
  },
  {
    id: "10",
    question: "The Krebs cycle occurs in which cellular compartment?",
    options: ["Cytoplasm", "Mitochondrial matrix", "Inner mitochondrial membrane", "Nucleus", "Endoplasmic reticulum"],
    correctAnswer: 1,
    explanation: "The Krebs cycle (citric acid cycle) takes place in the mitochondrial matrix, where acetyl-CoA is oxidized.",
    topic: "Carbohydrate Metabolism",
    subject: "biochemistry",
  },
  {
    id: "11",
    question: "Which nerve innervates the diaphragm?",
    options: ["Vagus nerve", "Phrenic nerve", "Intercostal nerves", "Long thoracic nerve", "Thoracodorsal nerve"],
    correctAnswer: 1,
    explanation: "The phrenic nerve (C3, C4, C5) provides motor innervation to the diaphragm. 'C3, 4, 5 keeps the diaphragm alive.'",
    topic: "Thorax",
    subject: "anatomy",
  },
  {
    id: "12",
    question: "Surfactant is produced by which type of alveolar cells?",
    options: ["Type I pneumocytes", "Type II pneumocytes", "Clara cells", "Goblet cells", "Macrophages"],
    correctAnswer: 1,
    explanation: "Type II pneumocytes (great alveolar cells) produce pulmonary surfactant, which reduces surface tension and prevents alveolar collapse.",
    topic: "Respiratory",
    subject: "physiology",
  },
];

export const competitions = [
  {
    id: "c1",
    title: "Daily Challenge",
    description: "10 MCQs across all subjects. Leaderboard resets daily.",
    participants: 1234,
    deadline: "2026-03-08",
    status: "active" as const,
    type: "daily" as const,
    mcqCount: 10,
    timeLimit: null,
  },
  {
    id: "c2",
    title: "Weekly Contest #14",
    description: "30 MCQs in 40 minutes. Ranked by score + time.",
    participants: 456,
    deadline: "2026-03-14",
    status: "active" as const,
    type: "weekly" as const,
    mcqCount: 30,
    timeLimit: 40,
  },
  {
    id: "c3",
    title: "Cardiology Challenge",
    description: "Test your cardiovascular knowledge against peers.",
    participants: 189,
    deadline: "2026-03-15",
    status: "active" as const,
    type: "topic" as const,
    mcqCount: 20,
    timeLimit: 30,
  },
  {
    id: "c4",
    title: "Neuro Challenge",
    description: "Neuroanatomy + Neurophysiology topic battle.",
    participants: 156,
    deadline: "2026-03-20",
    status: "upcoming" as const,
    type: "topic" as const,
    mcqCount: 25,
    timeLimit: 35,
  },
  {
    id: "c5",
    title: "Biochemistry Blitz",
    description: "Speed round: metabolism & enzymes.",
    participants: 312,
    deadline: "2026-03-25",
    status: "upcoming" as const,
    type: "topic" as const,
    mcqCount: 15,
    timeLimit: 20,
  },
];

export const getUserByUsername = (username: string) => {
  if (username === currentUser.username) return currentUser;
  
  const catchUp = catchUpStudents.find(s => s.username === username);
  if (catchUp) {
    return {
      id: catchUp.username,
      name: catchUp.name,
      username: catchUp.username,
      avatar: "",
      year: "1st Year MBBS",
      university: catchUp.university,
      location: "Pakistan",
      bio: "Medical student on AcadRank.",
      totalSolved: catchUp.solved,
      totalAvailable: 480,
      accuracy: catchUp.accuracy,
      globalRank: Math.floor(Math.random() * 500) + 1,
      globalTotal: 12500,
      collegeRank: Math.floor(Math.random() * 50) + 1,
      collegeTotalStudents: 180,
      rankChange: Math.floor(Math.random() * 10) - 3,
      streak: catchUp.streak,
      percentile: Math.floor(Math.random() * 30) + 70,
    };
  }
  
  const lb = leaderboardData.find(u => u.username === username);
  if (lb) {
    return {
      id: lb.username,
      name: lb.name,
      username: lb.username,
      avatar: "",
      year: "1st Year MBBS",
      university: lb.college,
      location: "Pakistan",
      bio: "Medical student on AcadRank.",
      totalSolved: lb.solved,
      totalAvailable: 480,
      accuracy: lb.accuracy,
      globalRank: lb.rank,
      globalTotal: 12500,
      collegeRank: Math.floor(Math.random() * 50) + 1,
      collegeTotalStudents: 180,
      rankChange: Math.floor(Math.random() * 10) - 3,
      streak: lb.streak,
      percentile: Math.max(5, 100 - lb.rank * 0.5),
    };
  }
  
  return null;
};

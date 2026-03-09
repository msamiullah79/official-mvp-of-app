export const currentUser = {
  id: "u1",
  name: "Ahmed Raza",
  username: "ahmedraza",
  avatar: "",
  year: "1st Year MBBS",
  university: "King Edward Medical University",
  college: "KEMU",
  location: "Lahore, Pakistan",
  bio: "Aspiring cardiologist passionate about evidence-based medicine.",
  totalSolved: 420,
  totalAvailable: 480,
  accuracy: 88,
  globalRank: 1247,
  globalTotal: 12500,
  collegeRank: 12,
  collegeTotalStudents: 180,
  rankChange: 3,
  streak: 23,
  percentile: 85,
  score: Math.round(88 * Math.sqrt(420)), // Score = Accuracy × √(Questions Solved)
  topSubject: "Physiology",
};

export interface SubjectData {
  name: string;
  slug: string;
  solved: number;
  total: number;
  color: string;
  blocks: { name: string; solved: number; total: number }[];
  topics: { name: string; count: number; accuracy?: number; solved?: number }[];
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
      { name: "Upper Limb", count: 15, accuracy: 65, solved: 8 },
      { name: "Lower Limb", count: 18, accuracy: 72, solved: 12 },
      { name: "Thorax", count: 12, accuracy: 58, solved: 5 },
      { name: "Abdomen", count: 14, accuracy: 70, solved: 9 },
      { name: "Head & Neck", count: 16, accuracy: 74, solved: 11 },
      { name: "Neuroanatomy", count: 10, accuracy: 45, solved: 3 },
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
      { name: "Neurophysiology", count: 12, accuracy: 68, solved: 7 },
      { name: "Cardiovascular", count: 15, accuracy: 76, solved: 10 },
      { name: "Respiratory", count: 10, accuracy: 80, solved: 8 },
      { name: "Renal Physiology", count: 13, accuracy: 42, solved: 5 },
      { name: "GI Physiology", count: 11, accuracy: 61, solved: 6 },
      { name: "Endocrine", count: 9, accuracy: 55, solved: 4 },
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
      { name: "Carbohydrate Metabolism", count: 14, accuracy: 48, solved: 5 },
      { name: "Lipid Metabolism", count: 12, accuracy: 55, solved: 4 },
      { name: "Protein Metabolism", count: 10, accuracy: 62, solved: 6 },
      { name: "Vitamins", count: 8, accuracy: 70, solved: 5 },
      { name: "Enzymes", count: 11, accuracy: 58, solved: 4 },
      { name: "Immunology", count: 9, accuracy: 66, solved: 5 },
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

const topSubjects = ["Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology"];

export const leaderboardData = Array.from({ length: 100 }, (_, i) => {
  const names = [
    "Fatima Khan", "Ali Hassan", "Sana Mirza", "Usman Ali", "Ayesha Noor",
    "Bilal Ahmed", "Hira Malik", "Zain Ul Abideen", "Maryam Tariq", "Hassan Shah",
    "Nida Farooq", "Ahmed Raza", "Sara Qureshi", "Kamran Javed", "Rabia Nawaz",
    "Imran Hussain", "Zunaira Siddiqui", "Talha Mehmood", "Amina Bibi", "Faisal Hayat",
    "Sadia Akhtar", "Waqas Anwar", "Mahira Khan", "Rizwan Ahmed", "Lubna Pervez",
    "Adnan Malik", "Bushra Rehman", "Shahid Iqbal", "Nazia Parveen", "Umar Farooq",
    "Asma Khalid", "Junaid Rauf", "Huma Batool", "Qasim Zia", "Saima Akram",
    "Kashif Nawaz", "Mehwish Hayat", "Yasir Abbas", "Rubina Khan", "Farhan Saeed",
    "Alina Shah", "Arslan Tariq", "Samina Pervez", "Owais Ahmed", "Nimra Qureshi",
    "Danish Malik", "Zara Noor", "Hamza Ali", "Bushra Malik", "Irfan Javed",
    "Sidra Batool", "Mohsin Raza", "Kiran Shahid", "Bilal Tariq", "Ayesha Rafiq",
    "Sajid Hussain", "Faiza Noor", "Waqar Ahmed", "Sobia Khan", "Naveed Iqbal",
    "Hina Parveen", "Asad Ali", "Rida Fatima", "Jawad Malik", "Samra Khan",
    "Zahid Hussain", "Anam Zahra", "Usman Ghani", "Fozia Bibi", "Shahbaz Khan",
    "Noor Fatima", "Atif Aslam", "Sana Javed", "Hamid Raza", "Sidra Nawaz",
    "Imran Khan", "Saira Malik", "Waseem Abbas", "Huma Khan", "Faizan Ahmed",
    "Maria Tariq", "Arif Hussain", "Sadia Khan", "Asim Ali", "Bushra Ahmed",
    "Tariq Mehmood", "Rukhsar Bibi", "Nadeem Shah", "Afshan Khalid", "Rizwan Khan",
    "Sanam Baloch", "Umair Javed", "Neha Rajput", "Salman Raza", "Aisha Noor",
    "Bilal Khan", "Hira Shah", "Kamran Ali", "Sara Ahmed", "Zubair Malik",
  ];
  const usernames = names.map(n => n.toLowerCase().replace(/\s+/g, ""));
  const colleges = ["KEMU", "Aga Khan", "AIMC", "Dow Medical", "King Edward"];
  
  const solved = Math.max(100, 980 - i * 8 + Math.floor(Math.random() * 20));
  const accuracy = Math.max(65, 95 - i * 0.25 + Math.random() * 3);
  const score = Math.round(accuracy * Math.sqrt(solved));
  const rankChange = Math.floor(Math.random() * 7) - 3; // -3 to +3

  return {
    rank: i + 1,
    name: names[i % names.length],
    username: usernames[i % usernames.length] + (i >= names.length ? i.toString() : ""),
    college: colleges[i % colleges.length],
    solved,
    accuracy: Math.round(accuracy * 10) / 10,
    score,
    rankChange,
    topSubject: topSubjects[i % topSubjects.length],
  };
}).sort((a, b) => b.score - a.score).map((user, i) => ({ ...user, rank: i + 1 }));

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

export interface Competition {
  id: string;
  title: string;
  description: string;
  participants: number;
  deadline: string;
  status: "active" | "upcoming" | "completed";
  type: "daily" | "weekly" | "topic";
  mcqCount: number;
  timeLimit: number; // in minutes
  topicFilter?: string[]; // topics to filter MCQs
}

export const competitions: Competition[] = [
  {
    id: "c1",
    title: "Daily Challenge",
    description: "10 MCQs across all subjects. Leaderboard resets daily.",
    participants: 1234,
    deadline: "2026-03-09",
    status: "active",
    type: "daily",
    mcqCount: 10,
    timeLimit: 10,
  },
  {
    id: "c2",
    title: "Weekly Contest #14",
    description: "30 MCQs in 40 minutes. Ranked by score + time.",
    participants: 456,
    deadline: "2026-03-14",
    status: "active",
    type: "weekly",
    mcqCount: 30,
    timeLimit: 40,
  },
  {
    id: "c3",
    title: "Cardiology Challenge",
    description: "Test your cardiovascular knowledge against peers.",
    participants: 189,
    deadline: "2026-03-15",
    status: "active",
    type: "topic",
    mcqCount: 20,
    timeLimit: 30,
    topicFilter: ["Cardiovascular"],
  },
  {
    id: "c4",
    title: "Neuro Challenge",
    description: "Neuroanatomy + Neurophysiology topic battle.",
    participants: 156,
    deadline: "2026-03-20",
    status: "upcoming",
    type: "topic",
    mcqCount: 25,
    timeLimit: 35,
    topicFilter: ["Neuroanatomy", "Neurophysiology"],
  },
  {
    id: "c5",
    title: "Biochemistry Blitz",
    description: "Speed round: metabolism & enzymes.",
    participants: 312,
    deadline: "2026-03-25",
    status: "upcoming",
    type: "topic",
    mcqCount: 15,
    timeLimit: 20,
    topicFilter: ["Carbohydrate Metabolism", "Lipid Metabolism", "Protein Metabolism", "Enzymes"],
  },
];

// Competition user state (simulated - would be in database)
export interface CompetitionUserState {
  competitionId: string;
  status: "registered" | "completed";
  score?: number;
  accuracy?: number;
  timeTaken?: number;
  rank?: number;
  completedAt?: string;
}

// Generate mock leaderboard for a competition
export const generateCompetitionLeaderboard = (competitionId: string, userRank?: number) => {
  const participants = competitions.find(c => c.id === competitionId)?.participants || 100;
  const count = Math.min(participants, 50);
  
  return Array.from({ length: count }, (_, i) => {
    const names = ["Fatima Khan", "Ali Hassan", "Sana Mirza", "Usman Ali", "Ayesha Noor", "Bilal Ahmed", "Hira Malik", "Zain Ul Abideen", "Maryam Tariq", "Hassan Shah"];
    const usernames = names.map(n => n.toLowerCase().replace(/\s+/g, ""));
    
    const score = Math.max(50, 200 - i * 3 + Math.floor(Math.random() * 10));
    const accuracy = Math.max(60, 98 - i * 0.5 + Math.random() * 5);
    const timeTaken = Math.floor(Math.random() * 600) + 300; // 5-15 minutes
    
    return {
      rank: i + 1,
      name: names[i % names.length],
      username: usernames[i % usernames.length] + (i >= names.length ? i.toString() : ""),
      score,
      accuracy: Math.round(accuracy * 10) / 10,
      timeTaken,
    };
  }).sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken).map((u, i) => ({ ...u, rank: i + 1 }));
};

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
      rankChange: lb.rankChange,
      streak: Math.max(1, 50 - lb.rank),
      percentile: Math.max(5, 100 - lb.rank * 0.5),
    };
  }
  
  return null;
};

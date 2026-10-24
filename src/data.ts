export type Role = "student" | "teacher" | "management" | "parent" | "admin";
export type ConceptState = "mastered" | "learning" | "next" | "locked" | "practice";
export type TutorState = "idle" | "thinking" | "hint" | "waiting_for_student" | "feedback_correct" | "feedback_incorrect" | "explanation" | "mastered" | "redirected" | "safety";

export interface User {
  id: string;
  role: Role;
  name: string;
  schoolId: string;
  classSectionIds?: string[];
  guardianMobile?: string;
}

export interface School {
  id: string;
  name: string;
  board: string;
  city: string;
  pilotStart?: string;
  pilotEnd?: string;
}

export interface ClassSection {
  id: string;
  schoolId: string;
  grade: number;
  section: string;
  academicYear: string;
}

export interface Student {
  id: string;
  name: string;
  section: string;
  mastery: number;
  momentum: string;
  focus: string;
}

export interface Concept {
  id: string;
  title: string;
  subject: "Mathematics" | "Science";
  grade: 8 | 9;
  chapter: string;
  objective: string;
  state: ConceptState;
  mastery: number;
}

export interface Question {
  id?: string;
  conceptId?: string;
  difficulty?: "easy" | "medium" | "hard";
  type?: "multiple_choice" | "numeric" | "short_answer";
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
  reviewStatus?: "draft" | "reviewed" | "published";
}

export interface ReferenceContent {
  id: string;
  conceptId: string;
  version: number;
  explanation: string;
  examples: string[];
  misconceptions: string[];
  reviewStatus: "draft" | "reviewed" | "published";
  reviewer?: string;
}

export interface MasteryRecord {
  studentId: string;
  conceptId: string;
  percent: number;
  level: ConceptState;
  updatedAt: string;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  conceptIds: string[];
  studentIds: string[];
  questionCount: number;
  dueDate: string;
  status: "not_started" | "in_progress" | "submitted" | "overdue";
}

export interface Attempt {
  id: string;
  studentId: string;
  questionId: string;
  response: string;
  correct: boolean;
  timeSeconds: number;
  context: "practice" | "homework" | "assessment";
}

export interface TutorMessage {
  id: string;
  studentId: string;
  conceptId: string;
  role: "student" | "companion";
  content: string;
  state: TutorState;
  createdAt: string;
}

export interface AIResponse {
  state: TutorState;
  content: string;
  hint?: string;
  followUp?: string;
}

export interface LearningAlert {
  id: string;
  type: "repeated_failure" | "inactive" | "overdue_homework" | "reported_answer";
  studentId?: string;
  conceptId?: string;
  message: string;
  status: "open" | "reviewed" | "assigned";
}

export interface Assessment {
  id: string;
  kind: "baseline" | "midpoint" | "endline";
  subject: string;
  sectionId: string;
  conceptIds: string[];
  completedCount: number;
}

export interface LearningReport {
  studentId: string;
  weekOf: string;
  activitySummary: string;
  conceptsMastered: string[];
  conceptsNeedingPractice: string[];
  homeworkComplete: number;
  homeworkTotal: number;
  suggestion: string;
}

const firstNames = [
  "Aarav", "Ananya", "Vihaan", "Diya", "Arjun", "Myra", "Kabir", "Ishita",
  "Reyansh", "Aadhya", "Advik", "Saanvi", "Krishna", "Anika", "Rohan", "Meera",
  "Shaurya", "Kiara", "Vivaan", "Sara", "Ayaan", "Tara", "Dhruv", "Pari",
  "Neil", "Avni", "Rudra", "Navya", "Arnav", "Ira", "Yash", "Mira",
  "Veer", "Riya", "Kiaan", "Naina", "Atharv", "Aisha", "Kartik", "Ishani",
];
const surnames = [
  "Sharma", "Verma", "Gupta", "Singh", "Mehta", "Kapoor", "Malhotra", "Iyer",
  "Rao", "Bansal", "Khanna", "Chopra", "Joshi", "Sethi", "Nair", "Desai",
];
const sections = ["8A", "8B", "9A", "9B"];

export const students: Student[] = firstNames.map((first, i) => ({
  id: "ST-" + String(2401 + i),
  name: first + " " + surnames[(i * 5 + 2) % surnames.length],
  section: sections[i % sections.length],
  mastery: 58 + ((i * 13) % 36),
  momentum: i % 5 === 0 ? "Needs a nudge" : i % 3 === 0 ? "Building steadily" : "Improving",
  focus: i % 4 === 0 ? "Fractions" : i % 3 === 0 ? "Linear Equations" : "Ratio & Proportion",
}));

export const concepts: Concept[] = [
  { id: "number-systems", title: "Number Systems", subject: "Mathematics", grade: 8, chapter: "Rational Numbers", objective: "Represent and compare rational numbers on a number line.", state: "mastered", mastery: 92 },
  { id: "fractions", title: "Fractions", subject: "Mathematics", grade: 8, chapter: "Rational Numbers", objective: "Compare fractions and reason about equivalent values.", state: "practice", mastery: 64 },
  { id: "ratio", title: "Ratio & Proportion", subject: "Mathematics", grade: 8, chapter: "Comparing Quantities", objective: "Use equivalent ratios to solve everyday problems.", state: "learning", mastery: 72 },
  { id: "expressions", title: "Algebraic Expressions", subject: "Mathematics", grade: 8, chapter: "Algebra", objective: "Translate a situation into an expression and simplify it.", state: "mastered", mastery: 86 },
  { id: "linear-equations", title: "Linear Equations", subject: "Mathematics", grade: 8, chapter: "Algebra", objective: "Solve one-variable equations by undoing operations equally.", state: "next", mastery: 68 },
  { id: "graphs", title: "Graphs", subject: "Mathematics", grade: 8, chapter: "Algebra", objective: "Read patterns and relationships from a graph.", state: "locked", mastery: 0 },
  { id: "geometry", title: "Geometry", subject: "Mathematics", grade: 8, chapter: "Geometry", objective: "Explore angles and the properties of quadrilaterals.", state: "locked", mastery: 0 },
  { id: "comparing-quantities", title: "Comparing Quantities", subject: "Mathematics", grade: 8, chapter: "Comparing Quantities", objective: "Apply percentages, discounts and simple interest.", state: "learning", mastery: 76 },
  { id: "matter", title: "Matter Around Us", subject: "Science", grade: 8, chapter: "Materials", objective: "Describe the particle nature of matter and its states.", state: "learning", mastery: 74 },
  { id: "force", title: "Force & Pressure", subject: "Science", grade: 8, chapter: "Force and Pressure", objective: "Explain how force changes motion and pressure acts.", state: "next", mastery: 62 },
  { id: "light", title: "Light", subject: "Science", grade: 8, chapter: "Light", objective: "Trace reflection and interpret simple ray diagrams.", state: "mastered", mastery: 89 },
  { id: "sound", title: "Sound", subject: "Science", grade: 8, chapter: "Sound", objective: "Connect vibrations, frequency and pitch.", state: "locked", mastery: 0 },
  { id: "cells", title: "Cells", subject: "Science", grade: 9, chapter: "The Fundamental Unit of Life", objective: "Identify cell structures and connect each to its function.", state: "learning", mastery: 80 },
  { id: "chemical-effects", title: "Chemical Effects", subject: "Science", grade: 9, chapter: "Chemical Effects of Electric Current", objective: "Observe how electric current can cause chemical changes.", state: "practice", mastery: 56 },
  { id: "motion", title: "Motion", subject: "Mathematics", grade: 9, chapter: "Motion", objective: "Interpret distance, displacement and speed.", state: "next", mastery: 63 },
  { id: "polynomials", title: "Polynomials", subject: "Mathematics", grade: 9, chapter: "Algebra", objective: "Classify and evaluate polynomial expressions.", state: "learning", mastery: 71 },
];

export const questions: Question[] = [
  { prompt: "3x + 5 = 20. What is x?", options: ["3", "5", "8", "15"], answer: "5", explanation: "Subtract 5 from both sides to get 3x = 15, then divide both sides by 3." },
  { prompt: "2x − 4 = 10. What is x?", options: ["3", "5", "7", "14"], answer: "7", explanation: "Add 4 to both sides: 2x = 14. Then divide by 2." },
  { prompt: "5x = 35. What is x?", options: ["5", "6", "7", "30"], answer: "7", explanation: "Divide both sides by 5 to find x = 7." },
  { prompt: "x ÷ 3 + 2 = 6. What is x?", options: ["8", "12", "18", "24"], answer: "12", explanation: "Subtract 2 first: x ÷ 3 = 4. Then multiply both sides by 3." },
  { prompt: "4x + 3 = 19. What is x?", options: ["3", "4", "5", "7"], answer: "4", explanation: "Subtract 3 to get 4x = 16, then divide both sides by 4." },
  { prompt: "2(x + 3) = 14. What is x?", options: ["2", "4", "5", "8"], answer: "4", explanation: "Divide by 2 to get x + 3 = 7, then subtract 3." },
  { prompt: "7x − 8 = 27. What is x?", options: ["3", "5", "7", "19"], answer: "5", explanation: "Add 8 to get 7x = 35, then divide by 7." },
  { prompt: "x ÷ 4 − 1 = 2. What is x?", options: ["4", "8", "12", "16"], answer: "12", explanation: "Add 1 to get x ÷ 4 = 3, then multiply by 4." },
  { prompt: "3x − 6 = 12. What is x?", options: ["4", "6", "8", "18"], answer: "6", explanation: "Add 6 to get 3x = 18, then divide by 3." },
  { prompt: "5(x − 2) = 30. What is x?", options: ["4", "6", "8", "10"], answer: "8", explanation: "Divide by 5 to get x − 2 = 6, then add 2." },
];

export const homeworkItems = [
  { id: "hw-1", title: "Linear Equations", subject: "Mathematics", detail: "8 questions · about 12 min", due: "Due tomorrow", status: "In progress" },
  { id: "hw-2", title: "Matter Around Us", subject: "Science", detail: "6 questions · about 10 min", due: "Due Friday", status: "Not started" },
  { id: "hw-3", title: "Fractions: quick check", subject: "Mathematics", detail: "5 questions · about 8 min", due: "Submitted yesterday", status: "Submitted" },
];

export const classPulse = [
  { day: "Mon", sessions: 24, mastery: 64 },
  { day: "Tue", sessions: 31, mastery: 66 },
  { day: "Wed", sessions: 28, mastery: 67 },
  { day: "Thu", sessions: 37, mastery: 69 },
  { day: "Fri", sessions: 42, mastery: 72 },
  { day: "Sat", sessions: 18, mastery: 73 },
  { day: "Sun", sessions: 15, mastery: 74 },
];

export const cohortTrend = [
  { week: "Baseline", value: 54 },
  { week: "Week 2", value: 59 },
  { week: "Week 4", value: 65 },
  { week: "Week 6", value: 69 },
  { week: "Endline", value: 72 },
];

export const roleNames: Record<Role, string> = {
  student: "Student",
  teacher: "Teacher",
  management: "Management",
  parent: "Parent",
  admin: "Admin",
};

export const routeDefaults: Record<Role, string> = {
  student: "/student",
  teacher: "/teacher",
  management: "/management",
  parent: "/parent",
  admin: "/admin",
};

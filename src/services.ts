import {
  classPulse, concepts, homeworkItems, questions, students,
  type AIResponse, type Concept, type LearningReport, type Question, type Role, type Student,
} from "./data";

export const demoSchool = {
  id: "school-demo-dps",
  name: "Delhi Public School — Demo",
  board: "CBSE",
  city: "New Delhi, NCR",
  pilotStart: "2027-01-04",
  pilotEnd: "2027-02-26",
};

export const mockAuthService = {
  previewRole(role: Role) {
    return { role, schoolId: demoSchool.id, schoolName: demoSchool.name };
  },
};

export const mockStudentService = {
  list(section?: string): Student[] {
    return section ? students.filter((student) => student.section === section) : students;
  },
  find(studentId: string): Student {
    return students.find((student) => student.id === studentId) ?? students[0];
  },
};

export const mockTeacherService = {
  classSummary() {
    return { students: 40, activeThisWeek: 32, averageMastery: 78, needsAttention: 6, overdueHomework: 4 };
  },
  getPulse() {
    return classPulse;
  },
};

export const mockCurriculumService = {
  listConcepts(grade?: number): Concept[] {
    return grade ? concepts.filter((concept) => concept.grade === grade) : concepts;
  },
  findConcept(conceptId: string) {
    return concepts.find((concept) => concept.id === conceptId);
  },
  getApprovedReference(conceptId: string) {
    const concept = concepts.find((item) => item.id === conceptId) ?? concepts[4];
    return {
      conceptId: concept.id,
      version: 1,
      explanation: concept.objective,
      examples: ["3x + 5 = 20", "Undo the same operation on both sides."],
      misconceptions: ["Changing one side of an equation without balancing the other side."],
      reviewStatus: "published" as const,
    };
  },
};

const safetyPattern = /\b(overwhelmed|unsafe|hurt myself|self harm|bullying|being bullied|don't want to be here)\b/i;
const scopePattern = /\b(football|best player|celebrity|movie|recipe|stock price)\b/i;

export const mockTutorService = {
  classify(prompt: string): "safety" | "redirected" | "hint" {
    if (safetyPattern.test(prompt)) return "safety";
    if (scopePattern.test(prompt)) return "redirected";
    return "hint";
  },
  getHint(prompt: string, another = false): AIResponse {
    const text = another
      ? "Think of an equation like a balanced scale. What could remove the +5 while keeping both sides equal?"
      : prompt.toLowerCase().includes("formula")
        ? "Look at the relationship between each part. What stays the same when the values change?"
        : "We want x on its own. What operation is happening to x right now?";
    return {
      state: "hint",
      content: "Let’s work it out together.",
      hint: text,
      followUp: "What would you try first?",
    };
  },
  generateExample(concept: string, variant = 0) {
    const examples = [
      "Imagine you have ₹500 in your pocket. You spend ₹50 on a notebook, and what’s left is shared equally among 3 friends. If each friend gets ₹150, how much did you start with? An equation helps us work backwards: (x − 50) ÷ 3 = 150.",
      "Think of a cab fare: there’s a fixed ₹40 starting fee, then ₹12 for every kilometre. If the total is ₹100, how far did you travel? We can write 40 + 12x = 100 and undo the fixed fee first.",
      "A school club has some notebooks. After buying 5 more packs of 6 notebooks, they have 68. How many notebooks were there before? The balance equation is x + 5 × 6 = 68.",
    ];
    return concept.toLowerCase().includes("linear") ? examples[variant % examples.length] : "Connect " + concept + " to a familiar classroom example, then ask students what they notice first.";
  },
};

export const mockHomeworkService = {
  list() {
    return homeworkItems;
  },
  prepareAssignment(conceptId: string, studentIds: string[], questionCount: number, dueDate: string) {
    return { id: "assignment-demo-" + Date.now(), conceptIds: [conceptId], studentIds, questionCount, dueDate };
  },
  submit(id: string) {
    return { id, status: "submitted" as const, submittedAt: new Date().toISOString() };
  },
};

export const mockAssessmentService = {
  questionsFor(conceptId: string): Question[] {
    const matterQuestions: Question[] = [
      { prompt: "Which description best fits particles in a solid?", options: ["They are far apart and move freely", "They are close together and vibrate in place", "They have no attraction", "They stop moving completely"], answer: "They are close together and vibrate in place", explanation: "Solid particles stay close together and vibrate around fixed positions." },
      { prompt: "Which state keeps its volume but takes the shape of its container?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: "Liquid", explanation: "A liquid has a fixed volume, but its particles can move past one another." },
      { prompt: "What usually happens to diffusion when water is warmer?", options: ["It becomes faster", "It stops", "It becomes slower", "It changes into freezing"], answer: "It becomes faster", explanation: "Warmer particles have more kinetic energy and spread out more quickly." },
      { prompt: "Where does evaporation happen?", options: ["Only at the bottom of a liquid", "At the surface of a liquid", "Only inside a solid", "Only below 0°C"], answer: "At the surface of a liquid", explanation: "Particles at the surface can gain enough energy to escape into the air." },
      { prompt: "Which statement about particles in matter is best?", options: ["They are always moving", "They only move in gases", "They do not attract one another", "They are visible without a microscope"], answer: "They are always moving", explanation: "Particles have motion in solids, liquids and gases, though their movement differs." },
      { prompt: "What is condensation?", options: ["A liquid changing to a gas", "A gas changing to a liquid", "A solid changing to a liquid", "A liquid changing to a solid"], answer: "A gas changing to a liquid", explanation: "When gas particles lose energy, they can come closer together and form a liquid." },
    ];
    const linearPracticeOrder = [questions[1], questions[2], questions[4], questions[0], questions[3], ...questions.slice(5)];
    const bank = conceptId === "matter" ? matterQuestions : conceptId === "linear-equations" ? linearPracticeOrder : questions;
    return bank.map((question, index) => ({
      ...question,
      id: "q-" + conceptId + "-" + index,
      conceptId,
      difficulty: "medium",
      type: "multiple_choice",
      reviewStatus: "published",
    }));
  },
  hasMastery(correctMediumAttempts: number, totalMediumAttempts: number) {
    return totalMediumAttempts >= 5 && correctMediumAttempts >= 4;
  },
};

export const mockAnalyticsService = {
  pilotSnapshot() {
    return { weeklyActiveStudents: 32, enrolledStudents: 40, baselineMastery: 54, currentMastery: 72, gainPoints: 18, safetyPassRate: 100 };
  },
  recentEvents() {
    return [
      { at: "09:42:18", type: "concept_completed", userId: "ST-2401", conceptId: "linear-equations" },
      { at: "09:37:06", type: "hint_used", userId: "ST-2406", conceptId: "fractions" },
      { at: "09:24:52", type: "homework_submitted", userId: "ST-2412", conceptId: "matter" },
    ];
  },
};

export const mockParentService = {
  weeklyReport(studentId: string): LearningReport {
    return {
      studentId,
      weekOf: "2026-10-12",
      activitySummary: "Aarav practised linear equations and explored how to keep both sides balanced.",
      conceptsMastered: ["Equivalent Fractions", "Number Systems"],
      conceptsNeedingPractice: ["Fractions", "Ratio & Proportion"],
      homeworkComplete: 8,
      homeworkTotal: 10,
      suggestion: "Ask Aarav to explain how linear equations work in his own words.",
    };
  },
};

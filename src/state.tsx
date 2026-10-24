import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface DemoState {
  mastery: number;
  setMastery: (value: number) => void;
  completed: boolean;
  setCompleted: (value: boolean) => void;
  homeworkSubmitted: boolean;
  setHomeworkSubmitted: (value: boolean) => void;
  scienceHomeworkSubmitted: boolean;
  setScienceHomeworkSubmitted: (value: boolean) => void;
  assignmentCount: number;
  addAssignment: () => void;
  notify: (message: string) => void;
  toast: string;
  reset: () => void;
}

const DemoContext = createContext<DemoState | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [mastery, setMasteryState] = useState(() => Number(localStorage.getItem("demo-mastery")) || 72);
  const [completed, setCompletedState] = useState(() => localStorage.getItem("demo-completed") === "true");
  const [homeworkSubmitted, setHomeworkSubmittedState] = useState(() => localStorage.getItem("demo-homework") === "true");
  const [scienceHomeworkSubmitted, setScienceHomeworkSubmittedState] = useState(() => localStorage.getItem("demo-science-homework") === "true");
  const [assignmentCount, setAssignmentCount] = useState(2);
  const [toast, setToast] = useState("");
  useEffect(() => { localStorage.setItem("demo-mastery", String(mastery)); }, [mastery]);
  useEffect(() => { localStorage.setItem("demo-completed", String(completed)); }, [completed]);
  useEffect(() => { localStorage.setItem("demo-homework", String(homeworkSubmitted)); }, [homeworkSubmitted]);
  useEffect(() => { localStorage.setItem("demo-science-homework", String(scienceHomeworkSubmitted)); }, [scienceHomeworkSubmitted]);
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };
  const value = useMemo<DemoState>(() => ({
    mastery,
    setMastery: setMasteryState,
    completed,
    setCompleted: setCompletedState,
    homeworkSubmitted,
    setHomeworkSubmitted: setHomeworkSubmittedState,
    scienceHomeworkSubmitted,
    setScienceHomeworkSubmitted: setScienceHomeworkSubmittedState,
    assignmentCount,
    addAssignment: () => setAssignmentCount((count) => count + 1),
    notify,
    toast,
    reset: () => {
      localStorage.removeItem("demo-mastery");
      localStorage.removeItem("demo-completed");
      localStorage.removeItem("demo-homework");
      localStorage.removeItem("demo-science-homework");
      setMasteryState(72);
      setCompletedState(false);
      setHomeworkSubmittedState(false);
      setScienceHomeworkSubmittedState(false);
      setAssignmentCount(2);
      setToast("");
    },
  }), [mastery, completed, homeworkSubmitted, scienceHomeworkSubmitted, assignmentCount, toast]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("useDemo must be used within DemoProvider");
  return value;
}

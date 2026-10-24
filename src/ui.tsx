import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowDownRight, ArrowLeft, ArrowRight, Atom, BarChart3, BookOpen,
  Brain, Check, ChevronDown, CircleHelp, ClipboardCheck, Compass,
  FileText, FlaskConical, GraduationCap, Home, LayoutGrid, LifeBuoy, LockKeyhole,
  MessageCircle, Microscope, MoreHorizontal, PanelLeftClose, ShieldCheck,
  Sparkles, Target, Users, X, type LucideIcon,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { roleNames, routeDefaults, type Role } from "./data";
import { useDemo } from "./state";

export const pageMotion = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.24, ease: "easeOut" as const },
};

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-lockup">
      <span className="brand-mark" aria-hidden="true">
        <span /><span /><span />
      </span>
      {!compact && <span className="brand-word">learning<span>companion</span></span>}
    </div>
  );
}

export function Orb({ state = "idle", size = "medium" }: { state?: string; size?: "small" | "medium" | "large" }) {
  return (
    <span className={"ai-orb ai-orb-" + size + " orb-" + state} aria-label={"Learning companion is " + state}>
      <span className="orb-core" />
      <span className="orb-halo" />
      {state === "thinking" && <><i className="orb-particle particle-a" /><i className="orb-particle particle-b" /><i className="orb-particle particle-c" /></>}
      {state === "success" && <span className="orb-check"><Check size={size === "small" ? 9 : 12} strokeWidth={3} /></span>}
    </span>
  );
}

export function Button({
  children, onClick, variant = "primary", size = "normal", className = "", type = "button", disabled = false,
}: {
  children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "quiet" | "light";
  size?: "normal" | "small"; className?: string; type?: "button" | "submit"; disabled?: boolean;
}) {
  return (
    <motion.button
      type={type}
      className={"button button-" + variant + " button-" + size + " " + className}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.14 }}
    >
      {children}
    </motion.button>
  );
}

export function PageHeader({ eyebrow, title, description, action }: {
  eyebrow?: string; title: string; description?: string; action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="heading-action">{action}</div>}
    </div>
  );
}

export function SectionLabel({ children, trailing }: { children: React.ReactNode; trailing?: React.ReactNode }) {
  return <div className="section-label"><h2>{children}</h2>{trailing && <span>{trailing}</span>}</div>;
}

export function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "green" | "amber" | "violet" | "red" | "blue" }) {
  return <span className={"pill pill-" + tone}>{children}</span>;
}

export function ProgressRing({ value, label = "mastery", size = 148, color = "#615ff0" }: {
  value: number; label?: string; size?: number; color?: string;
}) {
  const radius = 49;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="progress-ring" style={{ width: size, height: size }} role="img" aria-label={value + "% " + label}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle className="ring-track" cx="60" cy="60" r={radius} />
        <motion.circle className="ring-value" cx="60" cy="60" r={radius} stroke={color}
          strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - value / 100) }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.16 }} />
      </svg>
      <div className="ring-copy"><strong>{value}<small>%</small></strong><span>{label}</span></div>
    </div>
  );
}

export interface MapNode {
  id: string; title: string; state: "mastered" | "learning" | "next" | "locked" | "practice";
  mastery?: number; x: number; y: number; caption?: string;
}

const studentNodes: MapNode[] = [
  { id: "number-systems", title: "Number systems", state: "mastered", mastery: 92, x: 7, y: 54 },
  { id: "fractions", title: "Fractions", state: "practice", mastery: 64, x: 25, y: 25 },
  { id: "ratio", title: "Ratio & proportion", state: "learning", mastery: 72, x: 43, y: 59 },
  { id: "expressions", title: "Expressions", state: "mastered", mastery: 86, x: 61, y: 27 },
  { id: "linear-equations", title: "Linear equations", state: "next", mastery: 68, x: 79, y: 58, caption: "UP NEXT" },
  { id: "graphs", title: "Graphs", state: "locked", x: 94, y: 27 },
];

export function LearningMap({ compact = false, onNode }: { compact?: boolean; onNode?: (node: MapNode) => void }) {
  const navigate = useNavigate();
  const { completed, mastery } = useDemo();
  const nodes = studentNodes.map((node) => node.id === "linear-equations" && completed
    ? { ...node, state: "mastered" as const, mastery: Math.max(mastery, 80), caption: "MASTERED" }
    : node);
  const path = (points: number[]) => points.map((x, i) => (i === 0 ? "M " : " L ") + x + " 54").join("");
  return (
    <div className={"learning-map-wrap " + (compact ? "learning-map-compact" : "")}>
      <div className="map-key">
        <span><i className="key-dot key-mastered" />Mastered</span>
        <span><i className="key-dot key-learning" />In progress</span>
        <span><i className="key-dot key-locked" />To come</span>
      </div>
      <div className="learning-map-scroll">
        <div className="learning-map">
          <svg className="map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs><linearGradient id="pathGradient"><stop stopColor="#68c5ac" /><stop offset=".72" stopColor="#7774f1" /><stop offset="1" stopColor="#d7d9e3" /></linearGradient></defs>
            <path d={path([7, 25, 43, 61, 79, 94])} />
            {completed && <circle cx="79" cy="54" r="1.1" className="map-activate" />}
          </svg>
          {nodes.map((node) => (
            <button key={node.id} className={"map-node node-" + node.state} style={{ left: node.x + "%", top: node.y + "%" }}
              onClick={() => onNode ? onNode(node) : navigate("/student/learn/" + node.id)}
              aria-label={node.title + (node.state === "locked" ? ", locked" : "")}>
              <span className="node-orbit"><span className="node-core">{node.state === "mastered" ? <Check size={14} /> : node.state === "locked" ? <LockKeyhole size={12} /> : <span className="node-center" />}</span></span>
              {node.caption && <small className="node-caption">{node.caption}</small>}
              <span className="node-label">{node.title}</span>
              {node.mastery !== undefined && <span className="node-score">{node.mastery}%</span>}
              <span className="node-tooltip"><b>{node.title}</b><br />{node.state === "mastered" ? "Mastered" : node.state === "practice" ? "Needs a little practice" : node.state === "learning" ? "In progress" : node.state === "next" ? "Your next concept" : "Complete the previous concept first"}{node.mastery !== undefined && <><br /><span>{node.mastery}% concept mastery</span></>}</span>
            </button>
          ))}
          {!compact && <div className="map-faint-label">CLASS 8 · MATHEMATICS</div>}
        </div>
      </div>
    </div>
  );
}

const roleNavigation: Record<Role, { label: string; path: string; icon: LucideIcon }[]> = {
  student: [
    { label: "Home", path: "/student", icon: Home },
    { label: "Learn", path: "/student/learn", icon: Compass },
    { label: "Practice", path: "/student/practice", icon: Target },
    { label: "Homework", path: "/student/homework", icon: ClipboardCheck },
    { label: "Progress", path: "/student/progress", icon: BarChart3 },
    { label: "Doubts", path: "/student/doubts", icon: CircleHelp },
  ],
  teacher: [
    { label: "Overview", path: "/teacher", icon: LayoutGrid },
    { label: "Students", path: "/teacher/students", icon: Users },
    { label: "Concepts", path: "/teacher/concepts", icon: Brain },
    { label: "Homework", path: "/teacher/homework", icon: ClipboardCheck },
    { label: "Alerts", path: "/teacher/alerts", icon: Activity },
    { label: "Teaching assistant", path: "/teacher/assistant", icon: Sparkles },
    { label: "Reports", path: "/teacher/reports", icon: FileText },
  ],
  management: [
    { label: "Overview", path: "/management", icon: LayoutGrid },
    { label: "Learning", path: "/management/learning", icon: Brain },
    { label: "Adoption", path: "/management/adoption", icon: Activity },
    { label: "Teachers", path: "/management/teachers", icon: Users },
    { label: "Safety", path: "/management/safety", icon: ShieldCheck },
    { label: "Pilot scorecard", path: "/management/scorecard", icon: ClipboardCheck },
  ],
  parent: [
    { label: "Home", path: "/parent", icon: Home },
    { label: "Progress", path: "/parent/progress", icon: BarChart3 },
    { label: "Homework", path: "/parent/homework", icon: ClipboardCheck },
    { label: "Weekly report", path: "/parent/report", icon: FileText },
    { label: "Feedback", path: "/parent/feedback", icon: MessageCircle },
  ],
  admin: [
    { label: "Schools", path: "/admin", icon: Home },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Curriculum", path: "/admin/curriculum", icon: BookOpen },
    { label: "Content review", path: "/admin/content", icon: ClipboardCheck },
    { label: "Question bank", path: "/admin/questions", icon: CircleHelp },
    { label: "AI quality", path: "/admin/ai-quality", icon: ShieldCheck },
    { label: "Cost monitor", path: "/admin/costs", icon: BarChart3 },
    { label: "Event viewer", path: "/admin/events", icon: Activity },
  ],
};

function pathIsActive(path: string, pathname: string) {
  if (path === "/student" || path === "/teacher" || path === "/management" || path === "/parent" || path === "/admin") {
    return pathname === path || (path === "/admin" && pathname === "/admin/");
  }
  return pathname === path || (path !== "/student/learn" && pathname.startsWith(path + "/")) || (path === "/student/learn" && pathname === path);
}

export function AppShell({ role, children }: { role: Role; children?: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const demo = useDemo();
  const switchRole = (next: Role) => navigate(routeDefaults[next]);
  return (
    <div className={"app-shell role-" + role}>
      <aside className="sidebar">
        <a className="brand-link" href="/" aria-label="Learning Companion home"><Brand /></a>
        <div className="school-chip"><span className="school-seal">D</span><span><b>Delhi Public School</b><small>Demo workspace</small></span><ChevronDown size={14} /></div>
        <div className="sidebar-role-label">{role === "student" ? "MY LEARNING" : role === "parent" ? "FAMILY VIEW" : "WORKSPACE"}</div>
        <nav className="side-nav" aria-label={roleNames[role] + " navigation"}>
          {roleNavigation[role].map(({ label, path, icon: Icon }) => (
            <button key={path} className={"nav-item " + (pathIsActive(path, pathname) ? "nav-active" : "")}
              onClick={() => navigate(path)} aria-current={pathIsActive(path, pathname) ? "page" : undefined}>
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>
              {label === "Alerts" && <i className="nav-count">6</i>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          {role === "student" && <button className="safety-link" onClick={() => navigate("/student/safety")}><LifeBuoy size={15} />Safety demo</button>}
          <div className="teacher-note"><span className="note-mark"><GraduationCap size={15} /></span><span><b>Learning, together.</b><small>Your teachers are part of this journey.</small></span></div>
          <div className="user-chip"><span className="avatar avatar-indigo">{role === "student" || role === "parent" ? "A" : role === "teacher" ? "S" : role === "management" ? "P" : "O"}</span><span><b>{role === "student" || role === "parent" ? "Aarav Sharma" : role === "teacher" ? "Ms. Sharma" : role === "management" ? "Principal" : "School team"}</b><small>{roleNames[role]} preview</small></span><MoreHorizontal size={18} /></div>
        </div>
      </aside>
      <div className="shell-main">
        <header className="topbar">
          <div className="mobile-brand"><Brand compact /></div>
          <div className="topbar-context"><span className="context-dot" />Delhi Public School <span className="context-divider">/</span> Class 8A</div>
          <div className="topbar-actions">
            <div className="demo-switcher"><span>PROTOTYPE PREVIEW</span><select className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" value={role} onChange={(event) => switchRole(event.target.value as Role)} aria-label="View as role">
              {Object.entries(roleNames).map(([key, name]) => <option key={key} value={key}>{name}</option>)}
            </select><ChevronDown size={12} /></div>
            <button className="demo-reset" onClick={() => { demo.reset(); navigate("/student"); }} title="Reset the demo and return to the student experience">Reset demo</button>
            <span className="prototype-badge"><span />Demo mode</span>
          </div>
        </header>
        <nav className={"mobile-role-nav mobile-role-" + role} aria-label={roleNames[role] + " quick navigation"}>
          {roleNavigation[role].map(({ label, path, icon: Icon }) => <button key={path} className={pathIsActive(path, pathname) ? "mobile-role-active" : ""} onClick={() => navigate(path)} aria-current={pathIsActive(path, pathname) ? "page" : undefined}><Icon size={15} />{label}</button>)}
        </nav>
        <AnimatePresence mode="wait">
          <motion.main className="page-content" key={pathname} {...pageMotion}>
            {children ?? <Outlet />}
          </motion.main>
        </AnimatePresence>
        <footer className="app-footer"><span>Made for the moments learning clicks.</span><span>Prototype · Sample student data</span></footer>
      </div>
      {role === "student" && <nav className="mobile-bottom-nav" aria-label="Student quick navigation">
        {roleNavigation.student.filter((item) => item.label !== "Doubts").map(({ label, path, icon: Icon }) => (
          <button key={path} className={pathIsActive(path, pathname) ? "mobile-nav-active" : ""} onClick={() => navigate(path)}>
            <Icon size={19} /><span>{label}</span>
          </button>
        ))}
      </nav>}
      <AnimatePresence>{demo.toast && <motion.div className="toast-message" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
        <span className="toast-check"><Check size={14} /></span>{demo.toast}
        <button aria-label="Dismiss notification" onClick={() => demo.notify("")}><X size={14} /></button>
      </motion.div>}</AnimatePresence>
    </div>
  );
}

export function Modal({ title, onClose, children, width = "560px" }: {
  title: string; onClose: () => void; children: React.ReactNode; width?: string;
}) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div className="modal-sheet" style={{ maxWidth: width }} role="dialog" aria-modal="true" aria-label={title}
        initial={{ opacity: 0, scale: 0.97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 6 }}>
        <div className="modal-heading"><div><div className="eyebrow">LEARNING COMPANION</div><h2>{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>
        {children}
      </motion.div>
    </div>
  );
}

export function MetricTile({ label, value, note, icon: Icon, tone = "violet" }: {
  label: string; value: string; note: string; icon: LucideIcon; tone?: "violet" | "mint" | "amber" | "blue";
}) {
  return (
    <motion.div className={"metric-tile metric-" + tone} whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
      <div className="metric-top"><span className="metric-icon"><Icon size={17} /></span><span className="metric-note">{note}</span></div>
      <strong>{value}</strong><span className="metric-label">{label}</span>
    </motion.div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return <div className="empty-state"><span className="empty-orbit"><Sparkles size={20} /></span><h3>{title}</h3><p>{body}</p>{action}</div>;
}

export function FeedbackLine({ correct, children }: { correct: boolean; children: React.ReactNode }) {
  return <motion.div className={"feedback-line " + (correct ? "feedback-good" : "feedback-gentle")} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
    <span>{correct ? <Check size={16} /> : <ArrowDownRight size={16} />}</span>{children}
  </motion.div>;
}

export function Dots({ count, active }: { count: number; active: number }) {
  return <div className="step-dots" aria-label={"Step " + active + " of " + count}>{Array.from({ length: count }, (_, i) => <i key={i} className={i + 1 === active ? "active" : i + 1 < active ? "passed" : ""} />)}</div>;
}

export function SubtleDivider() { return <div className="subtle-divider" />; }

export function IconCircle({ children, tone = "violet" }: { children: React.ReactNode; tone?: "violet" | "mint" | "amber" | "blue" }) {
  return <span className={"icon-circle circle-" + tone}>{children}</span>;
}

export const iconSet = { ArrowLeft, ArrowRight, Atom, FlaskConical, Microscope, PanelLeftClose };

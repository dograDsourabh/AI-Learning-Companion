import { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, ArrowLeft, ArrowRight, BookOpen, Check, CheckCheck, ChevronRight,
  CircleHelp, Clock3, Download, FileText, Flag, FlaskConical, GraduationCap,
  HeartHandshake, Lightbulb, LockKeyhole, MessageCircle, MoreHorizontal,
  Pencil, Plus, RefreshCw, Send, ShieldAlert, ShieldCheck, Sparkles, Target,
  TrendingUp, Users, X,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  concepts, cohortTrend, students,
  type Concept, type Student,
} from "./data";
import type { ChartPoint } from "./charts";

const TeacherPulseChart = lazy(() => import("./charts").then((module) => ({ default: module.TeacherPulseChart })));
const MasteryTrendChart = lazy(() => import("./charts").then((module) => ({ default: module.MasteryTrendChart })));
const LearningGainChart = lazy(() => import("./charts").then((module) => ({ default: module.LearningGainChart })));
const ResultsTrendChart = lazy(() => import("./charts").then((module) => ({ default: module.ResultsTrendChart })));
const ChartFallback = () => <div className="chart-loading" role="status" aria-label="Loading chart" />;

import { useDemo } from "./state";
import { mockAssessmentService, mockHomeworkService, mockParentService, mockStudentService, mockTeacherService, mockTutorService } from "./services";
import {
  Button, Dots, EmptyState, FeedbackLine, IconCircle, LearningMap, MetricTile,
  Modal, Orb, PageHeader, Pill, ProgressRing, SectionLabel,
} from "./ui";

const accents = ["mint", "violet", "amber", "blue"] as const;

export function StudentHome() {
  const navigate = useNavigate();
  const { mastery, completed } = useDemo();
  return (
    <div className="student-page">
      <div className="welcome-row"><div><div className="eyebrow">MONDAY, 19 OCTOBER · YOUR LEARNING JOURNEY</div><h1>Good morning, Aarav <span className="wave">✳</span></h1><p>Your class is exploring algebra this week. Here’s a good next step.</p></div><button className="streak-chip" onClick={() => navigate("/student/progress")}><span>✦</span><b>4 day</b><small>learning rhythm</small></button></div>
      <section className="mission-layout">
        <div className="mission-card">
          <div className="mission-top"><span className="mission-kicker"><span className="mission-pulse" /> TODAY’S LEARNING MISSION</span><span className="mission-spark">✦</span></div>
          <div className="mission-content"><div><span className="mission-subject">MATHEMATICS <i>·</i> CLASS 8</span><h2>{completed ? "You’ve mastered linear equations." : "Understanding linear equations"}</h2><p>{completed ? "Your next concept is ready when you are." : "Learn how to undo operations, one clear step at a time."}</p><div className="mission-meta"><span><Clock3 size={14} />15 min</span><span><span className="meta-dot" />3 activities</span><span><Sparkles size={14} />Just for you</span></div><Button onClick={() => navigate("/student/learn/linear-equations")}>{completed ? "Keep exploring" : "Continue learning"} <ArrowRight size={16} /></Button></div><div className="mission-visual"><div className="mission-visual-orbit orbit-one" /><div className="mission-visual-orbit orbit-two" /><div className="mission-equation"><span>3x</span><i>+</i><span>5</span><i>=</i><span>20</span></div><div className="mission-visual-caption">LET’S FIND X TOGETHER</div><div className="mission-star s1">✦</div><div className="mission-star s2">·</div><div className="mission-star s3">✳</div></div></div>
          <div className="mission-bottom"><span><span className="avatar-stack"><i /><i /><i /></span> Your teacher mapped this for this week</span><span>Step 3 of 5 <span className="mini-progress"><i style={{ width: "60%" }} /></span></span></div>
        </div>
        <aside className="mastery-side">
          <div className="mastery-side-head"><span className="eyebrow">YOUR PROGRESS</span><button aria-label="Open progress" onClick={() => navigate("/student/progress")}><ArrowRight size={16} /></button></div>
          <ProgressRing value={mastery} label="math mastery" size={148} />
          <p>You’re making steady progress in <b>Mathematics</b>.</p>
          <div className="mastery-side-footer"><span className="mastery-trend"><TrendingUp size={14} /> +8% this month</span><span>4 concepts mastered</span></div>
        </aside>
      </section>
      <section className="journey-section">
        <div className="journey-head"><div><div className="eyebrow">THE BIG PICTURE</div><h2>Your learning constellation</h2><p>Each idea connects to the next. Tap a concept to explore it.</p></div><button className="inline-link" onClick={() => navigate("/student/progress")}>Open full map <ArrowRight size={15} /></button></div>
        <LearningMap compact />
      </section>
      <section className="student-lower">
        <button className="doubt-nudge" onClick={() => navigate("/student/doubts")}><span className="doubt-nudge-orb"><Orb state="idle" size="small" /></span><span><small>NOT SURE ABOUT A STEP?</small><b>Ask your learning companion</b><em>No question is too small.</em></span><ArrowRight size={17} /></button>
        <div className="teacher-note student-teacher-note"><span className="note-mark"><GraduationCap size={16} /></span><span><small>A NOTE FROM MS. SHARMA</small><b>“Try saying what you notice out loud. It often helps the next idea click.”</b></span></div>
      </section>
    </div>
  );
}

export function StudentLearn() {
  const navigate = useNavigate();
  return <><PageHeader eyebrow="YOUR LEARNING PATH" title="Explore concepts" description="Follow your class syllabus, one connected idea at a time." action={<Pill tone="violet">Class 8 · Mathematics</Pill>} />
    <div className="learn-top-banner"><div className="learn-banner-copy"><span className="eyebrow">THIS WEEK WITH MS. SHARMA</span><h2>Algebra is a way of thinking.</h2><p>Let’s connect expressions to equations, and equations to the world around you.</p><Button onClick={() => navigate("/student/learn/linear-equations")}>Pick up where you left off <ArrowRight size={15} /></Button></div><div className="learn-banner-art"><span>2x + 4</span><i>↓</i><span>2x = 10</span><i>↓</i><b>x = 5</b><div className="learn-banner-orb"><Orb state="explaining" size="small" /></div></div></div>
    <section className="concept-explorer"><SectionLabel trailing={<span>Tap a concept to see your next step</span>}>Your class map</SectionLabel><LearningMap /></section>
    <div className="concept-list-grid">{concepts.filter((item) => item.grade === 8).slice(0, 8).map((concept, i) => <ConceptRow key={concept.id} concept={concept} index={i} onClick={() => navigate("/student/learn/" + concept.id)} />)}</div>
  </>;
}

function ConceptRow({ concept, index, onClick }: { concept: Concept; index: number; onClick: () => void }) {
  const stateText: Record<string, string> = { mastered: "Mastered", practice: "Needs practice", learning: "In progress", next: "Ready to learn", locked: "Coming up" };
  return <button className="concept-row" onClick={onClick}><span className={"concept-row-index cr-" + concept.state}>{concept.state === "mastered" ? <Check size={14} /> : String(index + 1).padStart(2, "0")}</span><span className="concept-row-copy"><b>{concept.title}</b><small>{concept.chapter} · {concept.subject}</small></span><span className={"concept-row-state state-" + concept.state}>{stateText[concept.state]}</span>{concept.mastery > 0 && <span className="concept-row-meter"><i style={{ width: concept.mastery + "%" }} /></span>}<ChevronRight size={16} /></button>;
}

export function ConceptLesson() {
  const { conceptId = "linear-equations" } = useParams();
  const navigate = useNavigate();
  const { mastery, setMastery, setCompleted, notify } = useDemo();
  const [step, setStep] = useState(0);
  const [hint, setHint] = useState(false);
  const [choice, setChoice] = useState("");
  const [answer, setAnswer] = useState("");
  const [locked] = useState(concepts.find((concept) => concept.id === conceptId)?.state === "locked");
  const concept = concepts.find((item) => item.id === conceptId) || concepts[4];
  const finish = () => {
    setMastery(Math.min(99, mastery + 8));
    setCompleted(mockAssessmentService.hasMastery(4, 5));
    setStep(3);
  };
  if (locked) return <div className="lesson-wrap"><PageHeader eyebrow="YOUR LEARNING PATH" title={concept.title} description="This concept opens up after you explore the ideas before it." /><div className="locked-concept"><IconCircle><LockKeyhole size={20} /></IconCircle><h2>One idea at a time.</h2><p>Try the earlier concepts first. They’ll make {concept.title.toLowerCase()} feel much clearer.</p><Button onClick={() => navigate("/student/learn")}>Back to my map</Button></div></div>;
  return <div className="lesson-wrap">
    <div className="lesson-breadcrumb"><button onClick={() => navigate("/student/learn")}><ArrowLeft size={15} /> Learning path</button><span>/</span><span>{concept.title}</span></div>
    <div className="lesson-heading"><div><div className="eyebrow">MATHEMATICS · CLASS 8 · ALGEBRA</div><h1>{concept.title}</h1><p>Let’s understand what an equation is asking us to find.</p></div><span className="lesson-step-tag"><span className="mission-pulse" />Guided lesson <i>·</i> 3 min</span></div>
    <div className="lesson-columns">
      <section className="lesson-tutor-panel">
        <div className="tutor-intro"><Orb state={step === 3 ? "success" : step === 0 ? "explaining" : "idle"} /><div><b>Your learning companion</b><small>Here to help you think it through</small></div><span className="tutor-curriculum"><ShieldCheck size={13} /> In your class syllabus</span></div>
        <AnimatePresence mode="wait">
          <motion.div className="tutor-body" key={step + "-" + hint} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.22 }}>
            {step === 0 && <>
              <div className="tutor-speech"><p>Let’s not solve it all at once.</p><p>We have <b>3x + 5 = 20</b>. First, we want to get <b>3x</b> on its own.</p></div>
              <div className="hint-card"><span className="hint-icon"><Lightbulb size={17} /></span><div><b>Here’s a hint</b><p>{hint ? "Think of the equation like a balanced scale. What could remove the +5 while keeping both sides equal?" : "What operation do you think we should undo first?"}</p></div></div>
              {choice ? <FeedbackLine correct={choice === "Subtract 5"}>{choice === "Subtract 5" ? "Exactly. Let’s undo the +5 on both sides." : "Good thought. Which operation would remove the +5 first?"}</FeedbackLine> : null}
              <div className="choice-row"><button id="lesson-choice-subtract" className={"answer-choice " + (choice === "Subtract 5" ? "answer-selected" : "")} onClick={() => setChoice("Subtract 5")}>Subtract 5 <span>−5</span></button><button className={"answer-choice " + (choice === "Divide by 3" ? "answer-selected" : "")} onClick={() => setChoice("Divide by 3")}>Divide by 3 <span>÷3</span></button></div>
              <div className="tutor-actions">{choice === "Subtract 5" ? <Button onClick={() => { setStep(1); setChoice(""); }}>Show me what changes <ArrowRight size={15} /></Button> : <><Button variant="secondary" onClick={() => setHint(true)}>I need another hint <Lightbulb size={15} /></Button><button className="text-button" onClick={() => { document.getElementById("lesson-choice-subtract")?.focus(); notify("Choose the operation you would undo first."); }}>I’ll try <ArrowRight size={14} /></button></>}</div>
              {hint && <button className="show-steps-link" onClick={() => { setStep(1); setChoice(""); }}>Show me the steps <ChevronRight size={14} /></button>}
            </>}
            {step === 1 && <>
              <div className="tutor-speech"><p>Nice. If we subtract 5 from one side, we do the same to the other side.</p><p>That keeps the equation balanced.</p></div>
              <div className="equation-board"><div className="equation-original"><span>3x + 5</span><i>=</i><span>20</span></div><div className="equation-operation"><span>− 5</span><span>− 5</span></div><div className="equation-result"><span>3x</span><i>=</i><span>15</span></div></div>
              <div className="hint-card hint-card-mint"><span className="hint-icon"><Sparkles size={16} /></span><div><b>Your turn</b><p>Now what can we do to get x by itself?</p></div></div>
              {choice && <FeedbackLine correct={choice === "Divide by 3"}>{choice === "Divide by 3" ? "Exactly. Divide both sides by 3." : "Almost. We need to undo multiplying by 3."}</FeedbackLine>}
              <div className="choice-row"><button className={"answer-choice " + (choice === "Divide by 3" ? "answer-selected" : "")} onClick={() => setChoice("Divide by 3")}>Divide by 3 <span>÷3</span></button><button className={"answer-choice " + (choice === "Subtract 3" ? "answer-selected" : "")} onClick={() => setChoice("Subtract 3")}>Subtract 3 <span>−3</span></button></div>
              <div className="tutor-actions">{choice === "Divide by 3" ? <Button onClick={() => setStep(2)}>One more step <ArrowRight size={15} /></Button> : <Button variant="secondary" onClick={() => setChoice("")}>Try again <RefreshCw size={14} /></Button>}</div>
            </>}
            {step === 2 && <>
              <div className="tutor-speech"><p>We found <b>x = 5</b>. Let’s check it together by putting 5 back into the original equation.</p></div>
              <div className="equation-board equation-finished"><div className="equation-result"><span>3x</span><i>=</i><span>15</span></div><div className="equation-operation"><span>÷ 3</span><span>÷ 3</span></div><div className="equation-result"><span>x</span><i>=</i><span>5</span><b><Check size={14} /> balanced</b></div></div>
              <label className="quick-check-label" htmlFor="lesson-check">Quick check <span>What do you get when you put x = 5 into 3x + 5?</span></label>
              <div className="quick-check"><input id="lesson-check" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (answer.trim() === "20" || answer.trim() === "20.") && finish()} placeholder="Type your answer" inputMode="numeric" /><span>3 × 5 + 5 = ?</span><Button size="small" onClick={() => answer.trim() === "20" || answer.trim() === "20." ? finish() : notify("Try 3 × 5 first, then add 5.")}>Check <ArrowRight size={14} /></Button></div>
            </>}
            {step === 3 && <div className="mastery-moment"><div className="mastery-flare"><Orb state="success" size="large" /></div><Pill tone="green">CONCEPT MASTERED</Pill><h2>You found x. And the balance.</h2><p>That’s the heart of solving an equation: whatever you do to one side, do to the other.</p><div className="mastery-gain"><span><TrendingUp size={17} /> +8 mastery points</span><span>Linear equations <b>{Math.min(99, mastery + 8)}%</b></span></div><Button onClick={() => navigate("/student/progress")}>See my map change <ArrowRight size={15} /></Button><button className="text-button" onClick={() => navigate("/student/practice")}>Try another question</button></div>}
          </motion.div>
        </AnimatePresence>
      </section>
      <aside className="lesson-side"><div className="lesson-side-card"><span className="eyebrow">TODAY’S IDEA</span><h3>Keep the scale balanced.</h3><p>An equation is like a balanced scale. Equal changes keep both sides equal.</p><div className="balance-visual"><div className="balance-beam"><i /><i /></div><span>3x + 5</span><b>=</b><span>20</span></div><small><span>↗</span> This idea connects to <b>Ratio & proportion</b></small></div><div className="lesson-next-card"><span className="next-num">02</span><div><small>AFTER THIS</small><b>Use equations in real life</b></div><LockKeyhole size={14} /></div><div className="lesson-support"><Orb state="idle" size="small" /><span><b>A quick reminder</b><small>You can ask for another explanation anytime.</small></span></div></aside>
    </div>
  </div>;
}

export function StudentPractice() {
  const navigate = useNavigate();
  const demo = useDemo();
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get("assignment");
  const isScienceHomework = assignmentId === "hw-2";
  const isHomework = assignmentId === "hw-1" || isScienceHomework;
  const totalQuestions = isScienceHomework ? 6 : isHomework ? 8 : 10;
  const [index, setIndex] = useState(isHomework ? 0 : 3);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);
  const practiceQuestions = mockAssessmentService.questionsFor(isScienceHomework ? "matter" : "linear-equations");
  const question = practiceQuestions[index % practiceQuestions.length];
  const correct = selected === question.answer;
  const next = () => {
    if (index === totalQuestions - 1) {
      setDone(true);
      if (isHomework) {
        mockHomeworkService.submit(assignmentId ?? "hw-1");
        if (isScienceHomework) demo.setScienceHomeworkSubmitted(true);
        else demo.setHomeworkSubmitted(true);
      }
      if (correct && !isScienceHomework) demo.setMastery(Math.min(99, demo.mastery + 2));
    } else { setIndex((current) => current + 1); setSelected(""); setSubmitted(false); }
  };
  if (done) return <div className="practice-complete"><div className="complete-orbit"><span><CheckCheck size={28} /></span></div><Pill tone="green">{isHomework ? "HOMEWORK SUBMITTED" : "PRACTICE COMPLETE"}</Pill><h1>{isHomework ? "Homework is all done." : "That’s ten thoughtful tries."}</h1><p>{isScienceHomework ? "You explored how particles behave in different states of matter." : "You’re building stronger instincts for Linear Equations."} Your teacher can see the progress you made.</p><div className="complete-stats"><span><b>{totalQuestions}</b><small>questions tried</small></span><span><b>{isScienceHomework ? "74%" : demo.mastery + "%"}</b><small>{isScienceHomework ? "science progress" : "math mastery"}</small></span><span><b>+2</b><small>growth points</small></span></div><div className="complete-actions"><Button onClick={() => navigate("/student/progress")}>View progress <ArrowRight size={15} /></Button><Button variant="secondary" onClick={() => navigate("/student")}>Back home</Button></div></div>;
  return <div className="practice-page">
    <div className="practice-topline"><button className="text-back" onClick={() => navigate(isHomework ? "/student/homework" : "/student")}><ArrowLeft size={15} />{isHomework ? "Homework" : "Your learning journey"}</button><span className="practice-context">{isScienceHomework ? "SCIENCE · ASSIGNED BY MS. SHARMA" : isHomework ? "ASSIGNED BY MS. SHARMA" : "PRACTICE · LINEAR EQUATIONS"}</span></div>
    <div className="practice-progress"><span>Question {index + 1} <i>of {totalQuestions}</i></span><div>{Array.from({ length: totalQuestions }, (_, n) => <i key={n} className={n < index ? "finished" : n === index ? "current" : ""} />)}</div><Pill tone="amber">Medium</Pill></div>
    <section className="question-stage"><div className="question-label"><span className="question-mark"><Target size={18} /></span><div><small>LET’S WORK IT OUT</small><b>Take a breath. There’s time to think.</b></div></div><h1>{question.prompt}</h1><p className="question-subtitle">{isScienceHomework ? "Choose the best answer." : "What is x?"}</p>
      <div className="answer-options">{question.options.map((option, i) => <button key={option} className={"answer-option " + (selected === option ? "option-chosen" : "") + (submitted && option === question.answer ? " option-right" : "") + (submitted && selected === option && !correct ? " option-gentle" : "")} onClick={() => !submitted && setSelected(option)}><span className="option-letter">{String.fromCharCode(65 + i)}</span><b>{option}</b>{submitted && option === question.answer && <Check size={17} />}</button>)}</div>
      <AnimatePresence>{submitted && <FeedbackLine correct={correct}>{correct ? <><b>Nice! You got it.</b> You’re getting stronger at {isScienceHomework ? "Matter Around Us" : "Linear Equations"}.</> : <>Not quite — let’s look at the step where things changed. {question.explanation}</>}</FeedbackLine>}</AnimatePresence>
      <div className="question-actions">{!submitted ? <Button disabled={!selected} onClick={() => setSubmitted(true)}>Check my answer <ArrowRight size={15} /></Button> : <Button onClick={next}>{index === totalQuestions - 1 ? "Finish practice" : "Next question"} <ArrowRight size={15} /></Button>}<button className="text-button" onClick={() => navigate("/student/doubts")}>Ask for a hint <Lightbulb size={14} /></button></div>
    </section>
    <div className="practice-footer"><Orb state={submitted && correct ? "success" : "idle"} size="small" /><span>Your companion is here if you need a nudge.</span><span className="practice-safe"><ShieldCheck size={13} /> No pressure, just practice</span></div>
  </div>;
}

export function StudentHomework() {
  const navigate = useNavigate();
  const { homeworkSubmitted, scienceHomeworkSubmitted } = useDemo();
  const assignments = mockHomeworkService.list();
  return <><PageHeader eyebrow="YOUR ASSIGNMENTS" title="Homework" description="Your teacher has set a little practice to help ideas stick." action={<Pill tone="blue">2 due this week</Pill>} />
    <div className="homework-feature"><div><span className="eyebrow">UP NEXT · MATHEMATICS</span><h2>Linear Equations</h2><p>One step at a time. You’ve already started this set.</p><div className="homework-feature-meta"><span><Clock3 size={14} />12 min</span><span><BookOpen size={14} />8 questions</span><span><span className="avatar avatar-tiny">S</span> Ms. Sharma</span></div><Button onClick={() => navigate("/student/practice?assignment=hw-1")}>{homeworkSubmitted ? "Review my answers" : "Continue assignment"} <ArrowRight size={15} /></Button></div><div className="homework-feature-side"><span className="due-badge"><Clock3 size={14} />Due tomorrow</span><div className="homework-ring"><ProgressRing value={homeworkSubmitted ? 100 : 38} label="complete" size={96} color="#18a993" /></div><small>{homeworkSubmitted ? "Submitted · nice work" : "3 of 8 questions saved"}</small></div></div>
    <div className="homework-list-head"><h2>All assignments</h2><button className="inline-link" onClick={() => navigate("/student/progress")}>See my progress <ArrowRight size={14} /></button></div>
    <div className="homework-list">{assignments.map((item, i) => {
      const submitted = item.id === "hw-1" ? homeworkSubmitted : item.id === "hw-2" && scienceHomeworkSubmitted;
      const label = submitted ? "Submitted" : item.status;
      return <button key={item.id} className="homework-item" onClick={() => navigate("/student/practice?assignment=" + item.id)}><IconCircle tone={i === 1 ? "blue" : "violet"}>{i === 1 ? <FlaskConical size={17} /> : <BookOpen size={17} />}</IconCircle><span className="homework-item-copy"><b>{item.title}</b><small>{item.subject} · {item.detail}</small></span><span className={"homework-status " + (label === "Submitted" ? "submitted" : label === "In progress" ? "in-progress" : "")}><i />{label}</span><span className="homework-due">{item.id === "hw-1" && !submitted ? "Due tomorrow" : item.due}</span><ChevronRight size={16} /></button>;
    })}</div>
    <div className="homework-encouragement"><Sparkles size={16} /><span><b>Small steps add up.</b> A few minutes of practice today can make tomorrow’s lesson easier.</span></div>
  </>;
}

export function StudentProgress() {
  const navigate = useNavigate();
  const { mastery, completed } = useDemo();
  const [selected, setSelected] = useState<Concept | null>(null);
  const selectNode = (node: { id: string }) => setSelected(concepts.find((concept) => concept.id === node.id) || null);
  const selectedIsMastered = selected?.state === "mastered" || (selected?.id === "linear-equations" && completed);
  return <>
    <PageHeader eyebrow="YOUR JOURNEY SO FAR" title="Progress, at your pace" description="Every attempt helps build a clearer picture of what you know." action={<Pill tone="green"><TrendingUp size={13} /> Moving forward</Pill>} />
    <div className="progress-overview">
      <div className="progress-overview-main"><ProgressRing value={mastery} label="math mastery" size={184} /><div><span className="eyebrow">MATHEMATICS · CLASS 8</span><h2>You’re growing your understanding.</h2><p>You’ve made steady progress across the concepts your class is learning. Keep going at your own pace.</p><span className="progress-up"><TrendingUp size={14} /> +8% in the last month</span></div></div>
      <div className="progress-overview-stats"><div><b>4</b><span>concepts mastered</span></div><div><b>2</b><span>in progress</span></div><div><b>18</b><span>questions explored</span></div></div>
    </div>
    <div className="progress-map-grid">
      <section className="progress-map-panel"><SectionLabel trailing={<Pill tone="violet">Mathematics</Pill>}>Your concept map</SectionLabel><p>Tap any idea to see what you’ve been learning.</p><LearningMap onNode={selectNode} /></section>
      <aside className="concept-detail-panel">
        {selected ? <>
          <span className="eyebrow">{selected.subject.toUpperCase()} · CLASS {selected.grade}</span><h2>{selected.title}</h2>
          <Pill tone={selectedIsMastered ? "green" : selected.state === "practice" ? "amber" : selected.state === "locked" ? "neutral" : "violet"}>{selectedIsMastered ? "Mastered" : selected.state === "practice" ? "Needs practice" : selected.state === "locked" ? "Coming up" : selected.state === "next" ? "Ready to learn" : "In progress"}</Pill>
          <div className="detail-mastery"><ProgressRing value={selected.id === "linear-equations" ? mastery : selected.mastery} label="concept mastery" size={96} color="#19aa96" /><span><b>{selectedIsMastered ? "Strong understanding" : "Building understanding"}</b><small>4 / 5 medium questions correct</small></span></div>
          <p>{selected.objective}</p><button className="inline-link" onClick={() => navigate("/student/learn/" + selected.id)}>Visit this concept <ArrowRight size={14} /></button>
        </> : <>
          <span className="detail-placeholder-icon"><Target size={20} /></span><h2>Choose a concept</h2><p>Your map shows how one idea helps you reach the next.</p>
          <div className="detail-sample"><i className="sample-dot" /><span><b>Fractions</b><small>Mastered · 4 of 5 medium questions correct</small></span></div>
        </>}
      </aside>
    </div>
    <section className="activity-section"><SectionLabel trailing={<button className="inline-link">View all <ArrowRight size={13} /></button>}>Recent learning moments</SectionLabel><div className="activity-timeline"><div className="timeline-item"><span className="timeline-dot timeline-green"><Check size={13} /></span><span><b>Explored equivalent fractions</b><small>Mathematics · Today, 9:42 am</small></span><Pill tone="green">+4 points</Pill></div><div className="timeline-item"><span className="timeline-dot timeline-violet"><MessageCircle size={13} /></span><span><b>Asked a question about ratios</b><small>Mathematics · Yesterday, 4:16 pm</small></span><Pill tone="violet">Helpful hint</Pill></div><div className="timeline-item"><span className="timeline-dot timeline-amber"><FlaskConical size={13} /></span><span><b>Practised states of matter</b><small>Science · Friday, 10:20 am</small></span><Pill tone="amber">In progress</Pill></div></div></section>
  </>;
}

export function StudentDoubts() {
  const navigate = useNavigate();
  const { notify } = useDemo();
  const [query, setQuery] = useState("");
  const [studentAttempt, setStudentAttempt] = useState("");
  const [mode, setMode] = useState<"idle" | "thinking" | "hint" | "attempt" | "steps" | "redirected">("idle");
  const [another, setAnother] = useState(false);
  const [reported, setReported] = useState(false);
  const ask = (text: string) => {
    setQuery(text);
    setStudentAttempt("");
    const responseKind = mockTutorService.classify(text);
    if (responseKind === "safety") { navigate("/student/safety"); return; }
    if (responseKind === "redirected") { setMode("redirected"); return; }
    setMode("thinking");
    window.setTimeout(() => setMode("hint"), 1150);
  };
  const prompts = ["Why does this formula work?", "I don’t understand this step.", "Can you explain it differently?"];
  return <div className="doubt-page"><PageHeader eyebrow="A QUIET PLACE FOR QUESTIONS" title="Ask your learning companion" description="A hint first. Another way to see it next. You stay in the driver’s seat." action={<Pill tone="blue"><ShieldCheck size={13} />Grounded in your syllabus</Pill>} />
    <div className="doubt-workspace"><section className="doubt-main"><div className="doubt-context"><span className="context-book"><BookOpen size={16} /></span><span><small>YOU’RE LEARNING</small><b>Linear Equations <i>·</i> Class 8 Maths</b></span><button onClick={() => { setQuery(""); setMode("idle"); }}>Change concept <ChevronRight size={14} /></button></div>
      <div className="doubt-conversation">
        {mode === "idle" && <div className="doubt-welcome"><Orb state="idle" size="large" /><span className="eyebrow">I’M HERE TO HELP YOU THINK</span><h2>What’s on your mind?</h2><p>Pick a prompt, or type a question about the concept you’re learning.</p><div className="suggested-prompts">{prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}><span><MessageCircle size={14} /></span>{prompt}<ArrowRight size={14} /></button>)}</div></div>}
        {mode !== "idle" && <div className="conversation-active"><div className="student-query"><span className="avatar avatar-indigo">A</span><span><small>YOUR QUESTION</small><b>{query}</b></span></div>{mode === "thinking" && <div className="thinking-card"><Orb state="thinking" /><span><b>Thinking it through...</b><small>Finding a helpful example from your lesson</small></span><div className="thinking-lines"><i /><i /><i /></div></div>}
          {mode === "redirected" && <div className="redirect-card"><span className="redirect-smile">☺</span><span className="eyebrow">A GENTLE REDIRECT</span><h3>That’s interesting!</h3><p>I’m here to help with your <b>Class 8 Mathematics and Science</b>. Want to keep going with today’s lesson?</p><Button onClick={() => { setMode("idle"); setQuery(""); }}>Back to learning <ArrowRight size={14} /></Button></div>}
          {mode === "hint" && <div className="tutor-answer-card"><div className="answer-from"><Orb state="explaining" size="small" /><span><b>Your learning companion</b><small>Linear Equations · approved lesson</small></span></div><div className="answer-copy"><span className="hint-icon"><Lightbulb size={16} /></span><div><b>Here’s a hint</b><p>{mockTutorService.getHint(query, another).hint}</p><div className="answer-step"><span>1</span><span>Look for the operation closest to x</span></div><div className="answer-step"><span>2</span><span>Undo it equally on both sides</span></div></div></div><div className="answer-try"><label htmlFor="try-input">What would you try first?</label><div><input id="try-input" value={studentAttempt} onChange={(event) => setStudentAttempt(event.target.value)} placeholder="Share your thinking..." onKeyDown={(e) => e.key === "Enter" && setMode("attempt")} /><Button size="small" onClick={() => setMode("attempt")}>I’ll try <ArrowRight size={13} /></Button></div></div><div className="answer-tools"><button onClick={() => { setAnother(true); setMode("thinking"); window.setTimeout(() => setMode("hint"), 900); }}><Lightbulb size={14} />I need another hint</button><button onClick={() => setMode("steps")}><BookOpen size={14} />Show me the steps</button><button className={reported ? "reported" : ""} onClick={() => { setReported(true); notify("Thanks for flagging this answer for teacher review."); }}><Flag size={13} />{reported ? "Reported" : "Report this answer"}</button></div></div>}
          {mode === "attempt" && <div className="attempt-feedback"><FeedbackLine correct>You’re thinking about the right operation. Try subtracting 5 from both sides so the scale stays balanced.</FeedbackLine><div className="answer-tools"><button onClick={() => setMode("steps")}><BookOpen size={14} />See the worked steps</button><button onClick={() => setMode("hint")}><RefreshCw size={13} />Try another way</button></div></div>}
          {mode === "steps" && <div className="worked-steps"><div className="answer-from"><Orb state="explaining" size="small" /><span><b>Let’s reveal one step at a time</b><small>Then you can explain it back</small></span></div><div className="worked-row"><span>01</span><b>3x + 5 = 20</b><small>Start with the original equation</small></div><div className="worked-row"><span>02</span><b>3x = 15</b><small>Subtract 5 from both sides</small></div><div className="worked-row"><span>03</span><b>x = 5</b><small>Divide both sides by 3</small></div><div className="worked-understanding"><Sparkles size={15} />Can you explain why we subtract 5 first?</div></div>}
        </div>}
      </div>
      {mode === "idle" && <form className="doubt-input-row" onSubmit={(event) => { event.preventDefault(); if (query.trim()) ask(query.trim()); }}><input aria-label="Type a question about your lesson" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type a question about your lesson..." /><Button type="submit" disabled={!query.trim()}>Ask <Send size={14} /></Button></form>}
    <div className="doubt-safety"><ShieldCheck size={14} /><span>Your questions stay within the school curriculum. Your teacher can see learning summaries.</span><button onClick={() => navigate("/student/safety")}>See safety response demo</button></div>
    </section><aside className="doubt-side"><span className="eyebrow">A FEW WAYS TO ASK</span><h3>Start wherever you are.</h3><p>You don’t need the perfect words.</p><div className="doubt-tip"><span>01</span><b>Tell me what this means</b><small>Get a plain-language explanation.</small></div><div className="doubt-tip"><span>02</span><b>Give me a small hint</b><small>Keep trying without seeing the answer.</small></div><div className="doubt-tip"><span>03</span><b>Show me an example</b><small>Connect the idea to real life.</small></div><div className="doubt-syllabus"><BookOpen size={15} /><span><b>Class 8 · Mathematics</b><small>Companion stays in your syllabus.</small></span></div></aside></div>
  </div>;
}

export function StudentSafety() {
  const navigate = useNavigate();
  return <div className="safety-demo-page"><div className="safety-demo-label"><ShieldAlert size={16} />SAFETY SCENARIO · PROTOTYPE DEMO</div><PageHeader eyebrow="A SUPPORTIVE RESPONSE, WITH A HUMAN FOLLOW-UP" title="When a student needs support" description="Safety comes before the lesson. The companion responds calmly and brings the school support team into the loop." />
    <section className="safety-conversation"><div className="safety-message student-safety-message"><span className="avatar avatar-indigo">A</span><span><small>STUDENT MESSAGE · PRIVATE DEMO SCENARIO</small><b>I’m feeling overwhelmed and don’t know who to talk to.</b></span></div><div className="safety-response"><div className="safety-orb"><Orb state="calm" size="medium" /></div><div><div className="answer-from"><b>Your learning companion</b><Pill tone="blue">Support mode</Pill></div><h2>I’m glad you told me.</h2><p>You deserve support from someone you trust. Is there a teacher, counsellor or family member you feel comfortable talking to?</p><div className="safety-immediate"><HeartHandshake size={17} /><span>If you feel unsafe right now, please find a trusted adult at school or at home. They can help you get support.</span></div></div></div>
      <div className="safety-escalation"><div className="escalation-icon"><ShieldAlert size={18} /></div><div><span className="eyebrow">SCHOOL SUPPORT WORKFLOW</span><h3>A designated school contact has been alerted.</h3><p>This conversation is flagged for a trained safeguarding lead, following the school’s agreed protocol. Student safety summaries are visible to the school team.</p><div className="escalation-status"><i /> Escalated · School safeguarding lead <span>Just now</span></div></div></div>
      <div className="safety-foot"><span><LockKeyhole size={14} /> This demo uses fictional sample content.</span><Button variant="secondary" onClick={() => navigate("/student")}>Return to learning <ArrowRight size={14} /></Button></div>
    </section>
  </div>;
}

function Heatmap({ limit = 8, onStudent, selectedConcept = "Linear equations" }: {
  limit?: number; onStudent: (student: Student) => void; selectedConcept?: string;
}) {
  const [section, setSection] = useState("All sections");
  const shown = mockStudentService.list(section === "All sections" ? undefined : section).slice(0, limit);
  const columns = ["Fractions", "Ratio", "Algebra", "Equations"];
  return <div className="heatmap-box"><div className="heatmap-controls"><div className="heatmap-filter"><span className="eyebrow">CLASS 8 · MATHS</span><select value={section} onChange={(event) => setSection(event.target.value)} aria-label="Filter students by section"><option>All sections</option><option>8A</option><option>8B</option><option>9A</option><option>9B</option></select></div><div className="heatmap-legend"><span><i className="heat-strong" />Strong</span><span><i className="heat-building" />Building</span><span><i className="heat-attention" />Needs attention</span></div></div>
    <div className="heatmap-scroll"><div className="heatmap-grid" style={{ gridTemplateColumns: "minmax(150px,1.5fr) repeat(4,minmax(72px,1fr))" }}><div className="heatmap-student-head">STUDENT</div>{columns.map((column) => <div className={"heatmap-col-head " + (column === "Equations" && selectedConcept.toLowerCase().includes("equation") ? "col-selected" : "")} key={column}>{column}</div>)}
      {shown.map((student, i) => <div className="heatmap-row" key={student.id} style={{ display: "contents" }}><button className="heat-student" onClick={() => onStudent(student)}><span className={"avatar avatar-" + accents[i % 4]}>{student.name.split(" ")[0][0]}</span><span><b>{student.name}</b><small>{student.section}</small></span><ChevronRight size={13} /></button>{columns.map((column, c) => {
        const score = (student.mastery + c * 7 + i * 4) % 100;
        const tone = score > 78 ? "heat-strong" : score > 63 ? "heat-building" : "heat-attention";
        return <button key={column} className={"heat-cell " + tone + (column === "Equations" && selectedConcept.toLowerCase().includes("equation") ? " cell-current" : "")} onClick={() => onStudent(student)} aria-label={student.name + ", " + column + ", " + (score > 78 ? "Strong" : score > 63 ? "Building" : "Needs attention")}><span>{score > 78 ? "●" : score > 63 ? "◒" : "○"}</span><small>{score}%</small></button>;
      })}</div>)}</div></div>
    <div className="heatmap-foot"><span>{shown.length} students shown</span><button className="inline-link" onClick={() => setSection(section === "All sections" ? "8A" : "All sections")}>{section === "All sections" ? "Focus on Class 8A" : "Show all sections"} <ArrowRight size={13} /></button></div>
  </div>;
}

export function TeacherOverview() {
  const navigate = useNavigate();
  const [assignOpen, setAssignOpen] = useState(false);
  const summary = mockTeacherService.classSummary();
  const pulse = mockTeacherService.getPulse();
  const goStudent = (student: Student) => navigate("/teacher/students/" + student.id);
  return <><PageHeader eyebrow="CLASS 8A · MONDAY, 19 OCTOBER" title="Good morning, Ms. Sharma" description="Here’s what your class needs attention on this week." action={<Button variant="secondary" onClick={() => setAssignOpen(true)}><Plus size={15} />Assign practice</Button>} />
    <div className="teacher-metrics"><MetricTile label="Students" value={String(summary.students)} note="Across 4 sections" icon={Users} tone="violet" /><MetricTile label="Active this week" value={String(summary.activeThisWeek)} note={Math.round(summary.activeThisWeek / summary.students * 100) + "% of your class"} icon={Activity} tone="mint" /><MetricTile label="Average mastery" value={summary.averageMastery + "%"} note="+6% this month" icon={Target} tone="blue" /><MetricTile label="Need attention" value={String(summary.needsAttention)} note="Across 3 concepts" icon={CircleHelp} tone="amber" /></div>
    <div className="teacher-pulse-row"><section className="teacher-chart-card"><SectionLabel trailing={<Pill tone="green"><span className="live-dot" /> Live class pulse</Pill>}>A week of learning</SectionLabel><p>Activity and concept mastery across the week</p><div className="pulse-chart"><Suspense fallback={<ChartFallback />}><TeacherPulseChart data={pulse as ChartPoint[]} /></Suspense></div><div className="pulse-chart-legend"><span><i className="legend-line legend-indigo" />Learning sessions</span><span><i className="legend-line legend-mint" />Average mastery is trending up</span></div></section>
      <aside className="class-pulse-card"><span className="eyebrow">A QUICK READ</span><div className="pulse-big"><span className="pulse-ring-small"><Activity size={19} /></span><strong>32<small> / 40</small></strong><span>students active this week</span></div><div className="pulse-progress"><span><i style={{ width: "80%" }} /></span><b>80%</b></div><div className="pulse-insight"><Sparkles size={15} /><span><b>Good rhythm so far.</b><small>Sessions picked up after Wednesday’s lesson.</small></span></div><button className="inline-link" onClick={() => navigate("/teacher/students")}>See student activity <ArrowRight size={14} /></button></aside>
    </div>
    <section className="teacher-heat-section"><div className="heat-section-head"><div><div className="eyebrow">WHERE THE CLASS IS RIGHT NOW</div><h2>Concept heatmap</h2><p>A quick look at which ideas are clicking — and where a small nudge may help.</p></div><button className="inline-link" onClick={() => navigate("/teacher/concepts")}>Explore all concepts <ArrowRight size={14} /></button></div><Heatmap limit={6} onStudent={goStudent} /></section>
    <section className="teacher-alert-strip"><div className="alert-strip-copy"><span className="alert-strip-icon"><CircleHelp size={17} /></span><div><span className="eyebrow">ONE THING TO LOOK AT</span><h3>6 students could use more practice with fractions.</h3><p>Several have missed the same idea in recent sessions.</p></div></div><Button variant="secondary" onClick={() => navigate("/teacher/alerts")}>View suggested action <ArrowRight size={14} /></Button></section>
    <AnimatePresence>{assignOpen && <AssignmentModal onClose={() => setAssignOpen(false)} onAssigned={() => setAssignOpen(false)} />}</AnimatePresence>
  </>;
}

export function TeacherStudents() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [section, setSection] = useState("All sections");
  const [sort, setSort] = useState("name");
  const filtered = students.filter((student) => student.name.toLowerCase().includes(query.toLowerCase()) && (section === "All sections" || student.section === section));
  const sorted = [...filtered].sort((a, b) => sort === "mastery" ? a.mastery - b.mastery : a.name.localeCompare(b.name));
  return <><PageHeader eyebrow="YOUR SECTIONS · 40 STUDENTS" title="Students" description="A clear view of momentum, so you can meet students where they are." action={<Pill tone="blue">4 sections</Pill>} />
    <div className="directory-toolbar"><label className="search-field"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a student" /></label><select value={section} onChange={(e) => setSection(e.target.value)} aria-label="Filter by section"><option>All sections</option><option>8A</option><option>8B</option><option>9A</option><option>9B</option></select><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort students"><option value="name">Name A–Z</option><option value="mastery">Needs attention first</option></select><span className="directory-count">{sorted.length} students</span></div>
    <div className="student-directory">{sorted.map((student, i) => <button className="student-directory-row" key={student.id} onClick={() => navigate("/teacher/students/" + student.id)}><span className={"avatar avatar-" + accents[i % 4]}>{student.name.split(" ")[0][0]}</span><span className="directory-name"><b>{student.name}</b><small>{student.id} · Class {student.section}</small></span><span className="directory-focus"><small>FOCUS CONCEPT</small><b>{student.focus}</b></span><span className="directory-momentum"><i className={student.momentum === "Needs a nudge" ? "momentum-amber" : ""} />{student.momentum}</span><div className="directory-mastery"><b>{student.mastery}%</b><span><i style={{ width: student.mastery + "%" }} /></span></div><ChevronRight size={16} /></button>)}</div>
    <div className="directory-foot">Student details are shown to teachers mapped to their sections.</div>
  </>;
}

export function TeacherStudentProfile() {
  const { studentId = "" } = useParams();
  const navigate = useNavigate();
  const { notify } = useDemo();
  const [assignOpen, setAssignOpen] = useState(false);
  const student = students.find((person) => person.id === studentId) || students[0];
  return <><div className="profile-back"><button onClick={() => navigate("/teacher/students")}><ArrowLeft size={15} />All students</button><span>Class {student.section}</span></div><div className="student-profile-head"><span className="avatar avatar-profile">{student.name.split(" ").map((part) => part[0]).join("")}</span><div><div className="eyebrow">STUDENT PROFILE · {student.id}</div><h1>{student.name}</h1><p>Class {student.section} <i>·</i> Learning companion since September</p></div><div className="profile-head-actions"><Pill tone="green"><TrendingUp size={13} /> {student.momentum}</Pill><Button onClick={() => setAssignOpen(true)}><Plus size={15} />Assign practice</Button></div></div>
    <div className="profile-metrics"><div className="profile-metric"><span className="eyebrow">LEARNING MOMENTUM</span><b className="positive-momentum"><TrendingUp size={17} /> Improving</b><small>Consistent practice this week</small></div><div className="profile-metric"><span className="eyebrow">CONCEPT MASTERY</span><b>{student.mastery}%</b><small>+7% over the last month</small></div><div className="profile-metric"><span className="eyebrow">NEEDS ATTENTION</span><b>Fractions <i>·</i> Linear equations</b><small>Suggested practice available</small></div></div>
    <div className="profile-content-grid"><section className="profile-activity"><SectionLabel trailing={<button className="inline-link" onClick={() => notify("Showing the last 30 days of activity.")}>Last 30 days <ChevronDownIcon /></button>}>Recent learning activity</SectionLabel><div className="activity-timeline"><div className="timeline-item"><span className="timeline-dot timeline-green"><Check size={13} /></span><span><b>Mastered equivalent fractions</b><small>Mathematics · Today, 9:42 am</small></span><Pill tone="green">4 / 5 correct</Pill></div><div className="timeline-item"><span className="timeline-dot timeline-violet"><MessageCircle size={13} /></span><span><b>Asked for a hint with linear equations</b><small>Mathematics · Yesterday, 4:16 pm</small></span><Pill tone="violet">Hint used</Pill></div><div className="timeline-item"><span className="timeline-dot timeline-blue"><CheckCheck size={13} /></span><span><b>Completed “States of matter” practice</b><small>Science · Friday, 10:20 am</small></span><Pill tone="blue">Submitted</Pill></div><div className="timeline-item"><span className="timeline-dot timeline-amber"><Clock3 size={13} /></span><span><b>Started Ratio & Proportion</b><small>Mathematics · Thursday, 12:08 pm</small></span><Pill tone="amber">In progress</Pill></div></div></section><aside className="profile-focus"><span className="eyebrow">A GOOD NEXT STEP</span><h3>Short practice, then check in.</h3><p>{student.name.split(" ")[0]} has been working on fractions for three sessions. A small set can help reveal which step needs a little more teaching.</p><div className="profile-focus-concept"><IconCircle tone="amber"><BookOpen size={16} /></IconCircle><span><b>Fractions</b><small>3 of 5 medium questions correct</small></span></div><Button variant="secondary" onClick={() => setAssignOpen(true)}>Assign 5 questions <ArrowRight size={14} /></Button></aside></div>
    <AnimatePresence>{assignOpen && <AssignmentModal onClose={() => setAssignOpen(false)} initialStudent={student} onAssigned={() => setAssignOpen(false)} />}</AnimatePresence>
  </>;
}

function ChevronDownIcon() { return <span className="tiny-chevron">⌄</span>; }

export function TeacherConcepts() {
  const navigate = useNavigate();
  const [concept, setConcept] = useState("Linear equations");
  return <><PageHeader eyebrow="CLASS 8A · CONCEPT LEVEL VIEW" title="What’s clicking?" description="See how understanding is taking shape across your sections." action={<select className="select-pill"><option>All sections</option><option>8A</option><option>8B</option></select>} />
    <div className="concept-filter-tabs">{["Mathematics", "Science"].map((subject) => <button className={subject === "Mathematics" ? "selected" : ""} key={subject}>{subject}</button>)}<span>Updated a moment ago</span></div>
    <div className="teacher-concepts-layout"><section><div className="heat-section-head"><div><div className="eyebrow">STUDENTS × CONCEPTS</div><h2>Class understanding</h2></div><Pill tone="amber"><CircleHelp size={13} />2 concepts to revisit</Pill></div><Heatmap limit={10} selectedConcept={concept} onStudent={(student) => navigate("/teacher/students/" + student.id)} /></section><aside className="concept-insight"><span className="eyebrow">SELECTED CONCEPT</span><div className="insight-icon"><BookOpen size={18} /></div><h2>{concept}</h2><p>Students are learning to undo operations equally on both sides of an equation.</p><div className="insight-stats"><div><b>72%</b><small>class mastery</small></div><div><b>9</b><small>need a nudge</small></div><div><b>31</b><small>on track</small></div></div><div className="insight-bar"><span><i style={{ width: "72%" }} /></span><small>72% class average</small></div><div className="insight-student-list"><b>Try a targeted next step</b>{students.filter((s) => s.mastery < 68).slice(0, 3).map((student) => <button key={student.id} onClick={() => navigate("/teacher/students/" + student.id)}><span className="avatar avatar-tiny">{student.name[0]}</span>{student.name}<ChevronRight size={13} /></button>)}</div><Button onClick={() => setConcept(concept === "Linear equations" ? "Fractions" : "Linear equations")}>View {concept === "Linear equations" ? "Fractions" : "equations"} <ArrowRight size={14} /></Button></aside></div>
    <div className="concept-mastery-cards">{concepts.slice(0, 5).map((item, index) => <button key={item.id} className="concept-mastery-card" onClick={() => setConcept(item.title)}><span className={"tiny-concept-node node-tone-" + index}>{index + 1}</span><span><b>{item.title}</b><small>{item.chapter}</small></span><strong>{[86, 64, 72, 78, 59][index]}%</strong></button>)}</div>
  </>;
}

const alertRows = [
  { name: "Rahul Gupta", concept: "Fractions", detail: "Has struggled for 3 sessions.", action: "Assign 5 medium questions", section: "8A", tone: "amber" },
  { name: "Myra Kapoor", concept: "Linear Equations", detail: "Has not practised in 6 days.", action: "Send a gentle reminder", section: "8A", tone: "violet" },
  { name: "Advik Mehta", concept: "Ratio & Proportion", detail: "Missed the same step twice.", action: "Review equivalent ratios", section: "8B", tone: "blue" },
  { name: "Sara Nair", concept: "Matter Around Us", detail: "Homework is due tomorrow.", action: "Check in on the assignment", section: "8A", tone: "amber" },
];

export function TeacherAlerts() {
  const [assignOpen, setAssignOpen] = useState(false);
  const [initialStudent, setInitialStudent] = useState<Student | undefined>();
  const { notify } = useDemo();
  const startAssignment = (name: string) => {
    const student = students.find((item) => item.name === name);
    setInitialStudent(student);
    setAssignOpen(true);
  };
  return <><PageHeader eyebrow="EARLY SIGNALS · THIS WEEK" title="A timely nudge helps." description="These patterns can help you choose where a little extra teaching may matter." action={<Pill tone="amber"><span className="alert-count-dot" />6 open signals</Pill>} />
    <div className="alert-summary"><div><span className="eyebrow">CLASS-WIDE PATTERN</span><h2>Fractions is the concept to revisit.</h2><p>9 students have needed an extra hint on the same step this week.</p></div><span className="alert-summary-score"><b>9</b><small>students</small></span><Button onClick={() => { setInitialStudent(undefined); setAssignOpen(true); }}>Assign targeted practice <ArrowRight size={14} /></Button></div>
    <div className="alerts-list">{alertRows.map((alert, i) => <motion.article className="alert-card" key={alert.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }}><div className={"alert-icon alert-icon-" + alert.tone}><CircleHelp size={17} /></div><div className="alert-card-copy"><div className="alert-row-label"><Pill tone={alert.tone as "amber" | "violet" | "blue"}>Needs attention</Pill><span>Class {alert.section} <i>·</i> {i < 2 ? "Today" : "Yesterday"}</span></div><h3>{alert.name} has struggled with <b>{alert.concept}</b>.</h3><p>{alert.detail}</p><div className="suggested-action"><Sparkles size={14} /><span><small>SUGGESTED ACTION</small><b>{alert.action}</b></span></div></div><div className="alert-card-actions"><Button variant="secondary" size="small" onClick={() => startAssignment(alert.name)}>Assign practice <ArrowRight size={13} /></Button><button className="text-button" onClick={() => notify("Signal marked as reviewed.")}>Mark reviewed <Check size={13} /></button></div></motion.article>)}</div>
    <div className="alerts-foot"><ShieldCheck size={14} /> Signals are suggestions for teachers — never student labels or rankings.</div>
    <AnimatePresence>{assignOpen && <AssignmentModal onClose={() => setAssignOpen(false)} initialStudent={initialStudent} onAssigned={() => setAssignOpen(false)} />}</AnimatePresence>
  </>;
}

export function AssignmentModal({ onClose, onAssigned, initialStudent }: { onClose: () => void; onAssigned: () => void; initialStudent?: Student }) {
  const demo = useDemo();
  const [step, setStep] = useState(1);
  const [concept, setConcept] = useState("Fractions");
  const [count, setCount] = useState("5");
  const [due, setDue] = useState("Tomorrow");
  const [selectedIds, setSelectedIds] = useState<string[]>(initialStudent ? [initialStudent.id] : students.slice(0, 9).map((s) => s.id));
  const steps = ["Concept", "Students", "Questions", "Due date", "Review"];
  const toggleStudent = (id: string) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const assign = () => {
    const conceptId = concepts.find((item) => item.title === concept)?.id ?? "fractions";
    const dueDate = due === "Tomorrow" ? "2026-10-24" : due === "Friday" ? "2026-10-30" : "2026-11-02";
    const assignment = mockHomeworkService.prepareAssignment(conceptId, selectedIds, Number(count), dueDate);
    demo.addAssignment();
    demo.notify("Practice " + assignment.id + " assigned to " + selectedIds.length + " student" + (selectedIds.length === 1 ? "" : "s") + ".");
    onAssigned();
  };
  return <Modal title="Assign targeted practice" onClose={onClose} width="620px"><div className="assign-steps"><Dots count={5} active={step} /><div>{steps.map((name, i) => <span className={i + 1 === step ? "active" : i + 1 < step ? "passed" : ""} key={name}>{name}</span>)}</div></div>
    <AnimatePresence mode="wait"><motion.div className="assign-step-body" key={step} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: .18 }}>
      {step === 1 && <><span className="eyebrow">STEP 1 · CHOOSE THE CONCEPT</span><h3>What would you like students to practise?</h3><p>Choose an approved concept from the current Class 8 syllabus.</p><div className="assign-options">{["Fractions", "Linear Equations", "Ratio & Proportion", "Matter Around Us"].map((item) => <button className={"assign-option " + (concept === item ? "selected" : "")} key={item} onClick={() => setConcept(item)}><span>{item === "Matter Around Us" ? <FlaskConical size={16} /> : <BookOpen size={16} />}</span>{item}<i>{concept === item && <Check size={13} />}</i></button>)}</div></>}
      {step === 2 && <><span className="eyebrow">STEP 2 · CHOOSE STUDENTS</span><h3>Who needs this practice?</h3><p>{initialStudent ? "This assignment is focused on the student profile you opened." : "Select a few students or include the whole section."}</p><div className="assign-select-all"><button onClick={() => setSelectedIds(selectedIds.length === 9 ? [] : students.slice(0, 9).map((s) => s.id))}>{selectedIds.length > 1 ? "Clear selection" : "Select 9 students"}</button><span>{selectedIds.length} selected</span></div><div className="assign-student-list">{students.slice(0, 9).map((student, i) => <button key={student.id} onClick={() => toggleStudent(student.id)}><span className={"avatar avatar-tiny avatar-" + accents[i % 4]}>{student.name[0]}</span><span>{student.name}<small>{student.section}</small></span><i className={selectedIds.includes(student.id) ? "checked" : ""}>{selectedIds.includes(student.id) && <Check size={12} />}</i></button>)}</div></>}
      {step === 3 && <><span className="eyebrow">STEP 3 · SET THE PRACTICE</span><h3>Keep the practice focused.</h3><p>Questions are drawn from the teacher-reviewed bank.</p><div className="assign-number-setting"><span><b>Number of questions</b><small>Mix of worked steps and independent tries</small></span><select value={count} onChange={(e) => setCount(e.target.value)}><option>5</option><option>8</option><option>10</option></select></div><div className="question-mix"><span>Easy <i style={{ width: "32%" }} /></span><span>Medium <i style={{ width: "48%" }} /></span><span>Challenge <i style={{ width: "20%" }} /></span></div><div className="teacher-reviewed"><ShieldCheck size={15} />Reviewed questions · Solutions hidden until students try</div></>}
      {step === 4 && <><span className="eyebrow">STEP 4 · ADD A DUE DATE</span><h3>Give students a clear time to return to it.</h3><p>They’ll see this in their homework list.</p><div className="due-date-options">{["Tomorrow", "Friday", "Next Monday", "Choose date"].map((item) => <button className={due === item ? "selected" : ""} key={item} onClick={() => setDue(item)}>{item === "Choose date" ? <Clock3 size={15} /> : <span className="date-dot">{item.slice(0, 1)}</span>}{item}{due === item && <Check size={14} />}</button>)}</div></>}
      {step === 5 && <><span className="eyebrow">STEP 5 · REVIEW BEFORE ASSIGNING</span><h3>Ready for a thoughtful next step.</h3><p>Students will see a clear, encouraging practice set.</p><div className="assign-review"><div><small>CONCEPT</small><b>{concept}</b></div><div><small>STUDENTS</small><b>{selectedIds.length} selected</b></div><div><small>QUESTIONS</small><b>{count} · Easy, medium and challenge</b></div><div><small>DUE</small><b>{due}</b></div></div><div className="assign-review-note"><Sparkles size={15} /><span>“A little practice with {concept.toLowerCase()} can help this idea click.”</span></div></>}
    </motion.div></AnimatePresence>
    <div className="modal-actions">{step > 1 && <Button variant="quiet" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={14} />Back</Button>}<span>{step} of 5</span>{step < 5 ? <Button disabled={step === 2 && selectedIds.length === 0} onClick={() => setStep((current) => current + 1)}>Continue <ArrowRight size={14} /></Button> : <Button onClick={assign}><Check size={15} />Assign practice</Button>}</div>
  </Modal>;
}

export function TeacherHomework() {
  const [assignOpen, setAssignOpen] = useState(false);
  const { assignmentCount } = useDemo();
  return <><PageHeader eyebrow="CLASS 8 · ASSIGNMENTS" title="Homework & practice" description="Assignments give every student a manageable next step." action={<Button onClick={() => setAssignOpen(true)}><Plus size={15} />Create assignment</Button>} />
    <div className="homework-overview-metrics"><div><span className="eyebrow">ACTIVE ASSIGNMENTS</span><b>{assignmentCount}</b><small>Across your sections</small></div><div><span className="eyebrow">COMPLETED THIS WEEK</span><b>84%</b><small>+9% from last week</small></div><div><span className="eyebrow">NEEDS A FOLLOW-UP</span><b>4</b><small>Students have work due</small></div></div>
    <SectionLabel trailing={<button className="inline-link">Past assignments <ArrowRight size={14} /></button>}>Recently assigned</SectionLabel>
    <div className="teacher-assignment-list">{[{ title: "Fractions · Practice set", section: "8A · 9 students", questions: "5 questions", due: "Due tomorrow", done: "4 / 9 submitted", progress: 44 }, { title: "Linear Equations · Quick check", section: "8A, 8B · 40 students", questions: "8 questions", due: "Due Friday", done: "28 / 40 submitted", progress: 70 }, { title: "Matter Around Us · Review", section: "8B · 10 students", questions: "6 questions", due: "Submitted", done: "10 / 10 submitted", progress: 100 }].map((item) => <div className="teacher-assignment-row" key={item.title}><IconCircle tone="violet"><BookOpen size={17} /></IconCircle><span><b>{item.title}</b><small>{item.section} <i>·</i> {item.questions}</small></span><span className="assignment-due">{item.due}</span><span className="assignment-completion"><b>{item.done}</b><i><span style={{ width: item.progress + "%" }} /></i></span><button className="icon-button" aria-label="Assignment options"><MoreHorizontal size={18} /></button></div>)}</div>
    <div className="assign-tip"><Sparkles size={16} /><span><b>Teaching moment:</b> Fractions practice is showing the most repeat hints this week. A short reteach before Friday may help.</span></div>
    <AnimatePresence>{assignOpen && <AssignmentModal onClose={() => setAssignOpen(false)} onAssigned={() => setAssignOpen(false)} />}</AnimatePresence>
  </>;
}

export function TeacherAssistant() {
  const { notify } = useDemo();
  const [prompt, setPrompt] = useState("Give me a real-life example to explain linear equations.");
  const [generated, setGenerated] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [version, setVersion] = useState(0);
  const generate = () => { setThinking(true); setGenerated(false); window.setTimeout(() => { setThinking(false); setGenerated(true); setDraft(mockTutorService.generateExample("linear equations", version)); }, 1100); };
  return <><PageHeader eyebrow="A THOUGHT PARTNER FOR TEACHING" title="Teaching assistant" description="Prepare hooks, examples and discussion prompts grounded in your reviewed class content." action={<Pill tone="violet"><Sparkles size={13} />AI-assisted</Pill>} />
    <div className="assistant-workspace"><section className="assistant-input-panel"><span className="eyebrow">WHAT ARE YOU PREPARING?</span><h2>Start with a teaching moment.</h2><p>Choose a concept and tell your assistant what would help.</p><label>CONCEPT<select><option>Linear Equations · Class 8 Maths</option><option>Fractions · Class 8 Maths</option><option>Matter Around Us · Class 8 Science</option></select></label><label>YOUR PROMPT<textarea rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)} /></label><div className="assistant-grounding"><ShieldCheck size={15} /><span><b>Grounded in approved content</b><small>Class 8 Maths · Algebra · reviewed 12 Oct</small></span></div><Button onClick={generate} disabled={!prompt.trim()}>{thinking ? <><span className="button-pulse" />Building an example...</> : <><Sparkles size={15} />Generate a teaching idea</>}</Button></section>
      <section className="assistant-output-panel"><div className="output-head"><span className="eyebrow">YOUR WORKSPACE</span><Pill tone={generated ? "violet" : "neutral"}>{generated ? "AI-GENERATED · REVIEW BEFORE USE" : "READY WHEN YOU ARE"}</Pill></div>{thinking ? <div className="assistant-loading"><Orb state="thinking" /><span><b>Thinking of a useful example...</b><small>Connecting the concept to everyday life</small></span><div className="skeleton-line" /><div className="skeleton-line short" /></div> : generated ? <div className="assistant-result"><div className="result-type"><span className="result-icon"><Lightbulb size={17} /></span><span><small>REAL-LIFE EXAMPLE · LINEAR EQUATIONS</small><b>Start with something familiar</b></span><button className="icon-button" aria-label="More result actions"><MoreHorizontal size={17} /></button></div>{editing ? <textarea className="edit-result" rows={7} value={draft} onChange={(e) => setDraft(e.target.value)} /> : <blockquote>{draft}</blockquote>}<div className="assistant-result-meta"><ShieldCheck size={13} />Teacher review required before sharing with students</div><div className="assistant-result-actions">{editing ? <Button size="small" onClick={() => { setEditing(false); notify("Your edited teaching example was saved."); }}>Save edits <Check size={13} /></Button> : <Button size="small" onClick={() => { setEditing(true); }}>Edit <Pencil size={13} /></Button>}<Button size="small" variant="secondary" onClick={() => { setVersion(version + 1); generate(); }}>Regenerate <RefreshCw size={13} /></Button>{!editing && <button className="text-button" onClick={() => notify("Teaching idea saved to your workspace.")}>Save to workspace</button>}</div></div> : <div className="assistant-empty"><span className="assistant-empty-orbit"><Orb state="idle" size="medium" /></span><h3>Make the concept feel close.</h3><p>Ask for an example, discussion starter or a fresh way to explain a tricky step.</p><div className="assistant-suggestion"><span><MessageCircle size={14} /></span><button onClick={() => setPrompt("Give me a 2-minute classroom hook for fractions.")}>“Give me a 2-minute classroom hook for fractions.”</button><ArrowRight size={14} /></div></div>}</section></div>
  </>;
}

export function TeacherReports() {
  return <><PageHeader eyebrow="WEEKLY CLASS SNAPSHOT" title="Reports" description="Useful patterns for your next lesson, without losing sight of individual students." action={<Button variant="secondary" onClick={() => window.print()}><Download size={15} />Print this view</Button>} />
    <div className="report-summary-hero"><span className="report-hero-orb"><Activity size={19} /></span><div><span className="eyebrow">WEEK OF 12–18 OCTOBER</span><h2>Practice is building confidence.</h2><p>32 students were active, and class mastery moved up 6 points. Fractions may benefit from a short revisit.</p></div><span className="report-gain"><b>+6</b><small>mastery points</small></span></div>
    <div className="teacher-report-grid"><div className="teacher-chart-card"><SectionLabel>Mastery over the last month</SectionLabel><div className="pulse-chart"><Suspense fallback={<ChartFallback />}><MasteryTrendChart data={cohortTrend} /></Suspense></div></div><div className="report-insights"><span className="eyebrow">THREE THINGS TO TAKE FORWARD</span><div><i>01</i><span><b>Fractions is worth revisiting.</b><small>9 students used a hint more than once.</small></span></div><div><i>02</i><span><b>Students are showing up.</b><small>80% of the class practised this week.</small></span></div><div><i>03</i><span><b>Short sessions are working.</b><small>Most practice sessions lasted 10–15 minutes.</small></span></div></div></div>
    <p className="report-note"><ShieldCheck size={13} />These patterns support teacher judgement. They are not student rankings.</p>
  </>;
}

export function ManagementOverview() {
  const navigate = useNavigate();
  return <><PageHeader eyebrow="PILOT SNAPSHOT · WEEK 6 OF 8" title="Is the pilot moving learning forward?" description="A concise view of how students, teachers and the companion are working together." action={<Pill tone="green"><span className="live-dot" />Pilot in progress</Pill>} />
    <div className="management-hero"><div className="gain-orbital"><span className="gain-orbit orbit-a" /><span className="gain-orbit orbit-b" /><span className="gain-core"><small>OBSERVED LEARNING GAIN</small><b>+18<sup>%</sup></b><i>baseline → current</i></span></div><div className="management-hero-copy"><span className="eyebrow">CLASS 8 · MATHEMATICS & SCIENCE</span><h2>Concept mastery is moving in the right direction.</h2><p>Average mastery has grown from 54% at baseline to 72% today across the pilot concepts. This is a promising signal from the pilot, not a causal claim.</p><div className="management-hero-foot"><span><TrendingUp size={14} /> +18 percentage points</span><span>40 students <i>·</i> 4 sections</span></div></div><button className="management-hero-arrow" onClick={() => navigate("/management/learning")} aria-label="Explore learning results"><ArrowRight size={19} /></button></div>
    <div className="management-metrics"><button onClick={() => navigate("/management/adoption")}><span className="metric-icon"><Users size={17} /></span><b>80%</b><small>Student adoption</small><i>32 of 40 active this week <ArrowRight size={12} /></i></button><button onClick={() => navigate("/management/teachers")}><span className="metric-icon"><GraduationCap size={17} /></span><b>88%</b><small>Teacher engagement</small><i>7 of 8 weekly active <ArrowRight size={12} /></i></button><button onClick={() => navigate("/management/learning")}><span className="metric-icon"><Target size={17} /></span><b>72%</b><small>Concept mastery</small><i>+18 points from baseline <ArrowRight size={12} /></i></button><button onClick={() => navigate("/management/safety")}><span className="metric-icon"><ShieldCheck size={17} /></span><b>100%</b><small>Safety handling</small><i>Release gate passed <ArrowRight size={12} /></i></button></div>
    <div className="management-bottom-grid"><section className="management-chart-card"><SectionLabel trailing={<button className="inline-link" onClick={() => navigate("/management/learning")}>Learning results <ArrowRight size={13} /></button>}>A learning trend worth following</SectionLabel><p>Baseline, mid-point and current checks across pilot concepts.</p><div className="management-chart"><Suspense fallback={<ChartFallback />}><LearningGainChart data={cohortTrend} /></Suspense></div><div className="chart-data-note">Baseline <b>54%</b><i /> Current <b>72%</b><span>+18 pts</span></div></section><aside className="pilot-gate-card"><span className="eyebrow">PILOT HEALTH</span><div className="gate-status"><span><Check size={16} /></span><b>On track to share results</b></div><p>Core success measures are visible, and the safety release gate is holding.</p><div className="gate-checks"><div><Check size={14} /><span>Golden set accuracy</span><b>96.8%</b></div><div><Check size={14} /><span>Safety prompts handled</span><b>100%</b></div><div><Check size={14} /><span>Parent reports opened</span><b>76%</b></div></div><button className="inline-link" onClick={() => navigate("/management/scorecard")}>Open pilot scorecard <ArrowRight size={14} /></button></aside></div>
    <div className="management-quick-links"><button onClick={() => navigate("/management/adoption")}><span className="quick-link-icon"><Activity size={16} /></span><span><b>Adoption by section</b><small>See where usage is becoming a routine</small></span><ArrowRight size={15} /></button><button onClick={() => navigate("/management/safety")}><span className="quick-link-icon quick-mint"><ShieldCheck size={16} /></span><span><b>Safety & quality</b><small>Quality gates and school escalation summary</small></span><ArrowRight size={15} /></button></div>
  </>;
}

export function ManagementLearning() {
  return <><PageHeader eyebrow="LEARNING OUTCOMES · WEEK 6" title="Students are building understanding." description="Concept-level checks show an encouraging +18 point shift from baseline across the pilot." action={<Pill tone="green"><TrendingUp size={13} />+18 points</Pill>} />
    <div className="learning-results-head"><div><span className="eyebrow">PILOT CONCEPT MASTERY</span><b>54% <ArrowRight size={18} /> 72%</b><small>Baseline · Current</small></div><div className="results-caveat"><ShieldCheck size={15} /><span>Observed change during the pilot. Small sample size; this does not establish causation.</span></div></div>
    <section className="results-chart-card"><SectionLabel trailing={<select className="select-pill"><option>All pilot sections</option><option>Class 8A</option><option>Class 8B</option></select>}>Baseline to endline progress</SectionLabel><div className="large-results-chart"><Suspense fallback={<ChartFallback />}><ResultsTrendChart data={cohortTrend} /></Suspense></div><div className="results-timeline"><span>Baseline<small>Week 1 · 54%</small></span><span>Mid-point<small>Week 5 · 67%</small></span><span>Current<small>Week 6 · 72%</small></span></div></section>
    <div className="results-concepts">{concepts.slice(0, 6).map((concept, i) => <div key={concept.id}><span className="concept-result-icon">{i % 2 ? <FlaskConical size={15} /> : <BookOpen size={15} />}</span><span><b>{concept.title}</b><small>{concept.subject}</small></span><span className="concept-result-shift"><i style={{ width: [80, 64, 73, 88, 58, 76][i] + "%" }} /></span><strong>+{[16, 11, 21, 14, 18, 12][i]}<small>pts</small></strong></div>)}</div>
  </>;
}

export function ManagementAdoption() {
  const adoption = [
    { section: "8A", subject: "Maths & Science", active: 9, total: 10, sessions: 3.2 },
    { section: "8B", subject: "Maths & Science", active: 8, total: 10, sessions: 2.8 },
    { section: "9A", subject: "Maths & Science", active: 8, total: 10, sessions: 2.4 },
    { section: "9B", subject: "Maths & Science", active: 7, total: 10, sessions: 2.1 },
  ];
  return <><PageHeader eyebrow="STUDENT & TEACHER PARTICIPATION" title="Learning is becoming a routine." description="A quick view of who’s getting time with the companion each week." action={<Pill tone="blue">Week 6 of 8</Pill>} />
    <div className="adoption-top"><div><span className="eyebrow">WEEKLY ACTIVE STUDENTS</span><b>32 <small>/ 40</small></b><span className="adoption-large-bar"><i style={{ width: "80%" }} /></span><p>80% of pilot students active this week <Pill tone="green">Target ≥ 70%</Pill></p></div><div><span className="eyebrow">AVG. SESSIONS / STUDENT</span><b>2.6 <small>/ week</small></b><span className="adoption-large-bar mint-bar"><i style={{ width: "87%" }} /></span><p>Students have 2–3 teacher-led sessions <Pill tone="green">Target ≥ 2</Pill></p></div></div>
    <section className="adoption-table-card"><SectionLabel trailing={<span>Updated Sunday, 18 October</span>}>Adoption by section</SectionLabel><div className="adoption-table"><div className="adoption-row adoption-header"><span>SECTION</span><span>WEEKLY ACTIVE</span><span>SHARE ACTIVE</span><span>SESSIONS / STUDENT</span><span>PULSE</span></div>{adoption.map((item) => <div className="adoption-row" key={item.section}><span><b>{item.section}</b><small>Class {item.section[0]} · {item.subject}</small></span><span>{item.active} of {item.total}</span><span><div className="table-bar"><i style={{ width: item.active / item.total * 100 + "%" }} /></div><b>{item.active / item.total * 100}%</b></span><span>{item.sessions.toFixed(1)}</span><span><i className="adoption-pulse-dot" />On rhythm</span></div>)}</div></section>
    <div className="adoption-note"><Sparkles size={15} /><span><b>School rhythm matters.</b> Sections with a fixed weekly slot are seeing more consistent sessions.</span></div>
  </>;
}

export function ManagementTeachers() {
  return <><PageHeader eyebrow="TEACHER ENGAGEMENT" title="Teachers are part of the learning loop." description="Usage matters when it helps teachers notice, respond and shape the next session." action={<Pill tone="green">7 of 8 active</Pill>} />
    <div className="teacher-engagement-hero"><span className="engagement-figure"><GraduationCap size={24} /><b>88%</b></span><span><span className="eyebrow">WEEKLY TEACHER ENGAGEMENT</span><h2>Most teachers are checking in each week.</h2><p>7 of 8 teachers logged in. 5 opened or acted on at least one learning signal.</p></span><span className="teacher-engagement-target">Target <b>≥ 80%</b><i><Check size={12} /> On track</i></span></div>
    <div className="teacher-engagement-list">{["Ms. Sharma", "Mr. S. Mehta", "Ms. A. Rao", "Mr. N. Khan", "Ms. P. Das", "Ms. R. Iyer", "Mr. V. Singh", "Ms. K. Jain"].map((teacher, i) => <div key={teacher}><span className="avatar avatar-tiny">{teacher.split(" ")[1][0]}</span><span><b>{teacher}</b><small>{i < 4 ? "Mathematics" : "Science"} · Class {i % 2 === 0 ? "8A, 8B" : "9A, 9B"}</small></span><span className="teacher-login-status"><i className={i === 7 ? "status-muted" : ""} />{i === 7 ? "Not this week" : "Active this week"}</span><span>{i < 5 ? "3" : i === 7 ? "—" : "1"} assignments</span><span>{i < 4 ? <Pill tone="green">Acted on alerts</Pill> : <Pill tone="neutral">Reviewed class</Pill>}</span></div>)}</div>
  </>;
}

export function ManagementSafety() {
  const navigate = useNavigate();
  return <><PageHeader eyebrow="TRUST & SCHOOL OVERSIGHT" title="Safety stays visible." description="Clear release checks for content quality, safe handling and school support." action={<Pill tone="green"><ShieldCheck size={13} />Release gate passed</Pill>} />
    <div className="safety-quality-grid"><div className="quality-score-card"><span className="eyebrow">AI QUALITY · GOLDEN SET</span><div className="quality-main-score">96.8<small>%</small></div><p>200 reviewed questions per subject, including tricky maths and common misconceptions.</p><div className="quality-bar"><i style={{ width: "96.8%" }} /></div><div className="quality-card-foot"><span>Target ≥95%</span><span className="quality-pass"><Check size={13} />Passed</span></div></div><div className="quality-score-card safety-score-card"><span className="eyebrow">SAFETY PROMPTS</span><div className="quality-main-score">100<small>%</small></div><p>Safety-sensitive prompts receive a fixed supportive response and school escalation.</p><div className="quality-bar safety-quality-bar"><i style={{ width: "100%" }} /></div><div className="quality-card-foot"><span>Target 100%</span><span className="quality-pass"><Check size={13} />Passed</span></div></div></div>
    <section className="safety-protocol"><div className="protocol-icon"><ShieldCheck size={19} /></div><div><span className="eyebrow">SCHOOL SAFEGUARDING PROTOCOL</span><h3>A designated contact is in the loop.</h3><p>Safety escalation is configured for the demo school. Sensitive conversations are summarized for the designated safeguarding lead.</p><span className="protocol-owner"><span className="avatar avatar-tiny">C</span> Counsellor on call <i>·</i> protocol reviewed 12 Oct</span></div><button className="inline-link" onClick={() => navigate("/student/safety")}>View the student response <ArrowRight size={14} /></button></section>
    <div className="safety-summary-metrics"><div><span className="eyebrow">ESCALATIONS THIS WEEK</span><b>2</b><small>Handled by school support team</small></div><div><span className="eyebrow">REPORTED ANSWERS</span><b>12</b><small>10 reviewed · 2 in queue</small></div><div><span className="eyebrow">STUDENT NAMES</span><b>Hidden</b><small>Management sees counts only</small></div></div>
    <div className="safety-guardrails"><span><LockKeyhole size={15} />No external links</span><span><ShieldCheck size={15} />Curriculum-grounded answers</span><span><HeartHandshake size={15} />Human support for safety concerns</span></div>
  </>;
}

export function ManagementScorecard() {
  const { notify } = useDemo();
  const metrics = [["Learning outcomes", "+18 pts", "Baseline 54% → current 72%", "Promising signal · not causal"], ["Student adoption", "80%", "32 / 40 active weekly", "Target ≥70% · met"], ["Learning routine", "2.6", "Sessions per student / week", "Target ≥2 · met"], ["Teacher engagement", "88%", "7 / 8 teachers active", "Target ≥80% · met"], ["AI quality", "96.8%", "Golden set · 200 per subject", "Target ≥95% · met"], ["Safety", "100%", "Test prompts handled correctly", "Target 100% · met"], ["Parent interest", "76%", "Reports opened this week", "Home plan interest · pilot signal"]];
  return <><PageHeader eyebrow="PILOT RESULTS · PRINCIPAL-READY" title="Pilot scorecard" description="A one-page summary of what the pilot is showing so far." action={<Button onClick={() => notify("Your principal-ready scorecard is ready (prototype download).")}><Download size={15} />Download PDF</Button>} />
    <div className="scorecard-paper"><div className="scorecard-top"><span className="scorecard-mark"><span className="brand-mark"><span /><span /><span /></span><span>LEARNING COMPANION <small>PILOT RESULTS · DEMO</small></span></span><span className="scorecard-school">DELHI PUBLIC SCHOOL<br /><small>NCR · CLASS 8 & 9</small></span></div><div className="scorecard-title"><div><span className="eyebrow">8-WEEK PILOT · WEEK 6 SNAPSHOT</span><h2>Small steps. Measurable signals.</h2><p>A school-led companion for learning, practice and timely teacher support.</p></div><span className="scorecard-period">JAN — FEB 2027</span></div><div className="scorecard-highlight"><span className="eyebrow">OBSERVED CONCEPT MASTERY GAIN</span><b>+18<small> points</small></b><span>54% at baseline → 72% current <i>·</i> no causal claim</span><div className="scorecard-sparkline">▁ ▂ ▃ ▅ ▆ ▇</div></div><div className="scorecard-metric-grid">{metrics.map(([name, value, detail, note], i) => <div key={name}><span className={"scorecard-metric-icon score-icon-" + i}>{i === 0 ? <TrendingUp size={14} /> : i === 4 || i === 5 ? <ShieldCheck size={14} /> : <Activity size={14} />}</span><small>{name}</small><b>{value}</b><span>{detail}</span><i>{note}</i></div>)}</div><div className="scorecard-foot"><span><ShieldCheck size={13} />Pilot data · Sample size 40 students · Class 8/9 demo cohort</span><span>Updated 19 Oct 2026</span></div></div>
    <div className="scorecard-note"><Lightbulb size={16} /><span>By the end of the pilot, this scorecard will compare baseline, mid-point and endline checks on the same concepts.</span></div>
  </>;
}

function ParentQuickStat({ icon, value, label, tone }: { icon: React.ReactNode; value: string; label: string; tone: string }) {
  return <div className="parent-quick-stat"><span className={"parent-stat-icon " + tone}>{icon}</span><span><b>{value}</b><small>{label}</small></span></div>;
}

export function ParentHome() {
  const navigate = useNavigate();
  const { homeworkSubmitted, scienceHomeworkSubmitted } = useDemo();
  const homeworkCount = 8 + Number(homeworkSubmitted) + Number(scienceHomeworkSubmitted);
  return <div className="parent-mobile-page"><div className="parent-greeting"><span className="parent-child-avatar">A</span><div><small>DELHI PUBLIC SCHOOL · CLASS 8A</small><h1>Aarav’s learning<br />this week</h1></div><button className="parent-menu" aria-label="Parent settings"><MoreHorizontal size={19} /></button></div>
    <div className="parent-week-tabs"><span className="active">This week</span><span>12–18 Oct</span><span>5–11 Oct</span></div>
    <section className="parent-learning-card"><div className="parent-card-top"><span className="eyebrow">A GOOD WEEK OF LEARNING</span><span className="parent-week-badge"><TrendingUp size={13} /> Steady progress</span></div><div className="parent-mastery-top"><ProgressRing value={72} label="math mastery" size={110} color="#19aa96" /><div><span className="eyebrow">MATHEMATICS</span><h2>New ideas are taking shape.</h2><p>Aarav has been exploring algebra and building confidence with equations.</p></div></div><div className="parent-simple-stats"><ParentQuickStat icon={<Sparkles size={16} />} value="4" label="concepts mastered" tone="parent-mint" /><ParentQuickStat icon={<BookOpen size={16} />} value="2" label="need practice" tone="parent-amber" /><ParentQuickStat icon={<CheckCheck size={16} />} value={homeworkCount + "/10"} label="homework completed" tone="parent-violet" /></div></section>
    <section className="parent-encouragement"><span className="encouragement-icon"><HeartHandshake size={17} /></span><span className="eyebrow">ONE THING TO ENCOURAGE THIS WEEK</span><h2>Ask Aarav to explain how linear equations work in his own words.</h2><p>A short conversation can help an idea stick.</p><div className="parent-suggestion-meta"><span><span className="avatar avatar-tiny">S</span> Suggested by Ms. Sharma</span><span>About 5 min</span></div></section>
    <section className="parent-homework-card"><div><span className="eyebrow">HOMEWORK</span><h3>{homeworkCount === 10 ? "All caught up" : (10 - homeworkCount) + " small steps to finish"}</h3><p>Linear Equations · due tomorrow</p></div><div className="parent-homework-progress"><b>{homeworkCount}/10</b><span>completed</span></div><button onClick={() => navigate("/parent/homework")} aria-label="See homework"><ArrowRight size={16} /></button></section>
    <button className="parent-report-link" onClick={() => navigate("/parent/report")}><span className="parent-report-icon"><FileText size={17} /></span><span><b>Read the weekly report</b><small>What Aarav learned, in a little more detail</small></span><ChevronRight size={16} /></button>
    <div className="parent-trust-note"><LockKeyhole size={13} />Your family sees Aarav’s progress, not other students’ data.</div>
  </div>;
}

export function ParentProgress() {
  const navigate = useNavigate();
  return <div className="parent-mobile-page"><div className="parent-report-back"><button onClick={() => navigate("/parent")}><ArrowLeft size={15} />Aarav’s learning</button><span>PROGRESS</span></div><PageHeader eyebrow="CLASS 8A · MATHEMATICS & SCIENCE" title="Progress, made simple." description="A few clear signals about what’s clicking and what’s next." />
    <div className="parent-progress-card"><span className="eyebrow">MATHEMATICS</span><div className="parent-progress-mastery"><ProgressRing value={72} label="mastery" size={132} color="#18aa95" /><span><b>+8%</b><small>over the last month</small></span></div><div className="parent-progress-band"><i /><span>Exploring</span><i /><span className="current">Growing</span><i /><span>Confident</span></div></div>
    <div className="parent-concepts-simple"><h2>Ideas Aarav is building</h2>{[["Linear Equations", "A new idea", 68], ["Fractions", "A little more practice", 64], ["Ratio & Proportion", "Growing steadily", 72], ["Matter Around Us", "Growing steadily", 74]].map(([name, label, value]) => <div key={String(name)}><span className="parent-concept-dot" /><span><b>{name}</b><small>{label}</small></span><span className="parent-mini-meter"><i style={{ width: String(value) + "%" }} /></span><span className="parent-progress-value">{value}%</span></div>)}</div>
    <div className="parent-note-simple"><Sparkles size={16} /><span><b>A helpful question to ask:</b><small>“What did you learn about keeping an equation balanced?”</small></span></div>
  </div>;
}

export function ParentHomework() {
  const { homeworkSubmitted, scienceHomeworkSubmitted } = useDemo();
  const navigate = useNavigate();
  const homeworkCount = 8 + Number(homeworkSubmitted) + Number(scienceHomeworkSubmitted);
  return <div className="parent-mobile-page"><div className="parent-report-back"><button onClick={() => navigate("/parent")}><ArrowLeft size={15} />Aarav’s learning</button><span>HOMEWORK</span></div><PageHeader eyebrow="AARAV’S ASSIGNMENTS" title="Homework, at a glance." description="A simple look at what’s finished and what’s coming up." />
    <div className="parent-homework-summary"><span><CheckCheck size={17} /></span><div><b>{homeworkCount} of 10 assignments complete</b><small>That’s a steady effort this week.</small></div></div>
    <div className="parent-assignments">{[{ title: "Linear Equations", subject: "Mathematics · 8 questions", due: "Due tomorrow", status: homeworkSubmitted ? "Submitted" : "In progress", progress: homeworkSubmitted ? "8 / 8" : "3 / 8" }, { title: "Matter Around Us", subject: "Science · 6 questions", due: "Due Friday", status: scienceHomeworkSubmitted ? "Submitted" : "Not started", progress: scienceHomeworkSubmitted ? "6 / 6" : "0 / 6" }, { title: "Fractions: quick check", subject: "Mathematics · 5 questions", due: "Submitted yesterday", status: "Submitted", progress: "5 / 5" }].map((item) => <div className="parent-assignment" key={item.title}><span className="parent-assignment-icon"><BookOpen size={16} /></span><span className="parent-assignment-copy"><b>{item.title}</b><small>{item.subject}</small></span><span className="parent-assignment-status"><i />{item.status}</span><small className="parent-assignment-due">{item.due}</small></div>)}</div>
    <div className="parent-homework-footer"><HeartHandshake size={15} /><span>Encouragement helps more than pressure. The companion keeps practice short and supportive.</span></div>
  </div>;
}

export function ParentReport() {
  const navigate = useNavigate();
  const { notify, homeworkSubmitted, scienceHomeworkSubmitted } = useDemo();
  const report = mockParentService.weeklyReport("ST-2401");
  const homeworkComplete = report.homeworkComplete + Number(homeworkSubmitted) + Number(scienceHomeworkSubmitted);
  return <div className="parent-mobile-page parent-report-page"><div className="parent-report-back"><button onClick={() => navigate("/parent")}><ArrowLeft size={15} />Back</button><span>WEEKLY REPORT</span></div>
    <div className="parent-report-sheet"><div className="parent-report-brand"><span className="brand-mark"><span /><span /><span /></span><span>LEARNING COMPANION<small>DELHI PUBLIC SCHOOL · DEMO</small></span><span className="report-week">WEEK 6</span></div><div className="parent-report-title"><span className="eyebrow">THIS WEEK · 12–18 OCTOBER</span><h1>Aarav is building<br />good learning habits.</h1><p>A little progress, one thoughtful step at a time.</p></div><div className="parent-report-progress"><span>Weekly learning rhythm</span><div><i style={{ width: "76%" }} /></div><b>4 / 5 days</b></div><section className="parent-report-section"><span className="report-section-mark report-mark-mint"><Check size={15} /></span><div><span className="eyebrow">WHAT AARAV LEARNED</span><h2>Linear equations</h2><p>He practised keeping both sides of an equation balanced and found x by undoing operations step by step.</p></div></section><section className="parent-report-section"><span className="report-section-mark report-mark-violet"><TrendingUp size={15} /></span><div><span className="eyebrow">WHAT IMPROVED</span><h2>Confidence with fractions</h2><p>4 concepts mastered this week. Aarav is getting more comfortable explaining why an answer works.</p></div></section><section className="parent-report-section"><span className="report-section-mark report-mark-amber"><Lightbulb size={15} /></span><div><span className="eyebrow">WHAT NEEDS ATTENTION</span><h2>Fractions & ratios</h2><p>Two concepts may benefit from a little more practice. The teacher can see this and plan a gentle revisit.</p></div></section><div className="parent-report-homework"><span><BookOpen size={15} />Homework this week</span><b>{homeworkComplete} / {report.homeworkTotal} complete</b></div><div className="parent-report-tip"><span>ONE THING TO TRY AT HOME</span><p>{report.suggestion}</p><small>Suggested by Ms. Sharma · about 5 minutes</small></div><div className="parent-report-foot"><ShieldCheck size={13} />Shared privately with Aarav’s family</div></div><button className="parent-feedback-btn" onClick={() => notify("Thanks for sharing your feedback with the school.")}><MessageCircle size={15} />Share feedback</button>
  </div>;
}

export function ParentFeedback() {
  const { notify } = useDemo();
  const [choice, setChoice] = useState("");
  const [comment, setComment] = useState("");
  return <div className="parent-mobile-page"><PageHeader eyebrow="YOUR VOICE HELPS THE SCHOOL" title="How is this working for your family?" description="A quick check-in helps the school make learning support more useful." />
    <div className="feedback-form-card"><span className="eyebrow">HOW HELPFUL WAS THIS WEEK’S REPORT?</span><div className="feedback-rating">{["Not yet", "A little", "Helpful", "Very helpful"].map((item, i) => <button className={choice === item ? "selected" : ""} key={item} onClick={() => setChoice(item)}><span>{["○", "◔", "◕", "●"][i]}</span>{item}</button>)}</div><label>Anything you’d like the teacher to know?<textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Optional note..." rows={4} /></label><Button disabled={!choice} onClick={() => { notify("Thanks — your feedback has been shared with the school."); setChoice(""); setComment(""); }}>Send feedback <ArrowRight size={14} /></Button></div>
    <div className="parent-plan-interest"><Sparkles size={16} /><span><b>Would you like to know more?</b><small>The optional home plan is a pilot hypothesis. No payment is taken here.</small></span><button onClick={() => notify("Thanks. Your interest has been noted for the school team.")}>Share interest</button></div>
  </div>;
}

export function AdminSchools() {
  const { notify } = useDemo();
  return <><PageHeader eyebrow="PILOT ORGANISATION" title="Schools" description="Manage pilot workspaces and see how onboarding is progressing." action={<Button onClick={() => notify("New school setup opened (prototype).")}><Plus size={15} />Add school</Button>} />
    <div className="admin-school-summary"><span><b>3</b><small>pilot schools</small></span><span><b>4</b><small>classes & sections</small></span><span><b>40</b><small>demo students</small></span><span><b>76%</b><small>consent recorded</small></span></div>
    <div className="admin-schools-list">{[{ name: "Delhi Public School — Demo", city: "New Delhi, NCR", board: "CBSE", status: "Active pilot", students: 40, consent: 76 }, { name: "Springfield Academy — Demo", city: "Gurugram, NCR", board: "CBSE", status: "Onboarding", students: 0, consent: 0 }, { name: "Northstar Public School — Demo", city: "Noida, NCR", board: "CBSE", status: "Planning", students: 0, consent: 0 }].map((school, i) => <div className="admin-school-card" key={school.name}><span className={"school-avatar school-avatar-" + i}>{school.name[0]}</span><span className="admin-school-name"><b>{school.name}</b><small>{school.city} · {school.board}</small></span><Pill tone={i === 0 ? "green" : i === 1 ? "amber" : "neutral"}>{school.status}</Pill><span className="admin-school-numbers"><b>{school.students}</b><small>students</small></span><span className="admin-school-consent"><small>CONSENT</small><b>{school.consent}%</b><i><span style={{ width: school.consent + "%" }} /></i></span><button className="icon-button" aria-label={"Open " + school.name} onClick={() => notify("School workspace details opened.")}><MoreHorizontal size={18} /></button></div>)}</div>
    <div className="onboarding-checklist"><div><span className="eyebrow">NEXT ONBOARDING STEPS</span><h3>Ready the school for a safe start.</h3><p>Consent, pacing and school support are part of the learning setup.</p></div><span><Check size={13} />Pilot agreement</span><span><Clock3 size={13} />Parental consent</span><span><Clock3 size={13} />Safety contact</span><Button variant="secondary" size="small" onClick={() => notify("Onboarding checklist opened.")}>Open checklist <ArrowRight size={13} /></Button></div>
  </>;
}

export function AdminUsers() {
  const { notify } = useDemo();
  const [query, setQuery] = useState("");
  const rows = students.filter((student) => student.name.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeader eyebrow="SCHOOL USERS · DEMO DATA" title="Users & sections" description="Forty fictional students across the pilot’s four Class 8 and 9 sections." action={<><Button variant="secondary" onClick={() => notify("CSV template ready to download (prototype).")}><Download size={14} />CSV template</Button><Button onClick={() => notify("Student import opened (prototype).")}><Plus size={14} />Import users</Button></>} />
    <div className="admin-user-summary"><span><Users size={16} />40 students</span><span><GraduationCap size={16} />8 teachers</span><span><HeartHandshake size={16} />31 guardian links</span><span className="consent-reminder"><ShieldCheck size={15} />Consent recorded for 76%</span></div><div className="directory-toolbar"><label className="search-field"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by student name or ID" /></label><select><option>All roles</option><option>Students</option><option>Teachers</option><option>Parents</option></select><select><option>All sections</option><option>8A</option><option>8B</option><option>9A</option><option>9B</option></select><span className="directory-count">{rows.length} of 40</span></div>
    <div className="admin-table"><div className="admin-table-row admin-table-head"><span>USER</span><span>ROLE</span><span>SECTION</span><span>GUARDIAN LINK</span><span>CONSENT</span><span>STATUS</span></div>{rows.slice(0, 16).map((student, i) => <div className="admin-table-row" key={student.id}><span><i className={"avatar avatar-tiny avatar-" + accents[i % 4]}>{student.name[0]}</i><b>{student.name}</b><small>{student.id}</small></span><span>Student</span><span>{student.section}</span><span>{i < 12 ? "Linked" : "Pending"}</span><span><i className={"consent-dot " + (i < 10 ? "consent-ok" : "")} />{i < 30 ? "Recorded" : "Pending"}</span><Pill tone={i === 0 ? "green" : "blue"}>{i === 0 ? "Active" : "Invited"}</Pill></div>)}</div><div className="admin-table-foot">Showing 16 sample users of 40 · All names are fictional demo data.</div>
  </>;
}

export function AdminCurriculum() {
  const { notify } = useDemo();
  const [expanded, setExpanded] = useState("Mathematics");
  const [selected, setSelected] = useState(concepts[4]);
  const chapters: Record<string, string[]> = { Mathematics: ["Rational Numbers", "Algebra", "Comparing Quantities", "Geometry"], Science: ["Materials", "Force and Pressure", "Light", "Sound"] };
  return <><PageHeader eyebrow="CBSE · CLASS 8 & 9 · PILOT SYLLABUS" title="Curriculum map" description="Small, connected concepts keep every lesson aligned to what the class is learning." action={<Button variant="secondary" onClick={() => notify("Curriculum export prepared (prototype).")}><Download size={14} />Export map</Button>} />
    <div className="curriculum-layout"><section className="curriculum-tree-panel"><div className="curriculum-tree-head"><span className="eyebrow">DEMO SCHOOL · CBSE</span><Pill tone="green">Published</Pill></div>{Object.entries(chapters).map(([subject, chapterNames]) => <div key={subject}><button className={"curriculum-subject " + (expanded === subject ? "expanded" : "")} onClick={() => setExpanded(expanded === subject ? "" : subject)}><span className="subject-tree-icon">{subject === "Mathematics" ? <BookOpen size={16} /> : <FlaskConical size={16} />}</span><span><b>{subject}</b><small>Class 8 · {chapterNames.length} chapters</small></span><ChevronRight size={15} /></button>{expanded === subject && chapterNames.map((chapter) => <button className="curriculum-chapter" key={chapter} onClick={() => setSelected(concepts.find((item) => item.chapter === chapter) || concepts[4])}><span className="tree-branch" /><span>{chapter}</span><span className="chapter-count">2 concepts</span></button>)}</div>)}<div className="tree-footer"><span className="tree-publication"><span />Published syllabus</span><span>Last mapped 12 Oct</span></div></section>
      <section className="curriculum-concepts-panel"><div className="curriculum-concept-head"><span className="eyebrow">CLASS 8 · {selected.subject.toUpperCase()}</span><button className="icon-button" onClick={() => notify("Concept editing opened.")}><Pencil size={15} /></button></div><div className="curriculum-node-visual"><div className="concept-link-line" /><span className="concept-link-node node-previous"><Check size={12} /></span><span className="concept-link-node node-current"><Target size={15} /></span><span className="concept-link-node node-next"><LockKeyhole size={12} /></span><small>Algebraic Expressions</small><b>{selected.title}</b><em>Graphs</em></div><h2>{selected.title}</h2><p>{selected.objective}</p><div className="curriculum-detail-row"><span><small>CONCEPT ID</small><b>CBSE-8-MATH-ALG-02</b></span><Pill tone="green">Published content v1.3</Pill></div><div className="curriculum-detail-row"><span><small>PREREQUISITES</small><b>Algebraic Expressions, Number Systems</b></span></div><div className="curriculum-detail-sections"><div><span className="eyebrow">LEARNING OBJECTIVE</span><p>{selected.objective}</p></div><div><span className="eyebrow">COMMON MISCONCEPTION</span><p>Students may change one side of an equation without making the same change to the other side.</p></div></div><div className="curriculum-detail-actions"><Button variant="secondary" onClick={() => notify("Reference content opened for review.")}>View reference content <ArrowRight size={13} /></Button><Button onClick={() => notify("Concept updated (prototype).")}><Check size={14} />Edit concept</Button></div></section></div>
    <div className="admin-content-strip"><span><ShieldCheck size={15} />Only published concepts and reviewed questions reach students.</span><button onClick={() => setSelected(concepts.find((item) => item.id === (selected.id === "linear-equations" ? "fractions" : "linear-equations")) || concepts[4])}>Switch concept <RefreshCw size={13} /></button></div>
  </>;
}

export function AdminContent() {
  const { notify } = useDemo();
  const [tab, setTab] = useState("Needs review");
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const items = [
    { id: "linear-example", name: "Linear Equations · worked example", subject: "Class 8 Maths", type: "Reference content", author: "AI draft · Oct 18", risk: "Low" },
    { id: "matter-question", name: "Matter Around Us · question 7", subject: "Class 8 Science", type: "Question · Medium", author: "AI draft · Oct 17", risk: "Medium" },
    { id: "fraction-misconception", name: "Equivalent fractions · misconception", subject: "Class 8 Maths", type: "Misconception note", author: "Content team · Oct 16", risk: "Low" },
  ];
  const decide = (id: string, status: string) => { setStatuses((current) => ({ ...current, [id]: status })); notify(status === "Published" ? "Reviewed content is now published." : "Content sent back for revision."); };
  const filtered = items.filter((item) => tab === "Needs review" ? !statuses[item.id] : tab === "Published" ? statuses[item.id] === "Published" : statuses[item.id] === "Returned");
  return <><PageHeader eyebrow="CONTENT QUALITY · TEACHER REVIEW" title="Review before it reaches a student." description="AI-drafted content stays in review until a subject teacher has checked it." action={<Button variant="secondary" onClick={() => notify("New content draft opened.")}><Plus size={14} />Add content</Button>} />
    <div className="review-summary"><div><span className="review-summary-number">{Object.keys(statuses).length === 3 ? 0 : 3 - Object.keys(statuses).length}</span><span><b>Items to review</b><small>2 AI drafts · 1 content update</small></span></div><div><ShieldCheck size={16} /><span><b>0 unreviewed items in student view</b><small>Published content is versioned and traceable.</small></span></div></div>
    <div className="review-tabs">{["Needs review", "Published", "Returned"].map((item) => <button className={tab === item ? "selected" : ""} key={item} onClick={() => setTab(item)}>{item}{item === "Needs review" && <i>{3 - Object.keys(statuses).length}</i>}</button>)}</div>
    <div className="review-queue">{filtered.map((item) => <article className="review-item" key={item.id}><span className="review-item-icon"><BookOpen size={16} /></span><div className="review-item-copy"><div><Pill tone={item.risk === "Medium" ? "amber" : "blue"}>{item.type}</Pill><span>{item.author}</span></div><h3>{item.name}</h3><p>{item.subject} <i>·</i> Draft v1</p><button className="inline-link" onClick={() => notify("Full reference content opened for review.")}>Read source and example <ArrowRight size={13} /></button></div><div className="review-item-side"><span className="review-status"><i className={statuses[item.id] ? "status-reviewed" : ""} />{statuses[item.id] || "Needs teacher review"}</span>{!statuses[item.id] && <div><Button size="small" variant="secondary" onClick={() => decide(item.id, "Returned")}><X size={13} />Return</Button><Button size="small" onClick={() => decide(item.id, "Published")}><Check size={13} />Approve</Button></div>}</div></article>)}</div>
    {filtered.length === 0 && <EmptyState title="Nothing here yet" body="Items will appear in this view after a teacher reviews them." />}
    <div className="review-rule"><ShieldCheck size={14} />Draft → subject teacher review → published. Only the published version appears in Learn mode.</div>
  </>;
}

export function AdminQuestions() {
  const { notify } = useDemo();
  const easy = [100, 92, 100, 100, 84, 100, 75, 100];
  const medium = [100, 100, 100, 92, 84, 92, 75, 100];
  const hard = [100, 84, 92, 100, 75, 84, 58, 92];
  return <><PageHeader eyebrow="TEACHER-REVIEWED QUESTION BANK" title="Practice starts with good questions." description="Coverage and review status for the pilot concept bank." action={<Button onClick={() => notify("Question drafting tools opened.")}><Plus size={14} />Draft question</Button>} />
    <div className="question-bank-overview"><div><span className="eyebrow">PILOT BANK</span><b>192 <small>questions</small></b><span>Across 16 concepts · Maths & Science</span></div><div><span className="eyebrow">REVIEWED & PUBLISHED</span><b>184 <small>/ 192</small></b><span>Only reviewed questions reach students</span></div><div><span className="eyebrow">TARGET COVERAGE</span><b>12 <small>/ concept</small></b><span>4 easy · 5 medium · 3 hard</span></div></div>
    <div className="question-coverage"><SectionLabel trailing={<Pill tone="green">Coverage report</Pill>}>Coverage by concept</SectionLabel>{concepts.slice(0, 8).map((concept, i) => <div key={concept.id}><span><b>{concept.title}</b><small>{concept.subject} · Class {concept.grade}</small></span><span className="coverage-levels"><i className="coverage-easy" style={{ width: easy[i] + "%" }} /><i className="coverage-medium" style={{ width: medium[i] + "%" }} /><i className="coverage-hard" style={{ width: hard[i] + "%" }} /></span><span className="coverage-count">{i === 4 ? "10 / 12" : "12 / 12"}</span><Pill tone={i === 4 ? "amber" : "green"}>{i === 4 ? "2 needed" : "Covered"}</Pill><button className="inline-link" onClick={() => notify("Questions for " + concept.title + " opened.")}>View <ChevronRight size={12} /></button></div>)}</div>
    <div className="question-type-key"><span><i className="coverage-easy" />Easy</span><span><i className="coverage-medium" />Medium</span><span><i className="coverage-hard" />Hard</span><span>Target: 12 reviewed questions per concept</span></div>
  </>;
}

export function AdminAIQuality() {
  const { notify } = useDemo();
  return <><PageHeader eyebrow="PRE-RELEASE EVALUATION · LAST RUN 18 OCT" title="AI quality monitor" description="Grounded answers, verified maths and safe handling are visible before every release." action={<Button onClick={() => notify("Golden set run started. Results will appear when complete.")}><RefreshCw size={14} />Run golden set</Button>} />
    <div className="ai-quality-hero"><div className="release-gate-icon"><ShieldCheck size={24} /></div><div><span className="eyebrow">RELEASE GATE</span><h2>Passed · Ready for pilot</h2><p>Content quality clears the pilot threshold. Safety handling is at 100%.</p></div><Pill tone="green"><Check size={13} />Gate passed</Pill></div>
    <div className="ai-quality-metrics"><div className="ai-quality-metric"><span className="eyebrow">CONTENT ACCURACY</span><b>96.8<small>%</small></b><i><span style={{ width: "96.8%" }} /></i><small>Target ≥95% · 200 questions per subject</small></div><div className="ai-quality-metric"><span className="eyebrow">SAFETY HANDLING</span><b>100<small>%</small></b><i className="mint-meter"><span style={{ width: "100%" }} /></i><small>Target 100% · every safety prompt</small></div><div className="ai-quality-metric"><span className="eyebrow">CURRICULUM GROUNDING</span><b>98.2<small>%</small></b><i className="blue-meter"><span style={{ width: "98.2%" }} /></i><small>Answers stay with approved content</small></div><div className="ai-quality-metric"><span className="eyebrow">REPORTED ANSWERS</span><b>12</b><div className="reported-answer-foot"><span>10 reviewed</span><span>2 in queue</span></div><small>Teacher review before next release</small></div></div>
    <div className="golden-set-section"><div><span className="eyebrow">EVALUATION COVERAGE</span><h2>Golden set · 200 questions / subject</h2><p>Includes tricky maths, misconceptions, out-of-scope prompts and safety scenarios.</p></div><div className="golden-subjects"><span><BookOpen size={15} />Mathematics <b>200 / 200</b><i><Check size={12} /></i></span><span><FlaskConical size={15} />Science <b>200 / 200</b><i><Check size={12} /></i></span></div></div>
    <div className="quality-gate-rules"><span><Check size={13} />Content accuracy ≥95%</span><span><Check size={13} />Safety prompts 100%</span><span><ShieldCheck size={13} />Release blocked if gate fails</span><button onClick={() => notify("Teacher answer review queue opened.")}>Review reported answers <ArrowRight size={13} /></button></div>
  </>;
}

export function AdminCosts() {
  const { notify } = useDemo();
  return <><PageHeader eyebrow="AI USAGE · MOCK PILOT DATA" title="Cost monitor" description="Keep usage visible while the pilot learns what good support costs." action={<Button variant="secondary" onClick={() => notify("Usage report prepared (prototype).")}><Download size={14} />Export usage</Button>} />
    <div className="cost-spike-alert"><span><Activity size={17} /></span><div><b>Usage spike detected · Class 8A</b><small>18 Oct · Short-lived increase after the teacher-led practice block.</small></div><Pill tone="amber">Review</Pill><button className="inline-link" onClick={() => notify("Spike details opened: usage returned to normal.")}>View details <ArrowRight size={13} /></button></div>
    <div className="cost-metrics"><div><span className="eyebrow">AI USAGE · TODAY</span><b>₹1,240</b><small>Within daily pilot limit</small></div><div><span className="eyebrow">AI USAGE · THIS WEEK</span><b>₹7,830</b><small>+12% vs last week</small></div><div><span className="eyebrow">COST / ACTIVE STUDENT</span><b>₹42</b><small>Target to be set after week 1</small></div><div><span className="eyebrow">DAILY MESSAGE CAP</span><b>30 <small>/ student</small></b><small>Cap active across the school</small></div></div>
    <section className="cost-usage-card"><SectionLabel trailing={<Pill tone="blue">Last 7 days</Pill>}>Daily usage</SectionLabel><div className="cost-bars">{[{ day: "Mon", value: 48 }, { day: "Tue", value: 61 }, { day: "Wed", value: 52 }, { day: "Thu", value: 78 }, { day: "Fri", value: 92 }, { day: "Sat", value: 39 }, { day: "Sun", value: 31 }].map((item) => <div key={item.day}><span className="cost-bar-wrap"><i className={item.day === "Fri" ? "spike-bar" : ""} style={{ height: item.value + "%" }} /></span><small>{item.day}</small></div>)}</div><div className="cost-chart-foot"><span><i className="cost-legend" /> Daily AI usage</span><span>Spike returned to typical range the next day.</span></div></section>
    <div className="cost-guardrails"><span><ShieldCheck size={14} />Daily cap on</span><span><Activity size={14} />Per-school usage tracked</span><span><Flag size={14} />Abnormal usage alert enabled</span></div>
  </>;
}

const adminEvents = [
  ["09:42:18", "concept_completed", "ST-2401", "linear-equations", "Correct · 4 / 5"],
  ["09:37:06", "hint_used", "ST-2406", "fractions", "Hint 2 requested"],
  ["09:24:52", "homework_submitted", "ST-2412", "matter", "6 questions · complete"],
  ["09:18:11", "alert_generated", "ST-2409", "ratio", "Repeated misconception"],
  ["09:02:45", "answer_reported", "ST-2420", "linear-equations", "Queued for teacher review"],
];

export function AdminEvents() {
  const { notify } = useDemo();
  const [eventType, setEventType] = useState("All events");
  const events = eventType === "All events" ? adminEvents : adminEvents.filter((event) => event[1] === eventType);
  return <><PageHeader eyebrow="PILOT ANALYTICS · EVENT LOG" title="Event viewer" description="A transparent trail of learning activity used to build class and pilot summaries." action={<Button variant="secondary" onClick={() => notify("Event log CSV prepared (prototype).")}><Download size={14} />Export events</Button>} />
    <div className="event-filter-bar"><span><Activity size={15} />Today · 19 Oct 2026</span><select value={eventType} onChange={(e) => setEventType(e.target.value)}><option>All events</option><option value="concept_completed">concept_completed</option><option value="hint_used">hint_used</option><option value="homework_submitted">homework_submitted</option><option value="alert_generated">alert_generated</option><option value="answer_reported">answer_reported</option></select><label><input type="search" placeholder="Search student or concept" /></label></div>
    <div className="event-table"><div className="event-row event-head"><span>TIMESTAMP</span><span>EVENT</span><span>USER</span><span>CONCEPT</span><span>DETAIL</span></div>{events.map((event, i) => <div className="event-row" key={i}><span>{event[0]}</span><span><i className={"event-type-dot event-dot-" + i} />{event[1]}</span><span>{event[2]}</span><span>{event[3]}</span><span>{event[4]}</span></div>)}</div>
    <div className="event-privacy-note"><LockKeyhole size={14} />Conversation content is visible only to school roles permitted by policy. This view shows event metadata.</div>
  </>;
}

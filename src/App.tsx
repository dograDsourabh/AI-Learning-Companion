import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DemoProvider } from "./state";
import { Landing } from "./Landing";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";

const AppContent = lazy(() => import("./AppContent"));

function RouteLoading() {
  const reduceMotion = useReducedMotion();
  return <div className="route-loading" role="status" aria-label="Loading the learning experience">
    <span className="route-loading-mark"><span /><span /><span /></span>
    <div className="route-loading-lines"><i /><i /><i /></div>
    <motion.div className="route-loading-surface" animate={reduceMotion ? { opacity: 1 } : { opacity: [.55, .9, .55] }} transition={reduceMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity }} />
  </div>;
}

export default function App() {
  return <MotionConfig reducedMotion="user"><DemoProvider><Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/*" element={<Suspense fallback={<RouteLoading />}><AppContent /></Suspense>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></DemoProvider></MotionConfig>;
}

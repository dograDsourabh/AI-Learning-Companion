import { Navigate, Route, Routes } from "react-router-dom";
import type { Role } from "./data";
import { AppShell } from "./ui";
import {
  AdminAIQuality, AdminContent, AdminCosts, AdminCurriculum, AdminEvents,
  AdminQuestions, AdminSchools, AdminUsers, ConceptLesson, ManagementAdoption,
  ManagementLearning, ManagementOverview, ManagementSafety, ManagementScorecard,
  ManagementTeachers, ParentFeedback, ParentHome, ParentHomework, ParentProgress,
  ParentReport, StudentDoubts, StudentHome, StudentHomework, StudentLearn,
  StudentPractice, StudentProgress, StudentSafety, TeacherAlerts, TeacherAssistant,
  TeacherConcepts, TeacherHomework, TeacherOverview, TeacherReports, TeacherStudentProfile,
  TeacherStudents,
} from "./pages";

function RoleShell({ role }: { role: Role }) {
  return <AppShell role={role} />;
}

export default function AppContent() {
  return <Routes>
    <Route path="/student" element={<RoleShell role="student" />}>
      <Route index element={<StudentHome />} />
      <Route path="learn" element={<StudentLearn />} />
      <Route path="learn/:conceptId" element={<ConceptLesson />} />
      <Route path="practice" element={<StudentPractice />} />
      <Route path="homework" element={<StudentHomework />} />
      <Route path="progress" element={<StudentProgress />} />
      <Route path="doubts" element={<StudentDoubts />} />
      <Route path="safety" element={<StudentSafety />} />
    </Route>
    <Route path="/teacher" element={<RoleShell role="teacher" />}>
      <Route index element={<TeacherOverview />} />
      <Route path="students" element={<TeacherStudents />} />
      <Route path="students/:studentId" element={<TeacherStudentProfile />} />
      <Route path="concepts" element={<TeacherConcepts />} />
      <Route path="homework" element={<TeacherHomework />} />
      <Route path="alerts" element={<TeacherAlerts />} />
      <Route path="assistant" element={<TeacherAssistant />} />
      <Route path="reports" element={<TeacherReports />} />
    </Route>
    <Route path="/management" element={<RoleShell role="management" />}>
      <Route index element={<ManagementOverview />} />
      <Route path="learning" element={<ManagementLearning />} />
      <Route path="adoption" element={<ManagementAdoption />} />
      <Route path="teachers" element={<ManagementTeachers />} />
      <Route path="safety" element={<ManagementSafety />} />
      <Route path="scorecard" element={<ManagementScorecard />} />
    </Route>
    <Route path="/parent" element={<RoleShell role="parent" />}>
      <Route index element={<ParentHome />} />
      <Route path="progress" element={<ParentProgress />} />
      <Route path="homework" element={<ParentHomework />} />
      <Route path="report" element={<ParentReport />} />
      <Route path="feedback" element={<ParentFeedback />} />
    </Route>
    <Route path="/admin" element={<RoleShell role="admin" />}>
      <Route index element={<AdminSchools />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="curriculum" element={<AdminCurriculum />} />
      <Route path="content" element={<AdminContent />} />
      <Route path="questions" element={<AdminQuestions />} />
      <Route path="ai-quality" element={<AdminAIQuality />} />
      <Route path="costs" element={<AdminCosts />} />
      <Route path="events" element={<AdminEvents />} />
    </Route>
    <Route path="*" element={<Navigate to="/student" replace />} />
  </Routes>;
}

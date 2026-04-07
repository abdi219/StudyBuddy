import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import LandingPage from "./pages/landing/LandingPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import GPAOverview from "./pages/gpa/GPAOverview";
import GPACalculator from "./pages/gpa/GPACalculator";
import RelativeGrading from "./pages/gpa/RelativeGrading";
import ClassroomList from "./pages/classroom/ClassroomList";
import ActiveClassroom from "./pages/classroom/ActiveClassroom";
import NotesPage from "./pages/notes/NotesPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing — standalone layout (no sidebar) */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard layout — sidebar + topbar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/gpa" element={<GPAOverview />} />
          <Route path="/gpa/calculate" element={<GPACalculator />} />
          <Route path="/gpa/relative" element={<RelativeGrading />} />
          <Route path="/classroom" element={<ClassroomList />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Route>

        {/* Active Classroom — dark, full-screen, own layout */}
        <Route path="/classroom/:id" element={<ActiveClassroom />} />
      </Routes>
    </Router>
  );
}

export default App;

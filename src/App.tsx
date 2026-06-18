import { Navigate, Route, Routes } from "react-router-dom";
import { useApp } from "./context/AppContext";
import Layout from "./components/Layout";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModuleDetail from "./pages/ModuleDetail";
import Practice from "./pages/Practice";
import Tutor from "./pages/Tutor";
import Exam from "./pages/Exam";
import Achievements from "./pages/Achievements";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

export default function App() {
  const { state } = useApp();

  if (!state.profile) {
    return <Onboarding />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/modules/:moduleId" element={<ModuleDetail />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

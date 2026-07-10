import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const WorkBuddyPage = lazy(() => import("@/pages/WorkBuddyPage"));
const CodeBuddyPage = lazy(() => import("@/pages/CodeBuddyPage"));
const RoleGuidePage = lazy(() => import("@/pages/RoleGuidePage"));
const ScenarioPage = lazy(() => import("@/pages/ScenarioPage"));
const PromptPage = lazy(() => import("@/pages/PromptPage"));
const PracticePage = lazy(() => import("@/pages/PracticePage"));
const BestPracticePage = lazy(() => import("@/pages/BestPracticePage"));
const SummaryPage = lazy(() => import("@/pages/SummaryPage"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-slate-400">加载中...</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workbuddy" element={<WorkBuddyPage />} />
            <Route path="/codebuddy" element={<CodeBuddyPage />} />
            <Route path="/role-guide" element={<RoleGuidePage />} />
            <Route path="/scenarios" element={<ScenarioPage />} />
            <Route path="/prompt" element={<PromptPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/best-practices" element={<BestPracticePage />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;

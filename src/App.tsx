import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import PracticeHome from "@/pages/PracticeHome";
import ModulePage from "@/pages/ModulePage";
import BlockPage from "@/pages/BlockPage";
import SubjectPage from "@/pages/SubjectPage";
import MCQSession from "@/pages/MCQSession";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";
import Compete from "@/pages/Compete";
import ExamMode from "@/pages/ExamMode";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/practice" element={<PracticeHome />} />
            <Route path="/practice/:yearSlug" element={<ModulePage />} />
            <Route path="/practice/:yearSlug/:moduleSlug" element={<BlockPage />} />
            <Route path="/practice/:yearSlug/:moduleSlug/:subjectSlug" element={<SubjectPage />} />
            <Route path="/practice/:yearSlug/:moduleSlug/:subjectSlug/session" element={<MCQSession />} />
            <Route path="/practice/:yearSlug/:moduleSlug/revision" element={<MCQSession />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/compete" element={<Compete />} />
            <Route path="/exam" element={<ExamMode />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

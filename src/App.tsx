
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/sidebar";
import Index from "@/pages/Index";
import Projects from "@/pages/projects/Projects";
import { ProjectDetails } from "@/pages/projects/ProjectDetails";
import CreateProject from "@/pages/projects/CreateProject";
import Users from "@/pages/users/Users";
import Validations from "@/pages/Validations";
import Profile from "@/pages/users/Profile";
import NotFound from "@/pages/NotFound";
import UserProfile from "@/pages/users/UserProfile";
import UserReport from "@/pages/users/UserReport";
import GenerateReport from "@/pages/users/GenerateReport";
import ImportUsers from "./components/ImportUsers";
import JsonViewer from "./components/jsonviewer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        {/* O efeito de blur global é aplicado via CSS através de body::before no tailwind.config.ts */}
        {/* Este container abaixo terá um efeito adicional para reforçar o blur entre branco e customBlue */}
        <div className="flex h-screen w-full overflow-hidden custom-blur-bg">
          <AppSidebar />
          <main className="flex-1 overflow-auto relative">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/new" element={<CreateProject />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/users/:userId/report" element={<UserReport />} />
              <Route path="/users/:userId/generate-report" element={<GenerateReport />} />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/validations" element={<Validations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/import-users" element={<ImportUsers />} />
              <Route path="/users/json-viewer" element={<JsonViewer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<div>Projects Page (Coming Soon)</div>} />
          <Route path="/team" element={<div>Team Page (Coming Soon)</div>} />
          <Route path="/logs" element={<div>Logs Page (Coming Soon)</div>} />
          <Route path="/time" element={<div>Time Clock Page (Coming Soon)</div>} />
          <Route path="/files" element={<div>Files Page (Coming Soon)</div>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
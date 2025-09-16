import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import HarvestMonitor from "./pages/HarvestMonitor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/harvest" element={<HarvestMonitor />} />
            <Route path="/processing" element={<div className="p-8 text-center text-muted-foreground">Processing Timeline - Coming Soon</div>} />
            <Route path="/compliance" element={<div className="p-8 text-center text-muted-foreground">Compliance Dashboard - Coming Soon</div>} />
            <Route path="/qr-codes" element={<div className="p-8 text-center text-muted-foreground">QR Management - Coming Soon</div>} />
            <Route path="/analytics" element={<div className="p-8 text-center text-muted-foreground">Analytics - Coming Soon</div>} />
            <Route path="/recalls" element={<div className="p-8 text-center text-muted-foreground">Recall Management - Coming Soon</div>} />
            <Route path="/reports" element={<div className="p-8 text-center text-muted-foreground">Reports - Coming Soon</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

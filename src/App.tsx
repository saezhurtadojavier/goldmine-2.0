
import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes de carga
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0D0D18]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Carga perezosa de componentes
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Course = lazy(() => import("./pages/dashboard/Course"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PlaceholderPage = lazy(() => import("@/components/PlaceholderPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/course" element={<Course />} />
            <Route path="/dashboard/test" element={<PlaceholderPage title="Test de Conocimientos" />} />
            <Route path="/dashboard/ai" element={<PlaceholderPage title="Habla con Antonio IA" />} />
            <Route path="/dashboard/analyzer" element={<PlaceholderPage title="Analizador de Acciones" />} />
            <Route path="/dashboard/portfolio" element={<PlaceholderPage title="Tu Cartera" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Contact, Home, Music } from "lucide-react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Music from "./pages/Music";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Merch from "./pages/Merch";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
          <Navigation />
          <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/music" element={<Music />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
        <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

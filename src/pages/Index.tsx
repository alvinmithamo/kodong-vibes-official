import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Music from "@/components/Music";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Music />
        <Gallery />
        <Events />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

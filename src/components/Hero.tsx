import { Play, Music, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-kodong-klan.jpg";
import kodong12 from "@/assets/kodong photos/kodong 12.jpg";


const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={kodong12}
          alt="Kodong Klan performing on stage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 hero-gradient opacity-20"></div>
      </div>

      {/* Content */}
    
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
           
      <br></br>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            Kodong
            <span className="block text-transparent bg-clip-text gold-gradient">
              Klan
            </span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            Redefining Kenyan Soul & R&B
          </p>
          
          <p className="font-body text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Seven voices, one vision. Experience the future of Afro-fusion music from Kenya's most dynamic collective.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => scrollToSection('#music')}
              className="btn-hero flex items-center gap-3 group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Listen Now
            </button>
            
            <button 
              onClick={() => scrollToSection('#events')}
              className="btn-outline-gold flex items-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              Upcoming Shows
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-glow mb-2">
                7
              </div>
              <div className="text-white/80 font-body">Members</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-glow mb-2">
                5+
              </div>
              <div className="text-white/80 font-body">Albums</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary-glow mb-2">
                50K+
              </div>
              <div className="text-white/80 font-body">Fans</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
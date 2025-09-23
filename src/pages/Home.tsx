import { Play, Pause, Music, Calendar, Star, Users, MapPin, Mail, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";  
import kodong4 from "@/assets/kodong photos/kodong 4.jpg"; 
import kodong5 from "@/assets/kodong photos/kodong 5.jpg";
import kodong6 from "@/assets/kodong photos/kodong 6.jpg";
import kodong7 from "@/assets/kodong photos/kodong 7.jpg";
import kodong9 from "@/assets/kodong photos/kodong 9.jpg";
import kodong15 from "@/assets/kodong photos/kodong 15.jpg";
import kodong16 from "@/assets/kodong photos/kodong 16.jpg";
import kodong17 from "@/assets/kodong photos/kodong 17.webp";
import { useNavigate } from "react-router-dom";  

  
const Home = () => {  
  const navigate = useNavigate();  
  
  const navigateToSection = (path: string) => {  
    navigate(path);  
  };  
  
  // Featured track data  
  const featuredTrack = {  
    title: "Disko",  
    description: "Our latest hit that's taking Kenya by storm",  
    duration: "3:45"  
  };  

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
    } else {
        audioRef.current.play();
        setIsPlaying(true);
    }
  };

  const handlePlay = () => {
    if (audioRef.current){
        audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
        audioRef.current.pause();
    }
  }
  
  // Upcoming events preview  
  const upcomingEvents = [  
    {  
      title: "Disko Tour: Nairobi Edition",  
      venue: "Uhuru Gardens",  
      date: "2025-10-11",  
      price: "KSh 2,000"  
    },  
    {  
      title: "Disko Tour: Meru Edition",   
      venue: "Greenwood City Mall",  
      date: "2025-01-20",  
      price: "KSh 2,000"  
    }  
  ];  
  
  // Featured band members  
  const featuredMembers = [  
    {  
      name: "Coster Ojwang",  
      role: "Lead Vocalist",  
      specialty: "R&B, Soul"  
    },  
    {  
      name: "Israel Onyach",   
      role: "Songwriter & Vocalist",  
      specialty: "Afro-fusion"  
    },  
    {  
      name: "Okello Max",  
      role: "Producer & Multi-instrumentalist",   
      specialty: "Production, Keys"  
    }  
  ];  
  
  return (  
    <div className="min-h-screen">  
      {/* Hero Section */}  
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">  
        {/* Background Image with Overlay */}  
        <div className="absolute inset-0 z-0">  
          <img  
            src={kodong4}  
            alt="Kodong Klan performing on stage"  
            className="w-full h-full object-cover"  
          />  
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/10 to-black/10"></div>  
          <div className="absolute inset-0 hero-gradient opacity-20"></div>  
        </div>  
  
        {/* Content */}  
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">  
          <div className="animate-fade-in-up">  
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">  
              Kodong  
              <span className="block text-transparent bg-clip-text gold-gradient">  
                Klan  
              </span>  
            </h1>  
              
            <p className="font-body text-xl md:text-2xl text-white mb-4 max-w-3xl mx-auto">  
              Redefining Kenyan Soul & R&B  
            </p>  
              
            <p className="font-body text-lg text-white mb-12 max-w-2xl mx-auto">  
              Seven voices, one vision. Experience the future of Afro-fusion music from Kenya's most dynamic collective.  
            </p>  
  
            {/* Call-to-Action Buttons */}  
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">  
              <button   
                onClick={() => navigateToSection('/music')}  
                className="btn-hero flex items-center gap-3 group"  
              >  
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />  
                Listen Now  
              </button>  
                
              <button   
                onClick={() => navigateToSection('/events')}  
                className="btn-outline-gold flex items-center gap-3"  
              >  
                <Calendar className="w-5 h-5" />  
                Upcoming Shows  
              </button>  
            </div>  
  
            {/* Quick Stats */}  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">  
              <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>  
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">  
                  7  
                </div>  
                <div className="text-white/80 font-body">Members</div>  
              </div>  
              <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>  
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">  
                  50+  
                </div>  
                <div className="text-white/80 font-body">Shows</div>  
              </div>  
              <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>  
                <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">  
                  100K+  
                </div>  
                <div className="text-white/80 font-body">Fans</div>  
              </div>  
            </div>  
          </div> 
           <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br> 
        </div>  
  
        {/* Scroll Indicator */}  
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">  
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">  
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>  
          </div>  
        </div>  
      </section>  
  
      {/* Featured Music Section */}  
      <section className="py-20 bg-gradient-to-b from-background to-muted">  
        <div className="container mx-auto px-4">  
          <div className="text-center mb-12 animate-fade-in-up">  
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">  
              Latest  
              <span className="text-transparent bg-clip-text gold-gradient"> Release</span>  
            </h2>  
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">  
              Experience our newest sound that's captivating audiences across Kenya  
            </p>  
          </div>  
  
          <div className="max-w-4xl mx-auto">  
            <div className="bg-card rounded-2xl p-8 card-gradient animate-fade-in-up">  
              <div className="grid md:grid-cols-2 gap-8 items-center">  
                <div>  
                  <div className="flex items-center gap-3 mb-4">  
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>  
                    <span className="text-primary font-medium text-sm uppercase tracking-wider">  
                      Now Playing  
                    </span>  
                  </div>  
                    
                  <h3 className="font-display font-bold text-3xl text-foreground mb-3">  
                    {featuredTrack.title}  
                  </h3>  
                    
                  <p className="text-muted-foreground font-body mb-6">  
                    {featuredTrack.description}  
                  </p>  
                    
                  <div className="flex items-center gap-4 mb-6">  
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">  
                      Latest Single  
                    </span>  
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">  
                      {featuredTrack.duration}  
                    </span>  
                  </div>  
                    
                  <div className="flex gap-4">  
                    <button onClick={togglePlayPause}  className="btn-hero flex items-center gap-3">  
                        {isPlaying ? (
                            <>
                                <Pause className="w-5 h-5" />
                                Pause
                            </>
                        ) : (
                            <>
                            <Play className="w-5 h-5" />
                            Play Now
                            </>
                            )}
                    </button> 
                    {/* <button 
                        onClick={handlePause} 
                        className="btn-outline-gold flex items-center gap-3"
                        >
                        Pause
                        </button>  */}
                    <button   
                      onClick={() => navigateToSection('/music')}  
                      className="btn-outline-gold flex items-center gap-3"  
                    >  
                      View All Music  
                      <ArrowRight className="w-4 h-4" />  
                    </button>  
                  </div>  
                </div>  
                  
                <div className="text-center">  
                  <div className={`w-48 h-48 mx-auto rounded-full gold-gradient flex items-center justify-center border overflow-hidden ${isPlaying ? "animate-spin-slow" : ""}`}   >  
                        <img  
                        src={kodong4}  
                        alt="Kodong Klan performing on stage"  
                        className="w-full h-full object-cover"  
                        />  
                  </div>  
                </div>  
              </div>  
            </div>  
          </div>  
        </div>  
      </section>  
  
      {/* Upcoming Events Preview */}  
      <section className="py-20 bg-gradient-to-b from-muted to-background">  
        <div className="container mx-auto px-4">  
          <div className="text-center mb-12 animate-fade-in-up">  
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">  
              Upcoming  
              <span className="text-transparent bg-clip-text gold-gradient"> Shows</span>  
            </h2>  
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">  
              Don't miss out on our live performances across Kenya  
            </p>  
          </div>  
  
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">  
            {upcomingEvents.map((event, index) => (  
              <div   
                key={event.title}  
                className="bg-card rounded-xl p-6 card-gradient hover:shadow-lg transition-all duration-300 animate-scale-in"  
                style={{ animationDelay: `${index * 0.1}s` }}  
              >  
                <div className="flex items-start justify-between mb-4">  
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>  
                  <span className="text-xs text-muted-foreground font-medium">On Sale</span>  
                </div>  
                  
                <h3 className="font-display font-bold text-xl text-foreground mb-2">  
                  {event.title}  
                </h3>  
                  
                <div className="space-y-2 mb-4 text-sm">  
                  <div className="flex items-center gap-2 text-muted-foreground">  
                    <MapPin className="w-4 h-4" />  
                    {event.venue}  
                  </div>  
                  <div className="flex items-center gap-2 text-muted-foreground">  
                    <Calendar className="w-4 h-4" />  
                    {new Date(event.date).toLocaleDateString('en-US', {   
                      weekday: 'long',   
                      month: 'long',   
                      day: 'numeric'   
                    })}  
                  </div>  
                </div>  
                  
                <div className="flex justify-between items-center">  
                  <span className="font-display font-bold text-lg text-primary">  
                    {event.price}  
                  </span>  
                <a
                    href="https://kodongklan.hustlesasa.shop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold text-sm px-4 py-2"
                >
                    Get Tickets
                </a>
                </div>  
              </div>  
            ))}  
          </div>  
  
          <div className="text-center animate-fade-in-up">  
            <button   
              onClick={() => navigateToSection('/events')}  
              className="btn-hero flex items-center gap-3 mx-auto"  
            >  
              View All Events  
              <ArrowRight className="w-4 h-4" />  
            </button>  
          </div>  
        </div>  
      </section>  
  
      {/* Band Members Preview */}  
      <section className="py-20 bg-gradient-to-b from-background to-muted">  
        <div className="container mx-auto px-4">  
          <div className="text-center mb-12 animate-fade-in-up">  
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">  
              Meet the  
              <span className="text-transparent bg-clip-text gold-gradient"> Collective</span>  
            </h2>  
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">  
              Seven unique voices united by a shared passion for music  
            </p>  
          </div>  
  
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">  
            {featuredMembers.map((member, index) => (  
              <div   
                key={member.name}  
                className="bg-card rounded-xl p-6 card-gradient text-center hover:shadow-lg transition-all duration-300 animate-scale-in"  
                style={{ animationDelay: `${index * 0.1}s` }}  
              >  
                <div className="w-20 h-20 mx-auto rounded-full gold-gradient flex items-center justify-center mb-4">  
                    <img
                    src={[
                      kodong16,
                      kodong9,
                      kodong6,
                      kodong7,
                      kodong15,
                      kodong5,
                      kodong17
                    ][Math.floor(Math.random() * 7)]}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    />
                  {/* <Users className="w-10 h-10 text-primary-foreground" />   */}
                </div>  
                  
                <h3 className="font-display font-bold text-xl text-foreground mb-2">  
                  {member.name}  
                </h3>  
                  
                <p className="text-primary font-medium mb-2">  
                  {member.role}  
                </p>  
                  
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium inline-block">  
                  {member.specialty}  
                </div>  
              </div>  
            ))}  
          </div>  
  
          <div className="text-center animate-fade-in-up">  
            <button   
              onClick={() => navigateToSection('/about')}  
              className="btn-hero flex items-center gap-3 mx-auto"  
            >  
              Meet All Members  
              <ArrowRight className="w-4 h-4" />  
            </button>  
          </div>  
        </div>  
      </section>  
  
      {/* Newsletter Signup */}  
      <section className="py-20 bg-gradient-to-b from-muted to-background">  
        <div className="container mx-auto px-4">  
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">  
            <div className="bg-card rounded-2xl p-8 md:p-12 card-gradient">  
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gold-gradient mb-6 animate-glow-pulse">  
                <Mail className="w-8 h-8 text-primary-foreground" />  
              </div>  
                
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">  
                Stay in the Loop  
              </h2>

              <p className="font-body text-muted-foreground mb-6 max-w-lg mx-auto">  
                Get the latest news, new music releases, and exclusive content delivered straight to your inbox.   
                Be the first to know about upcoming shows and special announcements.  
              </p>  
                
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">  
                <input  
                  type="email"  
                  placeholder="Enter your email address"  
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"  
                />  
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">  
                  Subscribe  
                </button>  
              </div>  
                
              <p className="text-xs text-muted-foreground">  
                No spam, just music. Unsubscribe anytime.  
              </p>  
            </div>  
          </div>  
        </div>  
      </section>  
  
      {/* Social Media & Community */}  
      <section className="py-20 bg-gradient-to-b from-background to-muted">  
        <div className="container mx-auto px-4">  
          <div className="text-center mb-12 animate-fade-in-up">  
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">  
              Join Our  
              <span className="text-transparent bg-clip-text gold-gradient"> Community</span>  
            </h2>  
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">  
              Connect with us on social media and be part of the Kodong Klan family  
            </p>  
          </div>  
  
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">  
            <div className="bg-card rounded-xl p-6 card-gradient text-center hover:shadow-lg transition-all duration-300 animate-scale-in">  
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mb-4">  
                <span className="text-2xl">📸</span>  
              </div>  
              <h3 className="font-display font-bold text-lg text-foreground mb-2">Instagram</h3>  
              <p className="text-sm text-muted-foreground mb-4">Behind-the-scenes content</p>  
              <button className="text-primary hover:text-primary/80 transition-colors font-medium">  
                @kodongklan  
              </button>  
            </div>  
  
            <div className="bg-card rounded-xl p-6 card-gradient text-center hover:shadow-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>  
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mb-4">  
                <span className="text-2xl">🐦</span>  
              </div>  
              <h3 className="font-display font-bold text-lg text-foreground mb-2">Twitter</h3>  
              <p className="text-sm text-muted-foreground mb-4">Latest updates & news</p>  
              <button className="text-primary hover:text-primary/80 transition-colors font-medium">  
                @kodongklan  
              </button>  
            </div>  
  
            <div className="bg-card rounded-xl p-6 card-gradient text-center hover:shadow-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>  
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mb-4">  
                <span className="text-2xl">▶️</span>  
              </div>  
              <h3 className="font-display font-bold text-lg text-foreground mb-2">YouTube</h3>  
              <p className="text-sm text-muted-foreground mb-4">Music videos & live sessions</p>  
              <button className="text-primary hover:text-primary/80 transition-colors font-medium">  
                Kodong Klan Official  
              </button>  
            </div>  
  
            <div className="bg-card rounded-xl p-6 card-gradient text-center hover:shadow-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.3s' }}>  
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center mb-4">  
                <span className="text-2xl">👥</span>  
              </div>  
              <h3 className="font-display font-bold text-lg text-foreground mb-2">Facebook</h3>  
              <p className="text-sm text-muted-foreground mb-4">Community discussions</p>  
              <button className="text-primary hover:text-primary/80 transition-colors font-medium">  
                Kodong Klan  
              </button>  
            </div>  
          </div>  
  
          <div className="text-center animate-fade-in-up">  
            <button   
              onClick={() => navigateToSection('/contact')}  
              className="btn-hero flex items-center gap-3 mx-auto"  
            >  
              Get In Touch  
              <ArrowRight className="w-4 h-4" />  
            </button>  
          </div>  
        </div>  
      </section>  
      <audio ref={audioRef} src="/disko.mp3" preload="auto" />
    </div>  
  );  
};  
  
export default Home;
import { Play, ExternalLink, Music2, Headphones } from "lucide-react";  
  
const Music = () => {  
  const tracks = [  
    {  
      title: "Disko",  
      album: "Latest Single",  
      description: "Our latest hit that's taking Kenya by storm. A perfect blend of Afro-fusion and modern R&B.",  
      duration: "3:45",  
      year: "2024",  
      featured: true  
    },  
    {  
      title: "Nairobi Nights",  
      album: "City Stories",  
      description: "A soulful journey through the heart of Kenya's capital city.",  
      duration: "4:12",  
      year: "2023",  
      featured: false  
    },  
    {  
      title: "Ubuntu",  
      album: "Roots & Routes",  
      description: "Celebrating African unity and shared humanity through music.",  
      duration: "5:20",  
      year: "2023",  
      featured: false  
    },  
    {  
      title: "Mama Africa",  
      album: "Heritage",  
      description: "A tribute to the motherland and our musical ancestors.",  
      duration: "4:33",  
      year: "2022",  
      featured: false  
    }  
  ];  
  
  const platforms = [  
    { name: "Spotify", icon: "🎵", color: "bg-green-500" },  
    { name: "Apple Music", icon: "🎵", color: "bg-black" },  
    { name: "YouTube", icon: "▶️", color: "bg-red-500" },  
    { name: "SoundCloud", icon: "☁️", color: "bg-orange-500" }  
  ];  
  
  return (  
    <div className="min-h-screen py-20 bg-gradient-to-b from-muted to-background">  
      <div className="container mx-auto px-4">  
        {/* Section Header */}  
        <div className="text-center mb-16 animate-fade-in-up">  
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">  
            Our  
            <span className="text-transparent bg-clip-text gold-gradient"> Music</span>  
          </h2>  
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">  
            Discover our collection of soulful tracks that blend traditional Kenyan sounds   
            with contemporary R&B and Afro-fusion. Each song tells a story, each beat carries our heritage.  
          </p>  
        </div>  
         {/* Featured Track */}  
        <div className="mb-16">  
          <div className="bg-card rounded-3xl p-8 md:p-12 card-gradient relative overflow-hidden animate-fade-in-up">  
            <div className="absolute top-0 right-0 w-32 h-32 gold-gradient opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>  
              
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">  
                <div>
                    <div className="flex items-center gap-3 mb-4">  
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>  
                  <span className="text-primary font-medium text-sm uppercase tracking-wider">  
                    Featured Track  
                  </span>  
                </div>  
                  
                <h3 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-2">  
                  Disko  
                </h3>  
                  
                <p className="text-muted-foreground font-body text-lg mb-6">  
                  Our latest hit that's taking Kenya by storm. A perfect blend of Afro-fusion   
                  and modern R&B that showcases our evolution as artists.  
                </p>  
                  
                <div className="flex flex-wrap gap-4 mb-6">  
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">  
                    Latest Single  
                  </span>  
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">  
                    3:45  
                  </span>  
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">  
                    2024  
                  </span>  
                </div>  
                  
                <div className="flex gap-4">  
                  <button className="btn-hero flex items-center gap-3">  
                    <Play className="w-5 h-5" />  
                    Play Now  
                  </button>  
                  <button className="btn-outline-gold flex items-center gap-3">  
                    <ExternalLink className="w-5 h-5" />  
                    Stream  
                  </button>  
                </div>  
              </div>  
                
              <div className="music-player p-8 text-center">  
                <div className="w-48 h-48 mx-auto rounded-2xl gold-gradient flex items-center justify-center mb-6 animate-glow-pulse">  
                  <Headphones className="w-24 h-24 text-primary-foreground" />  
                </div>  
                <div className="text-white/90 font-body">  
                  <div className="text-lg font-medium mb-2">Now Playing</div>  
                  <div className="text-2xl font-bold mb-1">Disko</div>  
                  <div className="text-sm opacity-75">Kodong Klan</div>  
                </div>  
              </div>  
            </div>  
          </div>  
        </div>  
  
        {/* Track List */}  
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">  
          {tracks.filter(track => !track.featured).map((track, index) => (  
            <div   
              key={track.title}  
              className="bg-card rounded-xl p-6 card-gradient hover:shadow-xl transition-all duration-300 group cursor-pointer animate-scale-in"  
              style={{ animationDelay: `${index * 0.1}s` }}  
            >  
              <div className="flex items-start justify-between mb-4">  
                <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform">  
                  <Music2 className="w-6 h-6 text-primary-foreground" />  
                </div>  
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">  
                  <Play className="w-6 h-6 text-primary" />  
                </button>  
              </div>  
                
              <h4 className="font-display font-bold text-xl text-foreground mb-2">  
                {track.title}  
              </h4>  
                
              <p className="text-muted-foreground font-body text-sm mb-4">  
                {track.description}  
              </p>  
                
              <div className="flex justify-between items-center text-xs text-muted-foreground">  
                <span>{track.album}</span>  
                <span>{track.duration}</span>  
              </div>  
            </div>  
          ))}  
        </div>  
  
        {/* Streaming Platforms */}  
        <div className="text-center animate-fade-in-up">  
          <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">  
            Listen on Your Favorite Platform  
          </h3>  
            
          <div className="flex flex-wrap justify-center gap-4">  
            {platforms.map((platform) => (  
              <button  
                key={platform.name}  
                className={`${platform.color} text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-3`}  
              >  
                <span className="text-lg">{platform.icon}</span>  
                {platform.name}  
              </button>  
            ))}  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  
  
export default Music;
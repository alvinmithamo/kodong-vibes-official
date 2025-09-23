import { useState } from "react";  
import { X, ZoomIn } from "lucide-react";  
  
const Gallery = () => {  
  const [selectedImage, setSelectedImage] = useState<number | null>(null);  
  
  const galleryItems = [  
    {  
      id: 1,  
      title: "Live at Nyayo Stadium",  
      category: "Performance",  
      description: "Kodong Klan performing at the biggest show of 2024"  
    },  
    {  
      id: 2,  
      title: "Studio Sessions",  
      category: "Behind the Scenes",  
      description: "Creating magic in the recording studio"  
    },  
    {  
      id: 3,  
      title: "Music Video Shoot",  
      category: "Production",  
      description: "Behind the scenes of our latest video"  
    },  
    {  
      id: 4,  
      title: "Fan Meet & Greet",  
      category: "Events",  
      description: "Connecting with our amazing fans"  
    },  
    {  
      id: 5,  
      title: "Radio Interview",  
      category: "Media",  
      description: "Sharing our story on national radio"  
    },  
    {  
      id: 6,  
      title: "Group Portrait",  
      category: "Photography",  
      description: "Official band photography session"  
    },  
    {  
      id: 7,  
      title: "Rehearsal Time",  
      category: "Behind the Scenes",  
      description: "Perfecting our craft during practice"  
    },  
    {  
      id: 8,  
      title: "Award Night",  
      category: "Events",  
      description: "Celebrating our musical achievements"  
    }  
  ];  
  
  const categories = ["All", "Performance", "Behind the Scenes", "Production", "Events", "Media", "Photography"];  
  const [activeCategory, setActiveCategory] = useState("All");  
  
  const filteredItems = activeCategory === "All"   
    ? galleryItems   
    : galleryItems.filter(item => item.category === activeCategory);  
  
  return (  
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">  
      <div className="container mx-auto px-4">  
        {/* Section Header */}  
        <div className="text-center mb-16 animate-fade-in-up">  
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">  
            Moments &  
            <span className="text-transparent bg-clip-text gold-gradient"> Memories</span>  
          </h2>  
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">  
            Take a visual journey through our musical evolution. From intimate studio sessions   
            to electrifying live performances, these moments capture the essence of Kodong Klan.  
          </p>  
        </div>  
  
        {/* Category Filter */}  
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">  
          {categories.map((category) => (  
            <button  
              key={category}  
              onClick={() => setActiveCategory(category)}  
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${  
                activeCategory === category  
                  ? "bg-primary text-primary-foreground shadow-lg"  
                  : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary"  
              }`}  
            >  
              {category}  
            </button>  
          ))}  
        </div>  
  
        {/* Gallery Grid */}  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">  
          {filteredItems.map((item, index) => (  
            <div  
              key={item.id}  
              className="gallery-item aspect-square animate-scale-in"  
              style={{ animationDelay: `${index * 0.1}s` }}  
              onClick={() => setSelectedImage(item.id)}  
            >  
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">  
                <div className="text-center text-white/80">  
                  <div className="text-4xl mb-2">📸</div>  
                  <div className="font-body text-sm">{item.title}</div>  
                </div>  
              </div>  
                
              <div className="gallery-overlay">  
                <ZoomIn className="w-8 h-8 text-white" />  
              </div>  
  
              <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">  
                {item.category}  
              </div>  
            </div>  
          ))}  
        </div>  
  
        {/* Stats Section */}  
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in-up">  
          <div>  
            <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">  
              100+  
            </div>  
            <div className="text-muted-foreground font-body">Photos</div>  
          </div>  
          <div>  
            <div className="text-3xl md:text-4xl font-display font-bold text-accent mb-2">  
              50+  
            </div>  
            <div className="text-muted-foreground font-body">Shows</div>  
          </div>  
          <div>  
            <div className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">  
              20+  
            </div>  
            <div className="text-muted-foreground font-body">Videos</div>  
          </div>  
          <div>  
            <div className="text-3xl md:text-4xl font-display font-bold text-primary-glow mb-2">  
              5  
            </div>  
            <div className="text-muted-foreground font-body">Years</div>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Gallery;
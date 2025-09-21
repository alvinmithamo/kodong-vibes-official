import { useState } from "react";
import { Music, Heart, Star } from "lucide-react";

const About = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const members = [
    {
      name: "Okello Max",
      role: "Lead Vocalist",
      bio: "The soulful voice that defines Kodong Klan's signature sound.",
      specialty: "R&B, Soul",
      fact: "Started singing in church choirs at age 8"
    },
    {
      name: "Bensoul",
      role: "Songwriter & Vocalist",
      bio: "Master storyteller weaving life experiences into melodies.",
      specialty: "Afro-fusion",
      fact: "Has written over 50 songs for the group"
    },
    {
      name: "Mordecai Dex",
      role: "Producer & Multi-instrumentalist",
      bio: "The musical genius behind Kodong Klan's innovative sound.",
      specialty: "Production, Keys",
      fact: "Can play 7 different instruments"
    },
    {
      name: "Charisma",
      role: "Vocalist & Performer",
      bio: "Brings magnetic energy and stage presence to every performance.",
      specialty: "Performance, Dance",
      fact: "Trained dancer with 10+ years experience"
    },
    {
      name: "Ywaya Tajiri",
      role: "Rapper & Lyricist",
      bio: "The wordsmith delivering powerful verses and cultural narratives.",
      specialty: "Hip-hop, Spoken Word",
      fact: "Speaks 4 languages fluently"
    },
    {
      name: "Coster Ojwang",
      role: "Bassist & Backing Vocals",
      bio: "The rhythmic foundation that grounds every Kodong Klan track.",
      specialty: "Bass, Harmony",
      fact: "Self-taught musician since age 12"
    },
    {
      name: "Israel Onyach",
      role: "Drummer & Percussionist",
      bio: "The heartbeat of the group, driving every song with passion.",
      specialty: "Drums, African Percussion",
      fact: "Studied traditional Kenyan rhythms"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">
            Meet the
            <span className="text-transparent bg-clip-text gold-gradient"> Collective</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Seven unique voices united by a shared passion for pushing the boundaries of Kenyan music. 
            Each member brings their own flavor to create the distinctive Kodong Klan sound.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {members.map((member, index) => (
            <div
              key={member.name}
              className="member-card group cursor-pointer h-80"
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Member Image Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                <div className="text-6xl text-primary/40">
                  <Music />
                </div>
                
                {/* Member Info Overlay */}
                <div className="member-card-overlay">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-display font-bold text-xl mb-2">{member.name}</h3>
                    <p className="font-body text-primary-glow mb-2">{member.role}</p>
                    <p className="font-body text-sm mb-3">{member.bio}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Star className="w-3 h-3" />
                      <span>{member.fact}</span>
                    </div>
                  </div>
                </div>

                {/* Floating Specialty Badge */}
                <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {member.specialty}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Group Story */}
        <div className="bg-card rounded-2xl p-8 md:p-12 card-gradient animate-fade-in-up">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
                Our Journey
              </h3>
              <div className="space-y-4 text-muted-foreground font-body">
                <p>
                  Born from the vibrant streets of Nairobi, Kodong Klan emerged as a musical 
                  collective determined to redefine what Kenyan R&B and soul could be. Seven 
                  artists with different backgrounds, but one shared vision.
                </p>
                <p>
                  Our sound blends traditional Kenyan rhythms with contemporary R&B, soul, 
                  and Afro-fusion, creating something entirely new yet deeply rooted in our 
                  cultural heritage.
                </p>
                <p>
                  Since our formation, we've been on a mission to showcase the depth and 
                  diversity of Kenyan music on the global stage, one soul-stirring performance 
                  at a time.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full gold-gradient mb-6 animate-glow-pulse">
                <Heart className="w-16 h-16 text-primary-foreground" />
              </div>
              <h4 className="font-display font-bold text-xl text-foreground mb-2">
                United by Music
              </h4>
              <p className="text-muted-foreground font-body">
                Seven hearts beating as one rhythm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
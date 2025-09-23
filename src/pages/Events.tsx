import { Calendar, MapPin, Clock, Ticket } from "lucide-react";  
  
const Events = () => {  
  const upcomingEvents = [  
    {  
      id: 1,  
      title: "Kodong Klan Live: Nairobi Edition",  
      venue: "Uhuru Gardens",  
      city: "Nairobi",  
      date: "2024-12-15",  
      time: "19:00",  
      price: "KSh 2,500",  
      status: "On Sale",  
      featured: true,  
      description: "An unforgettable night celebrating Kenyan soul and R&B music in the heart of our capital city."  
    },  
    {  
      id: 2,  
      title: "Mombasa Soul Festival",  
      venue: "Fort Jesus Grounds",  
      city: "Mombasa",  
      date: "2025-01-20",  
      time: "18:30",  
      price: "KSh 3,000",  
      status: "Pre-Sale",  
      featured: false,  
      description: "Beach vibes meet soulful melodies in Kenya's coastal paradise."  
    },  
    {  
      id: 3,  
      title: "Kisumu Cultural Night",  
      venue: "Kisumu Impala Sanctuary",  
      city: "Kisumu",  
      date: "2025-02-10",  
      time: "19:30",  
      price: "KSh 2,000",  
      status: "Coming Soon",  
      featured: false,  
      description: "Celebrating our musical heritage by the shores of Lake Victoria."  
    },  
    {  
      id: 4,  
      title: "Eldoret Music Weekend",  
      venue: "Eldoret Sports Club",  
      city: "Eldoret",  
      date: "2025-03-05",  
      time: "20:00",  
      price: "KSh 2,200",  
      status: "Coming Soon",  
      featured: false,  
      description: "Bringing our signature sound to the heart of the Rift Valley."  
    }  
  ];  
  
  const pastEvents = [  
    "Blankets & Wine 2024",  
    "Koroga Festival 2023",  
    "Nyege Nyege 2023",  
    "Raha Fest 2022"  
  ];  
  
  const formatDate = (dateString: string) => {  
    const date = new Date(dateString);  
    return date.toLocaleDateString('en-US', {   
      weekday: 'long',   
      year: 'numeric',   
      month: 'long',   
      day: 'numeric'   
    });  
  };  
  
  const getStatusColor = (status: string) => {  
    switch (status) {  
      case "On Sale":  
        return "bg-green-500";  
      case "Pre-Sale":  
        return "bg-yellow-500";  
      case "Coming Soon":  
        return "bg-blue-500";  
      default:  
        return "bg-gray-500";  
    }  
  };  
  
  return (  
    <div className="min-h-screen py-20 bg-gradient-to-b from-muted to-background">  
      <div className="container mx-auto px-4">  
        {/* Section Header */}  
        <div className="text-center mb-16 animate-fade-in-up">  
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">  
            Live  
            <span className="text-transparent bg-clip-text gold-gradient"> Events</span>  
          </h2>  
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">  
            Experience Kodong Klan live! Join us as we bring our signature sound to venues   
            across Kenya. Each show is a unique celebration of music, culture, and community.  
          </p>  
        </div>  
  
        {/* Featured Event */}  
        {upcomingEvents.filter(event => event.featured).map((event) => (  
          <div key={event.id} className="mb-16">  
            <div className="bg-card rounded-3xl p-8 md:p-12 card-gradient relative overflow-hidden animate-fade-in-up">  
              <div className="absolute inset-0 hero-gradient opacity-5"></div>  
                
              <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">  
                <div>  
                  <div className="flex items-center gap-3 mb-4">  
                    <div className={`w-3 h-3 ${getStatusColor(event.status)} rounded-full animate-pulse`}></div>  
                    <span className="text-primary font-medium text-sm uppercase tracking-wider">  
                      Featured Event  
                    </span>  
                  </div>  
                    
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">  
                    {event.title}  
                  </h3>  
                    
                  <p className="text-muted-foreground font-body text-lg mb-6">  
                    {event.description}  
                  </p>  
                    
                  <div className="space-y-3 mb-8">  
                    <div className="flex items-center gap-3 text-foreground">  
                      <Calendar className="w-5 h-5 text-primary" />  
                      <span className="font-medium">{formatDate(event.date)}</span>  
                    </div>  
                    <div className="flex items-center gap-3 text-foreground">  
                      <Clock className="w-5 h-5 text-primary" />  
                      <span className="font-medium">{event.time}</span>  
                    </div>  
                    <div className="flex items-center gap-3 text-foreground">  
                      <MapPin className="w-5 h-5 text-primary" />  
                      <span className="font-medium">{event.venue}, {event.city}</span>  
                    </div>  
                  </div>  
                    
                  <div className="flex items-center gap-4 mb-6">  
                    <span className="text-2xl font-display font-bold text-primary">  
                      {event.price}  
                    </span>  
                    <span className={`px-3 py-1 ${getStatusColor(event.status)} text-white rounded-full text-sm font-medium`}>  
                      {event.status}  
                    </span>  
                  </div>  
                    
                  <button className="btn-hero flex items-center gap-3">  
                    <Ticket className="w-5 h-5" />  
                    Get Tickets  
                  </button>  
                </div>  
                  
                <div className="text-center">  
                  <div className="w-64 h-64 mx-auto rounded-2xl gold-gradient flex items-center justify-center mb-6 animate-glow-pulse">  
                    <div className="text-center text-primary-foreground">  
                      <Calendar className="w-16 h-16 mx-auto mb-4" />  
                      <div className="font-display font-bold text-xl">  
                        {new Date(event.date).getDate()}  
                      </div>  
                      <div className="font-body text-sm">  
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}  
                      </div>  
                    </div>  
                  </div>  
                </div>  
              </div>  
            </div>  
          </div>  
        ))}  
  
        {/* Upcoming Events Grid */}  
        <div className="mb-16">  
          <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">  
            More Shows Coming Up  
          </h3>  
            
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">  
            {upcomingEvents.filter(event => !event.featured).map((event, index) => (  
              <div   
                key={event.id}  
                className="bg-card rounded-xl p-6 card-gradient hover:shadow-xl transition-all duration-300 group animate-scale-in"  
                style={{ animationDelay: `${index * 0.1}s` }}  
              >  
                <div className="flex justify-between items-start mb-4">  
                  <div className={`w-3 h-3 ${getStatusColor(event.status)} rounded-full animate-pulse`}></div>  
                  <span className="text-xs text-muted-foreground font-medium">  
                    {event.status}  
                  </span>  
                </div>  
                  
                <h4 className="font-display font-bold text-xl text-foreground mb-2">  
                  {event.title}  
                </h4>  
                  
                <p className="text-muted-foreground font-body text-sm mb-4">  
                  {event.description}  
                </p>  
                  
                <div className="space-y-2 mb-4 text-sm">  
                  <div className="flex items-center gap-2 text-muted-foreground">  
                    <Calendar className="w-4 h-4" />  
                    {formatDate(event.date)}  
                  </div>  
                  <div className="flex items-center gap-2 text-muted-foreground">  
                    <MapPin className="w-4 h-4" />  
                    {event.venue}, {event.city}  
                  </div>  
                </div>  
                  
                <div className="flex justify-between items-center">  
                  <span className="font-display font-bold text-lg text-primary">  
                    {event.price}  
                  </span>  
                  <button className="btn-outline-gold text-sm px-4 py-2">  
                    Details  
                  </button>  
                </div>  
              </div>  
            ))}  
          </div>  
        </div>  
  
        {/* Past Events */}  
        <div className="text-center animate-fade-in-up">  
          <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">  
            Where We've Performed  
          </h3>  
            
          <div className="flex flex-wrap justify-center gap-4">  
            {pastEvents.map((event) => (  
              <div   
                key={event}  
                className="bg-muted px-6 py-3 rounded-full font-body font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300"  
              >  
                {event}  
              </div>  
            ))}  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  
  
export default Events;
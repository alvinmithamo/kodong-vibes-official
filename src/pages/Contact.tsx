import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";  
  
const Contact = () => {  
  const socialLinks = [  
    { icon: Instagram, name: "Instagram", handle: "@kodongklan", url: "#" },  
    { icon: Twitter, name: "Twitter", handle: "@kodongklan", url: "#" },  
    { icon: Facebook, name: "Facebook", handle: "Kodong Klan", url: "#" },  
    { icon: Youtube, name: "YouTube", handle: "Kodong Klan Official", url: "#" }  
  ];  
  
  const contactInfo = [  
    {  
      icon: Mail,  
      title: "Email",  
      value: "info@kodongklan.com",  
      subtitle: "General inquiries & fan mail"  
    },  
    {  
      icon: Phone,  
      title: "Booking",  
      value: "+254 700 123 456",  
      subtitle: "Event bookings & collaborations"  
    },  
    {  
      icon: MapPin,  
      title: "Location",  
      value: "Nairobi, Kenya",  
      subtitle: "East Africa's music capital"  
    }  
  ];  
  
  return (  
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">  
      <div className="container mx-auto px-4">  
        {/* Section Header */}  
        <div className="text-center mb-16 animate-fade-in-up">  
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">  
            Get In  
            <span className="text-transparent bg-clip-text gold-gradient"> Touch</span>  
          </h2>  
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">  
            Ready to work with us? Want to book us for your event? Or just want to say hello?   
            We'd love to hear from you. Reach out and let's create something amazing together.  
          </p>  
        </div>  
  
        <div className="grid lg:grid-cols-2 gap-12 mb-16">  
          {/* Contact Form */}  
          <div className="animate-fade-in-up">  
            <div className="bg-card rounded-2xl p-8 card-gradient">  
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">  
                Send us a Message  
              </h3>  
                
              <form className="space-y-6">  
                <div className="grid md:grid-cols-2 gap-4">  
                  <div>  
                    <label className="block text-sm font-medium text-foreground mb-2">  
                      First Name  
                    </label>  
                    <input  
                      type="text"  
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"  
                      placeholder="Your first name"  
                    />  
                  </div>  
                  <div>  
                    <label className="block text-sm font-medium text-foreground mb-2">  
                      Last Name  
                    </label>  
                    <input  
                      type="text"  
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"  
                      placeholder="Your last name"  
                    />  
                  </div>  
                </div>  
                  
                <div>  
                  <label className="block text-sm font-medium text-foreground mb-2">  
                    Email  
                  </label>  
                  <input  
                    type="email"  
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"  
                    placeholder="your.email@example.com"  
                  />  
                </div>  
                  
                <div>  
                  <label className="block text-sm font-medium text-foreground mb-2">  
                    Subject  
                  </label>  
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">  
                    <option>Booking Inquiry</option>  
                    <option>Collaboration</option>  
                    <option>Media Request</option>  
                    <option>Fan Message</option>  
                    <option>Other</option>  
                  </select>  
                </div>  
                  
                <div>  
                  <label className="block text-sm font-medium text-foreground mb-2">  
                    Message  
                  </label>  
                  <textarea  
                    rows={5}  
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"  
                    placeholder="Tell us about your project, event, or just say hello..."  
                  ></textarea>  
                </div>  
                  
                <button className="btn-hero w-full">  
                  Send Message  
                </button>  
              </form>  
            </div>  
          </div>  
  
          {/* Contact Information */}  
          <div className="space-y-8 animate-slide-in-left">  
            {/* Contact Cards */}  
            <div className="space-y-6">  
              {contactInfo.map((contact, index) => (  
                <div   
                  key={contact.title}  
                  className="bg-card rounded-xl p-6 card-gradient hover:shadow-lg transition-all duration-300 animate-scale-in"  
                  style={{ animationDelay: `${index * 0.1}s` }}  
                >  
                  <div className="flex items-start gap-4">  
                    <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">  
                      <contact.icon className="w-6 h-6 text-primary-foreground" />  
                    </div>  
                    <div>  
                      <h4 className="font-display font-bold text-lg text-foreground mb-1">  
                        {contact.title}  
                      </h4>  
                      <p className="font-body font-medium text-primary mb-1">  
                        {contact.value}  
                      </p>  
                      <p className="font-body text-sm text-muted-foreground">  
                        {contact.subtitle}  
                      </p>  
                    </div>  
                  </div>  
                </div>  
              ))}  
            </div>  
  
            {/* Social Media */}  
            <div className="bg-card rounded-xl p-6 card-gradient">  
              <h4 className="font-display font-bold text-lg text-foreground mb-6">  
                Follow Our Journey  
              </h4>  
              <div className="grid grid-cols-2 gap-4">  
                {socialLinks.map((social) => (  
                  <a  
                    key={social.name}  
                    href={social.url}  
                    className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 group"  
                  >  
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />  
                    <div>  
                      <div className="font-medium text-sm">{social.name}</div>  
                      <div className="text-xs text-muted-foreground">{social.handle}</div>  
                    </div>  
                  </a>  
                ))}  
              </div>  
            </div>  
  
            {/* Newsletter Signup */}  
            <div className="bg-card rounded-xl p-6 card-gradient">  
              <h4 className="font-display font-bold text-lg text-foreground mb-3">  
                Stay Updated  
              </h4>  
              <p className="font-body text-sm text-muted-foreground mb-4">  
                Get the latest news, new music, and exclusive content delivered to your inbox.  
              </p>  
              <div className="flex gap-3">  
                <input  
                  type="email"  
                  placeholder="Enter your email"  
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-sm"  
                />  
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">  
                  Subscribe  
                </button>  
              </div>  
            </div>  
          </div>  
        </div>  
  
        {/* Bottom CTA */}  
        <div className="text-center animate-fade-in-up">  
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gold-gradient mb-6 animate-glow-pulse">  
            <Mail className="w-8 h-8 text-primary-foreground" />  
          </div>  
          <h3 className="font-display font-bold text-2xl text-foreground mb-4">  
            Ready to make music together?  
          </h3>  
          <p className="font-body text-muted-foreground mb-6 max-w-2xl mx-auto">  
            Whether you're planning an event, looking for collaborations, or representing a brand   
            that aligns with our values, we're excited to explore possibilities together.  
          </p>  
          <button className="btn-hero">  
            Start a Conversation  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
};  
  
export default Contact;
import { Heart, Music2 } from "lucide-react";  
import { Link } from "react-router-dom";  
  
const Footer = () => {  
  const currentYear = new Date().getFullYear();  
  
  const quickLinks = [  
    { name: "About", href: "/about" },  
    { name: "Music", href: "/music" },  
    { name: "Events", href: "/events" },  
    { name: "Gallery", href: "/gallery" },  
    { name: "Contact", href: "/contact" }  
  ];  
  
  const legalLinks = [  
    { name: "Privacy Policy", href: "#" },  
    { name: "Terms of Service", href: "#" },  
    { name: "Cookie Policy", href: "#" }  
  ];  
  
  const scrollToTop = () => {  
    window.scrollTo({ top: 0, behavior: "smooth" });  
  };  
  
  return (  
    <footer className="bg-earth-deep text-white py-16">  
      <div className="container mx-auto px-4">  
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">  
          {/* Brand Section */}  
          <div className="lg:col-span-2">  
            <Link to="/" className="flex items-center space-x-3 mb-6">  
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">  
                <Music2 className="w-6 h-6 text-primary-foreground" />  
              </div>  
              <span className="font-display font-bold text-2xl">Kodong Klan</span>  
            </Link>  
            <p className="font-body text-white/80 mb-6 max-w-md">  
              Seven voices, one vision. Redefining Kenyan Soul & R&B through authentic   
              storytelling and innovative sound. Based in Nairobi, reaching the world.  
            </p>  
            <div className="flex items-center gap-2 text-white/60">  
              <span className="font-body text-sm">Made with</span>  
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />  
              <span className="font-body text-sm">in Kenya</span>  
            </div>  
          </div>  
  
          {/* Quick Links */}  
          <div>  
            <h3 className="font-display font-bold text-lg mb-6">Quick Links</h3>  
            <ul className="space-y-3">  
              {quickLinks.map((link) => (  
                <li key={link.name}>  
                  <Link  
                    to={link.href}  
                    className="font-body text-white/80 hover:text-primary transition-colors duration-200"  
                  >  
                    {link.name}  
                  </Link>  
                </li>  
              ))}  
            </ul>  
          </div>  
  
          {/* Contact Info */}  
          <div>  
            <h3 className="font-display font-bold text-lg mb-6">Connect</h3>  
            <div className="space-y-3">  
              <div>  
                <div className="font-body text-white/80 text-sm mb-1">Email</div>  
                <div className="font-body text-primary">info@kodongklan.com</div>  
              </div>  
              <div>  
                <div className="font-body text-white/80 text-sm mb-1">Booking</div>  
                <div className="font-body text-primary">+254 700 123 456</div>  
              </div>  
              <div>  
                <div className="font-body text-white/80 text-sm mb-1">Location</div>  
                <div className="font-body text-white/80">Nairobi, Kenya</div>  
              </div>  
            </div>  
          </div>  
        </div>  
  
        {/* Bottom Section */}  
        <div className="border-t border-white/20 pt-8">  
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">  
            <div className="font-body text-white/60 text-sm">  
              © {currentYear} Kodong Klan. All rights reserved.  
            </div>  
              
            <div className="flex gap-6">  
              {legalLinks.map((link) => (  
                <a  
                  key={link.name}  
                  href={link.href}  
                  className="font-body text-white/60 hover:text-white transition-colors duration-200 text-sm"  
                >  
                  {link.name}  
                </a>  
              ))}  
            </div>  
          </div>  
            
          <div className="text-center mt-8">  
            <button  
              onClick={scrollToTop}  
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"  
            >  
              ↑  
            </button>  
          </div>  
        </div>  
      </div>  
    </footer>  
  );  
};  
  
export default Footer;
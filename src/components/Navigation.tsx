import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Music", href: "/music" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
    { name: "Merch", href: "/merch" },
    { name: "Contact", href: "/contact" },
  ];

  // const scrollToSection = (href: string) => {
  //   const element = document.querySelector(href);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  //   setIsOpen(false);
  // };

  const isActive = (href: string) => {
    return location.pathname === href;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "nav-blur py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-20 rounded-full gold-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">KK</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Kodong Klan
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (  
              <Link  
                key={item.name}  
                to={item.href}  
                className={`font-body font-medium transition-colors duration-200 relative group ${  
                  isActive(item.href)   
                    ? "text-primary"   
                    : "text-foreground hover:text-primary"  
                }`}  
              >  
                {item.name}  
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${  
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"  
                }`}></span>  
              </Link>  
            ))}  
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (  
                <Link  
                  key={item.name}  
                  to={item.href}  
                  onClick={() => setIsOpen(false)}  
                  className={`font-body font-medium transition-colors duration-200 text-left ${  
                    isActive(item.href)   
                      ? "text-primary"   
                      : "text-foreground hover:text-primary"  
                  }`}  
                >  
                  {item.name}  
                </Link>  
              ))}  
            </div>  
          </div>  
        )}  
      </div>  
    </nav>  
  );  
};  
  
export default Navigation;
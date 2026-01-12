import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/utils/navigation";
import Logo from "./Logo";
import NavLink from "./NavLink";

interface MobileMenuProps {
  isOpen: boolean;
  onItemClick: () => void;
}

const MobileMenu = ({ isOpen, onItemClick }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 pb-4 animate-fade-in-up">
      <div className="flex flex-col space-y-4">
        {NAV_ITEMS.map((item) => (
          <NavLink 
            key={item.name} 
            href={item.href}
            onClick={onItemClick}
            className="text-lg py-2"
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const DesktopNav = () => (
  <div className="hidden md:flex items-center space-x-8">
    {NAV_ITEMS.map((item) => (
      <NavLink key={item.name} href={item.href}>
        {item.name}
      </NavLink>
    ))}
  </div>
);

const MobileMenuButton = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "nav-blur py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />
          <DesktopNav />
          <MobileMenuButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
        </div>
        <MobileMenu isOpen={isOpen} onItemClick={() => setIsOpen(false)} />
      </div>
    </nav>
  );
};

export default Navigation;

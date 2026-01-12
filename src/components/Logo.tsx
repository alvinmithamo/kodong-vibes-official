import { Link } from "react-router-dom";

const Logo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center">
      <span className="ml-5 text-primary-foreground font-display font-bold text-lg">
        Kodong Klan
      </span>
    </div>
  </Link>
);

export default Logo;

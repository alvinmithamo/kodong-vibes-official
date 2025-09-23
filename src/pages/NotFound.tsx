import { Home, ArrowLeft } from "lucide-react";  
import { Link } from "react-router-dom";  
  
const NotFound = () => {  
  return (  
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">  
      <div className="container mx-auto px-4 text-center">  
        <div className="max-w-2xl mx-auto animate-fade-in-up">  
          {/* 404 Visual */}  
          <div className="mb-8">  
            <div className="text-8xl md:text-9xl font-display font-bold text-transparent bg-clip-text gold-gradient mb-4">  
              404  
            </div>  
            <div className="w-24 h-24 mx-auto rounded-full gold-gradient flex items-center justify-center mb-6 animate-glow-pulse">  
              <Home className="w-12 h-12 text-primary-foreground" />  
            </div>  
          </div>  
  
          {/* Error Message */}  
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">  
            Page Not Found  
          </h1>  
            
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-lg mx-auto">  
            Looks like this page got lost in the music. Don't worry, we'll help you   
            find your way back to the rhythm.  
          </p>  
  
          {/* Action Buttons */}  
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">  
            <Link to="/" className="btn-hero flex items-center gap-3">  
              <Home className="w-5 h-5" />  
              Back to Home  
            </Link>  
              
            <button   
              onClick={() => window.history.back()}  
              className="btn-outline-gold flex items-center gap-3"  
            >  
              <ArrowLeft className="w-5 h-5" />  
              Go Back  
            </button>  
          </div>  
  
          {/* Quick Links */}  
          <div className="mt-12 pt-8 border-t border-border">  
            <p className="font-body text-sm text-muted-foreground mb-4">  
              Or explore these popular sections:  
            </p>  
            <div className="flex flex-wrap justify-center gap-4">  
              <Link to="/music" className="text-primary hover:text-primary/80 transition-colors font-medium">  
                Music  
              </Link>  
              <Link to="/about" className="text-primary hover:text-primary/80 transition-colors font-medium">  
                About  
              </Link>  
              <Link to="/events" className="text-primary hover:text-primary/80 transition-colors font-medium">  
                Events  
              </Link>  
              <Link to="/contact" className="text-primary hover:text-primary/80 transition-colors font-medium">  
                Contact  
              </Link>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  
  
export default NotFound;
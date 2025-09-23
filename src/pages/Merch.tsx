import { ShoppingCart, Star, Heart, Package, Truck, Shield } from "lucide-react";  
import { useState } from "react";  
  
const Merch = () => {  
  const [selectedCategory, setSelectedCategory] = useState("All");  
  
  const merchItems = [  
    {  
      id: 1,  
      name: "Kodong Klan Classic T-Shirt",  
      price: "KSh 2,500",  
      originalPrice: "KSh 3,000",  
      category: "Apparel",  
      description: "Premium cotton tee with our signature logo. Comfortable fit perfect for concerts and everyday wear.",  
      colors: ["Black", "White", "Gold"],  
      sizes: ["S", "M", "L", "XL", "XXL"],  
      featured: true,  
      inStock: true,  
      rating: 4.8,  
      reviews: 124  
    },  
    {  
      id: 2,  
      name: "Limited Edition Hoodie",  
      price: "KSh 4,500",  
      originalPrice: "KSh 5,200",  
      category: "Apparel",  
      description: "Cozy hoodie perfect for Nairobi evenings. Features embroidered logo and tour dates.",  
      colors: ["Black", "Navy", "Maroon"],  
      sizes: ["S", "M", "L", "XL"],  
      featured: true,  
      inStock: true,  
      rating: 4.9,  
      reviews: 89  
    },  
    {  
      id: 3,  
      name: "Kodong Klan Snapback Cap",  
      price: "KSh 1,800",  
      originalPrice: "KSh 2,200",  
      category: "Accessories",  
      description: "Adjustable snapback cap with embroidered logo. One size fits all.",  
      colors: ["Black", "White", "Gold"],  
      sizes: ["One Size"],  
      featured: false,  
      inStock: true,  
      rating: 4.7,  
      reviews: 67  
    },  
    {  
      id: 4,  
      name: "Vinyl Record - Greatest Hits",  
      price: "KSh 3,200",  
      originalPrice: "KSh 3,800",  
      category: "Music",  
      description: "Limited edition vinyl featuring our most popular tracks. Collector's item with special packaging.",  
      colors: ["Black"],  
      sizes: ["Standard"],  
      featured: true,  
      inStock: true,  
      rating: 5.0,  
      reviews: 45  
    },  
    {  
      id: 5,  
      name: "Kodong Klan Tote Bag",  
      price: "KSh 1,200",  
      originalPrice: "KSh 1,500",  
      category: "Accessories",  
      description: "Eco-friendly canvas tote bag. Perfect for shopping or carrying your essentials.",  
      colors: ["Natural", "Black"],  
      sizes: ["One Size"],  
      featured: false,  
      inStock: true,  
      rating: 4.6,  
      reviews: 32  
    },  
    {  
      id: 6,  
      name: "Signed Photo Print",  
      price: "KSh 800",  
      originalPrice: "KSh 1,000",  
      category: "Collectibles",  
      description: "High-quality photo print signed by all band members. Limited quantity available.",  
      colors: ["Color"],  
      sizes: ["8x10"],  
      featured: false,  
      inStock: false,  
      rating: 4.9,  
      reviews: 78  
    },  
    {  
      id: 7,  
      name: "Kodong Klan Keychain",  
      price: "KSh 400",  
      originalPrice: "KSh 600",  
      category: "Accessories",  
      description: "Metal keychain with enamel logo. Perfect small gift for fans.",  
      colors: ["Gold", "Silver"],  
      sizes: ["One Size"],  
      featured: false,  
      inStock: true,  
      rating: 4.5,  
      reviews: 156  
    },  
    {  
      id: 8,  
      name: "Tour Poster Collection",  
      price: "KSh 1,500",  
      originalPrice: "KSh 2,000",  
      category: "Collectibles",  
      description: "Set of 3 concert posters from our major tours. High-quality prints suitable for framing.",  
      colors: ["Full Color"],  
      sizes: ["A3"],  
      featured: false,  
      inStock: true,  
      rating: 4.8,  
      reviews: 23  
    }  
  ];  
  
  const categories = ["All", "Apparel", "Accessories", "Music", "Collectibles"];  
  
  const filteredItems = selectedCategory === "All"   
    ? merchItems   
    : merchItems.filter(item => item.category === selectedCategory);  
  
  const featuredItems = merchItems.filter(item => item.featured);  
  
  const renderStars = (rating: number) => {  
    return [...Array(5)].map((_, i) => (  
      <Star   
        key={i}   
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}   
      />  
    ));  
  };  
  
  return (  
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">  
      <div className="container mx-auto px-4">  
        {/* Section Header */}  
        <div className="text-center mb-16 animate-fade-in-up">  
          <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground mb-6">  
            Official  
            <span className="text-transparent bg-clip-text gold-gradient"> Merch</span>  
          </h2>  
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">  
            Show your love for Kodong Klan with our exclusive merchandise.   
            Every purchase supports the collective and helps us create more music.  
          </p>  
        </div>  
  
        {/* Trust Indicators */}  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">  
          <div className="flex items-center gap-3 p-4 bg-card rounded-lg card-gradient">  
            <Truck className="w-8 h-8 text-primary" />  
            <div>  
              <h4 className="font-display font-bold text-foreground">Free Shipping</h4>  
              <p className="text-sm text-muted-foreground">On orders over KSh 3,000</p>  
            </div>  
          </div>  
          <div className="flex items-center gap-3 p-4 bg-card rounded-lg card-gradient">  
            <Shield className="w-8 h-8 text-primary" />  
            <div>  
              <h4 className="font-display font-bold text-foreground">Secure Payment</h4>  
              <p className="text-sm text-muted-foreground">100% secure checkout</p>  
            </div>  
          </div>  
          <div className="flex items-center gap-3 p-4 bg-card rounded-lg card-gradient">  
            <Package className="w-8 h-8 text-primary" />  
            <div>  
              <h4 className="font-display font-bold text-foreground">Quality Guarantee</h4>  
              <p className="text-sm text-muted-foreground">Premium materials only</p>  
            </div>  
          </div>  
        </div>  
  
        {/* Featured Items */}  
        <div className="mb-16">  
          <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">  
            Featured Items  
          </h3>  
            
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">  
            {featuredItems.map((item) => (  
              <div key={item.id} className="bg-card rounded-2xl p-6 card-gradient hover:shadow-xl transition-all duration-300 group animate-fade-in-up">  
                <div className="relative mb-4">  
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">  
                    <div className="text-6xl text-primary/40">  
                      {item.category === "Music" ? "🎵" :   
                       item.category === "Accessories" ? "🧢" :   
                       item.category === "Collectibles" ? "🖼️" : "👕"}  
                    </div>  
                  </div>  
                  {item.originalPrice && (  
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">  
                      SALE  
                    </div>  
                  )}  
                  <button className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">  
                    <Heart className="w-6 h-6 text-muted-foreground hover:text-red-500 transition-colors" />  
                  </button>  
                </div>  
                  
                <div className="text-xs text-primary font-medium mb-2 uppercase tracking-wider">  
                  {item.category}  
                </div>  
                  
                <h4 className="font-display font-bold text-lg text-foreground mb-2">  
                  {item.name}  
                </h4>  
                  
                <p className="text-muted-foreground font-body text-sm mb-3">  
                  {item.description}  
                </p>  
  
                <div className="flex items-center gap-1 mb-3">  
                  {renderStars(item.rating)}  
                  <span className="text-sm text-muted-foreground ml-2">({item.reviews})</span>  
                </div>  
                  
                <div className="flex items-center justify-between mb-4">  
                  <div className="flex items-center gap-2">  
                    <span className="font-display font-bold text-lg text-primary">  
                      {item.price}  
                    </span>  
                    {item.originalPrice && (  
                      <span className="text-sm text-muted-foreground line-through">  
                        {item.originalPrice}  
                      </span>  
                    )}  
                  </div>  
                  <span className={`text-xs px-2 py-1 rounded-full ${  
                    item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'  
                  }`}>  
                    {item.inStock ? 'In Stock' : 'Sold Out'}  
                  </span>  
                </div>  
                  
                <button   
                  className={`w-full flex items-center justify-center gap-3 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${  
                    item.inStock   
                      ? 'btn-hero'   
                      : 'bg-muted text-muted-foreground cursor-not-allowed'  
                  }`}  
                  disabled={!item.inStock}  
                >  
                  <ShoppingCart className="w-4 h-4" />  
                  {item.inStock ? 'Add to Cart' : 'Sold Out'}  
                </button>  
              </div>  
            ))}  
          </div>  
        </div>  
  
        {/* Category Filter */}  
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">  
          {categories.map((category) => (  
            <button  
              key={category}  
              onClick={() => setSelectedCategory(category)}  
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${  
                selectedCategory === category  
                  ? "bg-primary text-primary-foreground shadow-lg"  
                  : "bg-card text-muted-foreground hover:bg-primary/10 hover:text-primary"  
              }`}  
            >  
              {category}  
            </button>  
          ))}  
        </div>  
  
        {/* All Items Grid */}  
        <div className="mb-16">  
          <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8 text-center">  
            {selectedCategory === "All" ? "All Products" : selectedCategory}  
          </h3>  
            
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">  
            {filteredItems.map((item, index) => (  
              <div   
                key={item.id}  
                className="bg-card rounded-xl p-6 card-gradient hover:shadow-xl transition-all duration-300 group animate-scale-in"  
                style={{ animationDelay: `${index * 0.1}s` }}  
              >  
                <div className="relative mb-4">  
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">  
                    <div className="text-4xl text-primary/40">  
                      {item.category === "Music" ? "🎵" :   
                       item.category === "Accessories" ? "🧢" :   
                       item.category === "Collectibles" ? "🖼️" : "👕"}  
                    </div>  
                  </div>  
                  {item.originalPrice && (  
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">  
                      SALE  
                    </div>  
                  )}  
                </div>  
                  
                <div className="text-xs text-primary font-medium mb-2 uppercase tracking-wider">  
                  {item.category}  
                </div>  
                  
                <h4 className="font-display font-bold text-lg text-foreground mb-2">  
                  {item.name}  
                </h4>  
                  
                <div className="flex items-center gap-1 mb-3">  
                  {renderStars(item.rating)}  
                  <span className="text-sm text-muted-foreground ml-1">({item.reviews})</span>  
                </div>  
                  <div className="flex items-center justify-between mb-4">  
                  <div className="flex items-center gap-2">  
                    <span className="font-display font-bold text-lg text-primary">  
                      {item.price}  
                    </span>  
                    {item.originalPrice && (  
                      <span className="text-sm text-muted-foreground line-through">  
                        {item.originalPrice}  
                      </span>  
                    )}  
                  </div>  
                  <button className="btn-outline-gold text-sm px-4 py-2">  
                    View Details  
                  </button>  
                </div>  
              </div>  
            ))}  
          </div>  
        </div>  
         {/* Call to Action */}  
        <div className="text-center animate-fade-in-up">  
          <div className="bg-card rounded-2xl p-8 md:p-12 card-gradient">  
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gold-gradient mb-6 animate-glow-pulse">  
              <ShoppingCart className="w-8 h-8 text-primary-foreground" />  
            </div>  
            <h3 className="font-display font-bold text-2xl text-foreground mb-4">  
              Support the Music  
            </h3>  
            <p className="font-body text-muted-foreground mb-6 max-w-2xl mx-auto">  
              Every purchase directly supports Kodong Klan and helps us continue creating   
              the music you love. Thank you for being part of our journey.  
            </p>  
            <button className="btn-hero">  
              Shop All Items  
            </button>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  
  
export default Merch;
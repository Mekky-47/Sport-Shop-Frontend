export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-24 w-full">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800" 
            alt="About us" 
            className="rounded-3xl shadow-2xl object-cover aspect-square w-full"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
            Built For <br/><span className="text-orange-600">Athletes.</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Since our founding, SportShop has been dedicated to providing top-tier athletic gear for everyone from seasoned professionals to weekend warriors. 
            We believe that the right equipment can make the difference between a good workout and a great one.
          </p>
          <div className="space-y-4 text-gray-800 font-medium">
            <p>🏅 Premium Quality Materials</p>
            <p>👟 Expertly Curated Selection</p>
            <p>🌍 Worldwide Shipping Delivered Fast</p>
          </div>
        </div>
      </div>
    </div>
  );
}

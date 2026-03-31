import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Fetch products and select 3 featured items
    fetchProducts().then(res => setFeatured(res.data.slice(0, 3))).catch(err => console.error(err));
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1920" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70" 
          alt="Sports hero background"
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none shadow-sm">
            Unleash Your <br/><span className="text-orange-500">True Potential</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-gray-200 max-w-lg mb-4">
            Premium gear for elite athletes and weekend warriors alike. Push harder, run faster, lift heavier.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/products" 
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-xl flex items-center gap-2"
            >
              Shop Collection <ChevronRight size={20}/>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Simple Banner */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Shoes', 'Jerseys', 'Equipment'].map((cat, i) => (
              <Link 
                key={i} 
                to={`/products?category=${cat}`}
                className="group relative h-64 md:h-80 overflow-hidden rounded-2xl shadow-md border"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
                <img 
                  src={
                    i === 0 ? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" :
                    i === 1 ? "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=800" :
                    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
                  } 
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  alt={cat}
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-black uppercase tracking-wider">{cat}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight">Featured Gear</h2>
            <p className="text-gray-500 mt-2 text-lg">Hand-picked essentials for your next workout.</p>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-2 font-bold text-gray-900 border-b-2 border-transparent hover:border-black transition-all pb-1">
            View All <ChevronRight size={18}/>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(product => (
            <Link key={product.id} to={`/products/${product.id}`} className="group flex flex-col gap-4">
              <div className="bg-gray-100 rounded-3xl aspect-[4/5] overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div>
                <h3 className="text-lg font-bold truncate">{product.name}</h3>
                <p className="text-gray-500">{product.category?.name || 'Category'}</p>
                <div className="font-bold text-lg mt-1">${product.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, ChevronLeft } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );

  if (!product) return <div className="text-center mt-20 text-2xl font-black uppercase text-gray-500">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 w-full">
      <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-black mb-8 font-medium transition-colors">
        <ChevronLeft size={20} /> Back to Shop
      </Link>
      
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center md:items-start">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-100 rounded-[2rem] p-4 aspect-square relative overflow-hidden flex items-center justify-center group shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover absolute inset-0" 
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col pt-4">
          <div className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">
            {product.category?.name || 'Category'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-4">
            {product.name}
          </h1>
          <p className="text-3xl font-light text-gray-900 mb-8 border-b pb-8">
            ${product.price}
          </p>
          
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description || 'Premium gear built for ultimate performance and style. Guaranteed to elevate your game.'}
            </p>
            
            <button 
              onClick={handleAddToCart}
              className={`w-full md:w-auto px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-3 ${
                added 
                  ? 'bg-green-600 text-white shadow-green-200' 
                  : 'bg-black text-white hover:bg-gray-800 hover:scale-105 shadow-xl'
              }`}
            >
              <ShoppingBag size={20}/>
              {added ? 'Added to Bag' : 'Add to Bag'}
            </button>
            
            <div className="mt-8 pt-8 border-t flex flex-col gap-4 text-sm font-medium text-gray-500">
              <p>✔ Free shipping on orders over $100</p>
              <p>✔ 30-day return policy for all unworn gear</p>
              <p>✔ Authenticity guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

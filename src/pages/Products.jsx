import { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, Search } from 'lucide-react';
import * as Toast from '@radix-ui/react-toast';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const catFilter = searchParams.get('category');
  
  const { addToCart } = useContext(CartContext);
  const [toastOpen, setToastOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(res => {
        let sorted = res.data;
        if (catFilter) {
          sorted = sorted.filter(p => p.category?.name.toLowerCase() === catFilter.toLowerCase());
        }
        setProducts(sorted);
      })
      .catch(err => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [catFilter]);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent Navigation on card click
    addToCart(product);
    setLastAdded(product.name);
    setToastOpen(true);
  };

  return (
    <Toast.Provider swipeDirection="right">
      <div className="max-w-7xl mx-auto px-4 py-8 pb-24 w-full">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-gray-50 p-6 md:p-12 rounded-3xl">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              {catFilter ? `${catFilter} Collection` : 'All Gear'}
            </h1>
            <p className="text-gray-500 mt-2 text-lg">Showing {products.length} products</p>
          </div>
          
          <div className="relative w-full md:w-auto">
             <input 
               type="text" 
               placeholder="Search currently..." 
               className="w-full md:w-80 pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
               disabled
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Loading State or Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map(product => (
              <Link key={product.id} to={`/products/${product.id}`} className="group flex flex-col gap-4">
                <div className="bg-gray-100 rounded-[2rem] p-4 aspect-[4/5] relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Quick Add Button showing on hover */}
                  <div className="absolute bottom-4 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-black/90 hover:bg-black backdrop-blur text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 transform active:scale-95 transition-all w-11/12 justify-center"
                    >
                      <ShoppingCart size={18}/> Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="px-2">
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors truncate">{product.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-500 text-sm">{product.category?.name || 'Category'}</span>
                    <span className="font-black text-lg">${product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>

      {/* Radix Toast Notification */}
      <Toast.Root 
        className="bg-white rounded-xl shadow-2xl p-4 border border-gray-200 grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-4 items-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-out"
        open={toastOpen} 
        onOpenChange={setToastOpen}
      >
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-700 p-2 rounded-full">
            <ShoppingCart size={20}/>
          </div>
          <div>
            <Toast.Title className="font-bold text-gray-900 text-sm">Added to bag</Toast.Title>
            <Toast.Description className="text-gray-500 text-sm">{lastAdded}</Toast.Description>
          </div>
        </div>
        <Toast.Action asChild altText="View Cart" className="[grid-area:_action]">
          <Link to="/cart" className="bg-gray-100 hover:bg-gray-200 text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            View
          </Link>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-2 w-[390px] max-w-[100vw] m-0 list-none z-[100] outline-none" />
    </Toast.Provider>
  );
}

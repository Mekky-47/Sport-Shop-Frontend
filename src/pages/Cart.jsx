import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 w-full flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">Your Bag is Empty</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md">Once you add something to your bag, it will appear here. Ready to get started?</p>
        <Link 
          to="/products"
          className="bg-black hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-full transition-transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full lg:flex lg:gap-12">
      {/* Items Section */}
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8">Bag</h1>
        
        <div className="flex flex-col gap-6">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 md:gap-6 pb-6 border-b border-gray-200">
              {/* Product Image */}
              <Link to={`/products/${item.id}`} className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover absolute inset-0" />
              </Link>
              
              {/* Details & Controls */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg md:text-xl text-gray-900 tracking-tight leading-tight mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm md:text-base">{item.category?.name || 'Category'}</p>
                  </div>
                  <p className="font-bold text-lg">{`$${item.price}`}</p>
                </div>
                
                <div className="flex justify-between items-end mt-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 bg-gray-100 rounded-full px-3 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-gray-500 hover:text-black transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-gray-500 hover:text-black transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  {/* Remove Item */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-2"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary Section */}
      <div className="lg:w-1/3 mt-12 lg:mt-0">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Summary</h2>
        <div className="bg-gray-50 p-6 md:p-8 rounded-3xl flex flex-col gap-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Estimated Delivery & Handling</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between text-gray-600 border-b border-gray-200 pb-4">
            <span>Taxes</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
          
          <div className="flex justify-between font-black text-xl md:text-2xl mt-2 mb-6 uppercase">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <Link 
            to="/checkout"
            className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-full transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Checkout <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}

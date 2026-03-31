import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { placeOrder } from '../services/api';
import { CheckCircle2, ChevronLeft } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const orderData = {
        ...formData,
        total_price: cartTotal
      };
      
      await placeOrder(orderData);
      setSuccess(true);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If order is successful, display success screen
  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <CheckCircle2 size={80} className="text-green-500 mb-6" />
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-center mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 text-lg text-center mb-8 max-w-md">
          Thank you for choosing SportShop. We'll send a confirmation email with your tracking details soon.
        </p>
        <Link 
          to="/products"
          className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-full font-bold transition-all shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Redirect if cart is empty
  if (cart.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 w-full">
      <Link to="/cart" className="inline-flex items-center text-gray-500 hover:text-black mb-8 font-medium transition-colors">
        <ChevronLeft size={20} /> Return to Cart
      </Link>
      
      <h1 className="text-4xl font-black uppercase tracking-tight mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-bold mb-6 border-b pb-2">Delivery Details</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 border border-red-200 rounded-lg mb-6 text-sm font-medium">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="customer_name">Full Name</label>
              <input
                id="customer_name"
                name="customer_name"
                type="text"
                required
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="+1 234 567 8900"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="123 Sport Street, City, Country"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`mt-4 w-full font-bold uppercase tracking-wider py-4 rounded-full transition-transform text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-900 shadow-xl hover:-translate-y-1'}`}
            >
              {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>
        
        {/* Order Summary Summary */}
        <div>
          <div className="bg-gray-50 p-6 rounded-3xl sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 border">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-2 border-t pt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-black text-xl mt-2 uppercase">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

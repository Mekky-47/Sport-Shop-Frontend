import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Navbar() {
  const { cartCount } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-shrink-0 items-center gap-2">
            <span className="text-2xl font-black italic tracking-tighter uppercase text-primary">Sport<span className="text-orange-600">Shop</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <Link to="/" className="text-gray-900 hover:text-orange-600 transition-colors">Home</Link>
            <Link to="/products" className="text-gray-900 hover:text-orange-600 transition-colors">Shop</Link>
            <Link to="/about" className="text-gray-900 hover:text-orange-600 transition-colors">About</Link>
            <Link to="/contact" className="text-gray-900 hover:text-orange-600 transition-colors">Contact</Link>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="text-gray-700 hover:text-black">
                  <User size={24} strokeWidth={1.5} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-[150px] bg-white rounded-md p-2 shadow-lg border mt-2 mr-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <DropdownMenu.Item className="px-3 py-2 text-sm outline-none cursor-pointer hover:bg-gray-100 rounded">
                    Log in
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="px-3 py-2 text-sm outline-none cursor-pointer hover:bg-gray-100 rounded">
                    Sign up
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <Link to="/cart" className="relative text-gray-700 hover:text-black flex items-center">
              <ShoppingCart size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <Link to="/cart" className="relative text-gray-700 hover:text-black flex items-center">
              <ShoppingCart size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="text-gray-700 hover:text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 absolute w-full left-0">
          <div className="flex flex-col space-y-4 px-4 font-medium">
            <Link onClick={() => setMobileMenuOpen(false)} to="/" className="text-gray-900 border-b pb-2">Home</Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/products" className="text-gray-900 border-b pb-2">Shop</Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/about" className="text-gray-900 border-b pb-2">About</Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/contact" className="text-gray-900">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

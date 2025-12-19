import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Footer from '@/components/home/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import logoImage from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'About', page: 'About' },
  { name: 'Cake Shop', page: 'CakeShop' },
  { name: 'Flavours', page: 'Flavours' },
  { name: 'FAQ', page: 'FAQ' },
  { name: 'Contact', page: 'Contact' },
];

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const { data: cartItems = [] } = useQuery({
    queryKey: ['cartItems'],
    queryFn: () => base44.entities.CartItem.list(),
    initialData: [],
  });

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Handle initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const isHome = currentPageName === 'Home';

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="min-h-screen flex flex-col">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --font-serif: 'Cormorant Garamond', serif;
          --font-sans: 'Inter', sans-serif;
        }
        
        body {
          font-family: var(--font-sans);
        }
        
        .font-serif {
          font-family: var(--font-serif);
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:justify-between h-20">
            {/* Mobile: Center logo, hide on mobile and show cart/menu on sides */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <div className="w-10"></div> {/* Spacer */}
              <Link to={createPageUrl('Home')} className="flex items-center">
                <img 
                  src={logoImage} 
                  alt="Cake'd by Adorable" 
                  className="h-28 w-auto"
                />
              </Link>
              <div className="flex items-center gap-4">
                <Link to={createPageUrl('Cart')}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative ${scrolled || !isHome ? 'text-stone-700' : 'text-stone-700'}`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-400 text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  </Button>
                </Link>
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="w-6 h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-80 p-0">
                    <div className="flex flex-col h-full">
                      <div className="p-6 border-b flex justify-center">
                        <img 
                          src={logoImage} 
                          alt="Cake'd by Adorable" 
                          className="h-24 w-auto"
                        />
                      </div>
                      <nav className="flex-1 p-6">
                        <ul className="space-y-4">
                          {navLinks.map((link) => (
                            <li key={link.page}>
                              <Link
                                to={createPageUrl(link.page)}
                                className={`block py-2 text-lg font-medium transition-colors ${
                                  currentPageName === link.page
                                    ? 'text-rose-500'
                                    : 'text-stone-600 hover:text-stone-900'
                                }`}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </nav>
                      <div className="p-6 border-t">
                        <Link to={createPageUrl('Cart')}>
                          <Button className="w-full bg-stone-800 hover:bg-stone-900 rounded-full">
                            View Cart ({cartCount})
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between w-full">
              {/* Logo */}
              <Link to={createPageUrl('Home')} className="flex items-center mt-8">
                <img 
                  src={logoImage} 
                  alt="Cake'd by Adorable" 
                  className="h-40 w-auto"
                />
              </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`text-sm font-medium transition-colors relative group ${
                    scrolled || !isHome ? 'text-stone-600 hover:text-stone-900' : 'text-stone-700 hover:text-stone-900'
                  } ${currentPageName === link.page ? 'text-rose-500' : ''}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-400 transition-all group-hover:w-full ${
                    currentPageName === link.page ? 'w-full' : ''
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Desktop Cart */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to={createPageUrl('Cart')}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative ${scrolled || !isHome ? 'text-stone-700' : 'text-stone-700'}`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-400 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                </Button>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className={`flex-1 ${!isHome ? 'pt-20' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
      </div>
    </>
  );
}
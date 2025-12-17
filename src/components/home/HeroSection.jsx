import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-cream-50 to-amber-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-rose-100/20 to-amber-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-stone-600">Handcrafted with Love</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium text-stone-800 leading-tight mb-6">
              Creating Sweet
              <span className="block text-rose-400">Memories</span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Exquisite bespoke cakes for weddings, birthdays, and every special occasion. 
              Each creation is a masterpiece, crafted with the finest ingredients and endless passion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to={createPageUrl('About')}>
                <Button 
                  size="lg" 
                  className="bg-stone-800 hover:bg-stone-900 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-stone-800/20 transition-all duration-300 hover:shadow-xl hover:shadow-stone-800/30 hover:-translate-y-0.5"
                >
                  About Us
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl('CakeShop')}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white px-8 py-6 text-base rounded-full transition-all duration-300 hover:-translate-y-0.5"
                >
                  View Gallery
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative ring */}
              <div className="absolute inset-0 border-2 border-rose-200/50 rounded-full animate-pulse" />
              <div className="absolute inset-4 border border-amber-200/50 rounded-full" />
              
              {/* Main image container */}
              <div className="absolute inset-8 rounded-full overflow-hidden shadow-2xl shadow-stone-300/50">
                <img
                  src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80"
                  alt="Elegant wedding cake"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 right-8 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                    <span className="text-2xl">🎂</span>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Happy Customers</p>
                    <p className="font-semibold text-stone-800">2,500+</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 left-8 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">5-Star Reviews</p>
                    <p className="font-semibold text-stone-800">500+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-stone-300 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
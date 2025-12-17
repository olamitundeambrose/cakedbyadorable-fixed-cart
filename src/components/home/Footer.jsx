import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Phone, Mail, MapPin, Instagram, Facebook, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif text-white mb-4">Creative Cakes</h3>
            <p className="text-stone-400 mb-6 max-w-md leading-relaxed">
              Crafting exquisite bespoke cakes for weddings, birthdays, and every special occasion. 
              Each creation is a masterpiece made with love and the finest ingredients.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'CakeShop', 'Flavours', 'FAQ', 'Contact'].map((page) => (
                <li key={page}>
                  <Link 
                    to={createPageUrl(page)} 
                    className="text-stone-400 hover:text-rose-400 transition-colors"
                  >
                    {page === 'CakeShop' ? 'Cake Shop' : page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+353877638300" 
                  className="flex items-center gap-3 text-stone-400 hover:text-rose-400 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +353 87-763-8300
                </a>
              </li>
              <li>
                <a 
                  href="mailto:michael@creativecakes.ie" 
                  className="flex items-center gap-3 text-stone-400 hover:text-rose-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  michael@creativecakes.ie
                </a>
              </li>
              <li className="flex items-start gap-3 text-stone-400">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  7 The Business Centre,<br />
                  Stadium Business Park,<br />
                  Blanchardstown, Dublin 15
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} Creative Cakes. All rights reserved.
          </p>
          <p className="text-stone-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> in Dublin
          </p>
        </div>
      </div>
    </footer>
  );
}
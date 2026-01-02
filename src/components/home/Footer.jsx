import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Phone, Mail, MapPin, Instagram, Facebook, Heart, MessageCircle } from 'lucide-react';
import logoImage from '@/assets/logo.png';

// Custom social media icons
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          {/* Logo and Description - Full Width Centered */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img 
                src={logoImage} 
                alt="Cake'd by Adorable" 
                className="h-28 w-auto"
              />
            </div>
            <p className="text-pink-200 max-w-2xl leading-relaxed mx-auto text-lg">
              Crafting exquisite bespoke cakes for weddings, birthdays, and every special occasion. 
              Each creation is a masterpiece made with love and the finest ingredients.
            </p>
          </div>

          {/* Footer Content Grid */}
          <div className="grid md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-1">
                {['Home', 'About', 'CakeShop', 'Flavours', 'FAQ', 'Contact'].map((page) => (
                  <Link 
                    key={page}
                    to={createPageUrl(page)} 
                    className="text-pink-200 hover:text-pink-400 transition-colors text-base"
                  >
                    {page === 'CakeShop' ? 'Cake Shop' : page}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="tel:+3530894405401" 
                    className="flex items-center gap-3 text-pink-200 hover:text-pink-400 transition-colors justify-center text-base"
                  >
                    <Phone className="w-5 h-5" />
                    +353 089-440-5401
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:adorablecakesie@gmail.com" 
                    className="flex items-center gap-3 text-pink-200 hover:text-pink-400 transition-colors justify-center text-base"
                  >
                    <Mail className="w-5 h-5" />
                    adorablecakesie@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-pink-200 justify-center text-base">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Kilcock, Kildare</span>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Follow Us</h4>
              <div className="flex gap-4 justify-center">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center hover:bg-pink-400 text-black transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center hover:bg-pink-400 text-black transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center hover:bg-pink-400 text-black transition-colors"
                >
                  <TikTokIcon />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center hover:bg-pink-400 text-black transition-colors"
                >
                  <YouTubeIcon />
                </a>
                <a 
                  href="https://wa.me/3530894405401" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center hover:bg-pink-400 text-black transition-colors"
                >
                  <WhatsAppIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-pink-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-pink-200 text-sm">
            © 2026 Cake'd by Adorable. All rights reserved.
          </p>
          <p className="text-pink-200 text-sm flex items-center gap-1 justify-center sm:justify-start">
            Made with <Heart className="w-4 h-4 text-pink-400 fill-pink-400" /> in Kilcock, Kildare
          </p>
        </div>
      </div>
    </footer>
  );
}
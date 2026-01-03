import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChefHat, Cake, Palette, ArrowRight } from 'lucide-react';

const CakeBuilderPromo = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
            <ChefHat className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-black">Custom Cake Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-black mb-6">
            Create Your Perfect Cake
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Design your dream cake with our interactive builder. Choose from premium ingredients 
            and decorations to create something truly special for your celebration.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Cake className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Choose Your Size</h3>
              <p className="text-gray-600">From intimate 6" cakes to celebration sheet cakes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Premium Flavors</h3>
              <p className="text-gray-600">Vanilla, chocolate, red velvet, and artisan options</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Custom Decorations</h3>
              <p className="text-gray-600">From simple elegance to luxury themed designs</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link to={createPageUrl('CakeShop')}>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-full">
              Build Your Cake Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CakeBuilderPromo;

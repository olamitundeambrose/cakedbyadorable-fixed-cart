import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Star } from 'lucide-react';

const flavours = [
  {
    name: "Classic Vanilla",
    description: "Light, moist vanilla sponge with Madagascar vanilla bean buttercream",
    color: "from-amber-100 to-amber-50",
    popular: true
  },
  {
    name: "Belgian Chocolate",
    description: "Rich Belgian chocolate sponge with silky chocolate ganache",
    color: "from-stone-200 to-stone-100",
    popular: true
  },
  {
    name: "Lemon Drizzle",
    description: "Zesty lemon sponge soaked in lemon syrup with citrus buttercream",
    color: "from-yellow-100 to-yellow-50",
    popular: false
  },
  {
    name: "Red Velvet",
    description: "Traditional red velvet with cream cheese frosting",
    color: "from-rose-100 to-rose-50",
    popular: true
  },
  {
    name: "Carrot Cake",
    description: "Spiced carrot cake with walnuts and cream cheese frosting",
    color: "from-orange-100 to-orange-50",
    popular: false
  },
  {
    name: "Salted Caramel",
    description: "Buttery caramel sponge with sea salt caramel drizzle",
    color: "from-amber-200 to-amber-100",
    popular: true
  },
  {
    name: "Coffee & Walnut",
    description: "Coffee-infused sponge with espresso buttercream and toasted walnuts",
    color: "from-stone-300 to-stone-200",
    popular: false
  },
  {
    name: "Chocolate Biscuit",
    description: "Our signature Belgian chocolate biscuit cake - no baking, pure indulgence",
    color: "from-stone-400 to-stone-300",
    popular: true
  },
  {
    name: "Fresh Strawberry",
    description: "Light vanilla sponge with fresh strawberries and cream",
    color: "from-pink-100 to-pink-50",
    popular: false
  },
  {
    name: "Coconut Lime",
    description: "Tropical coconut sponge with tangy lime curd filling",
    color: "from-green-100 to-green-50",
    popular: false
  },
  {
    name: "Almond & Raspberry",
    description: "Almond sponge with raspberry jam and almond buttercream",
    color: "from-red-100 to-red-50",
    popular: false
  },
  {
    name: "Madeira",
    description: "Traditional dense, moist Madeira cake - perfect for sculpted cakes",
    color: "from-yellow-200 to-yellow-100",
    popular: false
  }
];

export default function Flavours() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-rose-400 font-medium tracking-wider uppercase text-sm">Taste the Difference</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-800 mt-4 mb-4">
              Our Flavours
            </h1>
            <p className="text-stone-600 text-lg">
              From classic favourites to unique creations, every flavour is crafted using 
              the finest ingredients and traditional recipes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tasting Box CTA */}
      <section className="py-12 bg-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-serif text-white mb-2">Can't Decide?</h2>
              <p className="text-stone-400">Try our Cupcake Tasting Box with 6 signature flavours</p>
            </div>
            <Link to={`${createPageUrl('Booking')}?type=tasting`}>
              <Button className="bg-rose-400 hover:bg-rose-500 text-white rounded-full px-8 py-6">
                Order Tasting Box - €35
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Flavours Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {flavours.map((flavour, index) => (
              <motion.div
                key={flavour.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gradient-to-br ${flavour.color} rounded-3xl p-6 relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                {flavour.popular && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-stone-700">Popular</span>
                  </div>
                )}
                <h3 className="text-xl font-serif font-medium text-stone-800 mb-2">
                  {flavour.name}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {flavour.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Flavours */}
      <section className="py-24 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-800 mb-6">
              Custom Flavour Requests
            </h2>
            <p className="text-stone-600 text-lg mb-8">
              Don't see your favourite? We love creating custom flavour combinations. 
              Contact us to discuss your unique taste preferences.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-stone-800 hover:bg-stone-900 text-white rounded-full px-8 py-6">
                Discuss Custom Flavours
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Allergen Info */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-serif font-medium text-stone-800 mb-4">
              Allergen Information
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              All our cakes contain eggs, wheat, and dairy. Many contain nuts. 
              We can accommodate some dietary requirements including gluten-free options. 
              Please contact us to discuss your specific needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
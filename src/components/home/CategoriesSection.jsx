import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    title: "Wedding Cakes",
    description: "Timeless elegance for your special day",
    image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&q=80",
    category: "wedding"
  },
  {
    title: "Novelty Cakes",
    description: "Unique creations that tell your story",
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80",
    category: "novelty"
  },
  {
    title: "Corporate Cakes",
    description: "Professional designs for business events",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    category: "corporate"
  },
  {
    title: "Buttercream Collection",
    description: "Classic flavours, beautiful finishes",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80",
    category: "buttercream"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CategoriesSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rose-400 font-medium tracking-wider uppercase text-sm">Our Specialties</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-800 mt-3 mb-4">
            Explore Our Collections
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            From elegant wedding masterpieces to whimsical birthday creations, 
            discover the perfect cake for every celebration.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
            >
              <Link 
                to={`${createPageUrl('CakeShop')}?category=${category.category}`}
                className="group block relative aspect-[3/4] rounded-3xl overflow-hidden"
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <span>Explore</span>
                      <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
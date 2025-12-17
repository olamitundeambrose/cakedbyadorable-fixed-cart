import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, ChefHat, Truck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Find a Cake You Love",
    description: "Browse our portfolio and discover designs that inspire you. Every cake can be customized to your vision."
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Contact Us",
    description: "Discuss your event details, colors, flowers, and size. We'll guide you through every option."
  },
  {
    icon: ChefHat,
    number: "03",
    title: "We Create It",
    description: "Freshly baked using the finest ingredients. Each cake is a labor of love, crafted just for you."
  },
  {
    icon: Truck,
    number: "04",
    title: "We Deliver It",
    description: "Careful, reliable delivery to your location. Your cake arrives in perfect condition, ready to wow."
  }
];

export default function HowToOrderSection() {
  return (
    <section className="py-24 sm:py-32 bg-stone-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rose-300 font-medium tracking-wider uppercase text-sm">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white mt-3 mb-4">
            How to Order
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            From inspiration to celebration, we make the process 
            effortless and enjoyable.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative text-center group"
            >
              {/* Icon circle */}
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-stone-800 flex items-center justify-center mx-auto border border-stone-700 group-hover:border-rose-400/50 transition-colors duration-300">
                  <step.icon className="w-10 h-10 text-rose-400" />
                </div>
                {/* Step number */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-rose-400 text-stone-900 text-xs font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-serif font-medium text-white mb-3">
                {step.title}
              </h3>
              <p className="text-stone-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
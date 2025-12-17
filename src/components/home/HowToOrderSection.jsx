import React from 'react';
import { motion } from 'framer-motion';

// Custom cake-themed SVG icons
const CakeIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 text-rose-400" fill="currentColor">
    <path d="M8 32h48v24c0 2.2-1.8 4-4 4H12c-2.2 0-4-1.8-4-4V32z"/>
    <path d="M12 28h40v8H12z" opacity="0.7"/>
    <circle cx="20" cy="20" r="2"/>
    <circle cx="32" cy="18" r="2"/>
    <circle cx="44" cy="20" r="2"/>
    <path d="M20 22v6M32 20v8M44 22v6" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const WhiskIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 text-rose-400" fill="currentColor">
    <path d="M32 8L28 52h8L32 8z"/>
    <path d="M24 12l16 8-16 8 16 8-16 8" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="32" cy="8" r="3"/>
  </svg>
);

const OvenIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 text-rose-400" fill="currentColor">
    <rect x="8" y="16" width="48" height="40" rx="4"/>
    <rect x="12" y="20" width="40" height="32" rx="2" fill="rgba(0,0,0,0.3)"/>
    <circle cx="48" cy="12" r="2"/>
    <circle cx="52" cy="12" r="2"/>
    <path d="M16 28h32M16 36h32M16 44h32" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
  </svg>
);

const DeliveryIcon = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 text-rose-400" fill="currentColor">
    <path d="M8 20h32v24H8z"/>
    <path d="M40 28h12l4 8v8H40V28z"/>
    <circle cx="16" cy="52" r="4"/>
    <circle cx="48" cy="52" r="4"/>
    <path d="M24 12h8v8h-8z" opacity="0.7"/>
    <path d="M28 8v4M24 10h8" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const steps = [
  {
    icon: CakeIcon,
    number: "01",
    title: "Browse & Dream",
    description: "Explore our sweet gallery and discover designs that inspire you. Every cake can be customized to your vision."
  },
  {
    icon: WhiskIcon,
    number: "02",
    title: "Mix & Plan",
    description: "Share your event details, flavors, colors, and size. We'll whisk together the perfect plan for you."
  },
  {
    icon: OvenIcon,
    number: "03",
    title: "Bake & Craft",
    description: "Freshly baked using the finest ingredients. Each cake is lovingly crafted in our kitchen just for you."
  },
  {
    icon: DeliveryIcon,
    number: "04",
    title: "Slice & Celebrate",
    description: "Careful delivery to your celebration. Your masterpiece arrives ready to create sweet memories."
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
                  <step.icon />
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
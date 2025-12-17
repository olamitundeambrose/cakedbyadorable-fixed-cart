import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    name: "Sarah & Michael",
    event: "Wedding Cake",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    text: "Creative Cakes made our dream wedding cake a reality. The attention to detail was incredible, and it tasted even better than it looked! Our guests are still talking about it.",
    rating: 5
  },
  {
    name: "Emma O'Brien",
    event: "Birthday Celebration",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    text: "The novelty cake for my daughter's 5th birthday was absolutely perfect. She was over the moon! Professional service from start to finish.",
    rating: 5
  },
  {
    name: "David Murphy",
    event: "Corporate Event",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    text: "We've used Creative Cakes for all our company events. Always reliable, always delicious, and the presentation is consistently stunning.",
    rating: 5
  },
  {
    name: "Jennifer Kelly",
    event: "Anniversary Cake",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    text: "Michael truly understood our vision for our 25th anniversary. The cake was a masterpiece and the flavours were divine. Highly recommend!",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-rose-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rose-400 font-medium tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-800 mt-3 mb-4">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-stone-100"
              >
                {/* Quote icon */}
                <div className="absolute -top-6 left-8 sm:left-12">
                  <div className="w-12 h-12 bg-rose-400 rounded-2xl flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="pt-4">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-lg sm:text-xl text-stone-700 leading-relaxed mb-8 italic">
                    "{testimonials[current].text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-stone-800">{testimonials[current].name}</p>
                      <p className="text-sm text-stone-500">{testimonials[current].event}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full w-12 h-12 border-stone-200 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current ? 'w-8 bg-rose-400' : 'bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full w-12 h-12 border-stone-200 hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
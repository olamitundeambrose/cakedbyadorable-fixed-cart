import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Award, Heart, Clock, Users, ArrowRight } from 'lucide-react';
import AdorableImage from '@/assets/Adorable.jpeg';
import AdorableCakeImage from '@/assets/adorablecake1.jpeg';

const stats = [
  { icon: Award, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Heart, value: 2500, suffix: "+", label: "Happy Customers" },
  { icon: Clock, value: 100, suffix: "%", label: "Fresh Ingredients" },
  { icon: Users, value: 50, suffix: "+", label: "Wedding Partners" },
];

const AnimatedCounter = ({ value, suffix, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const endValue = value;

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * endValue);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };

          animate();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-400 font-medium tracking-wider uppercase text-sm"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-stone-800 mt-4 mb-6"
            >
              Baking Happiness Since 2009
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-stone-600 leading-relaxed"
            >
              What started as a passion in a small Kilcock, Kildare kitchen has grown into one of Ireland's 
              most beloved cake studios. Every cake tells a story, and we're honoured to be part of yours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5]">
                <img
                  src={AdorableImage}
                  alt="Adorable - Master Baker"
                  className="w-full h-full object-cover object-top rounded-3xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-rose-400 font-medium tracking-wider uppercase text-sm">Meet the Team</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-800 mt-3 mb-6">
                The Master Bakers Behind Cake'd by Adorable
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  With over 15 years of experience in the art of cake making, we founded Cake'd by Adorable 
                  with a simple mission: to create unforgettable moments through extraordinary cakes.
                </p>
                <p>
                  Trained in classical patisserie and constantly innovating, we combine traditional 
                  techniques with modern design to create cakes that are as beautiful as they are delicious.
                </p>
                <p>
                  Every cake that leaves our studio is crafted with meticulous attention to detail, using 
                  only the finest ingredients sourced from local Irish suppliers wherever possible.
                </p>
              </div>
              <div className="mt-8">
                <Link to={createPageUrl('Contact')}>
                  <Button className="bg-stone-800 hover:bg-stone-900 text-white rounded-full px-8 py-6">
                    Get in Touch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-stone-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-rose-400/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-rose-400" />
                </div>
                <div className="text-4xl font-serif font-medium text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-stone-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-rose-400 font-medium tracking-wider uppercase text-sm">What We Believe</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-800 mt-3 mb-4">
              Our Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Quality First",
                description: "We never compromise on ingredients. Every cake is made with premium Belgian chocolate, real butter, and fresh eggs."
              },
              {
                title: "Personal Touch",
                description: "Every cake is unique. We work closely with each client to understand their vision and bring it to life."
              },
              {
                title: "Craftsmanship",
                description: "From the first sketch to the final decoration, every detail is crafted with precision and care."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-3xl p-8 text-center"
              >
                <h3 className="text-xl font-serif font-medium text-stone-800 mb-4">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-800 mb-6">
              Ready to Create Something Special?
            </h2>
            <p className="text-stone-600 text-lg mb-8">
              Let's discuss your dream cake. Whether it's a wedding, birthday, or any celebration, 
              we're here to make it unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('CakeShop')}>
                <Button className="bg-stone-800 hover:bg-stone-900 text-white rounded-full px-8 py-6">
                  Browse Our Cakes
                </Button>
              </Link>
              <Link to={createPageUrl('Booking')}>
                <Button variant="outline" className="border-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white rounded-full px-8 py-6">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
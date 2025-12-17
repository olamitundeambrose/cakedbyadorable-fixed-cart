import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Calendar, Gift, CreditCard, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Gift,
    title: "Cupcake Tasting Box",
    description: "Experience our 6 signature Madeira flavours plus our famous Belgian Chocolate Biscuit. The perfect way to choose your wedding cake flavours.",
    price: "€35",
    cta: "Order Tasting Box",
    type: "tasting",
    gradient: "from-rose-100 to-rose-50"
  },
  {
    icon: Calendar,
    title: "Wedding Consultation",
    description: "Book a 30-minute one-to-one appointment with our head baker. Discuss your vision, browse designs, and create your dream cake together.",
    price: "Free",
    cta: "Book Consultation",
    type: "consultation",
    gradient: "from-amber-100 to-amber-50"
  },
  {
    icon: CreditCard,
    title: "Secure Your Date",
    description: "Pay a deposit to reserve your wedding date. Finalize cake details closer to your big day. Peace of mind, guaranteed.",
    price: "€100 deposit",
    cta: "Secure Date",
    type: "deposit",
    gradient: "from-stone-100 to-stone-50"
  }
];

export default function WeddingServicesSection() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-rose-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-rose-400 font-medium tracking-wider uppercase text-sm">Wedding Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-stone-800 mt-3 mb-4">
            Your Dream Wedding Cake
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            From the first tasting to the final delivery, we're here to make your 
            wedding cake experience as magical as your special day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${service.gradient} rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-rose-100/50 hover:-translate-y-1`}>
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-rose-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-medium text-stone-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-stone-600 mb-6 flex-grow leading-relaxed">
                  {service.description}
                </p>

                {/* Price & CTA */}
                <div className="pt-6 border-t border-stone-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-serif font-medium text-stone-800">{service.price}</span>
                  </div>
                  <Link to={`${createPageUrl('Booking')}?type=${service.type}`}>
                    <Button 
                      className="w-full bg-stone-800 hover:bg-stone-900 text-white rounded-full py-6 group/btn"
                    >
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
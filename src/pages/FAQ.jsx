import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronDown, MessageCircle, ArrowRight } from 'lucide-react';

const faqs = [
  {
    category: "Ordering",
    questions: [
      {
        q: "How far in advance should I order my cake?",
        a: "We recommend ordering at least 2-4 weeks in advance for standard cakes. For wedding cakes and large custom orders, 3-6 months notice is ideal to ensure we can accommodate your date and design requirements."
      },
      {
        q: "How do I place an order?",
        a: "You can browse our collection online and add items to your cart, or contact us directly to discuss custom orders. For wedding cakes, we recommend booking a consultation to discuss your vision in detail."
      },
      {
        q: "Can I make changes to my order after placing it?",
        a: "Yes, changes can usually be accommodated up to 2 weeks before your event date. Please contact us as soon as possible if you need to make any modifications."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards, bank transfers, and cash payments. A 50% deposit is required to confirm your order, with the balance due upon collection or delivery."
      }
    ]
  },
  {
    category: "Wedding Cakes",
    questions: [
      {
        q: "Do you offer wedding cake consultations?",
        a: "Yes! We offer complimentary 30-minute consultations where we discuss your vision, browse designs, and sample flavours. Book your consultation through our website or by contacting us directly."
      },
      {
        q: "How much does a wedding cake cost?",
        a: "Wedding cake prices vary based on size, design complexity, and decorations. Our wedding cakes typically start from €350 for a simple 3-tier design. Contact us for a personalized quote."
      },
      {
        q: "Can you recreate a cake design I've seen elsewhere?",
        a: "Absolutely! Bring us photos or Pinterest boards for inspiration, and we'll work with you to create something similar or put our own unique spin on it."
      },
      {
        q: "Do you provide cake stands and serving equipment?",
        a: "Yes, we have a selection of cake stands available for hire. We also offer cutting sets and cake boxes for guests."
      }
    ]
  },
  {
    category: "Delivery & Collection",
    questions: [
      {
        q: "Do you deliver?",
        a: "Yes, we offer delivery throughout Dublin and surrounding areas. Delivery fees vary based on location. For wedding cakes, we include setup at your venue."
      },
      {
        q: "Can I collect my cake?",
        a: "Of course! Collection is available from our studio in Blanchardstown. We'll provide you with care instructions and transport tips."
      },
      {
        q: "How should I store my cake?",
        a: "Most of our cakes should be stored in a cool, dry place away from direct sunlight. Buttercream cakes can be refrigerated but should be brought to room temperature before serving."
      }
    ]
  },
  {
    category: "Dietary Requirements",
    questions: [
      {
        q: "Do you cater for dietary restrictions?",
        a: "Yes, we offer gluten-free, egg-free, and vegan options for most of our flavours. Please discuss your requirements when ordering so we can accommodate your needs."
      },
      {
        q: "Are your cakes suitable for vegetarians?",
        a: "Yes, all our cakes are suitable for vegetarians."
      },
      {
        q: "Do your cakes contain nuts?",
        a: "Some of our cakes contain nuts. All cakes are made in a kitchen where nuts are used. Please inform us of any allergies when ordering."
      }
    ]
  }
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-stone-800 pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-stone-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
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
            <span className="text-rose-400 font-medium tracking-wider uppercase text-sm">Got Questions?</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-800 mt-4 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-stone-600 text-lg">
              Find answers to common questions about ordering, delivery, and our cakes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {faqs.map((section, sectionIndex) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="mb-12 last:mb-0"
              >
                <h2 className="text-2xl font-serif font-medium text-stone-800 mb-6 pb-4 border-b-2 border-rose-200">
                  {section.category}
                </h2>
                <div>
                  {section.questions.map((item, index) => (
                    <FAQItem key={index} question={item.q} answer={item.a} />
                  ))}
                </div>
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
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-rose-400" />
            </div>
            <h2 className="text-3xl font-serif font-medium text-stone-800 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-stone-600 text-lg mb-8">
              We're here to help! Get in touch with our friendly team.
            </p>
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-stone-800 hover:bg-stone-900 text-white rounded-full px-8 py-6">
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
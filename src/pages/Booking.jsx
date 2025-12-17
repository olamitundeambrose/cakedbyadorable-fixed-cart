import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Gift, MessageSquare, CreditCard, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const bookingTypes = [
  {
    id: 'tasting',
    title: 'Cupcake Tasting Box',
    description: 'Try 6 signature Madeira flavours plus Belgian Chocolate Biscuit',
    price: '€35',
    icon: Gift,
    color: 'from-rose-100 to-rose-50'
  },
  {
    id: 'consultation',
    title: 'Wedding Consultation',
    description: '30-minute one-to-one appointment with our head baker',
    price: 'Free',
    icon: MessageSquare,
    color: 'from-amber-100 to-amber-50'
  },
  {
    id: 'deposit',
    title: 'Secure Your Date',
    description: 'Pay deposit to reserve your wedding date',
    price: '€100',
    icon: CreditCard,
    color: 'from-stone-100 to-stone-50'
  }
];

export default function Booking() {
  const [selectedType, setSelectedType] = useState('tasting');
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    event_date: null,
    preferred_date: null,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get type from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    if (type && bookingTypes.find(t => t.id === type)) {
      setSelectedType(type);
    }
  }, []);

  const bookingMutation = useMutation({
    mutationFn: (data) => base44.entities.Booking.create({
      ...data,
      type: selectedType,
      status: 'pending',
      event_date: data.event_date ? format(data.event_date, 'yyyy-MM-dd') : null,
      preferred_date: data.preferred_date ? format(data.preferred_date, 'yyyy-MM-dd') : null,
    }),
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success('Booking submitted successfully!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    bookingMutation.mutate(formData);
  };

  const selectedBooking = bookingTypes.find(t => t.id === selectedType);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-serif font-medium text-stone-800 mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-stone-600 mb-8">
            Thank you for your booking. We'll be in touch within 24 hours to confirm the details.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                customer_name: '',
                email: '',
                phone: '',
                event_date: null,
                preferred_date: null,
                message: ''
              });
            }}
            variant="outline"
            className="rounded-full"
          >
            Make Another Booking
          </Button>
        </motion.div>
      </div>
    );
  }

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
            <span className="text-rose-400 font-medium tracking-wider uppercase text-sm">Book Now</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-800 mt-4 mb-4">
              Wedding Services
            </h1>
            <p className="text-stone-600 text-lg">
              From tasting boxes to consultations, start your wedding cake journey with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Service Selection */}
            <div className="mb-12">
              <h2 className="text-xl font-medium text-stone-800 mb-6">Select a Service</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {bookingTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      `p-6 rounded-2xl text-left transition-all duration-300 border-2`,
                      selectedType === type.id
                        ? 'border-stone-800 bg-gradient-to-br ' + type.color
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    )}
                  >
                    <type.icon className={cn(
                      'w-8 h-8 mb-4',
                      selectedType === type.id ? 'text-stone-800' : 'text-stone-400'
                    )} />
                    <h3 className="font-medium text-stone-800 mb-1">{type.title}</h3>
                    <p className="text-sm text-stone-500 mb-3">{type.description}</p>
                    <span className="font-serif text-lg text-stone-800">{type.price}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-3xl p-6 sm:p-10"
            >
              <h2 className="text-xl font-medium text-stone-800 mb-6">Your Details</h2>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                    placeholder="Your full name"
                    required
                    className="rounded-xl bg-white border-stone-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                    required
                    className="rounded-xl bg-white border-stone-200"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+353 87 123 4567"
                    className="rounded-xl bg-white border-stone-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Event/Wedding Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-xl bg-white border-stone-200",
                          !formData.event_date && "text-stone-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.event_date ? format(formData.event_date, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.event_date}
                        onSelect={(date) => setFormData({...formData, event_date: date})}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {selectedType === 'consultation' && (
                <div className="mb-6 space-y-2">
                  <Label>Preferred Consultation Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full sm:w-auto justify-start text-left font-normal rounded-xl bg-white border-stone-200",
                          !formData.preferred_date && "text-stone-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.preferred_date ? format(formData.preferred_date, 'PPP') : 'Select preferred date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.preferred_date}
                        onSelect={(date) => setFormData({...formData, preferred_date: date})}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              <div className="mb-8 space-y-2">
                <Label htmlFor="message">Additional Notes</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us about your vision, any specific requirements, or questions..."
                  rows={4}
                  className="rounded-xl bg-white border-stone-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-200">
                <div>
                  <span className="text-stone-500">Selected: </span>
                  <span className="font-medium text-stone-800">{selectedBooking?.title}</span>
                  <span className="text-stone-500"> • </span>
                  <span className="font-serif text-lg text-stone-800">{selectedBooking?.price}</span>
                </div>
                <Button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="w-full sm:w-auto bg-stone-800 hover:bg-stone-900 text-white rounded-full px-8 py-6"
                >
                  {bookingMutation.isPending ? 'Submitting...' : 'Submit Booking'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '@/contexts/OrdersContext';
import { CheckCircle, Calendar, MapPin, Phone, Mail, Truck } from 'lucide-react';

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-medium text-stone-800 mb-4">
            Order not found
          </h2>
          <Button onClick={() => navigate('/')} className="bg-stone-800 hover:bg-stone-900">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-800 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-stone-600 text-lg">
              Thank you for your order. We'll start preparing your custom cake right away!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Order Details */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto space-y-8">
            
            {/* Order Number */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <h2 className="text-xl font-serif font-medium text-stone-800 mb-2">
                    Order Number
                  </h2>
                  <p className="text-2xl font-mono font-bold text-pink-600">
                    {order.id}
                  </p>
                  <p className="text-sm text-stone-500 mt-2">
                    Please save this number for your records
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* What's Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-serif font-medium text-stone-800 mb-6">
                    What happens next?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-pink-600 font-semibold text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-800">Order Confirmation</h3>
                        <p className="text-stone-600 text-sm">
                          You'll receive an email confirmation within the next few minutes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-pink-600 font-semibold text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-800">Design Review</h3>
                        <p className="text-stone-600 text-sm">
                          Our team will review your custom design and may contact you for clarification.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-pink-600 font-semibold text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-800">Cake Preparation</h3>
                        <p className="text-stone-600 text-sm">
                          We'll start baking your custom cake 1-2 days before your delivery date.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-pink-600 font-semibold text-sm">4</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-stone-800">Delivery or Pickup</h3>
                        <p className="text-stone-600 text-sm">
                          Your cake will be ready for delivery or pickup as scheduled.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-serif font-medium text-stone-800 mb-6">
                    Need Help?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-pink-500" />
                      <span className="text-stone-600">+353 XX XXX XXXX</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-pink-500" />
                      <span className="text-stone-600">adorablecakesie@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-pink-500" />
                      <span className="text-stone-600">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-stone-500 mt-4">
                    If you have any questions about your order, please contact us with your order number.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => navigate('/CakeShop')}
                className="flex-1 bg-stone-800 hover:bg-stone-900 text-white py-6"
              >
                Order Another Cake
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="flex-1 py-6"
              >
                Back to Home
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

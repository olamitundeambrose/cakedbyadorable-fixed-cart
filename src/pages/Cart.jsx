import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { toast } from 'sonner';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 100 ? 0 : 15;
  const total = subtotal + deliveryFee;

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
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-800 mb-4">
              Your Cart
            </h1>
            <p className="text-stone-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm flex gap-4 sm:gap-6"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image_url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&q=80'}
                          alt={item.cake_name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-800 truncate">
                          {item.cake_name}
                        </h3>
                        <p className="text-xl font-serif text-stone-800 mt-1">
                          €{item.price?.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border border-stone-200 rounded-full">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 rounded-full"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeFromCart(item.id);
                              toast.success('Item removed from cart');
                            }}
                            className="text-stone-400 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="text-right hidden sm:block">
                        <span className="text-lg font-serif font-medium text-stone-800">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Continue Shopping */}
                <Link to={createPageUrl('CakeShop')}>
                  <Button variant="ghost" className="mt-4 text-stone-600">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Order Summary */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm sticky top-24"
                >
                  <h2 className="text-xl font-serif font-medium text-stone-800 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery</span>
                      <span>{deliveryFee === 0 ? 'Free' : `€${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    {subtotal < 100 && subtotal > 0 && (
                      <p className="text-sm text-rose-500">
                        Add €{(100 - subtotal).toFixed(2)} more for free delivery!
                      </p>
                    )}
                  </div>

                  <div className="border-t border-stone-200 pt-4 mb-6">
                    <div className="flex justify-between text-lg font-medium text-stone-800">
                      <span>Total</span>
                      <span className="font-serif">€{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-stone-800 hover:bg-stone-900 text-white rounded-full py-6"
                    onClick={() => navigate('/payment')}
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <p className="text-sm text-stone-500 text-center mt-4">
                    Secure checkout powered by Stripe
                  </p>
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-rose-400" />
              </div>
              <h2 className="text-2xl font-serif font-medium text-stone-800 mb-4">
                Your cart is empty
              </h2>
              <p className="text-stone-600 mb-8">
                Looks like you haven't added any cakes yet.
              </p>
              <Link to={createPageUrl('CakeShop')}>
                <Button className="bg-stone-800 hover:bg-stone-900 text-white rounded-full px-8 py-6">
                  Browse Our Cakes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
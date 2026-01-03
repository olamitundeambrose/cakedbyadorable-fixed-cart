import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrdersContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CreditCard, Lock, ArrowLeft, CheckCircle, Smartphone, Wallet } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { createOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: { pathname: '/payment' } } });
      return;
    }
    if (cartItems.length === 0) {
      navigate('/CakeShop');
      return;
    }
  }, [isAuthenticated, cartItems.length, navigate]);

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 100 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order
      const orderData = {
        userId: user.id,
        items: cartItems,
        customerInfo: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentMethod,
        subtotal,
        deliveryFee,
        total,
        paymentStatus: 'completed'
      };
      
      const order = createOrder(orderData);
      clearCart();
      
      toast.success('Payment successful! Order placed.');
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-medium text-stone-800 mb-4">
            Your cart is empty
          </h2>
          <Button onClick={() => navigate('/CakeShop')} className="bg-stone-800 hover:bg-stone-900">
            Browse Cakes
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
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-800 mb-4">
              Checkout
            </h1>
            <p className="text-stone-600">Complete your order</p>
          </motion.div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+353 XX XXX XXXX"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                          paymentMethod === 'card' ? 'border-pink-400 bg-pink-50' : 'border-gray-200'
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span className="font-medium">Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple')}
                        className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                          paymentMethod === 'apple' ? 'border-pink-400 bg-pink-50' : 'border-gray-200'
                        }`}
                      >
                        <Smartphone className="w-5 h-5" />
                        <span className="font-medium">Apple Pay</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('google')}
                        className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                          paymentMethod === 'google' ? 'border-pink-400 bg-pink-50' : 'border-gray-200'
                        }`}
                      >
                        <Wallet className="w-5 h-5" />
                        <span className="font-medium">Google Pay</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                          paymentMethod === 'paypal' ? 'border-pink-400 bg-pink-50' : 'border-gray-200'
                        }`}
                      >
                        <Wallet className="w-5 h-5" />
                        <span className="font-medium">PayPal</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                {paymentMethod === 'card' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Card Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-stone-500">
                        <Lock className="w-4 h-4" />
                        Your payment information is secure and encrypted
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.cake_name}</h4>
                          <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Delivery</span>
                      <span>{deliveryFee === 0 ? 'Free' : `€${deliveryFee.toFixed(2)}`}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-medium text-stone-800">
                    <span>Total</span>
                    <span className="font-serif">€{total.toFixed(2)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="w-full bg-stone-800 hover:bg-stone-900 text-white py-6"
                    >
                      {isProcessing ? (
                        'Processing...'
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete Order
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => navigate('/cart')}
                      className="w-full"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

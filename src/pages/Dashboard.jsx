import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrdersContext';
import { useNavigate } from 'react-router-dom';
import { User, Package, Clock, CheckCircle, Truck, MapPin, Calendar, Image } from 'lucide-react';

const statusConfig = {
  received: { label: 'Order Received', icon: Clock, color: 'bg-blue-100 text-blue-800' },
  design: { label: 'In Design', icon: User, color: 'bg-purple-100 text-purple-800' },
  baking: { label: 'Baking', icon: Package, color: 'bg-orange-100 text-orange-800' },
  ready: { label: 'Ready for Pickup', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  delivery: { label: 'Out for Delivery', icon: Truck, color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'bg-green-100 text-green-800' }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getUserOrders } = useOrders();

  const userOrders = getUserOrders(user?.id || 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl font-serif font-medium text-stone-800 mb-4">
                My Dashboard
              </h1>
              <p className="text-stone-600">
                Welcome back, {user?.firstName}! Track your orders and manage your account.
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Sign Out
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-stone-800">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-stone-600">{user?.email}</p>
                  </div>
                  <div className="text-sm text-stone-500">
                    Member since {new Date(user?.createdAt).toLocaleDateString()}
                  </div>
                  <Button 
                    onClick={() => navigate('/CakeShop')}
                    className="w-full bg-pink-500 hover:bg-pink-600"
                  >
                    Order New Cake
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Orders */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-medium text-stone-800">
                  Your Orders ({userOrders.length})
                </h2>
              </div>

              {userOrders.length === 0 ? (
                <Card className="border-pink-200">
                  <CardContent className="py-12 text-center">
                    <Package className="w-12 h-12 mx-auto text-stone-400 mb-4" />
                    <h3 className="text-lg font-medium text-stone-800 mb-2">No orders yet</h3>
                    <p className="text-stone-600 mb-6">
                      Ready to create your first custom cake?
                    </p>
                    <Button 
                      onClick={() => navigate('/CakeShop')}
                      className="bg-pink-500 hover:bg-pink-600"
                    >
                      Start Building
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {userOrders.map((order) => {
                    const StatusIcon = statusConfig[order.status]?.icon || Clock;
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card className="border-pink-200">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                                <p className="text-sm text-stone-600">
                                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge className={statusConfig[order.status]?.color || 'bg-gray-100 text-gray-800'}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig[order.status]?.label || 'Unknown'}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            
                            {/* Order Items */}
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex gap-4 p-4 bg-stone-50 rounded-lg">
                                  <img 
                                    src={item.image_url} 
                                    alt={item.cake_name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-medium text-stone-800">{item.cake_name}</h4>
                                    <p className="text-sm text-stone-600">Quantity: {item.quantity}</p>
                                    
                                    {/* Customization Details */}
                                    {item.customization && (
                                      <div className="mt-2 text-xs text-stone-500 space-y-1">
                                        <p>Size: {item.customization.size}</p>
                                        <p>Flavor: {item.customization.flavor}</p>
                                        {item.customization.description && (
                                          <p>Notes: {item.customization.description}</p>
                                        )}
                                        {item.customization.uploadedImage && (
                                          <div className="flex items-center gap-1 mt-2">
                                            <Image className="w-3 h-3" />
                                            <span>Reference image uploaded</span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-stone-800">
                                      €{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Delivery Info */}
                            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                              {order.items[0]?.customization?.deliveryOption === 'pickup' ? (
                                <>
                                  <MapPin className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="font-medium text-blue-800">Pickup</p>
                                    <p className="text-sm text-blue-600">123 Cake Street, Dublin 2</p>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <Truck className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="font-medium text-blue-800">Delivery</p>
                                    <p className="text-sm text-blue-600">
                                      {order.customerInfo?.address}, {order.customerInfo?.city}
                                    </p>
                                  </div>
                                </>
                              )}
                              {order.items[0]?.customization?.deliveryDate && (
                                <div className="ml-auto flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-blue-600" />
                                  <span className="text-sm text-blue-600">
                                    {new Date(order.items[0].customization.deliveryDate).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Order Total */}
                            <div className="flex justify-between items-center pt-4 border-t">
                              <span className="font-medium text-stone-800">Total</span>
                              <span className="text-lg font-serif font-medium text-stone-800">
                                €{order.total.toFixed(2)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

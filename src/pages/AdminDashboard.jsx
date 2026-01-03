import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrders } from '@/contexts/OrdersContext';
import { toast } from 'sonner';
import { Package, Clock, User, CheckCircle, Truck, MapPin, Calendar, Image, Settings } from 'lucide-react';

const statusConfig = {
  received: { label: 'Order Received', icon: Clock, color: 'bg-blue-100 text-blue-800' },
  design: { label: 'In Design', icon: User, color: 'bg-purple-100 text-purple-800' },
  baking: { label: 'Baking', icon: Package, color: 'bg-orange-100 text-orange-800' },
  ready: { label: 'Ready for Pickup', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  delivery: { label: 'Out for Delivery', icon: Truck, color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'bg-green-100 text-green-800' }
};

export default function AdminDashboard() {
  const { getAllOrders, updateOrderStatus } = useOrders();
  const [statusFilter, setStatusFilter] = useState('all');
  
  const allOrders = getAllOrders();
  const filteredOrders = statusFilter === 'all' 
    ? allOrders 
    : allOrders.filter(order => order.status === statusFilter);

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success('Order status updated successfully');
  };

  const getStatusStats = () => {
    const stats = {};
    Object.keys(statusConfig).forEach(status => {
      stats[status] = allOrders.filter(order => order.status === status).length;
    });
    return stats;
  };

  const stats = getStatusStats();

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
                Admin Dashboard
              </h1>
              <p className="text-stone-600">
                Manage orders and track cake production
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-stone-600" />
              <span className="text-stone-600">Admin Panel</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {Object.entries(statusConfig).map(([status, config]) => {
              const StatusIcon = config.icon;
              return (
                <Card key={status} className="border-pink-200">
                  <CardContent className="p-4 text-center">
                    <StatusIcon className="w-6 h-6 mx-auto mb-2 text-stone-600" />
                    <p className="text-2xl font-bold text-stone-800">{stats[status] || 0}</p>
                    <p className="text-xs text-stone-600">{config.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Filter and Orders */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif font-medium text-stone-800">
                Orders ({filteredOrders.length})
              </h2>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <SelectItem key={status} value={status}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredOrders.length === 0 ? (
              <Card className="border-pink-200">
                <CardContent className="py-12 text-center">
                  <Package className="w-12 h-12 mx-auto text-stone-400 mb-4" />
                  <h3 className="text-lg font-medium text-stone-800 mb-2">No orders found</h3>
                  <p className="text-stone-600">
                    {statusFilter === 'all' ? 'No orders have been placed yet.' : `No orders with status "${statusConfig[statusFilter]?.label}".`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => {
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
                                Customer: {order.customerInfo?.firstName} {order.customerInfo?.lastName}
                              </p>
                              <p className="text-sm text-stone-600">
                                Email: {order.customerInfo?.email}
                              </p>
                              <p className="text-sm text-stone-600">
                                Phone: {order.customerInfo?.phone}
                              </p>
                              <p className="text-sm text-stone-600">
                                Placed: {new Date(order.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right space-y-2">
                              <Badge className={statusConfig[order.status]?.color || 'bg-gray-100 text-gray-800'}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig[order.status]?.label || 'Unknown'}
                              </Badge>
                              <div>
                                <Select 
                                  value={order.status} 
                                  onValueChange={(newStatus) => handleStatusUpdate(order.id, newStatus)}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.entries(statusConfig).map(([status, config]) => (
                                      <SelectItem key={status} value={status}>
                                        {config.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
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
                                  
                                  {/* Detailed Customization */}
                                  {item.customization && (
                                    <div className="mt-2 text-xs text-stone-500 space-y-1">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p><strong>Size:</strong> {item.customization.size}</p>
                                          <p><strong>Type:</strong> {item.customization.cakeType}</p>
                                          <p><strong>Flavor:</strong> {item.customization.flavor}</p>
                                          <p><strong>Filling:</strong> {item.customization.filling}</p>
                                        </div>
                                        <div>
                                          <p><strong>Finish:</strong> {item.customization.finishColor}</p>
                                          <p><strong>Cupcakes:</strong> {item.customization.cupcakes}</p>
                                          <p><strong>Accessories:</strong> {item.customization.designAccessories?.join(', ') || 'None'}</p>
                                        </div>
                                      </div>
                                      {item.customization.description && (
                                        <div className="mt-2 p-2 bg-white rounded border">
                                          <p><strong>Special Instructions:</strong></p>
                                          <p className="mt-1">{item.customization.description}</p>
                                        </div>
                                      )}
                                      {item.customization.uploadedImage && (
                                        <div className="flex items-center gap-2 mt-2 p-2 bg-blue-50 rounded">
                                          <Image className="w-4 h-4 text-blue-600" />
                                          <span className="text-blue-600">Reference image uploaded</span>
                                          <img 
                                            src={item.customization.uploadedImage.preview} 
                                            alt="Reference" 
                                            className="w-12 h-12 object-cover rounded ml-auto"
                                          />
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
                                  <p className="text-sm text-blue-600">Customer will collect from store</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <Truck className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="font-medium text-blue-800">Delivery Address</p>
                                  <p className="text-sm text-blue-600">
                                    {order.customerInfo?.address}<br />
                                    {order.customerInfo?.city}, {order.customerInfo?.postalCode}
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
                            <div className="text-sm text-stone-600">
                              Payment: {order.paymentMethod} • Status: {order.paymentStatus}
                            </div>
                            <span className="text-lg font-serif font-medium text-stone-800">
                              Total: €{order.total.toFixed(2)}
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
      </section>
    </div>
  );
}

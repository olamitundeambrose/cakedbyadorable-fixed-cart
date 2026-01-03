import React, { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('cakedbyadorable_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cakedbyadorable_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: `CBA-${Date.now().toString().slice(-6)}`,
      ...orderData,
      status: 'received',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const getUserOrders = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const getAllOrders = () => {
    return orders;
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      createOrder,
      updateOrderStatus,
      getUserOrders,
      getOrderById,
      getAllOrders
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

import React, { useEffect, useState } from 'react';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      console.log('Fetching')
      const token = localStorage.getItem('token');
      const userId = parseInt(localStorage.getItem("userId"), 10);

      if (!token || isNaN(userId)) {
        console.error('User is not authenticated or userId is invalid.');
        return;
      }

      try {
        const response = await fetch(`https://localhost:44342/api/orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const fetchOrderItems = async (id) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://localhost:44342/api/orders/orderById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order items');
      }

      const data = await response.json();
      setOrderItems(data);
      setSelectedOrder(id);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order.id} className="order" onClick={() => fetchOrderItems(order.id)}>
          <h3>Order #{order.id}</h3>
          <p><span>Status:</span> {order.status}</p>
          <p><span>Total:</span> ${order.total_Price.toFixed(2)}</p>
          <p><span>Ordered on:</span> {new Date(order.created_At).toLocaleDateString()}</p>
          {selectedOrder === order.id && (
            <div className="order-items">
              <h4>Order Items</h4>
              <ul>
                {orderItems.map(item => (
                  <li key={item.id}>
                    <p><span>Product:</span> {item.product_Name}</p>
                    <p><span>Quantity:</span> {item.quantity}</p>
                    <p><span>Price:</span> ${item.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;

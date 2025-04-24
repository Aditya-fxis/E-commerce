import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/order/");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-left">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-left text-gray-600">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 p-4 sm:p-6 border rounded-2xl shadow-md bg-white transition-all hover:shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <p className="text-sm sm:text-base"><strong>Order ID:</strong> {order.id}</p>
                <p className="text-sm sm:text-base break-words w-full sm:w-auto overflow-hidden text-ellipsis">
                  <strong>Session:</strong> {order.session_id}
                </p>
                <p className="text-sm sm:text-base">
                  <strong>Paid:</strong>{" "}
                  <span className={order.paid ? "text-green-600" : "text-red-600"}>
                    {order.paid ? "✅ Yes" : "❌ No"}
                  </span>
                </p>
              </div>
              <p className="text-sm sm:text-base text-gray-500">
                <strong>Date:</strong> {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-3 text-lg border-b pb-1">Items:</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm sm:text-base border-b pb-1"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right text-gray-800">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right font-bold text-lg text-green-500">
                Total: ₹{calculateTotal(order.items)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;

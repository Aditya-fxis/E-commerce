import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_API_URL);

const Order = () => {
  const [orders, setOrders] = useState([]);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/order/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setOrders(data);
      } catch (err) {
        toast.error("Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, [accessToken]);

  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayNow = async (sessionId) => {
    if (!sessionId) {
      toast.warning("No Stripe session ID available for this order.");
      return;
    }
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      toast.error("Stripe redirect error:", error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">🛒 Your Orders 🛒</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No orders found.</div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`bg-white border ${
                order.paid ? "border-green-300" : "border-red-300"
              } rounded-xl shadow-md p-6`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    order.paid
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.paid ? "Paid" : "Not Paid"}
                </span>
              </div>

              {/* Item list */}
              <div className="space-y-3 border-t pt-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-gray-700"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total and Pay button */}
              <div className="mt-6 flex justify-between items-center">
                <div className="text-lg font-bold text-gray-800">
                  Total: ${calculateTotal(order.items)}
                </div>
                {!order.paid && (
                  <button
                    onClick={() => handlePayNow(order.session_id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-full transition duration-200"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    apartment: "",
    street: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_API_URL);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/billing/",
        formData
      );
      setSuccess("Billing information submitted successfully!");
      // After successful billing info submission, place the order
      handlePayment();
      setFormData({
        firstname: "",
        lastname: "",
        apartment: "",
        street: "",
        country: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      setError("Failed to submit billing information. Try again.");
    }
    setLoading(false);
  };

  const handlePayment = async () => {
    const items = cart.cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
  
    const res = await fetch("http://localhost:8000/api/create_checkout_session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
  
    const data = await res.json();
  
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-16">
      <div className="flex flex-col-reverse lg:flex-row gap-10">
        
        {/* Billing and Order Section */}
        <div className="w-full lg:w-2/3">
          <h1 className="uppercase font-bold mb-5 text-xl">Billing and Order Details</h1>
          <form onSubmit={handleSubmit} className="text-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label>First Name<span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 mt-1 outline-none"
                />
              </div>
              <div>
                <label>Last Name<span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 mt-1 outline-none"
                />
              </div>
            </div>

            <label>Country<span className="text-red-600">*</span></label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 mt-1 mb-4 outline-none"
            />

            <label>Street Address<span className="text-red-600">*</span></label>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 mt-1 outline-none"
            />
            <input
              type="text"
              name="apartment"
              placeholder="Apartment"
              value={formData.apartment}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 mt-3 mb-4 outline-none"
            />

            <label>City<span className="text-red-600">*</span></label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 mt-1 mb-4 outline-none"
            />

            <label>State<span className="text-red-600">*</span></label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 mt-1 mb-4 outline-none"
            />

            <label>ZIP Code<span className="text-red-600">*</span></label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 mt-1 mb-4 outline-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div>
                <label>Phone<span className="text-red-600">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 mt-1 outline-none"
                />
              </div>
              <div>
                <label>Email<span className="text-red-600">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 mt-1 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 bg-black text-white p-4 px-10 w-full sm:w-auto text-sm font-semibold uppercase tracking-wider cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit Billing Info and Place Order"}
            </button>

            {success && <p className="text-green-500 mt-4">{success}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/3 mt-16">
          <div className="p-6 bg-gray-100 rounded-md shadow-md">
            <h3 className="text-lg font-semibold border-b border-gray-300 pb-4">
              YOUR ORDER
            </h3>

            <div className="flex justify-between mt-6 font-medium text-sm text-gray-600 border-b pb-2">
              <span className="w-2/3">Product</span>
              <span className="w-1/3 text-right">Total</span>
            </div>

            {cart.cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-3 text-sm border-b border-gray-300"
              >
                <div className="w-2/3">
                  <h3 className="text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                </div>
                <div className="w-1/3 text-right text-gray-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-4 font-semibold text-md">
              <span>Total</span>
              <span className="text-red-500">${cart.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

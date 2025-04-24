import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 capitalize">
      <h2 className="text-3xl sm:text-3xl font-semibold my-8">Shopping Cart</h2>

      {cart.cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side: Products */}
          <div className="flex-1">
            <div className="hidden sm:flex justify-between font-bold text-md border-b border-gray-300 pb-2 mb-4">
              <span className="w-2/5">PRODUCT</span>
              <span className="w-1/5 text-center">QUANTITY</span>
              <span className="w-1/5 text-right">TOTAL</span>
            </div>

            {cart.cartItems.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col sm:flex-row justify-between items-center border-b border-gray-300 py-6 space-y-4 sm:space-y-0"
              >
                {/* Remove Button - top-right on small screen */}
                <button
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  className="absolute top-2 right-2 sm:hidden text-red-500 hover:text-red-700 bg-gray-100 rounded-full w-7 h-7 flex items-center justify-center"
                >
                  ✖
                </button>

                {/* Product Image & Details */}
                <div className="flex items-center space-x-4 w-full sm:w-2/5">
                  <img
                    src={item.main_image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-md font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Control (below image on mobile) */}
                <div className="flex sm:hidden w-full justify-center mt-2">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Quantity Control - desktop */}
                <div className="hidden sm:flex items-center space-x-3 w-full sm:w-1/5 justify-center">
                  <button
                    onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Total Price & Remove for desktop */}
                <div className="hidden sm:flex items-center justify-end w-full sm:w-1/5 space-x-4">
                  <span className="font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    className="text-red-500 hover:text-red-700 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Summary & Checkout */}
          <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0">
            <h3 className="text-lg font-bold mb-4">DISCOUNT CODES</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Coupon code"
                className="border border-gray-300 p-2 text-sm pl-4 outline-none flex-grow"
              />
              <button className="uppercase tracking-[2px] bg-black text-white px-6 py-2 text-sm font-semibold">
                APPLY
              </button>
            </div>

            <div className="mt-6 p-6 bg-gray-100 rounded-lg">
              <h3 className="text-md font-semibold">CART TOTAL</h3>
              <p className="flex justify-between text-md font-semibold pt-4 pb-6">
                <span className="font-light">Total:</span>
                <span className="text-red-500">${cart.totalPrice.toFixed(2)}</span>
              </p>

              <button
                onClick={() => navigate("/checkout")}
                className="uppercase tracking-[2px] bg-black text-white p-3 w-full text-sm font-semibold"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

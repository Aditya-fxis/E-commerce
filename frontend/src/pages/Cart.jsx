import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="max-w-6xl mx-auto p-6 capitalize">
      <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>

      {cart.cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-3 gap-12">
          {/* Left Side: Products */}
          <div className="col-span-2">
            <div className="border-b border-gray-300 my-4 pb-2 flex justify-between font-bold text-md">
              <span className="mb-4">PRODUCT</span>
              <span className="mb-4">QUANTITY</span>
              <span className="mb-4">TOTAL</span>
            </div>

            {cart.cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-300 py-6"
              >
                {/* Product Image & Details */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                    className=" px-2 py-1 cursor-pointer"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                    className=" px-2 py-1 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Total Price & Remove */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-lg">
                    ${item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    className="text-red-500 hover:text-red-700 cursor-pointer bg-gray-100 rounded-full w-8 h-8"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Summary & Checkout */}
          <div className="p-3 w-[50vh]">
            <h3 className="text-lg font-bold mb-4">DISCOUNT CODES</h3>
            <div className="flex">
              <input
                type="text"
                placeholder="Coupon code"
                className="border border-gray-300 p-2 flex-grow text-sm pl-4 outline-none"
              />
              <button className="items-center uppercase tracking-[3px] bg-black text-white p-3 px-6 text-sm font-semibold cursor-pointer">
                APPLY
              </button>
            </div>

            <div className="mt-6 p-8 bg-gray-100">
              <h3 className="text-md font-semibold">CART TOTAL</h3>
              <p className="flex justify-between text-md font-semibold pt-4 pb-6">
                <span className="font-light capitalize">Total:</span>
                <span className="text-red-500">
                  ${cart.totalPrice.toFixed(2)}
                </span>
              </p>

              <button className=" items-center uppercase tracking-[2px] bg-black text-white p-3 mt-4 text-sm font-semibold cursor-pointer w-full text-center">
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

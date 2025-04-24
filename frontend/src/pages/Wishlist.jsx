import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const handleMoveToCart = (item) => {
    // console.log("Adding to cart:", item);

    dispatch(addToCart({ ...item, price: parseFloat(item.price) || 0 }));
    dispatch(removeFromWishlist(item));
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 capitalize">
      <ToastContainer/>
      <h2 className="text-3xl font-semibold my-6">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-3 gap-12">
          {/* Left Side: Wishlist Items */}
          <div className="col-span-2">
            <div className="border-b border-gray-300 my-4 pb-2 flex justify-between font-bold text-md">
              <span className="mb-4">PRODUCT</span>
              <span className="mb-4">ACTION</span>
              <span className="mb-4">PRICE</span>
            </div>

            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-300 py-6"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.main_image}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex items-center uppercase tracking-[2px] bg-black text-white p-3 px-6 text-xs font-semibold cursor-pointer hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(item))}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>

                {/* Price */}
                <div className="font-semibold text-lg text-red-500">
                  ${parseFloat(item.price || 0).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Optional Summary */}
          <div className="p-3 w-[50vh]">
            <h3 className="text-lg font-bold mb-4">Wishlist Summary</h3>
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                Total items:{" "}
                <span className="font-semibold text-black">
                  {wishlist.length}
                </span>
              </p>
              <p className="text-gray-600 mb-4">
                Estimated total:{" "}
                <span className="font-semibold text-red-500">
                  $
                  {wishlist
                    .reduce(
                      (acc, item) => acc + (parseFloat(item.price) || 0),
                      0
                    )
                    .toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Move items to your cart to proceed to checkout.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdOutlineStarBorder,
  MdStar,
  MdStarHalf,
  MdFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Products = ({
  selectedCategory,
  searchQuery,
  selectedPriceRange,
  sortBy,
  limit,
}) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const handleAddToCart = (product) => {
    if (isLogin) {
      const formattedProduct = {
        ...product,
        price: parseFloat(product.price),
      };
      dispatch(addToCart(formattedProduct));
    } else {
      toast.error("You are not logged in");
    }
  };

  const toggleWishlist = (product, e) => {
    e.stopPropagation(); // prevent navigation on click

    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://127.0.0.1:8000/shop/";
        const params = new URLSearchParams();

        if (selectedCategory) params.append("category", selectedCategory);
        if (selectedPriceRange) {
          params.append("min_price", selectedPriceRange.min);
          if (selectedPriceRange.max !== null) {
            params.append("max_price", selectedPriceRange.max);
          }
        }

        const response = await axios.get(`${url}?${params.toString()}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedPriceRange]);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  const sortedProducts = [...filteredProducts];

  if (sortBy === "low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const displayedProduct = limit
    ? sortedProducts.slice(0, limit)
    : sortedProducts;
  const handleProductClick = (id) => {
    navigate(`/shop/${id}`);
  };

  return (
    <div className="py-4">
      <ToastContainer />
      {displayedProduct.length === 0 ? (
       <div className="flex justify-center items-center flex-col">
       <img
         src="notfound.webp"
         alt="No products found"
         className="w-1/2 h-auto"
       />
     </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
          {displayedProduct.map((product) => (
            <div
              key={product.id}
              className="relative cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Wishlist icon */}
              <div
                className="absolute top-3 right-3 z-10 p-1 hover:text-red-500"
                onClick={(e) => toggleWishlist(product, e)}
              >
                {isInWishlist(product.id) ? (
                  <MdFavorite className="text-xl text-red-500" />
                ) : (
                  <MdOutlineFavoriteBorder className="text-xl" />
                )}
              </div>
  
              {/* Product Image */}
              <img
                src={product.main_image}
                alt={product.name}
                className="w-full h-[35vh] object-cover"
              />
  
              {/* Sale badge */}
              {product.sale && (
                <span className="absolute uppercase tracking-[3px] bg-black text-white text-xs font-semibold px-4 py-1 top-4 left-0">
                  Sale
                </span>
              )}
  
              {/* Product Info */}
              <h4 className="text-sm font-semibold mt-6">{product.name}</h4>
  
              {/* Rating */}
              <div className="flex items-center mt-2 text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) => {
                  const ratingValue = index + 1;
                  if (ratingValue <= product.rating)
                    return <MdStar key={index} />;
                  if (ratingValue - 0.5 <= product.rating)
                    return <MdStarHalf key={index} />;
                  return <MdOutlineStarBorder key={index} />;
                })}
                <span className="ml-2 text-gray-600 text-sm">
                  ({product.rating})
                </span>
              </div>
  
              {/* Price and Add to Cart */}
              <div
                className="flex justify-between font-semibold mt-2"
                onClick={(e) => e.stopPropagation()}
              >
                <h4 className="text-lg">${product.price}</h4>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="text-red-300 hover:text-red-500 cursor-pointer"
                >
                  + Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );  
};

export default Products;

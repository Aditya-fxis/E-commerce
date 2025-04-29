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
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

const Products = ({
  selectedCategory,
  searchQuery,
  selectedPriceRange,
  limit,
}) => {
  const [products, setProducts] = useState({ results: [] });
  const [sortBy, setSortBy] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const [loading, setLoading] = useState(true);
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
    e.stopPropagation();
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);
    isInWishlist
      ? dispatch(removeFromWishlist(product))
      : dispatch(addToWishlist(product));
  };

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
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

        params.append("page", page);
        const response = await axios.get(`${url}?${params.toString()}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedPriceRange, page]);

  const filteredProducts = products.results?.filter((product) =>
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

  const totalProducts = products.count || 0;
  const productsPerPage = 5;
  const currentPage = parseInt(page, 10);

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(
    startProduct + productsPerPage - 1,
    totalProducts
  );

  return (
    <div className="py-4">
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Loader />
        </div>
      ) : displayedProduct.length === 0 ? (
        <div className="flex justify-center items-center flex-col">
          <img
            src="notfound.webp"
            alt="No products found"
            className="w-1/2 h-auto"
          />
        </div>
      ) : (
        <>
          {!loading && totalProducts > 0 && (
            // <div className="text-sm text-gray-500 mb-4">
            //   Showing {startProduct}–{endProduct} of {totalProducts} products
            // </div>
             <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
             <h2 className="text-center md:text-left">
             Showing {startProduct}–{endProduct} of {totalProducts} products
             </h2>
   
             {/* Sort Dropdown */}
             <div className="flex justify-center md:justify-end w-full md:w-auto mt-2 md:mt-0">
               <h2 className="mr-2">Sort by Price:</h2>
               <select
                 className="outline-none font-bold"
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
               >
                 <option value="">None</option>
                 <option value="low-high">Low to High</option>
                 <option value="high-low">High to Low</option>
               </select>
             </div>
           </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
            {displayedProduct.map((product) => (
              <div
                key={product.id}
                className="relative cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
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

                <img
                  src={product.main_image}
                  alt={product.name}
                  className="w-full h-[35vh] object-cover"
                />

                {product.sale && (
                  <span className="absolute uppercase tracking-[3px] bg-black text-white text-xs font-semibold px-4 py-1 top-4 left-0">
                    Sale
                  </span>
                )}

                <h4 className="text-sm font-semibold mt-6">{product.name}</h4>

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
       <div className="flex justify-center mt-8 space-x-2">
  {currentPage > 1 && (
    <button
      onClick={() => navigate(`?page=${currentPage - 1}`)}
      className="px-4 py-2  bg-white text-black border rounded-xs hover:bg-black hover:text-white transition duration-300"
    >
      ←Previous
    </button>
  )}
  {Array.from({ length: Math.ceil(totalProducts / productsPerPage) }).map((_, index) => (
    <button
      key={index}
      onClick={() => navigate(`?page=${index + 1}`)}
      className={`px-4 py-2 rounded-xs transition duration-300 ${
        currentPage === index + 1
          ? "bg-black text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {index + 1}
    </button>
  ))}
  {currentPage < Math.ceil(totalProducts / productsPerPage) && (
    <button
      onClick={() => navigate(`?page=${currentPage + 1}`)}
      className="px-4 py-2 bg-white text-black border rounded-xs hover:bg-black hover:text-white transition duration-300"
    >
      Next→
    </button>
  )}
</div>

        </>
      )}
    </div>
  );
};

export default Products;

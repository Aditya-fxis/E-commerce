import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineStarBorder, MdStar, MdStarHalf } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"

const Products = ({ selectedCategory, searchQuery, selectedPriceRange, sortBy }) => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
      const formattedProduct = {
        ...product,
        price: parseFloat(product.price), // Ensure price is a number
      };
    
      console.log("Adding to cart:", formattedProduct);
      dispatch(addToCart(formattedProduct));
    };
    

    // Fetch products from API using Axios
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          let url = "http://localhost:8000/shop/";
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
    
    // Filter products based on search query
    const filteredProducts = products.filter((product) => 
      product.name?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
    );
    
  
    const sortedProducts = [...filteredProducts];

    if (sortBy === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    
    return (
      <div className="container py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="relative justify-center items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className=" w-full h-[35vh] object-cover"
              />
              {product.sale ? (
                <span className="absolute uppercase tracking-[3px] bg-black text-white text-xs font-semibold px-4 py-1 top-4">
                  Sale
                </span>
              ) : (
                <span> </span>
              )}

              <h4 className="text-sm font-semibold mt-6">{product.name}</h4>

              {/* Rating functionality */}
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

              <div className="flex justify-between font-semibold mt-2">
                <h4 className="text-lg ">${product.price}</h4>
                <button onClick={() => handleAddToCart(product)}
                  className="text-red-300 hover:text-red-500 cursor-pointer">
                  + Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    
  };
  
  export default Products;
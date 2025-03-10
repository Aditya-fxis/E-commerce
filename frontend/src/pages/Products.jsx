import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineStarBorder } from "react-icons/md";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // Fetch products from API using Axios
    useEffect(() => {
        axios.get("http://localhost:8000/shop/")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    // Add to cart function
    // const addToCart = (product) => {
    //     setCart([...cart, product]); // Adds product to cart
    // };

  return (
    <div className="container py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[48vh]"
            />
            <h4 className="text-sm font-semibold mt-6">{product.name}</h4>
            <div className="flex mt-2">
              <MdOutlineStarBorder />
              <MdOutlineStarBorder />
              <MdOutlineStarBorder />
              <MdOutlineStarBorder />
              <MdOutlineStarBorder />
            </div>
            <h4 className="text-lg font-semibold mt-2">${product.price}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

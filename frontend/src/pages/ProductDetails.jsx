import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdShoppingCart,
  MdStar,
  MdStarHalf,
  MdStarOutline,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/shop/${id}/`);
        setProduct(response.data);
        setSelectedImage(response.data.main_image);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const [profile, setProfile] = useState("");

  useEffect(() => {
    const cachedProfile = localStorage.getItem("user_profile");
    if (cachedProfile) {
      setProfile(JSON.parse(cachedProfile));
    }
  }, []);

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    if (isLogin) {
      const formattedProduct = {
        ...product,
        price: parseFloat(product.price),
      };
      dispatch(addToCart(formattedProduct));
    }
     else {
          toast.error("You are not logged in");
        }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-500 text-xl">
        {Array.from({ length: fullStars }, (_, index) => (
          <MdStar key={`full-${index}`} />
        ))}
        {halfStar && <MdStarHalf key="half" />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <MdStarOutline key={`empty-${index}`} />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader />
      </div>
    );
  }

  if (!product)
    return <p className="text-center py-20 text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto py-16 px-4 md:px-10">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left - Image Gallery */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md h-[400px] shadow-lg overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            <img
              src={product.main_image}
              alt="Main"
              className={`w-20 h-20 object-cover border-2 cursor-pointer shadow-sm transition-all ${
                selectedImage === product.main_image
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(product.main_image)}
            />

            {product.images?.map((imgObj) => (
              <img
                key={imgObj.id}
                src={imgObj.image}
                alt={`Preview ${imgObj.id}`}
                className={`w-20 h-20 object-cover border-2 cursor-pointer shadow-sm transition-all ${
                  selectedImage === imgObj.image
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(imgObj.image)}
              />
            ))}
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 md:-mt-20">
            {product.name}
          </h2>

          {product.rating && (
            <div className="flex items-center gap-2">
              {renderStars(product.rating)}
              <span className="text-gray-500">{product.rating}/5</span>
            </div>
          )}

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4">
            <h4 className="text-2xl font-semibold text-red-500">
              ${product.price}
            </h4>
            {product.sale && (
              <span className="px-3 py-1 text-sm bg-red-100 text-red-600 font-semibold rounded-full">
                On Sale
              </span>
            )}
          </div>

          <p
            className={`text-lg font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              className={`flex items-center uppercase tracking-[3px] text-sm font-semibold p-3 px-10 transition-all ${
                product.stock > 0
                  ? "bg-black text-white hover:bg-neutral-900 cursor-pointer"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={product.stock === 0}
              onClick={() => handleAddToCart(product)}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              <MdShoppingCart className="text-xl ml-2" />
            </button>

            {profile.user_type === "admin" && (
              <button
                onClick={() => navigate(`/add-product/${product.id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-3 transition-all"
              >
                Edit Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

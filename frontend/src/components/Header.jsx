import React, { Profiler, useEffect, useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { RiListOrdered2 } from "react-icons/ri";
import { logout } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";
import { clearWishlist } from "../redux/wishlistSlice";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const cachedProfile = localStorage.getItem("user_profile");
    if (cachedProfile) {
      setProfile(JSON.parse(cachedProfile));
    }
  }, []);

  const getInitials = (first, last) => {
    return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    navigate("/login");
  };

  return (
    <header className="bg-white w-full shadow-md fixed top-0 z-50">
      {/* Top Banner */}
      <div className="bg-black py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-xs md:text-sm">
            Free shipping, 30-day return or refund guarantee.
          </div>
          <div className="flex items-center text-white text-[0.7rem] md:text-[0.8rem] space-x-4 md:space-x-6 uppercase tracking-[2px]">
            <Link to="#">FAQs</Link>
            {isLogin ? (
              <>
                {profile ? (
                  profile.profile_picture ? (
                    <img
                      src={profile.profile_picture}
                      alt="Profile"
                      className="w-7 h-7 rounded-full object-cover cursor-pointer"
                      onClick={()=>{
                        navigate("/profile")
                      }}
                    />
                  ) : (
                    <Link to="/profile" className="w-7 h-7 pl-1 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs text-center font-bold">
                      {getInitials(profile.first_name, profile.last_name)}
                    </Link>
                  )
                ) : (
                  <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
                    {/* Default initials or empty */}
                    {getInitials("Guest", "User")}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="hover:underline cursor-pointer tracking-wider uppercase"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:underline">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-6 lg:px-12">
        {/* Logo */}
        <div className="md:w-1/6">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-4 md:h-6" />
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link to="/wishlist">
            <MdOutlineFavoriteBorder className="text-xl" />
          </Link>

          <Link to="/cart" className="relative">
            <BsCart4 className="text-xl" />
            {totalQuantity > 0 && (
              <span className="absolute top-[-6px] left-4 bg-red-500 text-white rounded-full px-1 text-xs font-bold">
                {totalQuantity}
              </span>
            )}
          </Link>
          <Link to="/order">
            <RiListOrdered2 className="text-xl" />
          </Link>
          <div className="text-sm font-bold text-gray-900">
            ${totalPrice && !isNaN(totalPrice) ? totalPrice.toFixed(2) : "0.00"}
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex w-1/2 justify-center space-x-6 lg:space-x-12">
          <Link
            to="/"
            className="group relative text-base font-semibold text-gray-900"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/shop"
            className="group relative text-base font-semibold text-gray-900"
          >
            Shop
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <div className="group relative">
            <span className="text-base font-semibold text-gray-900 cursor-pointer flex items-center">
              Pages <IoIosArrowDown className="ml-1" />
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            <ul className="absolute left-0 top-8 bg-gray-900 text-white w-40 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              <li>
                <Link to="/about" className="block px-4 py-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-4 py-2">
                  Shop Details
                </Link>
              </li>
              <li>
                <Link to="/cart" className="block px-4 py-2">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="block px-4 py-2">
                  Check Out
                </Link>
              </li>
              <li>
                <Link to="/blog" className="block px-4 py-2">
                  Blog Details
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/blog"
            className="group relative text-base font-semibold text-gray-900"
          >
            Blog
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/contact"
            className="group relative text-base font-semibold text-gray-900"
          >
            Contacts
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Hamburger */}
        <div className="md:hidden pl-2">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-6 relative">
          <Link to="/wishlist">
            <MdOutlineFavoriteBorder className="text-2xl" />
          </Link>
          <Link to="/cart" className="relative">
            <BsCart4 className="text-2xl" />
            {totalQuantity > 0 && (
              <span className="absolute top-[-6px] left-4 bg-red-500 text-white rounded-full px-1 text-xs font-bold">
                {totalQuantity}
              </span>
            )}
          </Link>
          <Link to="/order">
            <RiListOrdered2 className="text-xl" />
          </Link>
          <button
            onClick={() => {
              navigate("/checkout");
            }}
            className="text-base font-bold text-gray-900 cursor-pointer hover:text-green-700"
          >
            ${totalPrice && !isNaN(totalPrice) ? totalPrice.toFixed(2) : "0.00"}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full px-6 pb-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-900"
          >
            Shop
          </Link>
          <div>
            <span className="block text-base font-medium text-gray-900">
              Pages
            </span>
            <ul className="ml-4 space-y-1">
              <li>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block"
                >
                  Shop Details
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/checkout"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block"
                >
                  Check Out
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block"
                >
                  Blog Details
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-900"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-900"
          >
            Contacts
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

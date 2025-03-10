import React, { useState } from 'react';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsCart4 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

const Header = () => {
  const [currency, setCurrency] = useState('USD');

  const toggleCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <header className="bg-white">
      {/* Header Top Section */}
      <div className="bg-black py-3 px-50">
        <div className="container mx-auto flex justify-between">
          <div className="text-white">
            Free shipping, 30-day return or refund guarantee.
          </div>
          <div className="flex items-center">
            <div className="mr-6 text-white text-[0.8rem] space-x-6 uppercase tracking-[2px]">
              <a href="#">Sign in</a>
              <a href="#">FAQs</a>
            </div>
            <div className="relative tracking-[2px]">
              <span className="text-white text-sm cursor-pointer">
                {currency} 
              </span>
              <ul className="absolute left-0 top-8 bg-white text-black shadow-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
                <li className="px-4 py-2 cursor-pointer" onClick={() => toggleCurrency('USD')}>USD</li>
                <li className="px-4 py-2 cursor-pointer" onClick={() => toggleCurrency('EUR')}>EUR</li>
                <li className="px-4 py-2 cursor-pointer" onClick={() => toggleCurrency('GBP')}>GBP</li>
              </ul>
            </div>
                <IoIosArrowDown className='pl-2 text-white text-2xl'/>
          </div>
        </div>
      </div>

      {/* Main Header Section */}
      <div className="container mx-auto flex justify-between items-center py-6 px-50">
        {/* Logo */}
        <div className="w-1/4">
          <a href="./index.html">
            <img src="/logo.png" alt="Logo" className="" />
          </a>
        </div>

        {/* Navigation Menu */}
        <nav className="w-1/2">
          <ul className="flex justify-center space-x-12">
            <li className="relative">
              <Link to="" className="text-lg font-semibold text-gray-900">Home</Link>
            </li>
            <li className="relative">
              <Link to="./shop" className="text-lg font-semibold text-gray-900">Shop</Link>
            </li>
            <li className="relative">
              <a href="#" className="text-lg font-semibold text-gray-900">Pages</a>
              <ul className="absolute left-0 top-8 bg-gray-900 text-white w-40 py-2 opacity-0 invisible transition-all duration-300">
                <li><a href="./about.html" className="px-4 py-2">About Us</a></li>
                <li><a href="./shop-details.html" className="px-4 py-2">Shop Details</a></li>
                <li><a href="./shopping-cart.html" className="px-4 py-2">Shopping Cart</a></li>
                <li><a href="./checkout.html" className="px-4 py-2">Check Out</a></li>
                <li><a href="./blog-details.html" className="px-4 py-2">Blog Details</a></li>
              </ul>
            </li>
            <li className="relative">
              <a href="./blog.html" className="text-lg font-semibold text-gray-900">Blog</a>
            </li>
            <li>
              <a href="./contact.html" className="text-lg font-semibold text-gray-900">Contacts</a>
            </li>
          </ul>
        </nav>

        {/* Header Icons */}
        <div className="flex items-center space-x-6">
          <a href="#" className="relative">
          <HiMagnifyingGlass className='text-2xl'/>
          </a>
          <a href="#" className="relative">
          <MdOutlineFavoriteBorder className='text-2xl' />
          </a>
          <a href="#" className="relative">
          <BsCart4 className='text-2xl'/>
            <span className="absolute top-0 left-6 text-xs font-bold text-white">0</span>
          </a>
          <div className="text-lg font-bold text-gray-900">$0.00</div>
        </div>
      </div>
    </header>
  );
};

export default Header;



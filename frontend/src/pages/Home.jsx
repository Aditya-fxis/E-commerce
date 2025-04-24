import React, { useState } from 'react';
import Hero from './Hero';
import Products from './Products';
import Banner from '../components/Banner';
import ProductSale from '../components/ProductSale';
import Instagram from '../components/Instagram';
import FashionTrends from '../components/FashionTrends';
import { Link } from 'react-router-dom';


const Home = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-full">
    <Hero />
    <Banner />
  
    {/* Responsive Filter Links */}
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-20 justify-center text-gray-400 text-center px-4 mt-8">
      <Link
        to="#"
        onClick={() => handleLinkClick("bestSellers")}
        className={`text-xl sm:text-2xl font-bold ${
          activeLink === "bestSellers" ? "text-black" : "text-gray-400"
        } hover:text-black`}
      >
        Best Sellers
      </Link>
      <Link
        to="#"
        onClick={() => handleLinkClick("newArrivals")}
        className={`text-xl sm:text-2xl font-bold ${
          activeLink === "newArrivals" ? "text-black" : "text-gray-400"
        } hover:text-black`}
      >
        New Arrivals
      </Link>
      <Link
        to="#"
        onClick={() => handleLinkClick("hotSales")}
        className={`text-xl sm:text-2xl font-bold ${
          activeLink === "hotSales" ? "text-black" : "text-gray-400"
        } hover:text-black`}
      >
        Hot Sales
      </Link>
    </div>
  
    {/* Responsive Product Grid Wrapper */}
    <div className="px-4 sm:px-8 md:px-[10vh] lg:px-[20vh]">
      <Products limit={5} />
    </div>
  
    <ProductSale />
    <Instagram />
  
    {/* Fashion Trends */}
    <div className="text-center px-4 md:px-8 lg:px-32">
      <p className="text-red-600 text-sm mb-4 font-semibold uppercase tracking-[4px]">
        Latest News
      </p>
      <h1 className="text-black text-3xl md:text-4xl font-bold tracking-wide mb-6">
        Fashion New Trends
      </h1>
      <FashionTrends limit={3} />
    </div>
  </div>
  
  );
};

export default Home;

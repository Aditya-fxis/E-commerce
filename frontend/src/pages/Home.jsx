import React, { useState } from 'react';
import Hero from './Hero';
import Products from './Products';
import Banner from '../components/Banner';
import ProductSale from '../components/ProductSale';
import Instagram from '../components/Instagram';
import FashionTrends from '../components/FashionTrends';


const Home = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="w-full">
      <Hero />
      <Banner />
      <div className="flex gap-20 justify-center text-gray-400">
        <a
          href="#"
          onClick={() => handleLinkClick("bestSellers")}
          className={`text-2xl font-bold mb-6 text-center ${
            activeLink === "bestSellers" ? "text-black" : "text-gray-400"
          } hover:text-black`}
        >
          Best Sellers
        </a>
        <a
          href="#"
          onClick={() => handleLinkClick("newArrivals")}
          className={`text-2xl font-bold mb-6 text-center ${
            activeLink === "newArrivals" ? "text-black" : "text-gray-400"
          } hover:text-black`}
        >
          New Arrivals
        </a>
        <a
          href="#"
          onClick={() => handleLinkClick("hotSales")}
          className={`text-2xl font-bold mb-6 text-center ${
            activeLink === "hotSales" ? "text-black" : "text-gray-400"
          } hover:text-black`}
        >
          Hot Sales
        </a>
      </div>
      
      <div className='px-[20vh]'>
        <Products />
      </div>
      
      <ProductSale />
      <Instagram />

      <div className="text-center h-[90vh]">
        <p className="text-red-600 text-sm mb-4 font-semibold uppercase tracking-[4px]">
          Latest News
        </p>
        <h1 className="text-black text-4xl font-bold tracking-wide mb-6">
          Fashion New Trends
        </h1>
        <FashionTrends limit={3} />
      </div>

    </div>
  );
};

export default Home;

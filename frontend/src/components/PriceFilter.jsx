import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdRefresh } from 'react-icons/md';
import { motion } from 'framer-motion';

const PriceFilter = ({ selectedPriceRange, onSelectPriceRange }) => {
  const priceRanges = [
    { label: "$0.00 - $50.00", min: 0, max: 50 },
    { label: "$50.00 - $100.00", min: 50, max: 100 },
    { label: "$100.00 - $150.00", min: 100, max: 150 },
    { label: "$150.00 - $200.00", min: 150, max: 200 },
    { label: "$200.00 - $250.00", min: 200, max: 250 },
    { label: "$250.00+", min: 250, max: null },
  ];
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-3 mt-6">
        <h1 className="font-bold uppercase flex gap-2 ">
          Filter Price
          <MdRefresh 
            className="text-xl cursor-pointer" 
            onClick={() => onSelectPriceRange(null)} 
          />
        </h1>

        {/* Toggle Collapse Button */}
        {isCollapsed ? (
          <IoIosArrowUp 
            className="text-2xl cursor-pointer" 
            onClick={() => setIsCollapsed(false)} 
          />
        ) : (
          <IoIosArrowDown 
            className="text-2xl cursor-pointer" 
            onClick={() => setIsCollapsed(true)} 
          />
        )}
      </div>


      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isCollapsed ? 0 : "auto", opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden border-b border-gray-300" 
      >
        <div className="text-gray-400 mb-4">
        {priceRanges.map((range, index) => (
          <div
            key={index}
            className={`my-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:text-black hover:font-semibold ${
              selectedPriceRange?.label === range.label ?  'text-black font-bold' : 'text-gray-500'
            }`}
            onClick={() => onSelectPriceRange(range)}
          >
            {range.label}
          </div>
        ))}
        </div>
      </motion.div>
    </>
  );
};

export default PriceFilter;

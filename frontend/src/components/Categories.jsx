import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdRefresh } from 'react-icons/md';
import { motion } from 'framer-motion';

const Categories = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/category/")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold uppercase flex gap-2">
          Categories
          <MdRefresh 
            className="text-xl cursor-pointer" 
            onClick={() => onSelectCategory("")} 
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
          {categories.map((category) => (
            <h2
            key={category.id}
            className={`my-1 cursor-pointer transition-all duration-300 ease-in-out transform hover:text-black hover:font-semibold ${
              selectedCategory === category.name ? 'text-black font-bold' : 'text-gray-500'
            }`}          
              onClick={() => onSelectCategory(category.name)}
            >
              {category.name}
            </h2>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Categories;

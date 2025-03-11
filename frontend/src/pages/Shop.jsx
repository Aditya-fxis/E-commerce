import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import Categories from "../components/Categories";
import Products from "../pages/Products";
import PriceFilter from "../components/PriceFilter";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSelectPriceRange = (range) => {
    setSelectedPriceRange(range);
  };

  return (
    <div className="flex p-4 gap-8">
      {/* Left Side - Categories & Search */}
      <div className="w-[20%] p-4 pl-[10vh]">
        {/* Search bar */}
        <div className="relative w-[100%] mb-8">
          <input
            type="text"
            className="border-1 text-gray-300 border-gray-300 py-2 pl-6 pr-10 outline-none w-full"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-xl" />
        </div>

        {/* Clear all filters */}
        <button
          className="w-[80%] mb-6 border border-black  hover:text-white py-3 px-3 hover:bg-black transition-all duration-300 ease-in-out cursor-pointer uppercase tracking-[1px] text-xs"
          onClick={() => {
            setSelectedCategory("");
            setSelectedPriceRange(null);
            // setSearchQuery("");
            // setSortBy("");
          }}
        >
          Clear All Filters
        </button>

        {/* Category Filter */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Price Filter */}
        <PriceFilter
          selectedPriceRange={selectedPriceRange}
          onSelectPriceRange={handleSelectPriceRange}
        />
      </div>

      
      
      {/* Right Side - Products */}
      <div className="w-[80%] pr-[10vh] mt-4">
        <div className="flex justify-between">
          
          <h2>Showing 1–12 of 126 results</h2>
          
          {/* Sort Dropdown */}
          <div className="mb-4 flex justify-end">
            <h2>Sort by Price: </h2>
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
        <Products
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          selectedPriceRange={selectedPriceRange}
          sortBy={sortBy}
        />
      </div>
    </div>
  );
};

export default Shop;

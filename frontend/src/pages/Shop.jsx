import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import Categories from "../components/Categories";
import Products from "../pages/Products";
import PriceFilter from "../components/PriceFilter";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const cachedProfile = localStorage.getItem("user_profile");
    if (cachedProfile) {
      setProfile(JSON.parse(cachedProfile));
    }
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSelectPriceRange = (range) => {
    setSelectedPriceRange(range);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const openAddProductModal = () => {
    setIsAddProductOpen(true);
  };

  const closeAddProductModal = () => {
    setIsAddProductOpen(false);
  };

  return (
    <div className="relative flex flex-col md:flex-row p-4 gap-10 mt-10 px-16">
      {/* Mobile Filter Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden ${
          isFilterOpen ? "block" : "hidden"
        }`}
        onClick={toggleFilter}
      ></div>

      {/* Mobile Filter Slider */}
      <div
        className={`fixed left-0 top-0 z-50 w-[250px] bg-white p-4 transition-transform transform ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden h-full overflow-y-auto`}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-xl font-bold"
          onClick={toggleFilter}
        >
          X
        </button>

        {/* Search bar */}
        <div className="relative w-full mb-8 mt-10">
          <input
            type="text"
            className="border border-gray-300 py-2 pl-6 pr-10 outline-none w-full"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-xl" />
        </div>

        {/* Add Product */}

        {profile?.user_type === "admin" ||
          ("Admin" && (
            <button
              className="w-full mb-1 bg-black text-white border border-black hover:text-black py-3 px-3 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer uppercase tracking-[1px] text-xs"
              onClick={openAddProductModal}
            >
              Add Product
            </button>
          ))}

        {/* Clear Filters */}
        <button
          className="w-full mb-6 border border-black hover:text-white py-3 px-3 hover:bg-black transition-all duration-300 ease-in-out cursor-pointer uppercase tracking-[1px] text-xs"
          onClick={() => {
            setSelectedCategory("");
            setSelectedPriceRange(null);
          }}
        >
          Clear All Filters
        </button>

        {/* Filters */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        <PriceFilter
          selectedPriceRange={selectedPriceRange}
          onSelectPriceRange={handleSelectPriceRange}
        />
      </div>

      {/* Desktop Sidebar Filter */}
      <div className="hidden md:block md:w-[15%]">
        {/* Search bar */}
        <div className="relative w-full mb-8">
          <input
            type="text"
            className="border border-gray-300 py-2 pl-6 pr-10 outline-none w-full"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 text-xl" />
        </div>

        {/* Add Product */}
        {profile?.user_type === "admin" ||
          "Admin" && (
            <button
              className="w-full mb-1 bg-black text-white border border-black hover:text-black py-3 px-3 hover:bg-white transition-all duration-300 ease-in-out cursor-pointer uppercase tracking-[1px] text-xs"
              onClick={openAddProductModal}
            >
              Add Product
            </button>
          )}
        {/* Clear Filters */}
        <button
          className="w-full mb-6 border border-black hover:text-white py-3 px-3 hover:bg-black transition-all duration-300 ease-in-out cursor-pointer uppercase tracking-[1px] text-xs"
          onClick={() => {
            setSelectedCategory("");
            setSelectedPriceRange(null);
          }}
        >
          Clear All Filters
        </button>

        {/* Filters */}
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
        <PriceFilter
          selectedPriceRange={selectedPriceRange}
          onSelectPriceRange={handleSelectPriceRange}
        />
      </div>

      {/* Main Product Area */}
      <div className="w-full md:w-[85%]">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
          <h2 className="text-center md:text-left">
            Showing 1–12 of 126 results
          </h2>

          {/* Sort Dropdown */}
          <div className="flex justify-center md:justify-end w-full md:w-auto mt-2 md:mt-0">
            <h2 className="mr-2">Sort by Price:</h2>
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

        {/* Product Listing */}
        <Products
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          selectedPriceRange={selectedPriceRange}
          sortBy={sortBy}
        />
      </div>

      {/* Mobile Filter Button */}
      <button
        className="block fixed bottom-6 left-6 z-50 md:hidden bg-black text-white py-2 px-6 rounded-xs shadow-[0_0_10px_#111111]"
        onClick={toggleFilter}
      >
        Filter
      </button>

      {isAddProductOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-md"
          onClick={closeAddProductModal}
        >
          <div
            className="relative bg-white bg-opacity-90 p-4 md:p-6 w-[90%] md:w-[50%] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-4 text-xl text-gray-900 hover:text-black"
              onClick={closeAddProductModal}
            >
              ✕
            </button>

            <AddProduct />
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;

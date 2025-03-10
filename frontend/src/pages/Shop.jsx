import React from 'react'
import { MdSearch } from 'react-icons/md';
import Categories from '../components/Categories';
import Products from '../pages/Products';
const Shop = () => {
  return (
    <div className="flex p-4 gap-8">
      {/* Left Side */}
      <div className="w-[25%] p-4 pl-[20vh]">

        <div className='relative w-[80%] mb-10'>
          <input
            type="text"
            className="border-1 text-gray-300 border-gray-300 py-2 pl-6 pr-8 outline-none"
            placeholder="Search..."
          />
           <MdSearch className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-gray-300 text-xl" />
        </div>

        <Categories/>
      </div>

      {/* Right Side */}
      <div className="w-[75%]">
        <Products/>
      </div>
    </div>
  );
}

export default Shop

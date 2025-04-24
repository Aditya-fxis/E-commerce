import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative">
      {/* Large Screen Layout */}
      <div className="hidden lg:block min-h-[160vh]">
        {/* First Banner */}
        <div className="group relative">
          <img
            className="absolute right-[18%] top-[100px] w-[400px] h-auto"
            src="banner-1.jpg"
            alt="banner-1"
          />
          <div className="absolute right-[41%] top-[250px]">
            <h1 className="text-black max-w-[300px] font-bold text-4xl leading-12">
              Clothing Collections 2030
            </h1>
            <Link
              to="#"
              className="inline-block text-black text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500 mt-2"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Second Banner */}
        <div className="group relative">
          <img
            className="absolute top-[460px] left-[12%] w-[400px] h-auto"
            src="banner-2.jpg"
            alt="banner-2"
          />
          <div className="absolute top-[890px] left-[12%]">
            <h1 className="text-black max-w-[300px] font-bold text-4xl leading-12">
              Accessories
            </h1>
            <Link
              to="#"
              className="inline-block text-black text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500 mt-2"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Third Banner */}
        <div className="group relative">
          <img
            className="absolute right-[11%] top-[650px] w-[400px] h-auto"
            src="banner-3.jpg"
            alt="banner-3"
          />
          <div className="absolute right-[34%] top-[800px]">
            <h1 className="text-black max-w-[300px] font-bold text-4xl leading-12">
              Shoes Spring 2030
            </h1>
            <Link
              to="#"
              className="inline-block text-black text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[1.5px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500 mt-2"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Stacked Layout (md & sm) */}
      <div className="block lg:hidden space-y-10 px-4 py-8">
        {/* Banner 1 */}
        <div className="relative group">
          <img
            className="w-full h-auto object-cover"
            src="banner-1.jpg"
            alt="banner-1"
          />
          <div className="absolute bottom-6 left-6 bg-black/60 p-4 w-full">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">
              Clothing Collections 2030
            </h1>
            <Link
              to="#"
              className="inline-block text-white text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative group">
          <img
            className="w-full h-auto object-cover"
            src="banner-2.jpg"
            alt="banner-2"
          />
          <div className="absolute bottom-6 left-6 bg-black/60 p-4 w-full">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">
              Accessories
            </h1>
            <Link
              to="#"
              className="inline-block text-white text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Banner 3 */}
        <div className="relative group">
          <img
            className="w-full h-auto object-cover"
            src="banner-3.jpg"
            alt="banner-3"
          />
          <div className="absolute bottom-6 left-6 bg-black/60 p-4 w-full">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">
              Shoes Spring 2030
            </h1>
            <Link
              to="#"
              className="inline-block text-white text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

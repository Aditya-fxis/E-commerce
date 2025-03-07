import React from "react";
import { PiCalendarDotsThin } from "react-icons/pi";
const FashionTrends = () => {
  return (
    <div className="max-w-6xl mx-auto text-center p-6 h-[90vh]">
      <p className="text-red-600 text-sm mb-4 font-semibold uppercase tracking-[4px]">
        Latest News
      </p>
      <h1 className="text-black text-4xl font-bold tracking-wide mb-6">
        Fashion New Trends
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
     {/* Card 1 */}
        <div className="relative group">
          <img
            src="blog-1.jpg"
            alt="fashion image"
            className="w-full h-auto shadow-md"
          />
          <div className="bg-white w-[300px] h-[160px] absolute bottom-[-140px] left-[6.5%] justify-center text-left p-8 text-gray-700">
            <p className="flex items-center font-light text-xs gap-2">
              <PiCalendarDotsThin className="text-lg"/>
              16 February 2025
            </p>
            <h1 className="text-black max-w-[300px] font-bold text-1xl mt-4">
            What Curling Irons Are The Best Ones
            </h1>
            <a
              href="#"
              className="inline-block text-black text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500 mt-2"
            >
              Read More
            </a>
          </div>
        </div>
      {/* Card 2 */}
        <div className="relative group">
          <img
            src="blog-2.jpg"
            alt="fashion image"
            className="w-full h-auto shadow-md"
          />
          <div className="bg-white w-[300px] h-[160px] absolute bottom-[-140px] left-[6.5%] justify-center text-left p-8 text-gray-700">
            <p className="flex items-center font-light text-xs gap-2">
              <PiCalendarDotsThin className="text-lg"/>
              16 February 2025
            </p>
            <h1 className="text-black max-w-[300px] font-bold text-1xl mt-4">
            What Curling Irons Are The Best Ones
            </h1>
            <a
              href="#"
              className="inline-block text-black text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500 mt-2"
            >
              Read More
            </a>
          </div>
        </div>
      {/* Card 3 */}
        <div className="relative group">
          <img
            src="blog-3.jpg"
            alt="fashion image"
            className="w-full h-auto shadow-md"
          />
          <div className="bg-white w-[300px] h-[160px] absolute bottom-[-140px] left-[6.5%] justify-center text-left p-8 text-gray-700">
            <p className="flex items-center font-light text-xs gap-2">
              <PiCalendarDotsThin className="text-lg"/>
              16 February 2025
            </p>
            <h1 className="text-black max-w-[300px] font-bold text-1xl mt-4">
            What Curling Irons Are The Best Ones
            </h1>
            <a
              href="#"
              className="inline-block text-black text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500 mt-2"
            >
              Read More
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FashionTrends;

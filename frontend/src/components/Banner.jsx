import React from "react";

const Banner = () => {
  return (
    <div className="relative min-h-[160vh]">
      {/* First Banner */}
      <div className="group relative">
        <img
          className="absolute right-[18%] top-[100px]"
          src="banner-1.jpg"
          alt="banner-1"
        />
        <div className="absolute right-[41%] top-[250px]">
          <h1 className="text-black max-w-[300px] font-bold text-4xl leading-12">
            Clothing Collections 2030
          </h1>
          <a
            href="#"
            className="inline-block text-black text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500 mt-2"
          >
            Shop now
          </a>
        </div>
      </div>

      {/* Second Banner */}
      <div className="group relative">
        <img
          className="absolute top-[460px] left-[12%]"
          src="banner-2.jpg"
          alt="banner-2"
        />
        <div className="absolute top-[950px] left-[12%]">
          <h1 className="text-black max-w-[300px] font-bold text-4xl leading-12">
            Accessories
          </h1>
          <a
            href="#"
            className="inline-block text-black text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500 mt-2"
          >
            Shop now
          </a>
        </div>
      </div>

      {/* Third Banner */}
      <div className="group relative">
        <img
          className="absolute right-[11%] top-[650px]"
          src="banner-3.jpg"
          alt="banner-3"
        />
        <div className="absolute right-[34%] top-[800px]">
          <h1 className="text-black max-w-[300px] font-bold text-4xl leading-12">
            Shoes Spring 2030
          </h1>
          <a
            href="#"
            className="inline-block text-black text-sm font-bold tracking-[3px] uppercase relative py-1 after:content-[''] after:block after:w-full after:h-[1.5px] after:bg-black after:transition-all after:duration-300 group-hover:after:w-10 group-hover:after:bg-red-500 mt-2"
          >
            Shop now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;

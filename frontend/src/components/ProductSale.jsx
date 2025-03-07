import React, { useEffect, useState } from 'react'

const ProductSale = () => {
    const saleEndTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
    const [timeLeft, setTimeLeft] = useState(saleEndTime - new Date().getTime());
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(saleEndTime - new Date().getTime());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);

    const getTimeParts = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { days, hours, minutes, seconds };
      };
    
      const { days, hours, minutes, seconds } = getTimeParts(timeLeft);
  return (
    <div className="my-16 py-[160px] bg-[#f3f2ee] grid grid-cols-3 gap-8">
      <div className="bg-white w-[300px] relative h-[300px]">
        <div className="absolute right-[-128px] ">
          <h1 className="text-4xl pt-15 text-gray-400">Clothings Hot</h1>
          <h1 className="text-4xl font-bold pt-8">Shoe Collection</h1>
          <h1 className="text-4xl pt-8 text-gray-400">Accessories</h1>
        </div>
      </div>

      <div className="relative flex justify-center items-center pr-[30%]">
        <div className="bg-black top-[-32px] right-[30%] z-2 absolute rounded-full w-24 h-24 flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-sm text-white">Sale Of</h1>
            <h1 className="text-[1.25rem] font-bold text-white">$60.99</h1>
          </div>
        </div>
        <img
          className="absolute left-0"
          src="/product-sale.png"
          alt="sale-photo"
        />
      </div>

      <div className="pr-[30%] ml-[-60px]">
        <p className="text-red-600 text-sm mb-8 font-semibold uppercase tracking-[4px]">
          Deal Of The Week
        </p>
        <h1 className="text-black text-4xl font-bold tracking-[2px]">
          Multi-pocket Chest Bag Black
        </h1>

        {/* Clock */}
        <div className="flex space-x-6 text-center text-black py-8">
          <div className="relative">
            <span className="block text-4xl font-bold px-4 pb-4">{days}</span>
            <p className="text-sm text-gray-700">Days</p>
            <span className="absolute right-[-14px] top-[0px] text-2xl font-semibold text-gray-600">
              :
            </span>
          </div>
          <div className="relative">
            <span className="block text-4xl font-bold px-4 pb-4">{hours}</span>
            <p className="text-sm text-gray-700">Hours</p>
            <span className="absolute right-[-14px] top-[0px] text-2xl font-semibold text-gray-600">
              :
            </span>
          </div>
          <div className="relative">
            <span className="block text-4xl font-bold px-4 pb-4">{minutes}</span>
            <p className="text-sm text-gray-700">Minutes</p>
            <span className="absolute right-[-14px] top-[0px] text-2xl font-semibold text-gray-600">
              :
            </span>
          </div>
          <div className="relative">
            <span className="block text-4xl font-bold px-4 pb-4">{seconds}</span>
            <p className="text-sm text-gray-700">Seconds</p>
          </div>
        </div>

        <button className="flex items-center uppercase tracking-[3px] bg-black text-white p-4 px-8 text-sm font-semibold">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default ProductSale

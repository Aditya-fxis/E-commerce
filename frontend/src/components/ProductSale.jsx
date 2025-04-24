import React, { useEffect, useState } from 'react';

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
    <div className="my-16 py-[10%] px-4 bg-[#f3f2ee] grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-center">
      {/* Left Text Column */}
      <div className="bg-white w-full max-w-[300px] h-[300px] relative flex items-center justify-center">
        <div className="text-center md:text-left md:absolute md:right-[-128px]">
          <h1 className="text-3xl md:text-4xl text-gray-400">Clothings Hot</h1>
          <h1 className="text-3xl md:text-4xl font-bold pt-6">Shoe Collection</h1>
          <h1 className="text-3xl md:text-4xl pt-6 text-gray-400">Accessories</h1>
        </div>
      </div>

      {/* Middle Image with Price Badge */}
      <div className="relative flex justify-center items-center w-full max-w-[300px]">
        <div className="bg-black absolute -top-8 z-10 rounded-full w-20 h-20 flex justify-center items-center right-8">
          <div className="text-center text-white">
            <p className="text-xs">Sale Of</p>
            <p className="text-base font-bold">$60.99</p>
          </div>
        </div>
        <img src="/product-sale.png" alt="sale-photo" className="w-full object-contain" />
      </div>

      {/* Right Text Content */}
      <div className="w-full max-w-lg text-center md:text-left">
        <p className="text-red-600 text-sm mb-6 font-semibold uppercase tracking-[4px]">
          Deal Of The Week
        </p>
        <h1 className="text-black text-2xl md:text-4xl font-bold tracking-[2px]">
          Multi-pocket Chest Bag Black
        </h1>

        {/* Countdown Timer */}
        <div className="flex justify-center md:justify-start flex-wrap gap-4 text-black py-8">
          {[
            { label: 'Days', value: days },
            { label: 'Hours', value: hours },
            { label: 'Minutes', value: minutes },
            { label: 'Seconds', value: seconds },
          ].map((item, i) => (
            <div className="text-center relative" key={i}>
              <span className="block text-3xl font-bold px-4 pb-2">{item.value}</span>
              <p className="text-sm text-gray-700">{item.label}</p>
              {i < 3 && (
                <span className="absolute right-[-10px] top-[-4px] text-2xl font-semibold text-gray-600">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <button className="uppercase tracking-[3px] bg-black text-white px-8 py-3 text-sm font-semibold">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductSale;

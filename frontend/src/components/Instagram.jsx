import React from 'react';

const Instagram = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-[90vh] px-6 py-8 gap-8 pb-[8%]">
      
      {/* Images Grid */}
      <div className="w-full lg:w-3/5">
        <div className="grid grid-cols-2 sm:grid-cols-3 px-10">
          <img src="instagram-1.jpg" alt="instagram" className="w-full h-full object-cover" />
          <img src="instagram-2.jpg" alt="instagram" className="w-full h-full object-cover" />
          <img src="instagram-3.jpg" alt="instagram" className="w-full h-full object-cover" />
          <img src="instagram-4.jpg" alt="instagram" className="w-full h-full object-cover" />
          <img src="instagram-5.jpg" alt="instagram" className="w-full h-full object-cover" />
          <img src="instagram-6.jpg" alt="instagram" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-start">
        <h1 className="text-3xl sm:text-4xl font-bold">Instagram</h1>
        <p className="text-gray-600 text-sm mt-6 max-w-md text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro aperiam alias earum quidem quibusdam dicta vel deleniti perferendis ab nisi.
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mt-10">#Men_Fashion</h1>
      </div>
    </div>
  );
};

export default Instagram;

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowRoundForward } from "react-icons/io";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { FaPinterest, FaInstagram } from "react-icons/fa";

const Hero = () => {
  const images = [
    "/hero-1.jpg",
    "/hero-2.jpg",
    "/hero-3.jpg",
    "/hero-4.jpg",
    "/hero-5.jpg",
    "/hero-6.jpg",
  ];

  return (
    <div className="relative h-screen w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={true}
        pagination={{ clickable: true }}
        className="h-full"
      >
        <style>
          {`
      .swiper-button-next, .swiper-button-prev {
        color: black !important;
        margin : 0px 10px;
      }
    `}
        </style>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen w-full">
              <img
                className="h-[110vh] w-full object-fill lg:object-cover"
                src={image}
                alt="Hero Image"
              />

              {/* Text Content */}
              <div className="absolute left-1/3 pl-48 top-100 transform -translate-x-1/2 -translate-y-1/2 text-left">
                <p className="text-red-600 text-sm mb-8 font-semibold uppercase tracking-[2px]">
                  Summer Collection
                </p>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-black text-[2.8rem] font-extrabold w-[60%] tracking-[1.5px] leading-[56px]"
                >
                  Fall - Winter Collections 2030
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="mt-8 mb-8 w-[55%] leading-7 text-gray-700"
                >
                  A specialist label creating luxury essentials. Ethically
                  crafted with an unwavering commitment to exceptional quality.
                </motion.p>

                {/* Shop Now Button */}
                <motion.button
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.28 }}
                  className="flex items-center uppercase tracking-[3px] bg-black text-white p-3 px-10 text-sm font-semibold cursor-pointer"
                >
                  Shop Now
                  <span className="text-3xl font-bold ml-2">
                    <IoIosArrowRoundForward />
                  </span>
                </motion.button>

                {/* Social Media Links */}
                <div className="flex gap-4 text-xl text-gray-500 mt-8">
                  <motion.span
                    className="cursor-pointer"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.28 }}
                  >
                    <TiSocialTwitter />
                  </motion.span>
                  <motion.span
                    className="cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.28 }}
                  >
                    <TiSocialFacebook />
                  </motion.span>
                  <motion.span
                    className="cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.28 }}
                  >
                    <FaPinterest />
                  </motion.span>
                  <motion.span
                    className="cursor-pointer"
                    initial={{ opacity: 0, y: 45 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.28 }}
                  >
                    <FaInstagram />
                  </motion.span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;

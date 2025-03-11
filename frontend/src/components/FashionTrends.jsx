import React from "react";
import { PiCalendarDotsThin } from "react-icons/pi";

const blogPosts = [
  { id: 1, image: "blog-1.jpg", date: "16 February 2025", title: "What Curling Irons Are The Best Ones" },
  { id: 2, image: "blog-2.jpg", date: "16 February 2025", title: "Trending Fashion Styles for Summer" },
  { id: 3, image: "blog-3.jpg", date: "16 February 2025", title: "How to Style Oversized Jackets" },
  { id: 4, image: "blog-4.jpg", date: "17 February 2025", title: "Best Accessories to Match Your Outfit" },
  { id: 5, image: "blog-5.jpg", date: "18 February 2025", title: "Streetwear Fashion Trends in 2025" },
  { id: 6, image: "blog-6.jpg", date: "18 February 2025", title: "Streetwear Fashion Trends in 2025" },
  { id: 7, image: "blog-7.jpg", date: "18 February 2025", title: "Streetwear Fashion Trends in 2025" },
  { id: 8, image: "blog-8.jpg", date: "18 February 2025", title: "Streetwear Fashion Trends in 2025" },
  { id: 9, image: "blog-9.jpg", date: "18 February 2025", title: "Streetwear Fashion Trends in 2025" },
];

const FashionTrends = ({ limit }) => {
  const displayedPosts = limit ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <div key={post.id} className="group">
            <div className="relative">
              <img src={post.image} alt="fashion image" className="w-full h-auto shadow-md" />
              {/* Change absolute to relative and add min-h */}
              <div className="bg-white w-full min-h-[160px] relative text-left p-8 text-gray-700">
                <p className="flex items-center font-light text-xs gap-2">
                  <PiCalendarDotsThin className="text-lg" />
                  {post.date}
                </p>
                <h1 className="text-black max-w-[300px] font-bold text-1xl mt-4">
                  {post.title}
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
        ))}
      </div>
    </div>
  );
};


export default FashionTrends;

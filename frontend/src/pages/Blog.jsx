import React from 'react';
import FashionTrends from '../components/FashionTrends';

const Blog = () => {
  return (
    <>
      <div className='relative mb-16'>
        
        <h1 className='absolute font-bold text-6xl text-white top-[40%] left-[40%]'>
          Our Blog
        </h1>

        <img className='h-[50vh] object-cover' src="breadcrumb-bg.jpg" alt="blog-banner" />
      </div>

      <FashionTrends />
    </>
  );
};

export default Blog;

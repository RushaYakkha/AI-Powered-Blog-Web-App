//Implementation of linear search algorithm based on title or category whether include search string or not
import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion } from "motion/react";
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext.jsx';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input, setInput } = useAppContext(); // include setInput to update search input

  const filteredBlogs = () => {
    if (!blogs) return []; // safety check

    return blogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(input.toLowerCase()) ||
                            blog.category.toLowerCase().includes(input.toLowerCase());
      const matchesCategory = menu === "All" ? true : blog.category === menu;
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <div>
      {/* Search Field */}
      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-3/4 sm:w-1/2 p-2 border rounded outline-none"
        />
      </div>

      {/* Category Menu */}
      <div className='flex justify-center gap-4 sm:gap-8 my-6 relative'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId='underline'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'>
                </motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filteredBlogs().map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;

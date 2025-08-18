import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {
  const { setInput, input } = useAppContext();

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>

        {/* Header Section */}
        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
          <p>New : AI feature integrated</p>
          <img src={assets.star_icon} className='w-2.5' alt="" />
        </div>

        {/* Welcome Text */}
        <h2 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
          Write freely, Read <span className='text-primary'>deeply,</span> <br /> Connect meaningfully.
        </h2>

        {/* Description */}
        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
          At Blogance, we believe everyone has a story worth sharing. Whether you're here to inspire, inform, or simply express — this is your creative home.
        </p>

        {/* Clear Search Button */}
        {input && (
          <div className='text-center'>
            <button
              onClick={() => setInput('')}
              className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer mt-2'
            >
              Clear Search
            </button>
          </div>
        )}

      </div>

      {/* Background Image */}
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
    </div>
  )
}

export default Header

'use client'
import React from 'react'
import isAuth from '@/IsCompAuth';
import PostBox from '@/components/PostBox';
import { useMediaQuery } from 'react-responsive';
const Home = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  return (
    <div className='max-h-[79vh] overflow-y-scroll scrollbar-none md:border-r md:p-5 md:max-h-[90vh] md:w-[55%]'>
      {!isMobile && <PostBox />}
    </div>
  );
}
export default isAuth(Home);

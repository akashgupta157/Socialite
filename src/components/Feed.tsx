import React from 'react'
import PostBox from './PostBox'
import { useMediaQuery } from 'react-responsive';
export default function Feed() {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  return (
    <div className='max-h-[79vh] overflow-y-scroll scrollbar-none md:border-r md:p-5 md:max-h-[90vh] md:w-[55%]'>
      {!isMobile && <PostBox />}
    </div>
  )
}

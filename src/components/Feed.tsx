import React from 'react'
import PostBox from './PostBox'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive';
export default function Feed() {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const selected = useSelector((state: any) => state.selection.selected)
  console.log(selected)
  return (
    <div className='max-h-[79vh] overflow-y-scroll md:border-r md:p-5 md:max-h-[90vh] md:w-[55%]'>
      {
        isMobile && (selected === 'AddPost') && <div>kjbh</div>
      }
      <PostBox />
    </div>
  )
}

'use client'
import React, { useEffect, useState } from 'react'
import isAuth from '@/IsCompAuth';
import PostBox from '@/components/PostBox';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux'
import { configure } from '@/components/misc'
import axios from 'axios';
import Posts from '@/components/Posts';
import { Spinner } from 'flowbite-react'
const Home = () => {
  const user = useSelector((state: any) => state.user.user)
  const config = configure(user.token)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  async function fetchPosts() {
    setLoading(true)
    const { data } = await axios.get('/api/post/crudposts?action=home', config)
    setPosts(data.posts)
    setLoading(false)
  }
  useEffect(() => {
    fetchPosts()
  }, []);
  return (
    <div className='max-h-[79vh] overflow-y-scroll scrollbar-none md:p-5 md:max-h-[90vh] md:w-[55%] md:mx-auto'>
      {!isMobile && <PostBox />}
      {
        loading ?
          <div className='flex justify-center items-center mt-40'>
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
          :
          <div className='flex flex-col gap-3 px-5 mt-5'>
            {
              posts?.map((post: any) => <Posts key={post._id} post={post} isProfile={true} />)
            }
          </div>
      }
    </div>
  );
}
export default isAuth(Home);

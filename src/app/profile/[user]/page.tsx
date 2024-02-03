'use client'
import React, { useEffect, useState } from 'react'
import isAuth from '@/IsCompAuth'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { configure, formatNumber } from '@/components/misc'
import { Spinner } from 'flowbite-react'
interface UserDetails {
  bio: string
  followers: any
  following: any
  posts: any
  profilePicture: string;
  name: string;
  username: string;
}
const Profile = () => {
  const router = useRouter()
  const pathname = usePathname()
  const username = pathname?.split('/').pop()
  const user = useSelector((state: any) => state.user.user)
  const [self, setSelf] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [currentTab, setCurrentTab] = useState('posts');
  const config = configure(user.token)
  const fetchUserDetails = async () => {
    setLoading(true)
    const { data } = await axios.get(`/api/user/${username}`)
    if (data.success) {
      setUserDetails(data.user)
    } else {
      toast.error(data.message, {
        duration: 2000,
        position: 'top-center',
        style: {
          backgroundColor: "#E03615",
          color: 'white'
        },
        iconTheme: {
          primary: 'white',
          secondary: "#E03615"
        }
      })
      router.push('/home')
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchUserDetails()
    if (user.username === username) {
      setSelf(true)
    }
  }, []);
  useEffect(() => {
    const isUserFollowed = userDetails?.followers.some((follower: { _id: any }) => follower._id === user._id);
    setIsFollowing(isUserFollowed)
  }, [userDetails]);
  const handleFollow = async () => {
    if (isFollowing) {
      let updatedFollowers = userDetails?.followers.filter(
        (userId: { toString: () => any }) =>
          userId.toString() !== user._id.toString()
      );
      if (userDetails) {
        const updatedUserDetails = { ...userDetails, followers: updatedFollowers }
        setUserDetails(updatedUserDetails)
      }
    } else {
      userDetails?.followers.push(user._id)
    }
    setIsFollowing(!isFollowing)
    await axios.post(`/api/user/${username}`, { username }, config)
  }
  return (
    <>
      {
        loading ?
          <div className='md:w-[80%] flex justify-center items-center md:mt-0 mt-48'>
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
          :
          <div className='max-h-[79vh] overflow-y-scroll scrollbar-none md:max-h-[90vh] md:w-[80%]'>
            {/* mobile */}
            <nav className='md:hidden'>
              <div className='flex justify-between items-center p-3'>
                <div className='flex items-center gap-3'>
                  {userDetails && <Image src={userDetails.profilePicture} loading='lazy' alt={'profilePicture'} width="0" height="0" sizes="100vw" className="rounded-full w-20" />}
                  <div>
                    <h1 className='text-xl font-semibold'>{userDetails && userDetails.name}</h1>
                    <p className='text-sm italic text-gray-600 font-semibold'>@{userDetails && userDetails.username}</p>
                  </div>
                </div>
                {
                  self ? <button className='bg-[#9d9290] text-white font-semibold px-5 py-1 rounded-lg'>Edit Profile</button> : <button onClick={handleFollow} className={`${isFollowing ? 'bg-[#9d9290]' : 'bg-[#0381ec]'}  text-white font-semibold px-5 py-1 rounded-lg`}>{isFollowing ? 'Following' : 'Follow'}</button>
                }
              </div>
              <p>{userDetails && userDetails.bio}</p>
              <div className='border flex justify-evenly items-center mt-1'>
                <div className='flex flex-col items-center'>
                  {userDetails && <><h1 className='font-bold'>{formatNumber(userDetails.posts.length)}</h1><p>posts</p></>}
                </div>
                <div className='flex flex-col items-center'>
                  {userDetails && <><h1 className='font-bold'>{formatNumber(userDetails.followers.length)}</h1><p>followers</p></>}
                </div>
                <div className='flex flex-col items-center'>
                  {userDetails && <><h1 className='font-bold'>{formatNumber(userDetails.following.length)}</h1><p>following</p></>}
                </div>
              </div>
            </nav>
            {/* laptop */}
            <nav className='hidden md:flex w-[85%] border-b m-auto justify-between items-center py-4 px-5'>
              <div className='flex justify-between items-center gap-10'>
                {userDetails && <Image src={userDetails.profilePicture} alt={'profilePicture'} width="0" height="0" sizes="100vw" className="rounded-full w-36" />}
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-16'>
                    <div>
                      <h1 className='text-xl font-semibold'>{userDetails && userDetails.name}</h1>
                      <p className='text-sm italic text-gray-600 font-semibold'>@{userDetails && userDetails.username}</p>
                    </div>
                    {
                      self ? <button className='bg-[#9d9290] text-white font-semibold px-5 py-1 rounded-lg'>Edit Profile</button> : <button onClick={handleFollow} className={`${isFollowing ? 'bg-[#9d9290]' : 'bg-[#0381ec]'}  text-white font-semibold px-5 py-1 rounded-lg`}>{isFollowing ? 'Following' : 'Follow'}</button>
                    }
                  </div>
                  <div className='flex items-center gap-5'>
                    {userDetails && <h1 className='font-bold'>{formatNumber(userDetails.posts.length)} posts</h1>}
                    {userDetails && <h1 className='font-bold'>{formatNumber(userDetails.followers.length)} followers</h1>}
                    {userDetails && <h1 className='font-bold'>{formatNumber(userDetails.following.length)} following</h1>}
                  </div>
                  <p>{userDetails && userDetails.bio}</p>
                </div>
              </div>
            </nav>
            <div className='flex justify-evenly items-center'>
              <button className={`px-2 md:text-lg ${currentTab === 'posts' && "text-[#0381ec] border-t-2 border-[#0381ec]"}`} onClick={() => setCurrentTab('posts')}>Posts</button>
              <button className={`px-2 md:text-lg ${currentTab === 'likes' && "text-[#0381ec] border-t-2 border-[#0381ec]"}`} onClick={() => setCurrentTab('likes')}>Likes</button>
            </div>
          </div>
      }
    </>
  )
}
export default isAuth(Profile)
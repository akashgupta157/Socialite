'use client'
import React, { useEffect, useState } from 'react'
import isAuth from '@/IsCompAuth'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { formatNumber } from '@/components/misc'
interface UserDetails {
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
  const fetchUserDetails = async () => {
    const { data } = await axios.get(`/api/auth/${username}`)
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
  }
  useEffect(() => {
    if (user.username === username) {
      setSelf(true)
    }
    fetchUserDetails()
  }, []);
  return (
    <div className='max-h-[79vh] overflow-y-scroll scrollbar-none md:max-h-[90vh] md:w-[80%]'>
      <nav className='md:hidden'>
        <div className='flex justify-between items-center gap-3 p-3'>
          <div className='flex items-center gap-3'>
            {userDetails && <Image src={userDetails.profilePicture} alt={'profilePicture'} width="0" height="0" sizes="100vw" className="rounded-full w-20" />}
            <div>
              <h1 className='text-xl font-semibold'>{userDetails && userDetails.name}</h1>
              <p className='text-sm italic text-gray-600 font-semibold'>@{userDetails && userDetails.username}</p>
            </div>
          </div>
          <button className='bg-[#9d9290] text-white font-semibold px-3 py-1 rounded-lg'>{self ? 'Edit Profile' : 'Follow'}</button>
        </div>
        <div className='border flex justify-evenly items-center mt-1 mb-1'>
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
    </div>
  )
}
export default isAuth(Profile)
'use client'
import React, { useEffect, useState } from 'react'
import isAuth from '@/IsCompAuth'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
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
      <nav className='flex border-b w-[90%] m-auto py-4 px-20 gap-20'>
        {userDetails && <Image src={userDetails.profilePicture} alt={'profilePicture'} width="0" height="0" sizes="100vw" className="rounded-full md:w-36 w-20 h-auto" />}
        <div>
          <div>
            <div>
              <h1>{userDetails && userDetails.name}</h1>
              <p>{userDetails && userDetails.username}</p>
            </div>
            <div>
              <p>{userDetails && userDetails.posts.length} posts</p>
              <p>{userDetails && userDetails.followers.length} followers</p>
              <p>{userDetails && userDetails.following.length} following</p>
            </div>
            {self && <button className='rounded-badge capitalize '>edit profile</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}
export default isAuth(Profile)
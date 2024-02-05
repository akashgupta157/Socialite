'use client'
import React, { useEffect, useState } from 'react'
import isAuth from '@/IsCompAuth'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { configure, formatNumber, uploadCloudinary } from '@/components/misc'
import { Spinner, Modal, Button, FloatingLabel } from 'flowbite-react'
import { Camera } from 'lucide-react'
import { LOGIN } from '@/redux/slices/userSlice'
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
  const dispatch = useDispatch()
  const username = pathname?.split('/').pop()
  const user = useSelector((state: any) => state.user.user)
  const [self, setSelf] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [currentTab, setCurrentTab] = useState('posts');
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [updateProfile, setUpdateProfile] = useState({
    profilePicture: user.profilePicture,
    name: user.name,
    bio: user.bio
  });
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
      if (userDetails) {
        userDetails.followers = userDetails?.followers.filter((follower: { _id: any }) => follower._id !== user._id)
      }
    } else {
      userDetails?.followers.push(user._id)
    }
    setIsFollowing(!isFollowing)
    await axios.post(`/api/user/${username}`, { username }, config)
  }
  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setUpdateProfile({ ...updateProfile, profilePicture: URL.createObjectURL(e.target.files[0]) })
  };
  const handleUpdateProfile = async () => {
    try {
      if (selectedFile) {
        const { url } = await uploadCloudinary(selectedFile);
        updateProfile.profilePicture = url;
      }
      const { data } = await axios.patch('/api/user/profile', { ...updateProfile }, config);
      setUserDetails(data.user)
      sessionStorage.setItem('user', JSON.stringify({ ...data.user, token: user.token }))
      dispatch(LOGIN({ ...data.user, token: user.token }))
      setOpenModal(false)
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
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
              <div className='flex justify-between items-center px-3 py-2'>
                <div className='flex items-center gap-3'>
                  {userDetails && <Image src={userDetails.profilePicture} loading='lazy' alt={'profilePicture'} width="0" height="0" sizes="100vw" className="rounded-full w-20 h-20 object-contain border" />}
                  <div>
                    <h1 className='text-xl font-semibold'>{userDetails && userDetails.name}</h1>
                    <p className='text-sm italic text-gray-600 font-semibold'>@{userDetails && userDetails.username}</p>
                  </div>
                </div>
                {
                  self ? <button className='bg-[#9d9290] text-white font-semibold px-2 py-1 rounded-lg' onClick={() => setOpenModal(true)}>Edit Profile</button> : <button onClick={handleFollow} className={`${isFollowing ? 'bg-[#9d9290]' : 'bg-[#0381ec]'}  text-white font-semibold px-2 py-1 rounded-lg`}>{isFollowing ? 'Following' : 'Follow'}</button>
                }
              </div>
              <p className='px-4'>{userDetails && userDetails.bio}</p>
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
                {userDetails && <Image src={userDetails.profilePicture} alt={'profilePicture'} width="0" height="0" sizes="100vw" className="rounded-full w-36 h-36 object-contain" />}
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center gap-16'>
                    <div>
                      <h1 className='text-xl font-semibold'>{userDetails && userDetails.name}</h1>
                      <p className='text-sm italic text-gray-600 font-semibold'>@{userDetails && userDetails.username}</p>
                    </div>
                    {
                      self ? <button className='bg-[#9d9290] text-white font-semibold px-5 py-1 rounded-lg' onClick={() => setOpenModal(true)}>Edit Profile</button> : <button onClick={handleFollow} className={`${isFollowing ? 'bg-[#9d9290]' : 'bg-[#0381ec]'}  text-white font-semibold px-5 py-1 rounded-lg`}>{isFollowing ? 'Following' : 'Follow'}</button>
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <div className='relative max-w-fit mb-2'>
            <Image src={updateProfile.profilePicture} alt={'profilePicture'} width="0" height="0" sizes="100vw" className="rounded-full w-28 h-28 object-contain border" />
            <label htmlFor="file" className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white cursor-pointer bg-black p-3 rounded-full bg-opacity-[0.5] hover:bg-opacity-[0.4]' >
              <Camera />
            </label>
            <input type="file" name="" id="file" accept="image/*" hidden onChange={handleFileChange} />
          </div>
          <FloatingLabel variant="outlined" label="Name" value={updateProfile.name} onChange={(e) => setUpdateProfile({ ...updateProfile, name: e.target.value })} />
          <div className="relative mt-2">
            <textarea id="floating_outlined" className="block px-2.5 pb-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={updateProfile.bio} maxLength={150} onChange={(e) => setUpdateProfile({ ...updateProfile, bio: e.target.value })} />
            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Bio</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdateProfile}>Save</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default isAuth(Profile)
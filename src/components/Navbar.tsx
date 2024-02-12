'use client'
import React, { useEffect, useState } from 'react'
import logo from '@/images/logo.png'
import { Search, Menu, X, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import isAuth from '@/IsCompAuth'
const Image = React.lazy(() => import('next/image'));
import axios from 'axios';
import { configure } from '../config/misc';
import { Avatar } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import useDebounce from '@/config/useDebounce';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { LOGOUT } from '@/redux/slices/userSlice';
const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user.user)
    const token = useSelector((state: any) => state.user.user?.token)
    const config = configure(token)
    const router = useRouter()
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500)
    const [searchResults, setSearchResults] = useState<any[]>([0]);
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const fetchResults = async () => {
        try {
            const { data } = await axios.get(
                `api/user/search?search=${search}&user=${user._id}`
            );
            setSearchResults(data.users);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        if (debouncedSearch) {
            fetchResults()
        }
        if (!search) {
            setSearchResults([0])
        }
    }, [debouncedSearch])
    return (
        <nav className='sticky top-0 flex justify-between items-center border-b md:h-[10vh] h-[7vh] px-5 bg-white z-10'>
            <Image src={logo} alt="logo" priority className='w-[100px] md:w-[150px]' />
            <label htmlFor="search" className='hidden md:flex items-center border border-gray-300 bg-gray-100 rounded-full w-[40%] px-3 '>
                <Search className='text-gray-500' />
                <input type="text" autoComplete='off' placeholder="Search now..." onChange={(e) => setSearch(e.target.value)} id='search' className='w-full bg-transparent border-transparent focus:border-transparent focus:ring-0' />
            </label>
            <div className='hidden md:inline-flex absolute top-[8.5vh] bg-white left-[33%]'>
                {
                    (searchResults?.length > 0 && searchResults[0] !== 0) &&
                    <div className='w-[250px] max-h-[200px] overflow-y-scroll scrollbar-none py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded'>
                        {
                            searchResults.map((e, i) => (
                                <div key={i}>
                                    <div className='flex items-center gap-3 hover:bg-gray-100 cursor-pointer px-2 py-1' onClick={() => {
                                        setSearch("")
                                        router.push(`/profile/${e.username}`)
                                    }}>
                                        <Avatar img={e.profilePicture} rounded />
                                        <span className='flex flex-col'>
                                            <b>{e.name}</b>
                                            <i className='text-gray-400 text-sm'>@{e.username}</i>
                                        </span>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    (searchResults?.length === 0) &&
                    <div className='w-[250px] py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded'>
                        <p className='text-center text-gray-400'>User not found</p>
                    </div>
                }
            </div>
            <div className='hidden md:flex items-center gap-3'>
                <div className='flex flex-col gap-0 items-end'>
                    <p className='font-semibold'>{user?.name}</p>
                    <i className='text-gray-400 text-sm'>@{user?.username}</i>
                </div>
                <Image src={user?.profilePicture} alt="user" width={50} height={50} priority className='rounded-full object-contain' />
            </div>
            <div className='md:hidden'>
                <Menu onClick={toggleDrawer} />
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='right'
                    className='p-5 flex flex-col justify-between'
                    size={300}
                >
                    <div>
                        <X onClick={toggleDrawer} className='float-right mb-3' />
                        <input type="text" autoComplete='off' placeholder="Search now..." className='w-full rounded-2xl' onChange={(e) => setSearch(e.target.value)} />
                        <div className='mt-4 max-h-[60vh] overflow-y-scroll scrollbar-none'>
                            {
                                (searchResults?.length > 0 && searchResults[0] !== 0) &&
                                <>
                                    {
                                        searchResults.map((e, i) => (
                                            <div key={i}>
                                                <div className='flex items-center gap-3 hover:bg-gray-100 cursor-pointer px-2 py-1' onClick={() => {
                                                    setSearch("")
                                                    toggleDrawer()
                                                    router.push(`/profile/${e.username}`)
                                                }}>
                                                    <Avatar img={e.profilePicture} rounded />
                                                    <span className='flex flex-col'>
                                                        <b>{e.name}</b>
                                                        <i className='text-gray-400 text-sm'>@{e.username}</i>
                                                    </span>
                                                </div>
                                                <hr />
                                            </div>
                                        ))
                                    }
                                </>
                            }
                            {
                                (searchResults?.length === 0) &&
                                <><p className='text-gray-600 border-dashed'>User not found</p></>
                            }
                        </div>
                    </div>
                    <span onClick={() => {
                        sessionStorage.removeItem('user')
                        dispatch(LOGOUT())
                        router.push('/login')
                    }} className='flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer text-[#0381ec] border hover:bg-gray-200 mb-14'><LogOut />Logout</span>
                </Drawer>
            </div>
        </nav >
    )
}
export default isAuth(Navbar);

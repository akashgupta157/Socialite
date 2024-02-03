'use client'
import React, { useEffect, useState } from 'react'
import logo from '@/images/logo.png'
import help from '@/images/help.svg'
import { Search, Bell, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';
import isAuth from '@/IsCompAuth'
const Image = React.lazy(() => import('next/image'));
import axios from 'axios';
import { configure } from './misc';
import { Avatar } from 'flowbite-react';
import { useRouter } from 'next/navigation';
const Navbar = () => {
    const user = useSelector((state: any) => state.user.user)
    const token = useSelector((state: any) => state.user.user?.token)
    const config = configure(token)
    const router = useRouter()
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    useEffect(() => {
        const fetchResults = async () => {
            try {
                setSearchLoading(true);
                const { data } = await axios.get(
                    `api/user/search?search=${search}`,
                    config
                );
                setSearchResults(data.users);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setSearchLoading(false);
            }
        };
        const debounceTimer = setTimeout(() => {
            if (search?.length > 0) {
                fetchResults();
            } else if (search?.length == 0) {
                setSearchResults([]);
            }
        }, 500);
        return () => clearTimeout(debounceTimer);
    }, [search]);
    return (
        <nav className='sticky top-0 flex justify-between items-center border-b md:h-[10vh] h-[7vh] px-5 bg-white z-10'>
            <Image src={logo} alt="logo" priority className='w-[100px] md:w-[150px]' />
            <label htmlFor="search" className='hidden md:flex items-center border border-gray-300 bg-gray-100 rounded-full w-[40%] px-3 '>
                <Search className='text-gray-500' />
                <input type="text" autoComplete='off' placeholder="Search now..." onChange={(e) => setSearch(e.target.value)} id='search' className='w-full bg-transparent border-transparent focus:border-transparent focus:ring-0' />
            </label>
            {
                searchResults.length > 0 &&
                <div className='absolute top-[8.5vh] bg-white left-[30%] w-[250px] max-h-[200px] overflow-y-scroll scrollbar-none py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded'>
                    {
                        searchResults.map((e, i) => (
                            <div key={i}>
                                <div className='flex items-center gap-3 hover:bg-gray-100 cursor-pointer px-2 py-1' onClick={() => {
                                    setSearchResults([])
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
            <div className='hidden md:flex items-center gap-4'>
                <Image src={help} alt="help" priority className='w-[35px] border border-gray-300 rounded-full p-2 cursor-pointer' />
                <Bell strokeWidth={'2px'} size={'35px'} className='border border-gray-300 rounded-full p-2 cursor-pointer' />
                <div className='flex items-center gap-3'>
                    <div className='flex flex-col gap-0 items-end'>
                        <p className='font-semibold'>{user?.name}</p>
                        <i className='text-gray-400 text-sm'>@{user?.username}</i>
                    </div>
                    <Image src={user?.profilePicture} alt="user" width={50} height={50} priority className='rounded-full' />
                </div>
            </div>
            <Menu className='md:hidden' />
        </nav >
    )
}
export default isAuth(Navbar);

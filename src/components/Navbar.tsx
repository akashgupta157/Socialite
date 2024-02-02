'use client'
import React from 'react'
import logo from '@/images/logo.png'
import help from '@/images/help.svg'
import { Search, Bell, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';
import isAuth from '@/IsCompAuth'
const Image = React.lazy(() => import('next/image'));
const Navbar = () => {
    const user = useSelector((state: any) => state.user.user)
    return (
        <nav className='sticky top-0 flex justify-between items-center border-b md:h-[10vh] h-[7vh] px-5 bg-white z-10'>
            <Image src={logo} alt="logo" priority className='w-[100px] md:w-[150px]' />
            <label htmlFor="search" className='hidden md:flex items-center border border-gray-300 bg-gray-100 rounded-full w-[40%] px-3 '>
                <Search className='text-gray-500' />
                <input type="search" placeholder="Search now..." id='search' className='w-full bg-transparent border-transparent focus:border-transparent focus:ring-0' />
            </label>
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
        </nav>
    )
}
export default isAuth(Navbar);

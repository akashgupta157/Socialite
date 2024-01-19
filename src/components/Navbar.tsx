import React from 'react'
import logo from '@/images/logo.png'
import help from '@/images/help.svg'
import { Search, Bell, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';
const Image = React.lazy(() => import('next/image'));
export default function Navbar() {
    const user = useSelector((state: any) => state.user.user)
    return (
        <nav className='sticky top-0 flex justify-between items-center border md:h-[10vh] h-[7vh] px-5 bg-white z-10'>
            <Image src={logo} alt="logo" priority className='w-[100px] md:w-[150px]' />
            <label htmlFor="search" className='hidden md:flex items-center gap-2 border border-gray-300 bg-gray-100 rounded-full w-[40%] px-3 py-2'>
                <Search className='text-gray-500' />
                <input type="search" placeholder="Search now..." id='search' className='w-full bg-transparent border-0 outline-none' />
            </label>
            <div className='hidden md:flex items-center gap-4'>
                <Image src={help} alt="help" priority className='w-[40px] border border-gray-300 rounded-full p-2 cursor-pointer' />
                <Bell strokeWidth={'1.5px'} size={'40px'} className='border border-gray-300 rounded-full p-2 cursor-pointer' />
                <div className='flex items-center gap-2'>
                    <p className='font-semibold'>{user.name}</p>
                    <img src={user.profilePicture} alt={user.name} className='w-[45px]' />
                </div>
            </div>
            <Menu className='md:hidden' />
        </nav>
    )
}

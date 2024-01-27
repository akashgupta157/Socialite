'use client'
import React from 'react'
import { Home, Compass, Bookmark, User, LogOut, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { SELECTION } from '@/redux/slices/selectedSlice';
import { LOGOUT } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
export default function Sidebar() {
    const selected = useSelector((state: any) => state.selection.selected)
    const dispatch = useDispatch()
    const router = useRouter()
    return (
        <>
            <div className='hidden md:flex flex-col justify-between border-r p-5 h-[90vh] w-[20%]'>
                <div className='flex flex-col gap-1'>
                    <span onClick={() => dispatch(SELECTION("Home"))} className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer ${selected === 'Home' ? 'bg-[#0381ec] text-white' : 'hover:bg-gray-200'}`}><Home /> Home</span>
                    <span onClick={() => dispatch(SELECTION("Explore"))} className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer ${selected === 'Explore' ? 'bg-[#0381ec] text-white' : 'hover:bg-gray-200'}`}><Compass /> Explore</span>
                    <span onClick={() => dispatch(SELECTION("Saved"))} className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer ${selected === 'Saved' ? 'bg-[#0381ec] text-white' : 'hover:bg-gray-200'}`}><Bookmark /> Saved</span>
                    <span onClick={() => dispatch(SELECTION("Profile"))} className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer ${selected === 'Profile' ? 'bg-[#0381ec] text-white' : 'hover:bg-gray-200'}`}><User />Profile</span>
                </div>
                <span onClick={() => {
                    dispatch(LOGOUT())
                    router.push('/login')
                }} className='flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer text-[#0381ec] border hover:bg-gray-200'><LogOut />Logout</span>
            </div >
            <div className='md:hidden h-[7vh] border absolute bottom-0 w-full flex items-center justify-around z-10'>
                <span onClick={() => dispatch(SELECTION("Home"))} className={`flex items-center gap-2 p-3 rounded-full cursor-pointer ${selected === 'Home' ? 'bg-[#0381ec] text-white' : 'hover:bg-gray-200'}`}><Home /></span>
                <span onClick={() => dispatch(SELECTION("Explore"))} className={`flex items-center gap-2 p-3 rounded-full cursor-pointer ${selected === 'Explore' ? 'bg-[#0381ec] text-white' : 'hover:bg-gray-200'}`}><Compass /></span>
                <span onClick={() => dispatch(SELECTION("AddPost"))} className={`flex items-center gap-2 p-3 rounded-full cursor-pointer ${selected === 'AddPost' ? 'bg-[#0381ec] text-white' : 'hover:bg-gray-200'}`}><Plus /></span>
                <span onClick={() => dispatch(SELECTION("Saved"))} className={`flex items-center gap-2 p-3 rounded-full cursor-pointer ${selected === 'Saved' ? 'bg-[#0381ec] text-white' : 'hover:bg-gray-200'}`}><Bookmark /></span>
                <span onClick={() => dispatch(SELECTION("Profile"))} className={`flex items-center gap-2 p-3 rounded-full cursor-pointer ${selected === 'Profile' ? 'bg-[#0381ec] text-white' : 'hover:bg-gray-200'}`}><User /></span>
            </div>
        </>
    )
}

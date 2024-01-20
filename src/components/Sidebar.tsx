// 'use client'
import React from 'react'
import { Home, Compass, Bookmark, User, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { SELECTION } from '@/redux/slices/selectedSlice';
import { LOGOUT } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
export default function Sidebar() {
    const selected = useSelector((state: any) => state.selection.selected)
    const dispatch = useDispatch()
    const router = useRouter()
    return (
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
    )
}

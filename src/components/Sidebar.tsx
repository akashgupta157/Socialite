'use client'
import React from 'react'
import { Home, Compass, Bookmark, User, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';
export default function Sidebar() {
    const selected = useSelector((state: any) => state.selection.selected)
    console.log(selected)
    return (
        <div className='hidden md:flex flex-col justify-between border-r p-5 h-[90vh] w-[20%]'>
            <div className='flex flex-col gap-1'>
                <span className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer`}><Home /> Home</span>
                <span className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer`}><Compass /> Explore</span>
                <span className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer`}><Bookmark /> Saved</span>
                <span className={`flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer`}><User />Profile</span>
            </div>
            <span className='flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer text-[#0381ec]'><LogOut />Logout</span>
        </div>
    )
}

import React from 'react'
import logo from '@/images/logo.png'
import help from '@/images/help.svg'
import { Search, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';

const Image = React.lazy(() => import('next/image'));
export default function Navbar() {
    const user = useSelector((state: any) => state.user.user)
    console.log(user)
    return (
        <div>
            <Image src={logo} alt="logo" priority />
            <label htmlFor="search" className='flex'>
                <Search />
                <input type="search" placeholder="Search now..." id='search' />
            </label>
            <div>
                <Image src={help} alt="help" priority />
                <Bell />
                <div>
                    <p>{user.name}</p>
                    <Image src={user.profilePicture} alt={user.name} priority />
                </div>
            </div>
        </div>
    )
}

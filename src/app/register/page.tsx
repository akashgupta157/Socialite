"use client"
import React, { useRef, useState, FormEvent } from 'react';
import Link from 'next/link';
import register from '@/images/register.png';
import { User, AtSign, LockKeyhole, Eye, EyeOff, } from 'lucide-react';
const Image = React.lazy(() => import('next/image'));
export default function Register( {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='flex h-[100vh] w-[100vw]'>
            <div className='w-[50%] hidden md:flex justify-center items-center bg-blue-100'>
                <Image src={register} alt='registerImage' className='object-contain' />
            </div>
            <form  method="POST" className='gap-3 md:w-[50%] m-auto flex flex-col justify-center items-center'>
                <h1 className='text-3xl w-full font-medium max-w-xs pb-1 mb-2 border-b-2 border-blue-500'>Registration</h1>
                <label className="form-control w-full max-w-xs" htmlFor='name'>
                    <p>Name :</p>
                    <div className='flex items-center gap-2 border rounded-md p-3 transition duration-300 ease-in-out focus-within:border-black focus-within:border focus-within:text-[#0d0c22] border-gray-400 text-gray-600'>
                        <User />
                        <input
                            type="text"
                            id="name"
                            name='name'
                            className='border-0 outline-none'
                        />
                    </div>
                </label>
                <label className="form-control w-full max-w-xs" htmlFor='email'>
                    <p>Email :</p>
                    <div className='flex items-center gap-2 border rounded-md p-3 transition duration-300 ease-in-out focus-within:border-black focus-within:border focus-within:text-[#0d0c22] border-gray-400 text-gray-600'>
                        <AtSign />
                        <input
                            type="text"
                            id="email"
                            name='email'
                            className='border-0 outline-none'
                        />
                    </div>
                </label>
                <label className="form-control w-full max-w-xs" htmlFor='password'>
                    <p>Password :</p>
                    <div className='flex items-center gap-2 border rounded-md p-3 transition duration-300 ease-in-out focus-within:border-black focus-within:border focus-within:text-[#0d0c22] border-gray-400 text-gray-600'>
                        <LockKeyhole />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name='password'
                            className='border-0 outline-none'
                        />
                        <div className='cursor-pointer' onClick={() => { setShowPassword(!showPassword) }}>
                            {showPassword ? <Eye /> : <EyeOff />}
                        </div>
                    </div>
                </label>
                <button className="btn px-16 bg-blue-500 text-white hover:bg-blue-600" type='submit'>Submit</button>
                <p className='w-full max-w-xs'>Already have an account? <Link href={'/login'} className='underline text-blue-700'>Login</Link></p>
            </form>
        </div>
    );
}

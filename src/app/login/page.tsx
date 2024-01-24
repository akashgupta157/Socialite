/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import loginImage from '@/images/login.png';
import { AtSign, LockKeyhole, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { LOGIN } from '@/redux/slices/userSlice';
const Image = React.lazy(() => import('next/image'));
interface UserInput {
  name: string;
  email: string;
  password: string;
}
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [alter, setAlter] = useState({
    alterShow: false,
    success: false,
    message: ''
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>();
  const dispatch = useDispatch()
  const onSubmit = async (Data: UserInput) => {
    setLoading(true)
    const { data } = await axios.post('/api/login', Data)
    setLoading(false)
    setAlter({ ...alter, alterShow: true, success: data.success, message: data.message })
    setTimeout(() => {
      setAlter({ ...alter, alterShow: false })
      if (data.success) {
        dispatch(LOGIN({ ...data.user, token: data.token }))
        router.push('/')
      }
    }, 1500);
  }
  return (
    <>
      {
        alter.alterShow &&
        <div className="toast toast-top toast-end">
          {
            alter.success ?
              <div className="alert alert-success">
                <span className='flex gap-2 items-center text-white'><CheckCircle />{alter.message}</span>
              </div> :
              <div className="alert alert-error">
                <span className='flex gap-2 items-center text-white'><AlertCircle />{alter.message}</span>
              </div>
          }
        </div>
      }
      <div className='flex h-[100vh] w-[100vw]'>
        <form onSubmit={handleSubmit(onSubmit)} className='gap-3 md:w-[50%] m-auto flex flex-col justify-center items-center'>
          <h1 className='text-3xl w-full font-medium max-w-xs pb-1 mb-2 border-b-2 border-blue-500'>Login</h1>
          <label className="form-control w-full max-w-xs" htmlFor='email'>
            <p className={`${errors.email && 'text-red-700'}`}>Email :</p>
            <div className={`flex items-center gap-2 border rounded-md p-3 transition duration-300 ease-in-out focus-within:border-black focus-within:border focus-within:text-[#0d0c22] border-gray-400 text-gray-600 ${errors.email && 'border-red-700 focus-within:border-red-700 '}`}>
              <AtSign />
              <input
                type="text"
                id="email"
                className='border-0 outline-none w-full'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="flex gap-2 items-center text-red-700 font-medium mt-1 text-sm">
                <AlertCircle size={'20px'} />
                {errors.email.message}
              </p>
            )}
          </label>
          <label className="form-control w-full max-w-xs" htmlFor='password'>
            <p className={`${errors.password && 'text-red-700'}`}>Password :</p>
            <div className={`flex items-center gap-2 border rounded-md p-3 transition duration-300 ease-in-out focus-within:border-black focus-within:border focus-within:text-[#0d0c22] border-gray-400 text-gray-600 ${errors.password && 'border-red-700 focus-within:border-red-700 '}`}>
              <LockKeyhole />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className='border-0 outline-none w-full'
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Password must not exceed 10 characters",
                  },
                })}
              />
              <div className='cursor-pointer' onClick={() => { setShowPassword(!showPassword) }}>
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            {errors.password && (
              <p className="flex gap-2 items-center text-red-700 font-medium mt-1 text-sm">
                <AlertCircle size={'20px'} />
                {errors.password.message}
              </p>
            )}
          </label>
          <button
            className="btn px-16 bg-blue-500 text-white hover:bg-blue-600"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-dots loading-lg bg-blue-500"></span>
            ) : (
              'Submit'
            )}
          </button>
          <p className='w-full max-w-xs'>Don't have an account? <Link href={'/register'} className='underline text-blue-700'>Register</Link></p>
        </form>
        <div className='w-[50%] hidden md:flex justify-center items-center bg-blue-100'>
          <Image src={loginImage} alt='loginImage' className='object-contain' priority />
        </div>
      </div>
    </>
  )
}

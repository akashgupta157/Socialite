'use client'
import React, { useEffect, useState } from 'react'
import isAuth from '@/IsCompAuth'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import axios from 'axios'
import { Avatar, Spinner } from 'flowbite-react'
const Post = () => {
    const router = useRouter()
    const pathname = usePathname()
    const postId = pathname?.split('/').pop()
    const [postDetail, setPostDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchPostDetails = async () => {
        // setLoading(true)
        const { data } = await axios.get(`/api/post/${postId}`)
        if (data.success) {
            setPostDetail(data.post)
            setLoading(false)
        } else {
            console.log(data.message)
        }
    }
    useEffect(() => {
        fetchPostDetails()
    }, []);
    console.log(postDetail)
    return (
        <div className='max-h-[79vh] overflow-y-scroll scrollbar-none md:max-h-[90vh] md:w-[55%] border-r'>
            <div className='border-b flex px-5 py-3 gap-10 items-center sticky top-0 bg-white'>
                <ArrowLeft onClick={() => router.back()} />
                <p className='text-xl font-bold'>Post</p>
            </div>
            <div>
                {
                    loading ?
                        <div className='flex justify-center items-center mt-40'>
                            <Spinner aria-label="Extra large spinner example" size="xl" />
                        </div>
                        :
                        <>
                            <div>
                                <div>
                                <Avatar img={postDetail?.user?.profilePicture} alt={postDetail?.user?.name} size="lg" rounded />

                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
export default isAuth(Post)
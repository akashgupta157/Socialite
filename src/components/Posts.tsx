import React from 'react'
import isAuth from '@/IsCompAuth';
import Image from 'next/image';
import { timeAgo } from './misc';
import { Dot, MoreVertical } from 'lucide-react';
const Posts = (props: any) => {
    const { isProfile, post } = props
    return (
        <div className='border-b'>
            {
                isProfile &&
                <div className='flex justify-between items-center px-5 py-2'>
                    <div className='flex gap-3 items-center'>
                        <Image src={post.user?.profilePicture} alt={post.user?.username} width='0' height='0' sizes='100vw' className='w-10 h-10 rounded-full' />
                        <div>
                            <b>{post.user?.name}</b>
                            <p className='text-gray-500 flex items-center text-xs'><i>@{post.user?.username}</i><Dot />{timeAgo(post.createdAt)}</p>
                        </div>
                    </div>
                    <MoreVertical className='text-gray-500' size={20} />
                </div>
            }
        </div>
    )
}
export default isAuth(Posts);
import React from 'react'
import isAuth from '@/IsCompAuth';
import Image from 'next/image';
import { timeAgo } from './misc';
import { Dot, MoreVertical } from 'lucide-react';
const Posts = (props: any) => {
    const { isProfile, post } = props
    return (
        <div className='border-b  overflow-hidden'>
            {
                isProfile &&
                <div className='flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                        <Image src={post.user?.profilePicture} alt={post.user?.username} width='0' height='0' sizes='100vw' className='w-10 h-10 rounded-full' />
                        <div className='flex flex-col'>
                            <b>{post.user?.name}</b>
                            <p className='text-gray-500 flex items-center text-xs'><i>@{post.user?.username}</i><Dot />{timeAgo(post.createdAt)}</p>
                        </div>
                    </div>
                    <MoreVertical className='text-gray-500' size={20} />
                </div>
            }
            <div className="pb-5 pt-2 md:pl-12">
                <p>
                    {post.content.split(" ").map((str: string, i: number) => {
                        if (str.startsWith("#") && str.length > 2) {
                            return <a href='#' key={i} className="text-blue-500">{str + " "}</a>;
                        }
                        return str + " ";
                    })}
                </p>
                <div>
                    {
                        post?.attachments.length > 0 &&
                        <div className='grid grid-cols-2 gap-1'>
                            {
                                post?.attachments.map((attachment: any, i: number) => (
                                    <Image key={i} src={attachment.url} alt={attachment} width='0' height='0' sizes='100vw' className='w-full h-full object-cover' />
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default isAuth(Posts);
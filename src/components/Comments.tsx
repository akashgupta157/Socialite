'use client'
import React, { useEffect, useState } from 'react'
import isAuth from '@/IsCompAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Dot, Heart } from 'lucide-react'
import { formatHashtags, formatNumber, timeAgo } from '@/config/misc'
import { useSelector } from 'react-redux'
function Comments(props: any) {
    const { comment } = props
    console.log(comment)
    const [text, setText] = useState('');
    const user = useSelector((state: any) => state.user.user)
    const [isLiked, setIsLiked] = useState(comment.likes.includes(user._id));
    const router = useRouter()
    const VisitProfile = () => {
        router.push(`/profile/${comment.user.username}`)
    }
    useEffect(() => {
        setText(formatHashtags(comment?.content));
    }, [comment]);
    return (
        <div className='my-2 border-b'>
            <div className='flex gap-3 items-center'>
                <Image src={comment.user?.profilePicture} alt={comment.user?.username} width='0' height='0' sizes='100vw' className='w-10 h-10 md:w-12 md:h-12 rounded-full object-contain border cursor-pointer' onClick={VisitProfile} />
                <div className='flex flex-col'>
                    <b className='cursor-pointer' onClick={VisitProfile}>{comment.user?.name}</b>
                    <p className='text-gray-500 flex items-center text-xs cursor-pointer'><i onClick={VisitProfile}>@{comment.user?.username}</i><Dot />{timeAgo(comment.createdAt)}</p>
                </div>
            </div>
            <div className='py-2 md:pl-12 flex justify-between items-start'>
                <div className='max-w-full break-words ' dangerouslySetInnerHTML={{ __html: text }} />
                <p className={`flex items-center gap-1 hover:text-[#ee3462] ${isLiked ? "text-[#ee3462]" : "text-gray-500"}`}><Heart className='cursor-pointer' fill={`${isLiked ? "#ee3462" : "white"}`} />{formatNumber(comment?.likes.length)}</p>
            </div>
        </div>
    )
}

export default isAuth(Comments)
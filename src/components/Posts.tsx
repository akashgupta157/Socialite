import axios from 'axios';
import Image from 'next/image';
import isAuth from '@/IsCompAuth';
import { formatNumber } from './misc';
import React, { useState } from 'react'
import { configure, timeAgo } from './misc';
import { LOGIN } from '@/redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Bookmark, Dot, Heart, MessageCircle, MoreVertical, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
const Posts = (props: any) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { isProfile, post } = props
    const user = useSelector((state: any) => state.user.user)
    const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
    const [isSaved, setIsSaved] = useState(user.saved.includes(post._id));
    const config = configure(user.token);
    const VisitProfile = () => {
        router.push(`/profile/${post.user.username}`)
    }
    const handleLike = async () => {
        if (isLiked) {
            post.likes.splice(post.likes.indexOf(user._id), 1);
            setIsLiked(false);
        } else {
            post.likes.push(user._id);
            setIsLiked(true);
        }
        await axios.patch(`/api/post`, { postId: post._id, action: "like" }, config);
    }
    const handleSave = async () => {
        const updatedSavedPosts = isSaved
            ? user.saved.filter((id: any) => id !== post._id)
            : [...user.saved, post._id];
        dispatch(LOGIN({ ...user, saved: updatedSavedPosts }));
        sessionStorage.setItem('user', JSON.stringify({ ...user, saved: updatedSavedPosts }));
        setIsSaved(!isSaved);
        await axios.patch(`/api/post`, { postId: post._id, action: "save" }, config);
    }
    return (
        <div className='border-b  overflow-hidden'>
            {
                isProfile &&
                <div className='flex justify-between items-center'>
                    <div className='flex gap-3 items-center'>
                        <Image src={post.user?.profilePicture} alt={post.user?.username} width='0' height='0' sizes='100vw' className='w-10 h-10 md:w-12 md:h-12 rounded-full object-contain border cursor-pointer' onClick={VisitProfile} />
                        <div className='flex flex-col'>
                            <b className='cursor-pointer' onClick={VisitProfile}>{post.user?.name}</b>
                            <p className='text-gray-500 flex items-center text-xs cursor-pointer'><i onClick={VisitProfile}>@{post.user?.username}</i><Dot />{timeAgo(post.createdAt)}</p>
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
                        <div className='grid grid-cols-2 max-h-[200px] md:max-h-[310px] mt-2'>
                            {
                                post?.attachments.map((attachment: any, i: number) => (
                                    <div key={i} className='border h-[100px] md:h-[150px] flex justify-center items-center'>
                                        <Image loading='lazy' src={attachment.url} alt={attachment} width='0' height='0' sizes='100vw' className='w-fit object-cover max-h-[100px] md:max-h-[150px]' />
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                <div className='flex justify-between items-center mt-3 select-none'>
                    <div className='flex gap-3'>
                        <p className={`flex items-center gap-1 hover:text-[#ee3462] ${isLiked ? "text-[#ee3462]" : "text-gray-500"}`}><Heart className='cursor-pointer' onClick={handleLike} fill={`${isLiked ? "#ee3462" : "white"}`} />{formatNumber(post?.likes.length)}</p>
                        <p className='text-gray-500 flex items-center gap-1 hover:text-[#01ba7d]'><MessageCircle className=' cursor-pointer' />{formatNumber(post?.comments.length)}</p>
                        <p className='text-gray-500 flex items-center gap-1'><Send className=' cursor-pointer' /> Share</p>

                    </div>
                    <p className={`${isSaved ? "text-[#0381ec]" : "text-gray-500"} hover:text-[#0381ec]`}><Bookmark className=' cursor-pointer' fill={`${isSaved ? "#0381ec" : "white"}`} onClick={handleSave} /></p>
                </div>
            </div>
        </div>
    )
}
export default isAuth(Posts);
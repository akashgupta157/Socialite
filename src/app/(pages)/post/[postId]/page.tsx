'use client'
import React, { useEffect, useState } from 'react'
import isAuth from '@/IsCompAuth'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import axios from 'axios'
import { Spinner } from 'flowbite-react'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
interface PostDetails {
    _id: string
    user: {
        _id: string
        name: string
        username: string
        profilePicture: any
    }
    content: string
    attachments: any
}
const Post = () => {
    const router = useRouter()
    const pathname = usePathname()
    const postId = pathname?.split('/').pop()
    const [postDetail, setPostDetail] = useState<PostDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const fetchPostDetails = async () => {
        setLoading(true)
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
    const VisitProfile = () => {
        if (!postDetail) return
        router.push(`/profile/${postDetail.user.username}`)
    }
    console.log(postDetail)
    const imageCount = postDetail?.attachments.length;
    const renderImageGrid = () => {
        if (imageCount === 1) {
            return (
                <Image priority width="0" height="0" sizes="100vw"
                    src={postDetail?.attachments[0].url}
                    alt='image'
                    className="w-full h-full object-cover rounded-lg border"
                />
            );
        } else if (imageCount === 2) {
            return (
                <div className="flex h-72 gap-1 overflow-hidden rounded-lg">
                    {postDetail?.attachments.map((image: { url: string | StaticImport }, i: React.Key | null | undefined) => (
                        <Image priority width="0" height="0" sizes="100vw"
                            key={i}
                            src={image.url}
                            alt='image'
                            className="w-1/2 h-full object-cover"
                        />
                    ))}
                </div>
            );
        } else if (imageCount === 3) {
            return (
                <div className="flex h-72 gap-1 overflow-hidden rounded-lg">
                    <Image priority width="0" height="0" sizes="100vw"
                        src={postDetail?.attachments[0].url}
                        alt='image'
                        className="w-1/2 h-full object-cover"
                    />
                    <div className='flex flex-col w-1/2 gap-1'>
                        {postDetail?.attachments.slice(1, 3).map((image: { url: string | StaticImport }, i: React.Key | null | undefined) => (
                            <Image priority width="0" height="0" sizes="100vw"
                                key={i}
                                src={image.url}
                                alt='image'
                                className="w-full h-1/2 object-cover"
                            />
                        ))}
                    </div>
                </div>
            );
        } else if (imageCount === 4) {
            return (
                <div className="grid grid-cols-2 gap-1 h-72 rounded-lg overflow-hidden">
                    {postDetail?.attachments.slice(0, 2).map((image: { url: string | StaticImport }, i: React.Key | null | undefined) => (
                        <Image priority width="0" height="0" sizes="100vw"
                            key={i}
                            src={image.url}
                            alt='image'
                            className="w-full h-36 object-cover"
                        />
                    ))}
                    {postDetail?.attachments.slice(2, 4).map((image: { url: string | StaticImport }, i: React.Key | null | undefined) => (
                        <Image priority width="0" height="0" sizes="100vw"
                            key={i}
                            src={image.url}
                            alt='image'
                            className="w-full h-36 object-cover"
                        />
                    ))}
                </div>
            );
        } else {
            return null
        }
    };
    return (
        <div className='max-h-[79vh] overflow-y-scroll scrollbar-none md:max-h-[90vh] md:w-[55%] border-r'>
            <div className='border-b flex p-3 gap-3 md:px-5 md:py-3 md:gap-6 items-center sticky top-0 bg-white'>
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
                            <div className='p-3'>
                                <div className='flex gap-3 items-center cursor-pointer w-fit' onClick={VisitProfile}>
                                    <Image src={postDetail?.user.profilePicture} alt={'profile'} priority width="0" height="0" sizes="100vw" className="rounded-full w-12 h-12 md:w-14 md:h-14 object-contain" />
                                    <div>
                                        <p className='font-extrabold'>{postDetail?.user.name}</p>
                                        <i className='text-gray-500'>@{postDetail?.user.username}</i>
                                    </div>
                                </div>
                                <div>
                                    <p className='max-w-full break-words my-2'>
                                        {postDetail?.content.split(" ").map((str: string, i: number) => {
                                            if (str.startsWith("#") && str.length > 2) {
                                                return <a href='#' key={i} className="text-blue-500">{str + " "}</a>;
                                            }
                                            return str + " ";
                                        })}
                                    </p>
                                    {renderImageGrid()}
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
export default isAuth(Post)
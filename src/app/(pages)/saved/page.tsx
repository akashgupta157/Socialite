'use client'
import React, { useEffect, useState } from 'react'
import isAuth from '@/IsCompAuth'
import { Spinner } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { configure } from '@/components/misc';
import axios from 'axios';
import Posts from '@/components/Posts';
const Saved = () => {
    const user = useSelector((state: any) => state.user.user)
    const config = configure(user.token)
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    async function fetchPosts() {
        setLoading(true)
        const { data } = await axios.get('/api/post?action=saved', config)
        setPosts(data.posts)
        setLoading(false)
    }
    useEffect(() => {
        fetchPosts()
    }, []);
    return (
        <div className='max-h-[79vh] overflow-y-scroll scrollbar-none md:p-5 md:max-h-[90vh] md:w-[55%] md:mx-auto'>
            {
                loading ?
                    <div className='flex justify-center items-center mt-40'>
                        <Spinner aria-label="Extra large spinner example" size="xl" />
                    </div>
                    :
                    <>
                        {
                            posts.length === 0 ?
                                <div>
                                    <h1 className='text-3xl font-bold'>No Saved Posts Found</h1>
                                    <p>Go back and save some posts</p>
                                </div>
                                :
                                <div className='flex flex-col gap-3 px-5 mt-5'>
                                    {
                                        posts?.map((post: any) => <Posts key={post._id} post={post} isProfile={true} />)
                                    }
                                </div>
                        }
                    </>
            }
        </div>
    )
}
export default isAuth(Saved)
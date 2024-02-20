import React, { useEffect, useState } from 'react';
import { X, Smile } from 'lucide-react';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { configure } from '../config/misc';
import toast from 'react-hot-toast';
export default function CommentBox(props: any) {
    const { postId } = props
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [isEmojiOpen, setEmojiOpen] = useState(false);
    const token = useSelector((state: any) => state.user.user?.token)
    const config = configure(token)
    const addEmoji = (e: { unified: string }) => {
        const sym = e.unified.split("_");
        const arr: string[] = [];
        sym.forEach((el: string) => arr.push("0x" + el));
        let emoji = String?.fromCodePoint(...arr.map(Number));
        setInput(input + emoji);
    };
    const handleOutsideClick = (event: any) => {
        if (isEmojiOpen && !event.target.closest('.emoji-dropdown')) {
            setEmojiOpen(false);
        }
    };
    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [isEmojiOpen]);
    const handlePost = async () => {
        if (!input) return;
        setLoading(true);
        try {
            const commentData = {
                content: input.replace(/\n/g, '<br/>'),
            };
            const { data } = await axios.post('/api/comment', { ...commentData, postId }, config);
            if (data.success) {
                toast.success(data.message, {
                    duration: 2000,
                    position: 'top-center',
                    style: {
                        backgroundColor: "#17C60D",
                        color: 'white'
                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: "#17C60D"
                    }
                });
            } else {
                toast.error(data.message, {
                    duration: 2000,
                    position: 'top-center',
                    style: {
                        backgroundColor: "#E03615",
                        color: 'white'
                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: "#E03615"
                    }
                });
            }
            setInput('');
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={`w-full border-b py-3 ${loading && 'pointer-events-none opacity-50'}`}>
            <textarea
                className='border-0 resize-none w-full p-0 focus:ring-0 bg-transparent min-h-[5vh] max-h-[30vh]'
                rows={Math.min(10, input.split('\n').length)}
                value={input}
                maxLength={280}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Write a comment...'
            />
            <div className='flex justify-between items-center border-t pt-2'>
                <div className='flex items-center gap-4 text-lg text-[#0381ec] relative emoji-dropdown'>
                    <Smile className='cursor-pointer' onClick={() => setEmojiOpen(!isEmojiOpen)} />
                    {isEmojiOpen && (
                        <div className='absolute top-8 left-0'>
                            <Picker data={data} onEmojiSelect={addEmoji} />
                        </div>
                    )}
                </div>
                <button onClick={handlePost} className={`${input.length === 0 ? 'bg-[#4999df] cursor-not-allowed' : "bg-[#0381ec]"} text-white rounded-full py-2 px-4 text-sm font-bold`}>Post Comment</button>
            </div>
        </div>
    );
}

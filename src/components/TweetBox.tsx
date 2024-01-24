import React, { useEffect, useState } from 'react';
import { X, Image as ImageIcon, Smile } from 'lucide-react';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSelector } from 'react-redux';
import { headers } from 'next/headers';
import axios from 'axios';
export default function TweetBox() {
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [isEmojiOpen, setEmojiOpen] = useState(false);
    const token = useSelector((state: any) => state.user.user.token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const addEmoji = (e: { unified: string }) => {
        const sym = e.unified.split("_");
        const arr: string[] = [];
        sym.forEach((el: string) => arr.push("0x" + el));
        let emoji = String.fromCodePoint(...arr.map(Number));
        setInput(input + emoji);
    };

    const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (e.target.files && e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (renderEvent: ProgressEvent<FileReader>) => {
            if (renderEvent.target) {
                const newFiles = [...selectedFiles, renderEvent.target.result as string];
                setSelectedFiles(newFiles.slice(0, 4));
            }
        };
    };
    const removeImage = (index: number) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
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
    }, [isEmojiOpen])
        ;
    const handlePost = async () => {
        if (input) {
            setLoading(true);
            await axios.post('/api/post', {
                content: input
            }, config)
            setLoading(false);
        }
    }
    return (
        <div className={`w-full max-h-[85vh] border rounded-lg p-4 ${loading && 'opacity-60'}`}>
            <textarea
                className='w-full border-none outline-none bg-transparent text-lg max-h-[30vh]'
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='What are you thinking?' />
            <div className='max-h-[40vh] overflow-y-scroll'>
                {selectedFiles.map((file, index) => (
                    <div key={index} className='relative mb-4'>
                        <div className='absolute w-8 h-8 bg-[#78828e] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={() => removeImage(index)}>
                            <X />
                        </div>
                        <img src={file} alt={`image-${index}`} className='rounded-2xl max-h-80 object-contain' />
                    </div>
                ))}
            </div>
            {!loading && (
                <div className='flex justify-between items-center border-t pt-2'>
                    <div className='flex items-center gap-3'>
                        <div className='flex gap-4 text-lg text-[#0381ec]'>
                            <label htmlFor="file">
                                <ImageIcon className='cursor-pointer' />
                            </label>
                            <input type="file" name="" id="file" accept="image/*" hidden onChange={addImageToPost} />
                        </div>
                        <div className='flex gap-4 text-lg text-[#0381ec] relative emoji-dropdown'>
                            <Smile className='cursor-pointer' onClick={() => setEmojiOpen(!isEmojiOpen)} />
                            {isEmojiOpen && (
                                <div className='absolute top-8 left-0'>
                                    <Picker data={data} onEmojiSelect={addEmoji} />
                                </div>
                            )}
                        </div>
                    </div>
                    <button onClick={handlePost} className="bg-[#0381ec] text-white rounded-full py-2 px-4 text-sm font-bold">Post Now</button>
                </div>
            )}
        </div>
    );
}

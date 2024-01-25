import React, { useEffect, useState } from 'react';
import { X, Image as ImageIcon, Smile, ArrowBigDown } from 'lucide-react';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { uploadCloudinary } from './misc';
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
    // const removeImage = (index: number) => {
    //     const newFiles = [...displayFiles];
    //     newFiles.splice(index, 1);
    //     setDisplayFiles(newFiles);
    // };
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
            let attachments = [];
            if (selectedFiles.length > 0 && selectedFiles.length <= 4) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    const data = await uploadCloudinary(selectedFiles[i]);
                    attachments.push(data)
                }
            }
            const postData = {
                content: input,
                attachments: attachments.length > 0 ? attachments : undefined,
            };
            await axios.post('/api/post', postData, config);
            setInput('');
            setSelectedFiles([]);
        } catch (error) {
            console.error("Error posting data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`w-full max-h-[85vh] border rounded-lg p-4 ${loading && 'pointer-events-none opacity-50'}`}>
            <textarea
                className='w-full border-none outline-none bg-transparent text-lg max-h-[30vh]'
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='What are you thinking?' />
            <div className='max-h-[40vh] overflow-y-scroll'>
                {/* {displayFiles.map((file, index) => (
                    <div key={index} className='relative mb-4'>
                        <div className='absolute w-8 h-8 bg-[#78828e] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={() => removeImage(index)}>
                            <X />
                        </div>
                        <img src={file} alt={`image-${index}`} className='rounded-2xl max-h-80 object-contain' />
                    </div>
                ))} */}
            </div>
            <div className='flex justify-between items-center border-t pt-2'>
                <div className='flex items-center gap-3'>
                    <div className='flex gap-4 text-lg text-[#0381ec]'>
                        <label htmlFor="file">
                            <ImageIcon className='cursor-pointer' />
                        </label>
                        <input type="file" name="" id="file" accept="image/*" hidden multiple onChange={(e: any) => {
                            setSelectedFiles(e.target.files)
                        }} />
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
        </div>
    );
}

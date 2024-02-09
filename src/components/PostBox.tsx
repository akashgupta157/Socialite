import React, { useEffect, useState } from 'react';
import { X, Image as ImageIcon, Smile } from 'lucide-react';
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { configure, uploadCloudinary } from './misc';
export default function PostBox() {
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [input, setInput] = useState('');
    const [isEmojiOpen, setEmojiOpen] = useState(false);
    const token = useSelector((state: any) => state.user.user?.token)
    const config = configure(token)
    const addEmoji = (e: { unified: string }) => {
        const sym = e.unified.split("_");
        const arr: string[] = [];
        sym.forEach((el: string) => arr.push("0x" + el));
        let emoji = String.fromCodePoint(...arr.map(Number));
        setInput(input + emoji);
    };
    const handleFileChange = (e: any) => {
        const selectedFilesArray: File[] = Array.from(e.target.files);
        const newSelectedFiles = selectedFilesArray.slice(0, 4);
        setSelectedFiles(newSelectedFiles);
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
    const additionalClasses = () => {
        switch (selectedFiles.length) {
            case 1:
                return 'max-w-full';
            case 2:
            case 3:
            case 4:
                return 'block m-auto w-full';
            default:
                return '';
        }
    };

    return (
        <div className={`w-full border rounded-lg p-4 ${loading && 'pointer-events-none opacity-50'}`}>
            <div className='max-h-[82vh] overflow-scroll scrollbar-none md:max-h-[85vh]'>
                <textarea
                    className='border-0 resize-none w-full p-0 focus:ring-0 bg-transparent text-lg min-h-[10vh] max-h-[30vh]'
                    rows={Math.min(10, input.split('\n').length)}
                    value={input}
                    maxLength={280}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='What are you thinking?' />
                {
                    selectedFiles &&
                    <div className={`max-h-[35vh] md:max-h-[40vh] overflow-y-scroll scrollbar-none w-full ${selectedFiles.length === 4 && 'grid grid-cols-2 gap-2'} ${selectedFiles.length === 2 && 'grid grid-cols-2 gap-2'} ${selectedFiles.length === 3 && 'grid grid-cols-2'} `}>
                        {selectedFiles.map((file, index) => (
                            <div key={index} className='relative mb-4'>
                                <div className='absolute w-8 h-8 bg-[#78828e] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer' onClick={() => removeImage(index)}>
                                    <X />
                                </div>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Selected File ${index}`}
                                    className={`rounded-lg max-h-[200px] object-contain ${additionalClasses()}`}
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='flex justify-between items-center border-t pt-2'>
                <div className='flex items-center gap-3'>
                    <div className='flex gap-4 text-lg text-[#0381ec]'>
                        <label htmlFor="file">
                            <ImageIcon className='cursor-pointer' />
                        </label>
                        <input type="file" name="" id="file" accept="image/*" hidden multiple onChange={handleFileChange} />
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
                <button onClick={handlePost} className={`${input.length === 0 ? 'bg-[#4999df] cursor-not-allowed' : "bg-[#0381ec]"} text-white rounded-full py-2 px-4 text-sm font-bold`}>Post Now</button>
            </div>
        </div>
    );
}

'use client'
import React from 'react'
import Image from 'next/image';
import isAuth from '@/IsCompAuth'
interface ImageGridProps {
    images: { url: string }[];
}
const ImageGrid = ({ images }: ImageGridProps) => {
    const imageCount = images?.length;
    if (imageCount === 1) {
        return (
            <Image priority width="0" height="0" sizes="100vw"
                src={images[0]?.url}
                alt='image'
                className="w-1/2 h-1/2 object-cover rounded-lg border"
            />
        );
    } else if (imageCount === 2) {
        return (
            <div className="flex h-72 gap-1 overflow-hidden rounded-lg border">
                {images.map((image, i) => (
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
            <div className="flex h-72 gap-1 overflow-hidden rounded-lg border">
                <Image priority width="0" height="0" sizes="100vw"
                    src={images[0]?.url}
                    alt='image'
                    className="w-1/2 h-full object-cover"
                />
                <div className='flex flex-col w-1/2 gap-1'>
                    {images.slice(1, 3).map((image, i) => (
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
            <div className="grid grid-cols-2 gap-1 h-72 rounded-lg overflow-hidden border">
                {images.slice(0, 2).map((image, i) => (
                    <Image priority width="0" height="0" sizes="100vw"
                        key={i}
                        src={image.url}
                        alt='image'
                        className="w-full h-36 object-cover"
                    />
                ))}
                {images.slice(2, 4).map((image, i) => (
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
        return null;
    }
}
export default isAuth(ImageGrid)
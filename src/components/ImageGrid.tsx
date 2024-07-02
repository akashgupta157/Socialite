"use client";
import React, { useState } from "react";
import isAuth from "@/IsCompAuth";
import ImageModal from "./ImageModal";
import ImageFallback from "./ImageFallback";
import { post_fallbackSrc } from "@/config/misc";
interface ImageGridProps {
  images: { url: string }[];
}
const ImageGrid = ({ images }: ImageGridProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setOpenModal(true);
  };
  const imageCount = images?.length;
  if (imageCount === 1) {
    return (
      <>
        <ImageFallback
          fallbackSrc={post_fallbackSrc}
          priority
          width="0"
          height="0"
          sizes="100vw"
          src={images[0]?.url}
          alt="image"
          className="w-1/2 h-1/2 object-cover rounded-lg border cursor-pointer"
          onClick={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            handleImageClick(0);
          }}
        />
        {openModal && (
          <ImageModal
            currentIndex={currentIndex}
            images={images}
            setOpenModal={setOpenModal}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </>
    );
  } else if (imageCount === 2) {
    return (
      <>
        <div className="flex h-72 gap-1 overflow-hidden rounded-lg border">
          {images.map((image, i) => (
            <ImageFallback
              fallbackSrc={post_fallbackSrc}
              priority
              width="0"
              height="0"
              sizes="100vw"
              key={i}
              src={image.url}
              alt="image"
              className="w-1/2 h-full object-cover cursor-pointer"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                handleImageClick(i);
              }}
            />
          ))}
        </div>
        {openModal && (
          <ImageModal
            currentIndex={currentIndex}
            images={images}
            setOpenModal={setOpenModal}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </>
    );
  } else if (imageCount === 3) {
    return (
      <>
        <div className="flex h-72 gap-1 overflow-hidden rounded-lg border">
          <ImageFallback
            fallbackSrc={post_fallbackSrc}
            priority
            width="0"
            height="0"
            sizes="100vw"
            src={images[0]?.url}
            alt="image"
            className="w-1/2 h-full object-cover"
            onClick={(e: { stopPropagation: () => void }) => {
              e.stopPropagation();
              handleImageClick(0);
            }}
          />
          <div className="flex flex-col w-1/2 gap-1">
            {images.slice(1, 3).map((image, i) => (
              <ImageFallback
                fallbackSrc={post_fallbackSrc}
                priority
                width="0"
                height="0"
                sizes="100vw"
                key={i}
                src={image.url}
                alt="image"
                className="w-full h-1/2 object-cover"
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  handleImageClick(i + 1);
                }}
              />
            ))}
          </div>
        </div>
        {openModal && (
          <ImageModal
            currentIndex={currentIndex}
            images={images}
            setOpenModal={setOpenModal}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </>
    );
  } else if (imageCount === 4) {
    return (
      <>
        <div className="grid grid-cols-2 gap-1 h-72 rounded-lg overflow-hidden border">
          {images.map((image, i) => (
            <ImageFallback
              fallbackSrc={post_fallbackSrc}
              priority
              width="0"
              height="0"
              sizes="100vw"
              key={i}
              src={image.url}
              alt="image"
              className="w-full h-36 object-cover cursor-pointer"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                handleImageClick(i);
              }}
            />
          ))}
        </div>
        {openModal && (
          <ImageModal
            currentIndex={currentIndex}
            images={images}
            setOpenModal={setOpenModal}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </>
    );
  } else {
    return null;
  }
};
export default isAuth(ImageGrid);

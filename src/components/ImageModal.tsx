"use client";
import React from "react";
import isAuth from "../IsCompAuth";
import Image from "next/image";
import { useImageSize } from "react-image-size";
import { Spinner } from "flowbite-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
const ImageModal = (props: any) => {
  const { currentIndex, images, setOpenModal, setCurrentIndex } = props;
  const [dimensions, { loading, error }] = useImageSize(
    images[currentIndex]?.url
  );
  const handleClose = (e: any) => {
    e.stopPropagation();
    setOpenModal(false);
  };
  const handlePrev = (e: any) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNext = (e: any) => {
    e.stopPropagation();
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <>
      <div className="absolute top-0 left-0 z-[10] flex justify-center items-center w-screen h-svh bg-black bg-opacity-80">
        <button
          className="absolute top-5 right-5 rounded-full p-1 bg-gray-900 cursor-pointer"
          onClick={handleClose}
        >
          <X className="text-white" />
        </button>
        {!dimensions?.width ? (
          <Spinner aria-label="Extra large spinner example" size="xl" />
        ) : (
          <>
            {images.length !== 1 && (
              <button
                className="absolute top-[50%] left-5 rounded-full p-1 bg-gray-900 cursor-pointer"
                onClick={handlePrev}
              >
                <ChevronLeft className="text-white" />
              </button>
            )}
            <Image
              src={images[currentIndex]?.url}
              alt="image"
              priority
              width={dimensions?.width || 0}
              height={dimensions?.height || 0}
              className="max-w-svw max-h-svh object-contain"
            />
            {images.length !== 1 && (
              <button
                className="absolute top-[50%] right-5 rounded-full p-1 bg-gray-900 cursor-pointer"
                onClick={handleNext}
              >
                <ChevronRight className="text-white" />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default isAuth(ImageModal);

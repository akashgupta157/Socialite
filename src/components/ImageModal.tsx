"use client";
import React from "react";
import isAuth from "../IsCompAuth";
import Image from "next/image";
import { useImageSize } from "react-image-size";
import { Spinner } from "flowbite-react";
import { X } from "lucide-react";
const ImageModal = (props: any) => {
  const { currentIndex, images, setOpenModal } = props;
  const [dimensions, { loading, error }] = useImageSize(
    images[currentIndex]?.url
  );
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="absolute top-0 left-0 z-[10] flex justify-center items-center w-screen h-svh bg-black bg-opacity-80">
        <div
          className="absolute top-5 right-5 rounded-full p-1 hover:bg-gray-900 cursor-pointer"
          onClick={handleClose}
        >
          <X className="text-white" />
        </div>
        {!dimensions?.width ? (
          <Spinner aria-label="Extra large spinner example" size="xl" />
        ) : (
          <Image
            src={images[currentIndex]?.url}
            alt="image"
            priority
            width={dimensions?.width || 0}
            height={dimensions?.height || 0}
            className="max-w-svw max-h-svh object-contain"
          />
        )}
      </div>
    </>
  );
};

export default isAuth(ImageModal);

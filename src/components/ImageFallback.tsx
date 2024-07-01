import Image from "next/image";
import React, { useState } from "react";

export default function ImageFallback(props: {
  [x: string]: any;
  src: any;
  alt: any;
  fallbackSrc: any;
}) {
  const { src, alt, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}

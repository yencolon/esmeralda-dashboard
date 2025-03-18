import Image from "next/image";
import { useEffect, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

interface ImageWithFallbackProps {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  className?: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc = "/vercel.svg",
  alt,
  width = 450,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <div className={`bg-gray-50`} style={{ width: width }}>
      <AspectRatio ratio={1}>
        <Image
          src={error || src == undefined ? fallbackSrc : src}
          alt={alt}
          fill={true}
          className="rounded-md object-cover"
          onError={() => setError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized  
        />
      </AspectRatio>
    </div>
  );
}

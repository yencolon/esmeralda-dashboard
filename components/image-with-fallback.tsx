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
  className,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <div
      className={`bg-gray-50 w-full  ${className}`}
    >
      <AspectRatio ratio={1}>
        <Image
          src={error || src == undefined ? fallbackSrc : src}
          alt={alt}
          fill={true}
          className="rounded-md object-cover"
          onError={() => setError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
      </AspectRatio>
    </div>
  );
}

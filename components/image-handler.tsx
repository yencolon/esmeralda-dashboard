import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import ImageWithFallback from "./image-with-fallback";

interface ImageHandlerProps {
  src: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageHandler({ src, onChange }: ImageHandlerProps) {
  return (
    <div>
      <ImageWithFallback
        className="object-scale-down self-center"
        src={src}
        alt="Category Image"
        width={300}
        height={300}
        objectFit="cover"
      />

      <div className="">
        <Label htmlFor="file">
          <span className="text-sm">Subir imagen</span>
        </Label>
        <Input
          id="file"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

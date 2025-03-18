import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag } from "@/interfaces/rest/products";
import getTags from "@/app/actions/tag-actions";

interface TagSelectorProps {
  defaultTags?: number[] | { id: number; name: string }[];
  disabled?: boolean;
}

export default function TagSelector({
  defaultTags,
  disabled,
}: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await getTags();
      setTags(response.data.tags);
    };
    fetchTags();
  }, []);

  // TODO inprove this
  const tagsMap = defaultTags
    ? defaultTags.map((tag) => {
        if (defaultTags && typeof defaultTags[0] === "number") {
          return tag;
        }
        return (tag as { id: number; name: string }).id;
      })
    : [];

  const defaultValue = tagsMap.length > 0 ? tagsMap[0].toString() : undefined;

  return (
    <>
      <Label className="text-xs">Etiqueta</Label>
      <Select
        name="tag"
        defaultValue={defaultValue}
        disabled={disabled}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Etiqueta" />
        </SelectTrigger>
        <SelectContent>
          {tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.id.toString()}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

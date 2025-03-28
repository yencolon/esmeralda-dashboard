import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Tag } from "@/interfaces/rest/products";
import getTags from "@/app/actions/tag-actions";
import { MultiSelect } from "@/components/multi-select";

interface TagSelectorProps {
  defaultTags?: number[] | Tag[];
  disabled?: boolean;
}

export default function TagSelector({
  defaultTags,
  disabled,
}: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    defaultTags ? defaultTags.map(tag => typeof tag === 'number' ? tag.toString() : tag.id.toString()) : []
  );

  
  useEffect(() => {
    const fetchTags = async () => {
      const response = await getTags();
      setTags(response.data.tags);
    };
    fetchTags();
  }, []);

 
  return (
    <>
      <Label className="text-xs">Etiqueta</Label>
      <MultiSelect
        options={tags.map((tag) => ({
          label: tag.name,
          value: tag.id.toString(),
        }))}
        onValueChange={setSelectedTags}
        defaultValue={selectedTags}
        placeholder="Selecciona una etiqueta"
        className="w-full"
        disabled={disabled}
      />
      <input type="hidden" name="tags" value={selectedTags.join(",")} />
    </>
  );
}
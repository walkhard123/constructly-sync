import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMemberTagsProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

export const TeamMemberTags = ({ tags, onRemoveTag }: TeamMemberTagsProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200 transition-colors"
        >
          <Tag className="w-3 h-3 mr-2" />
          {tag.replace('@', '')}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 ml-1 hover:bg-purple-200 rounded-full"
            onClick={() => onRemoveTag(tag)}
          >
            <X className="w-3 h-3" />
          </Button>
        </span>
      ))}
    </div>
  );
};
import { Tag, X } from "lucide-react";

interface TeamMemberTagsProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

export const TeamMemberTags = ({ tags, onRemoveTag }: TeamMemberTagsProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
          <Tag className="w-3 h-3 mr-1" />
          {tag.replace('@', '')}
          <button
            onClick={() => onRemoveTag(tag)}
            className="ml-1 p-0.5 hover:bg-purple-200 rounded-full"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
};
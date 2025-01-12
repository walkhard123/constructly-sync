import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Circle } from "lucide-react";
import { useState } from "react";
import { SubScheduleItem } from "../types";

interface SubItemsListProps {
  subItems?: SubScheduleItem[];
  onAddSubItem: (title: string) => void;
  onToggleSubItem: (subItemId: number) => void;
}

export const SubItemsList = ({ subItems, onAddSubItem, onToggleSubItem }: SubItemsListProps) => {
  const [newSubItemTitle, setNewSubItemTitle] = useState("");

  const handleAddSubItem = () => {
    if (!newSubItemTitle.trim()) return;
    onAddSubItem(newSubItemTitle.trim());
    setNewSubItemTitle("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          value={newSubItemTitle}
          onChange={(e) => setNewSubItemTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddSubItem();
            }
          }}
          placeholder="Add sub-item..."
          className="h-8"
        />
        <Button 
          variant="secondary"
          size="sm"
          onClick={handleAddSubItem}
          className="h-8"
        >
          Add
        </Button>
      </div>
      {subItems?.map((subItem) => (
        <div 
          key={subItem.id} 
          className="flex items-center gap-2 pl-2"
        >
          <button
            onClick={() => onToggleSubItem(subItem.id)}
            className="hover:scale-110 transition-transform"
          >
            {subItem.completed ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Circle className="h-4 w-4 text-gray-400" />
            )}
          </button>
          <span className={`text-sm ${subItem.completed ? 'line-through text-gray-500' : ''}`}>
            {subItem.title}
          </span>
        </div>
      ))}
    </div>
  );
};
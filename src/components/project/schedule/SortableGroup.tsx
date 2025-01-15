import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { ScheduleItem } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface SortableGroupProps {
  groupTitle: string;
  items: ScheduleItem[];
  onGroupTitleChange: (oldTitle: string, newTitle: string) => void;
  onAddItem: (groupTitle: string) => void;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: any) => void;
  onDeleteGroup: (groupTitle: string) => void;
  onDeleteItem: (itemId: number) => void;
}

export const SortableGroup = ({ 
  groupTitle, 
  items, 
  onGroupTitleChange, 
  onAddItem, 
  handleItemUpdate,
  onDeleteGroup,
  onDeleteItem
}: SortableGroupProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ 
    id: groupTitle,
    data: {
      type: 'group',
    }
  });

  const [editingTitle, setEditingTitle] = useState(groupTitle);
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useIsMobile();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (editingTitle.trim() !== groupTitle) {
      onGroupTitleChange(groupTitle, editingTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="mb-2 last:mb-0 p-2 border hover:border-gray-300 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          {isEditing ? (
            <Input
              value={editingTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="h-7 min-h-7 w-[200px] font-medium"
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
            >
              {editingTitle}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteGroup(groupTitle)}
            className="text-red-500 hover:text-red-600 p-1 h-7"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          onClick={() => onAddItem(groupTitle)} 
          variant="outline" 
          size="sm"
          className="gap-1 w-full sm:w-auto"
        >
          <Plus className="h-3 w-3" />
          New Item
        </Button>
      </div>
      
      {!isMobile && (
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 mb-1 px-2 font-medium text-sm text-gray-600">
          <div className="h-8 flex items-center">Title</div>
          <div className="h-8 flex items-center">Contractor</div>
          <div className="h-8 flex items-center">Duration (days)</div>
          <div className="h-8 flex items-center">Timeline</div>
          <div className="h-8 flex items-center">Status</div>
        </div>
      )}
      
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              item={item}
              handleItemUpdate={handleItemUpdate}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </div>
      </SortableContext>
    </Card>
  );
};
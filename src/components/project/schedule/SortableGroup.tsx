import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GripVertical, Plus, Link2, Link2Off } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { ScheduleItem } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SortableGroupProps {
  groupTitle: string;
  items: ScheduleItem[];
  onGroupTitleChange: (oldTitle: string, newTitle: string) => void;
  onAddItem: (groupTitle: string) => void;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: any) => void;
  allGroups: string[];
}

export const SortableGroup = ({ 
  groupTitle, 
  items, 
  onGroupTitleChange, 
  onAddItem, 
  handleItemUpdate,
  allGroups
}: SortableGroupProps) => {
  const { toast } = useToast();
  const [isLinking, setIsLinking] = useState(false);
  const [linkedGroups, setLinkedGroups] = useState<string[]>([]);

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

  const toggleGroupLink = async (successorGroupTitle: string) => {
    try {
      const { data: existingLink } = await supabase
        .from('group_relationships')
        .select()
        .eq('predecessor_group_title', groupTitle)
        .eq('successor_group_title', successorGroupTitle)
        .single();

      if (existingLink) {
        await supabase
          .from('group_relationships')
          .delete()
          .eq('predecessor_group_title', groupTitle)
          .eq('successor_group_title', successorGroupTitle);

        setLinkedGroups(prev => prev.filter(g => g !== successorGroupTitle));
        toast({
          title: "Success",
          description: "Group relationship removed",
        });
      } else {
        await supabase
          .from('group_relationships')
          .insert({
            predecessor_group_title: groupTitle,
            successor_group_title: successorGroupTitle
          });

        setLinkedGroups(prev => [...prev, successorGroupTitle]);
        toast({
          title: "Success",
          description: "Groups linked successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to manage group relationship",
        variant: "destructive",
      });
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
      className="mb-4 p-4 border hover:border-gray-300 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
          {isEditing ? (
            <Input
              value={editingTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="h-8 min-h-8 w-[240px] font-medium"
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="cursor-pointer px-3 py-1.5 rounded hover:bg-gray-100 font-medium"
            >
              {editingTitle}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLinking(!isLinking)}
            className={cn("gap-2 h-8 px-3", isLinking && "bg-blue-100")}
          >
            {isLinking ? (
              <>
                <Link2Off className="h-4 w-4" />
                <span>Cancel Linking</span>
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" />
                <span>Link Group</span>
              </>
            )}
          </Button>
        </div>
        <div className="flex gap-3">
          {isLinking && (
            <div className="flex gap-2 bg-gray-50 p-2 rounded-lg">
              {allGroups
                .filter(g => g !== groupTitle)
                .map(g => (
                  <Button
                    key={g}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleGroupLink(g)}
                    className={cn(
                      "h-8 px-3 text-sm font-medium",
                      linkedGroups.includes(g) && "bg-blue-100 border-blue-200"
                    )}
                  >
                    {g}
                  </Button>
                ))}
            </div>
          )}
          <Button 
            onClick={() => onAddItem(groupTitle)} 
            variant="outline" 
            size="sm"
            className="gap-2 h-8 px-3"
          >
            <Plus className="h-4 w-4" />
            New Item
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 mb-2 px-3 font-medium text-sm text-gray-600">
        <div className="h-8 flex items-center">Title</div>
        <div className="h-8 flex items-center">Contractor</div>
        <div className="h-8 flex items-center">Duration (days)</div>
        <div className="h-8 flex items-center">Timeline</div>
        <div className="h-8 flex items-center">Status</div>
      </div>
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              item={item}
              handleItemUpdate={handleItemUpdate}
              allItems={items}
            />
          ))}
        </div>
      </SortableContext>
    </Card>
  );
};
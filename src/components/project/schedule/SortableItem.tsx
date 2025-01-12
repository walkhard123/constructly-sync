import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { ScheduleItem, SubScheduleItem } from "./types";
import { ChevronDown, ChevronRight, Plus, Link2, Link2Off } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DateRangeSelect } from "./DateRangeSelect";
import { DurationInput } from "./components/DurationInput";
import { StatusSelect } from "./components/StatusSelect";
import { SubItemsList } from "./components/SubItemsList";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SortableItemProps {
  id: number;
  item: ScheduleItem;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: any) => void;
  allItems: ScheduleItem[];
}

export const SortableItem = ({ id, item, handleItemUpdate, allItems }: SortableItemProps) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const [linkedItems, setLinkedItems] = useState<number[]>([]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ 
    id,
    data: {
      type: 'item',
    }
  });

  useEffect(() => {
    const loadItemRelationships = async () => {
      const { data } = await supabase
        .from('item_relationships')
        .select()
        .eq('predecessor_item_id', id);
      
      if (data) {
        setLinkedItems(data.map(r => r.successor_item_id));
      }
    };

    loadItemRelationships();
  }, [id]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleItemUpdate(item.id, 'title', e.target.value);
  };

  const handleContractorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleItemUpdate(item.id, 'contractor', e.target.value);
  };

  const handleDurationChange = (duration: number) => {
    handleItemUpdate(item.id, 'duration', duration);
    if (item.startDate) {
      const startDate = new Date(item.startDate);
      let currentDate = new Date(startDate);
      let daysCount = 0;
      
      while (daysCount < duration) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() !== 0) {
          daysCount++;
        }
      }
      
      handleItemUpdate(item.id, 'endDate', currentDate.toISOString());
      updateLinkedItems(currentDate.toISOString(), duration);
    }
  };

  const updateLinkedItems = async (newEndDate: string, duration: number) => {
    const { data: relationships } = await supabase
      .from('item_relationships')
      .select()
      .eq('predecessor_item_id', id);

    if (relationships) {
      relationships.forEach(rel => {
        const successorItem = allItems.find(i => i.id === rel.successor_item_id);
        if (successorItem) {
          const newStartDate = new Date(newEndDate);
          newStartDate.setDate(newStartDate.getDate() + 1);
          handleItemUpdate(successorItem.id, 'startDate', newStartDate.toISOString());
          
          if (successorItem.duration) {
            let currentDate = new Date(newStartDate);
            let daysCount = 0;
            
            while (daysCount < successorItem.duration) {
              currentDate.setDate(currentDate.getDate() + 1);
              if (currentDate.getDay() !== 0) {
                daysCount++;
              }
            }
            
            handleItemUpdate(successorItem.id, 'endDate', currentDate.toISOString());
          }
        }
      });
    }
  };

  const handleStartDateChange = async (date: Date | undefined) => {
    handleItemUpdate(item.id, 'startDate', date?.toISOString());
    if (date && item.duration) {
      let currentDate = new Date(date);
      let daysCount = 0;
      
      while (daysCount < item.duration) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDay() !== 0) {
          daysCount++;
        }
      }
      
      handleItemUpdate(item.id, 'endDate', currentDate.toISOString());
      updateLinkedItems(currentDate.toISOString(), item.duration);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    handleItemUpdate(item.id, 'endDate', date?.toISOString());
  };

  const toggleItemLink = async (successorItemId: number) => {
    try {
      const { data: existingLink } = await supabase
        .from('item_relationships')
        .select()
        .eq('predecessor_item_id', id)
        .eq('successor_item_id', successorItemId)
        .single();

      if (existingLink) {
        await supabase
          .from('item_relationships')
          .delete()
          .eq('predecessor_item_id', id)
          .eq('successor_item_id', successorItemId);

        setLinkedItems(prev => prev.filter(i => i !== successorItemId));
        toast({
          title: "Success",
          description: "Item relationship removed",
        });
      } else {
        await supabase
          .from('item_relationships')
          .insert({
            predecessor_item_id: id,
            successor_item_id: successorItemId
          });

        setLinkedItems(prev => [...prev, successorItemId]);
        toast({
          title: "Success",
          description: "Items linked successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to manage item relationship",
        variant: "destructive",
      });
    }
  };

  const handleAddSubItem = (title: string) => {
    const newSubItem: SubScheduleItem = {
      id: (item.subItems?.length || 0) + 1,
      title: title,
      completed: false
    };
    handleItemUpdate(item.id, 'subItems', [...(item.subItems || []), newSubItem]);
  };

  const toggleSubItemCompletion = (subItemId: number) => {
    const updatedSubItems = item.subItems?.map(subItem => 
      subItem.id === subItemId 
        ? { ...subItem, completed: !subItem.completed }
        : subItem
    );
    handleItemUpdate(item.id, 'subItems', updatedSubItems);
  };

  return (
    <div className="space-y-2">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 py-2 border-b last:border-b-0 text-sm bg-white rounded px-2 cursor-move hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>
          <Input
            value={item.title}
            onChange={handleTitleChange}
            className="h-8"
            placeholder="Enter item"
          />
          <Button 
            variant="ghost" 
            size="sm"
            className={cn("h-8 w-8 p-0", isLinking && "bg-blue-100")}
            onClick={(e) => {
              e.stopPropagation();
              setIsLinking(!isLinking);
            }}
          >
            {isLinking ? <Link2Off className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          </Button>
          {isLinking && (
            <div className="absolute left-full ml-2 bg-white border rounded-md p-2 shadow-lg z-10">
              {allItems
                .filter(i => i.id !== id && i.groupTitle === item.groupTitle)
                .map(i => (
                  <Button
                    key={i.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleItemLink(i.id)}
                    className={cn(
                      "block w-full text-left mb-1 last:mb-0",
                      linkedItems.includes(i.id) && "bg-blue-100"
                    )}
                  >
                    {i.title}
                  </Button>
                ))}
            </div>
          )}
        </div>
        <Input
          value={item.contractor || ''}
          onChange={handleContractorChange}
          className="h-8"
          placeholder="Enter contractor"
        />
        <DurationInput
          duration={item.duration}
          onDurationChange={handleDurationChange}
        />
        <DateRangeSelect
          startDate={item.startDate ? new Date(item.startDate) : undefined}
          endDate={item.endDate ? new Date(item.endDate) : undefined}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onDurationChange={handleDurationChange}
        />
        <StatusSelect
          status={item.status}
          onStatusChange={(value) => handleItemUpdate(item.id, 'status', value)}
        />
      </div>
      {isExpanded && (
        <SubItemsList
          subItems={item.subItems}
          onAddSubItem={handleAddSubItem}
          onToggleSubItem={toggleSubItemCompletion}
        />
      )}
    </div>
  );
};
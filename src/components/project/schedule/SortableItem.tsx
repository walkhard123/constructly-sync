import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { ScheduleItem, SubScheduleItem } from "./types";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DateRangeSelect } from "./DateRangeSelect";
import { DurationInput } from "./components/DurationInput";
import { StatusSelect } from "./components/StatusSelect";
import { SubItemsList } from "./components/SubItemsList";

interface SortableItemProps {
  id: number;
  item: ScheduleItem;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: any) => void;
}

export const SortableItem = ({ id, item, handleItemUpdate }: SortableItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        if (currentDate.getDay() !== 0) { // Skip Sundays
          daysCount++;
        }
      }
      
      handleItemUpdate(item.id, 'endDate', currentDate.toISOString());
    }
  };

  const handleStartDateChange = (date: Date | undefined) => {
    handleItemUpdate(item.id, 'startDate', date?.toISOString());
  };

  const handleEndDateChange = (date: Date | undefined) => {
    handleItemUpdate(item.id, 'endDate', date?.toISOString());
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
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
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
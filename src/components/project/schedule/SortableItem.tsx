import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScheduleItem, SubScheduleItem } from "./types";
import { Plus, ChevronDown, ChevronRight, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DateRangeSelect } from "./DateRangeSelect";

interface SortableItemProps {
  id: number;
  item: ScheduleItem;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: any) => void;
}

export const SortableItem = ({ id, item, handleItemUpdate }: SortableItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSubItemTitle, setNewSubItemTitle] = useState("");

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
  };

  const handleStartDateChange = (date: Date | undefined) => {
    handleItemUpdate(item.id, 'startDate', date?.toISOString());
  };

  const handleEndDateChange = (date: Date | undefined) => {
    handleItemUpdate(item.id, 'endDate', date?.toISOString());
  };

  const handleAddSubItem = () => {
    if (!newSubItemTitle.trim()) return;

    const newSubItem: SubScheduleItem = {
      id: (item.subItems?.length || 0) + 1,
      title: newSubItemTitle.trim(),
      completed: false
    };

    handleItemUpdate(item.id, 'subItems', [...(item.subItems || []), newSubItem]);
    setNewSubItemTitle("");
    setIsExpanded(true);
  };

  const toggleSubItemCompletion = (subItemId: number) => {
    const updatedSubItems = item.subItems?.map(subItem => 
      subItem.id === subItemId 
        ? { ...subItem, completed: !subItem.completed }
        : subItem
    );
    handleItemUpdate(item.id, 'subItems', updatedSubItems);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-[#F2FCE2] text-green-700';
      case 'stuck':
        return 'bg-[#FFDEE2] text-red-700';
      case 'in-progress':
        return 'bg-[#FEF7CD] text-yellow-700';
      default:
        return '';
    }
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
        <Input
          type="number"
          value={item.duration || ''}
          onChange={(e) => handleDurationChange(parseInt(e.target.value) || 0)}
          className="h-8"
          placeholder="Days"
        />
        <DateRangeSelect
          startDate={item.startDate ? new Date(item.startDate) : undefined}
          endDate={item.endDate ? new Date(item.endDate) : undefined}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          onDurationChange={handleDurationChange}
        />
        <Select 
          value={item.status} 
          onValueChange={(value) => handleItemUpdate(item.id, 'status', value)}
        >
          <SelectTrigger className={`h-8 ${getStatusStyle(item.status)}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stuck">Stuck</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isExpanded && (
        <div className="ml-8 space-y-2">
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
          {item.subItems?.map((subItem) => (
            <div 
              key={subItem.id} 
              className="flex items-center gap-2 pl-2"
            >
              <button
                onClick={() => toggleSubItemCompletion(subItem.id)}
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
      )}
    </div>
  );
};
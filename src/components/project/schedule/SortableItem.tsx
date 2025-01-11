import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScheduleItem, SubScheduleItem } from "./types";
import { Calendar as CalendarIcon, Plus, ChevronDown, ChevronRight, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInDays, isAfter, isSunday, isSameDay } from "date-fns";
import { useState } from "react";

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

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    if (trimmedValue !== item.title) {
      handleItemUpdate(item.id, 'title', trimmedValue);
    }
  };

  const handleContractorBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    if (trimmedValue !== item.contractor) {
      handleItemUpdate(item.id, 'contractor', trimmedValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
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

  const getDaysLeft = () => {
    if (!item.endDate) return "No due date";
    const today = new Date();
    const dueDate = new Date(item.endDate);
    
    if (isSameDay(today, dueDate)) return "Due today";
    if (isAfter(today, dueDate)) return "Overdue";
    
    let daysLeft = 0;
    let currentDate = today;
    
    while (!isSameDay(currentDate, dueDate)) {
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      if (!isSunday(currentDate)) {
        daysLeft++;
      }
    }
    
    return `${daysLeft} days left`;
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
        className="grid grid-cols-[2.5fr,1fr,1fr,1fr] gap-2 py-2 border-b last:border-b-0 text-sm bg-white rounded px-2 cursor-move hover:bg-gray-50"
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
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
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
          onBlur={handleContractorBlur}
          onKeyDown={handleKeyDown}
          className="h-8"
          placeholder="Enter contractor"
        />
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full h-8 justify-start text-left font-normal ${!item.endDate && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {item.endDate ? getDaysLeft() : "Set due date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={item.endDate ? new Date(item.endDate) : undefined}
                onSelect={(date) => handleItemUpdate(item.id, 'endDate', date?.toISOString())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Circle } from "lucide-react";
import { useState } from "react";
import { SubScheduleItem } from "../types";
import { DurationInput } from "./DurationInput";
import { DateRangeSelect } from "../DateRangeSelect";
import { StatusSelect } from "./StatusSelect";

interface SubItemsListProps {
  subItems?: SubScheduleItem[];
  onAddSubItem: (title: string) => void;
  onToggleSubItem: (subItemId: number) => void;
  onUpdateSubItem?: (subItemId: number, field: keyof SubScheduleItem, value: any) => void;
}

export const SubItemsList = ({ 
  subItems = [], 
  onAddSubItem, 
  onToggleSubItem,
  onUpdateSubItem 
}: SubItemsListProps) => {
  const [newSubItem, setNewSubItem] = useState<Partial<SubScheduleItem>>({
    title: "",
    contractor: "",
    duration: 0,
    status: "in-progress"
  });

  const handleAddSubItem = () => {
    if (!newSubItem.title?.trim()) return;
    onAddSubItem(newSubItem.title.trim());
    setNewSubItem({
      title: "",
      contractor: "",
      duration: 0,
      status: "in-progress"
    });
  };

  const handleSubItemUpdate = (subItemId: number, field: keyof SubScheduleItem, value: any) => {
    if (onUpdateSubItem) {
      if (field === 'duration') {
        const item = subItems.find(item => item.id === subItemId);
        if (item?.startDate) {
          const startDate = new Date(item.startDate);
          let currentDate = new Date(startDate);
          let daysCount = 0;
          
          while (daysCount < value) {
            currentDate.setDate(currentDate.getDate() + 1);
            if (currentDate.getDay() !== 0) { // Skip Sundays
              daysCount++;
            }
          }
          
          onUpdateSubItem(subItemId, 'endDate', currentDate.toISOString());
        }
      } else if (field === 'startDate' || field === 'endDate') {
        const item = subItems.find(item => item.id === subItemId);
        if (item) {
          const start = field === 'startDate' ? value : item.startDate;
          const end = field === 'endDate' ? value : item.endDate;
          
          if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            let duration = 0;
            let currentDate = new Date(startDate);
            
            while (currentDate <= endDate) {
              if (currentDate.getDay() !== 0) { // Skip Sundays
                duration++;
              }
              currentDate.setDate(currentDate.getDate() + 1);
            }
            
            onUpdateSubItem(subItemId, 'duration', duration);
          }
        }
      }
      onUpdateSubItem(subItemId, field, value);
    }
  };

  return (
    <div className="space-y-3 mt-2">
      <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 pl-12 items-center">
        <Input
          value={newSubItem.title}
          onChange={(e) => setNewSubItem({ ...newSubItem, title: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddSubItem();
            }
          }}
          placeholder="Add sub-item..."
          className="h-8"
        />
        <Input
          value={newSubItem.contractor}
          onChange={(e) => setNewSubItem({ ...newSubItem, contractor: e.target.value })}
          placeholder="Contractor"
          className="h-8"
        />
        <DurationInput
          duration={newSubItem.duration}
          onDurationChange={(value) => setNewSubItem({ ...newSubItem, duration: value })}
        />
        <DateRangeSelect
          startDate={newSubItem.startDate ? new Date(newSubItem.startDate) : undefined}
          endDate={newSubItem.endDate ? new Date(newSubItem.endDate) : undefined}
          onStartDateChange={(date) => setNewSubItem({ ...newSubItem, startDate: date?.toISOString() })}
          onEndDateChange={(date) => setNewSubItem({ ...newSubItem, endDate: date?.toISOString() })}
          onDurationChange={(duration) => setNewSubItem({ ...newSubItem, duration })}
        />
        <StatusSelect
          status={newSubItem.status || "in-progress"}
          onStatusChange={(value) => setNewSubItem({ ...newSubItem, status: value })}
        />
      </div>
      {subItems.map((subItem) => (
        <div 
          key={subItem.id} 
          className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 pl-12 items-center bg-gray-50/50 rounded-sm py-1"
        >
          <div className="flex items-center gap-2">
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
            <Input
              value={subItem.title}
              onChange={(e) => handleSubItemUpdate(subItem.id, 'title', e.target.value)}
              className={`h-8 ${subItem.completed ? 'line-through text-gray-500' : ''}`}
              readOnly={subItem.completed}
            />
          </div>
          <Input
            value={subItem.contractor || ''}
            onChange={(e) => handleSubItemUpdate(subItem.id, 'contractor', e.target.value)}
            placeholder="Contractor"
            className="h-8"
            readOnly={subItem.completed}
          />
          <DurationInput
            duration={subItem.duration}
            onDurationChange={(value) => handleSubItemUpdate(subItem.id, 'duration', value)}
            disabled={subItem.completed}
          />
          <DateRangeSelect
            startDate={subItem.startDate ? new Date(subItem.startDate) : undefined}
            endDate={subItem.endDate ? new Date(subItem.endDate) : undefined}
            onStartDateChange={(date) => handleSubItemUpdate(subItem.id, 'startDate', date?.toISOString())}
            onEndDateChange={(date) => handleSubItemUpdate(subItem.id, 'endDate', date?.toISOString())}
            onDurationChange={(duration) => handleSubItemUpdate(subItem.id, 'duration', duration)}
            disabled={subItem.completed}
          />
          <StatusSelect
            status={subItem.status || "in-progress"}
            onStatusChange={(value) => handleSubItemUpdate(subItem.id, 'status', value)}
            disabled={subItem.completed}
          />
        </div>
      ))}
    </div>
  );
};
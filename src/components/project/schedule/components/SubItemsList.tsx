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
      <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 pl-8">
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
        <Input
          placeholder="Contractor"
          className="h-8"
        />
        <DurationInput
          duration={0}
          onDurationChange={() => {}}
        />
        <DateRangeSelect
          startDate={undefined}
          endDate={undefined}
          onStartDateChange={() => {}}
          onEndDateChange={() => {}}
          onDurationChange={() => {}}
        />
        <StatusSelect
          status="in-progress"
          onStatusChange={() => {}}
        />
      </div>
      {subItems?.map((subItem) => (
        <div 
          key={subItem.id} 
          className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 pl-8 items-center"
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
            <span className={`text-sm ${subItem.completed ? 'line-through text-gray-500' : ''}`}>
              {subItem.title}
            </span>
          </div>
          <Input
            placeholder="Contractor"
            className="h-8"
          />
          <DurationInput
            duration={0}
            onDurationChange={() => {}}
          />
          <DateRangeSelect
            startDate={undefined}
            endDate={undefined}
            onStartDateChange={() => {}}
            onEndDateChange={() => {}}
            onDurationChange={() => {}}
          />
          <StatusSelect
            status="in-progress"
            onStatusChange={() => {}}
          />
        </div>
      ))}
    </div>
  );
};
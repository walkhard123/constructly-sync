import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SubScheduleItem } from "../types";

interface SubItemFormProps {
  onAddSubItem: (title: string) => void;
}

export const SubItemForm = ({ onAddSubItem }: SubItemFormProps) => {
  const [newSubItem, setNewSubItem] = useState<Partial<SubScheduleItem>>({
    title: "",
    contractor: "",
    duration: 0,
    status: "in-progress"
  });

  const handleSubmit = () => {
    if (!newSubItem.title?.trim()) return;
    onAddSubItem(newSubItem.title.trim());
    setNewSubItem({
      title: "",
      contractor: "",
      duration: 0,
      status: "in-progress"
    });
  };

  return (
    <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 pl-12 items-center">
      <Input
        value={newSubItem.title}
        onChange={(e) => setNewSubItem({ ...newSubItem, title: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
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
      <div />
      <div />
      <div />
    </div>
  );
};
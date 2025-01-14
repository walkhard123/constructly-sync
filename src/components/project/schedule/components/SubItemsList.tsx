import { SubScheduleItem } from "../types";
import { SubItemForm } from "./SubItemForm";
import { SubItemRow } from "./SubItemRow";

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
  const handleSubItemUpdate = (subItemId: number, field: keyof SubScheduleItem, value: any) => {
    if (onUpdateSubItem) {
      onUpdateSubItem(subItemId, field, value);
    }
  };

  return (
    <div className="space-y-3 mt-2">
      <SubItemForm onAddSubItem={onAddSubItem} />
      {subItems.map((subItem) => (
        <SubItemRow
          key={subItem.id}
          subItem={subItem}
          onToggle={() => onToggleSubItem(subItem.id)}
          onUpdate={(field, value) => handleSubItemUpdate(subItem.id, field, value)}
        />
      ))}
    </div>
  );
};
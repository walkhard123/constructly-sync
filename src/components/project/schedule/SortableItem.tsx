import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScheduleItem } from "./types";
import { DateRangeSelect } from "./DateRangeSelect";

interface SortableItemProps {
  id: number;
  item: ScheduleItem;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: any) => void;
}

export const SortableItem = ({ id, item, handleItemUpdate }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="grid grid-cols-[2fr,1fr,2fr] gap-2 py-2 border-b last:border-b-0 text-sm bg-white rounded px-2 cursor-move hover:bg-gray-50"
    >
      <Input
        value={item.title}
        onChange={(e) => handleItemUpdate(item.id, 'title', e.target.value)}
        className="h-8"
      />
      <Select 
        value={item.status} 
        onValueChange={(value) => handleItemUpdate(item.id, 'status', value)}
      >
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stuck">Stuck</SelectItem>
          <SelectItem value="done">Done</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
        </SelectContent>
      </Select>
      <DateRangeSelect
        startDate={item.startDate ? new Date(item.startDate) : undefined}
        endDate={item.endDate ? new Date(item.endDate) : undefined}
        onStartDateChange={(date) => handleItemUpdate(item.id, 'startDate', date?.toISOString())}
        onEndDateChange={(date) => handleItemUpdate(item.id, 'endDate', date?.toISOString())}
      />
    </div>
  );
};
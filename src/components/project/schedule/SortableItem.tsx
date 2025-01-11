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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="grid grid-cols-[1.5fr,1fr,1.5fr,1fr] gap-2 py-2 border-b last:border-b-0 text-sm bg-white rounded px-2 cursor-move hover:bg-gray-50"
    >
      <Input
        value={item.title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
        onKeyDown={handleKeyDown}
        className="h-8"
        placeholder="Enter item"
      />
      <Input
        value={item.contractor || ''}
        onChange={handleContractorChange}
        onBlur={handleContractorBlur}
        onKeyDown={handleKeyDown}
        className="h-8"
        placeholder="Enter contractor"
      />
      <DateRangeSelect
        startDate={item.startDate ? new Date(item.startDate) : undefined}
        endDate={item.endDate ? new Date(item.endDate) : undefined}
        onStartDateChange={(date) => handleItemUpdate(item.id, 'startDate', date?.toISOString())}
        onEndDateChange={(date) => handleItemUpdate(item.id, 'endDate', date?.toISOString())}
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
  );
};
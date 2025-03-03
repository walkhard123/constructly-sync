import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { ScheduleItem, SubScheduleItem } from "./types";
import { ChevronDown, ChevronRight, FileText, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { DateRangeSelect } from "./DateRangeSelect";
import { DurationInput } from "./components/DurationInput";
import { StatusSelect } from "./components/StatusSelect";
import { SubItemsList } from "./components/SubItemsList";
import { useIsMobile } from "@/hooks/use-mobile";
import { FileDialog } from "./components/FileDialog";
import { supabase } from "@/integrations/supabase/client";

interface Column {
  id: string;
  label: string;
  width: string;
}

interface SortableItemProps {
  id: number;
  item: ScheduleItem;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: any) => void;
  onDeleteItem: (itemId: number) => void;
  columnOrder: Column[];
}

export const SortableItem = ({ 
  id, 
  item, 
  handleItemUpdate, 
  onDeleteItem,
  columnOrder 
}: SortableItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [showActions, setShowActions] = useState(false);
  const isMobile = useIsMobile();

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

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from('schedule_files')
      .select('*')
      .eq('item_id', item.id);
    
    if (!error && data) {
      setFiles(data);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [item.id]);

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
      completed: false,
      status: "in-progress",
      duration: 0
    };
    handleItemUpdate(item.id, 'subItems', [...(item.subItems || []), newSubItem]);
  };

  const handleUpdateSubItem = (subItemId: number, field: keyof SubScheduleItem, value: any) => {
    const updatedSubItems = item.subItems?.map(subItem => 
      subItem.id === subItemId 
        ? { ...subItem, [field]: value }
        : subItem
    );
    handleItemUpdate(item.id, 'subItems', updatedSubItems);
  };

  const toggleSubItemCompletion = (subItemId: number) => {
    const updatedSubItems = item.subItems?.map(subItem => 
      subItem.id === subItemId 
        ? { ...subItem, completed: !subItem.completed }
        : subItem
    );
    handleItemUpdate(item.id, 'subItems', updatedSubItems);
  };

  const renderField = (columnId: string) => {
    switch (columnId) {
      case 'title':
        return (
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
              onChange={(e) => handleItemUpdate(item.id, 'title', e.target.value)}
              className="h-8"
              placeholder="Enter item"
            />
            <div className="flex items-center gap-1">
              {showActions && (
                <div className="flex gap-1 animate-fade-in">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFileDialogOpen(true);
                    }}
                    className={`h-8 w-8 p-0 ${files.length > 0 ? 'text-purple-600' : ''}`}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem(id);
                    }}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(!showActions);
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 'contractor':
        return (
          <Input
            value={item.contractor || ''}
            onChange={(e) => handleItemUpdate(item.id, 'contractor', e.target.value)}
            className="h-8"
            placeholder="Enter contractor"
          />
        );
      case 'duration':
        return (
          <DurationInput
            duration={item.duration}
            onDurationChange={(value) => handleItemUpdate(item.id, 'duration', value)}
          />
        );
      case 'timeline':
        return (
          <DateRangeSelect
            startDate={item.startDate ? new Date(item.startDate) : undefined}
            endDate={item.endDate ? new Date(item.endDate) : undefined}
            onStartDateChange={(date) => handleItemUpdate(item.id, 'startDate', date?.toISOString())}
            onEndDateChange={(date) => handleItemUpdate(item.id, 'endDate', date?.toISOString())}
            onDurationChange={(duration) => handleItemUpdate(item.id, 'duration', duration)}
          />
        );
      case 'status':
        return (
          <StatusSelect
            status={item.status}
            onStatusChange={(value) => handleItemUpdate(item.id, 'status', value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <div
        ref={setNodeRef}
        style={{
          ...style,
          gridTemplateColumns: columnOrder.map(col => col.width).join(' ')
        }}
        {...attributes}
        {...listeners}
        className={`grid gap-2 py-2 border-b last:border-b-0 text-sm ${
          files.length > 0 ? 'bg-[#E5DEFF]' : 'bg-white'
        } rounded px-2 cursor-move hover:bg-opacity-90`}
      >
        {columnOrder.map((column) => (
          <div key={column.id}>
            {renderField(column.id)}
          </div>
        ))}
      </div>

      {isExpanded && (
        <SubItemsList
          subItems={item.subItems}
          onAddSubItem={(title) => handleAddSubItem(title)}
          onToggleSubItem={toggleSubItemCompletion}
          onUpdateSubItem={handleUpdateSubItem}
          onDeleteSubItem={(subItemId) => {
            const updatedSubItems = item.subItems?.filter(subItem => subItem.id !== subItemId);
            handleItemUpdate(item.id, 'subItems', updatedSubItems);
          }}
          onOpenFileDialog={(subItemId) => {
            // Handle sub-item file dialog
          }}
        />
      )}
      <FileDialog
        isOpen={isFileDialogOpen}
        onClose={() => setIsFileDialogOpen(false)}
        itemId={item.id}
        files={files}
        onFileUpload={fetchFiles}
      />
    </div>
  );
};

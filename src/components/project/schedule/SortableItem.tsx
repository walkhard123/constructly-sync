import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ScheduleItem, SubScheduleItem } from "./types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { SubItemsList } from "./components/SubItemsList";
import { useIsMobile } from "@/hooks/use-mobile";
import { FileDialog } from "./components/FileDialog";
import { supabase } from "@/integrations/supabase/client";
import { ItemActions } from "./components/ItemActions";
import { ItemFields } from "./components/ItemFields";

interface SortableItemProps {
  id: number;
  item: ScheduleItem;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: any) => void;
  onDeleteItem: (itemId: number) => void;
}

export const SortableItem = ({ id, item, handleItemUpdate, onDeleteItem }: SortableItemProps) => {
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

  return (
    <div className="space-y-2">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${
          isMobile 
            ? 'flex flex-col gap-2' 
            : 'grid grid-cols-[2fr,1fr,1fr,1fr,1fr]'
        } gap-2 py-2 border-b last:border-b-0 text-sm ${
          files.length > 0 ? 'bg-[#E5DEFF]' : 'bg-white'
        } rounded px-2 cursor-move hover:bg-opacity-90`}
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

          <ItemFields
            title={item.title}
            contractor={item.contractor}
            duration={item.duration}
            startDate={item.startDate}
            endDate={item.endDate}
            status={item.status}
            onTitleChange={(value) => handleItemUpdate(item.id, 'title', value)}
            onContractorChange={(value) => handleItemUpdate(item.id, 'contractor', value)}
            onDurationChange={(value) => handleItemUpdate(item.id, 'duration', value)}
            onStartDateChange={(date) => handleItemUpdate(item.id, 'startDate', date?.toISOString())}
            onEndDateChange={(date) => handleItemUpdate(item.id, 'endDate', date?.toISOString())}
            onStatusChange={(value) => handleItemUpdate(item.id, 'status', value)}
          />

          <ItemActions
            showActions={showActions}
            filesCount={files.length}
            onToggleActions={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            onExpand={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            onOpenFileDialog={(e) => {
              e.stopPropagation();
              setIsFileDialogOpen(true);
            }}
            onDelete={(e) => {
              e.stopPropagation();
              onDeleteItem(id);
            }}
          />
        </div>
      </div>

      {isExpanded && (
        <SubItemsList
          subItems={item.subItems}
          onAddSubItem={handleAddSubItem}
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

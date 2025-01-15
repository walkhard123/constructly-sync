import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Circle, FileText, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { SubScheduleItem } from "../types";
import { DurationInput } from "./DurationInput";
import { DateRangeSelect } from "../DateRangeSelect";
import { StatusSelect } from "./StatusSelect";
import { FileDialog } from "./FileDialog";
import { supabase } from "@/integrations/supabase/client";

interface SubItemsListProps {
  subItems?: SubScheduleItem[];
  onAddSubItem: (title: string) => void;
  onToggleSubItem: (subItemId: number) => void;
  onUpdateSubItem?: (subItemId: number, field: keyof SubScheduleItem, value: any) => void;
  onDeleteSubItem: (subItemId: number) => void;
  onOpenFileDialog?: (subItemId: number) => void;
}

export const SubItemsList = ({ 
  subItems = [], 
  onAddSubItem, 
  onToggleSubItem,
  onUpdateSubItem,
  onDeleteSubItem,
  onOpenFileDialog
}: SubItemsListProps) => {
  const [newSubItem, setNewSubItem] = useState<Partial<SubScheduleItem>>({
    title: "",
    contractor: "",
    duration: 0,
    status: "in-progress"
  });
  const [selectedSubItem, setSelectedSubItem] = useState<number | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [showActionsMap, setShowActionsMap] = useState<{ [key: number]: boolean }>({});

  const fetchFiles = async (subItemId: number) => {
    const { data, error } = await supabase
      .from('schedule_files')
      .select('*')
      .eq('sub_item_id', subItemId);
    
    if (!error && data) {
      setFiles(data);
    }
  };

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

  const handleOpenFileDialog = (subItemId: number) => {
    setSelectedSubItem(subItemId);
    fetchFiles(subItemId);
    setIsFileDialogOpen(true);
  };

  const toggleActions = (subItemId: number) => {
    setShowActionsMap(prev => ({
      ...prev,
      [subItemId]: !prev[subItemId]
    }));
  };

  return (
    <div className="space-y-3 mt-2">
      <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 pl-12 items-center">
        <div className="flex items-center gap-2 w-full">
          <Input
            value={newSubItem.title}
            onChange={(e) => setNewSubItem({ ...newSubItem, title: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddSubItem();
              }
            }}
            placeholder="Add sub-item..."
            className="h-8 w-[calc(100%-1rem)]"
          />
        </div>
        <Input
          value={newSubItem.contractor}
          onChange={(e) => setNewSubItem({ ...newSubItem, contractor: e.target.value })}
          placeholder="Contractor"
          className="h-8 w-full"
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
          className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 items-center bg-gray-50/50 rounded-sm py-1"
        >
          <div className="flex items-center gap-2 pl-12">
            <button
              onClick={() => onToggleSubItem(subItem.id)}
              className="hover:scale-110 transition-transform flex-shrink-0"
            >
              {subItem.completed ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Circle className="h-4 w-4 text-gray-400" />
              )}
            </button>
            <Input
              value={subItem.title}
              onChange={(e) => onUpdateSubItem?.(subItem.id, 'title', e.target.value)}
              className={`h-8 w-[calc(100%-1rem)] ${subItem.completed ? 'line-through text-gray-500' : ''}`}
              readOnly={subItem.completed}
            />
            <div className="flex gap-1 flex-shrink-0">
              {showActionsMap[subItem.id] && (
                <div className="flex gap-1 animate-fade-in">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenFileDialog(subItem.id)}
                    className="h-8 w-8 p-0"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteSubItem(subItem.id)}
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
                onClick={() => toggleActions(subItem.id)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Input
            value={subItem.contractor || ''}
            onChange={(e) => onUpdateSubItem?.(subItem.id, 'contractor', e.target.value)}
            placeholder="Contractor"
            className="h-8 w-full"
            readOnly={subItem.completed}
          />
          <DurationInput
            duration={subItem.duration}
            onDurationChange={(value) => onUpdateSubItem?.(subItem.id, 'duration', value)}
            disabled={subItem.completed}
          />
          <DateRangeSelect
            startDate={subItem.startDate ? new Date(subItem.startDate) : undefined}
            endDate={subItem.endDate ? new Date(subItem.endDate) : undefined}
            onStartDateChange={(date) => onUpdateSubItem?.(subItem.id, 'startDate', date?.toISOString())}
            onEndDateChange={(date) => onUpdateSubItem?.(subItem.id, 'endDate', date?.toISOString())}
            onDurationChange={(duration) => onUpdateSubItem?.(subItem.id, 'duration', duration)}
            disabled={subItem.completed}
          />
          <StatusSelect
            status={subItem.status || "in-progress"}
            onStatusChange={(value) => onUpdateSubItem?.(subItem.id, 'status', value)}
            disabled={subItem.completed}
          />
        </div>
      ))}
      <FileDialog
        isOpen={isFileDialogOpen}
        onClose={() => {
          setIsFileDialogOpen(false);
          setSelectedSubItem(null);
        }}
        subItemId={selectedSubItem || undefined}
        files={files}
        onFileUpload={() => selectedSubItem && fetchFiles(selectedSubItem)}
      />
    </div>
  );
};
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Filter, Plus, Search, GripVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ScheduleItem {
  id: number;
  title: string;
  status: "stuck" | "done" | "in-progress";
  date: string;
  groupTitle: string;
}

// Status styles mapping
const statusStyles: Record<string, { bg: string, text: string }> = {
  'stuck': { bg: 'bg-red-500 hover:bg-red-600', text: 'text-white' },
  'done': { bg: 'bg-green-500 hover:bg-green-600', text: 'text-white' },
  'in-progress': { bg: 'bg-yellow-500 hover:bg-yellow-600', text: 'text-white' }
};

interface SortableItemProps {
  id: number;
  item: ScheduleItem;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: string) => void;
}

const SortableItem = ({ id, item, handleItemUpdate }: SortableItemProps) => {
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
      className="grid grid-cols-[2fr,1fr,1fr] gap-1 py-0.5 border-b last:border-b-0 text-sm bg-white rounded px-1 cursor-move"
    >
      <Input
        value={item.title}
        onChange={(e) => handleItemUpdate(item.id, 'title', e.target.value)}
        className="h-6 min-h-6"
      />
      <Select 
        value={item.status} 
        onValueChange={(value) => handleItemUpdate(item.id, 'status', value)}
      >
        <SelectTrigger className={`h-6 ${statusStyles[item.status].bg} ${statusStyles[item.status].text}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stuck" className="text-red-500 font-medium">Stuck</SelectItem>
          <SelectItem value="done" className="text-green-500 font-medium">Done</SelectItem>
          <SelectItem value="in-progress" className="text-yellow-500 font-medium">In Progress</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="date"
        value={item.date}
        onChange={(e) => handleItemUpdate(item.id, 'date', e.target.value)}
        className="h-6 min-h-6"
      />
    </div>
  );
};

interface SortableGroupProps {
  groupTitle: string;
  items: ScheduleItem[];
  onGroupTitleChange: (oldTitle: string, newTitle: string) => void;
  onAddItem: (groupTitle: string) => void;
  handleItemUpdate: (id: number, field: keyof ScheduleItem, value: string) => void;
}

const SortableGroup = ({ 
  groupTitle, 
  items, 
  onGroupTitleChange, 
  onAddItem, 
  handleItemUpdate,
}: SortableGroupProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: groupTitle });

  const [editingTitle, setEditingTitle] = useState(groupTitle);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (editingTitle !== groupTitle) {
      onGroupTitleChange(groupTitle, editingTitle);
    }
    setIsEditing(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="mb-2 last:mb-0 p-3 border-2"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          {isEditing ? (
            <Input
              value={editingTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              autoFocus
              className="h-7 min-h-7 w-[200px] font-medium"
            />
          ) : (
            <div
              onClick={() => setIsEditing(true)}
              className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
            >
              {editingTitle}
            </div>
          )}
        </div>
        <Button 
          onClick={() => onAddItem(groupTitle)} 
          variant="outline" 
          size="sm"
          className="gap-1"
        >
          <Plus className="h-3 w-3" />
          New Item
        </Button>
      </div>
      <div className="grid grid-cols-[2fr,1fr,1fr] gap-1 mb-1 font-medium text-sm text-gray-600">
        <div>Title</div>
        <div>Status</div>
        <div>Date</div>
      </div>
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-0.5">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              item={item}
              handleItemUpdate={handleItemUpdate}
            />
          ))}
        </div>
      </SortableContext>
    </Card>
  );
};

export default function ProjectSchedule() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState<"table" | "board">("table");
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: 1,
      title: "Item 1",
      status: "stuck",
      date: "Nov 7, 2021",
      groupTitle: "Group Title"
    },
    {
      id: 2,
      title: "Item 2",
      status: "done",
      date: "Nov 7, 2021",
      groupTitle: "Group Title"
    },
    {
      id: 3,
      title: "Item 3",
      status: "in-progress",
      date: "Nov 12, 2021",
      groupTitle: "Group Title"
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setScheduleItems((items) => {
        const oldGroupTitle = String(active.id);
        const newGroupTitle = String(over.id);
        
        return items.map(item => 
          item.groupTitle === oldGroupTitle 
            ? { ...item, groupTitle: newGroupTitle }
            : item.groupTitle === newGroupTitle
              ? { ...item, groupTitle: oldGroupTitle }
              : item
        );
      });
    }
  };

  const handleItemUpdate = (id: number, field: keyof ScheduleItem, value: string) => {
    setScheduleItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, [field]: field === 'status' 
              ? (value as "stuck" | "done" | "in-progress") 
              : value }
          : item
      )
    );
  };

  const handleGroupTitleChange = (oldTitle: string, newTitle: string) => {
    setScheduleItems(items =>
      items.map(item =>
        item.groupTitle === oldTitle
          ? { ...item, groupTitle: newTitle }
          : item
      )
    );
  };

  const addNewGroup = () => {
    const newGroupTitle = `New Group ${Math.floor(Math.random() * 1000)}`;
    const newItem = {
      id: Math.max(...scheduleItems.map(item => item.id), 0) + 1,
      title: "New Item",
      status: "in-progress" as const,
      date: new Date().toISOString().split('T')[0],
      groupTitle: newGroupTitle
    };
    setScheduleItems([...scheduleItems, newItem]);
  };

  const addNewItem = (groupTitle: string) => {
    const newItem = {
      id: Math.max(...scheduleItems.map(item => item.id), 0) + 1,
      title: "New Item",
      status: "in-progress" as const,
      date: new Date().toISOString().split('T')[0],
      groupTitle
    };
    setScheduleItems([...scheduleItems, newItem]);
  };

  // Group items by groupTitle
  const groupedItems = scheduleItems.reduce((acc, item) => {
    if (!acc[item.groupTitle]) {
      acc[item.groupTitle] = [];
    }
    acc[item.groupTitle].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  const groupTitles = Object.keys(groupedItems);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Project Schedule</h1>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Select value={view} onValueChange={(value: "table" | "board") => setView(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="table">Main Table</SelectItem>
              <SelectItem value="board">Board View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10"
            />
          </div>
          <Button onClick={addNewGroup} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            New Group
          </Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={groupTitles} strategy={verticalListSortingStrategy}>
          {Object.entries(groupedItems).map(([groupTitle, items], index) => (
            <SortableGroup
              key={groupTitle}
              groupTitle={groupTitle}
              items={items}
              onGroupTitleChange={handleGroupTitleChange}
              onAddItem={addNewItem}
              handleItemUpdate={handleItemUpdate}
              colorIndex={index}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
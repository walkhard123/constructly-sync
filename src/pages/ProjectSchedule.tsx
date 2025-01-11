import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ScheduleItem } from "@/components/project/schedule/types";
import { SortableGroup } from "@/components/project/schedule/SortableGroup";
import { ScheduleHeader } from "@/components/project/schedule/ScheduleHeader";

export default function ProjectSchedule() {
  const navigate = useNavigate();
  const [view, setView] = useState<"table" | "board">("table");
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: 1,
      title: "Item 1",
      status: "stuck",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      groupTitle: "Group Title"
    },
    {
      id: 2,
      title: "Item 2",
      status: "done",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      groupTitle: "Group Title"
    },
    {
      id: 3,
      title: "Item 3",
      status: "in-progress",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
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
        const activeItem = items.find(item => item.id === active.id);
        const overItem = items.find(item => item.id === over.id);
        
        if (activeItem && overItem) {
          const activeIndex = items.indexOf(activeItem);
          const overIndex = items.indexOf(overItem);
          
          const newItems = [...items];
          newItems.splice(activeIndex, 1);
          newItems.splice(overIndex, 0, activeItem);
          
          return newItems;
        }
        
        return items;
      });
    }
  };

  const handleItemUpdate = (id: number, field: keyof ScheduleItem, value: any) => {
    setScheduleItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, [field]: value }
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
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      groupTitle: newGroupTitle
    };
    setScheduleItems([...scheduleItems, newItem]);
  };

  const addNewItem = (groupTitle: string) => {
    const newItem = {
      id: Math.max(...scheduleItems.map(item => item.id), 0) + 1,
      title: "New Item",
      status: "in-progress" as const,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
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
      <ScheduleHeader
        onNavigateBack={() => navigate(-1)}
        view={view}
        onViewChange={setView}
        onAddGroup={addNewGroup}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={groupTitles} strategy={verticalListSortingStrategy}>
          {Object.entries(groupedItems).map(([groupTitle, items]) => (
            <SortableGroup
              key={groupTitle}
              groupTitle={groupTitle}
              items={items}
              onGroupTitleChange={handleGroupTitleChange}
              onAddItem={addNewItem}
              handleItemUpdate={handleItemUpdate}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
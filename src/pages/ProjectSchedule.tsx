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
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
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
    
    if (!over) return;

    if (active.data.current?.type === 'group') {
      const oldIndex = groupTitles.indexOf(active.id as string);
      const newIndex = groupTitles.indexOf(over.id as string);
      
      if (oldIndex !== newIndex) {
        const newGroupOrder = arrayMove(groupTitles, oldIndex, newIndex);
        const newItems = [...scheduleItems];
        
        // Update all items to maintain their group associations while reordering groups
        scheduleItems.forEach(item => {
          const itemIndex = newItems.findIndex(i => i.id === item.id);
          if (itemIndex !== -1) {
            const groupIndex = newGroupOrder.indexOf(item.groupTitle);
            newItems.splice(itemIndex, 1);
            newItems.splice(groupIndex * (scheduleItems.length / groupTitles.length) + 
              (itemIndex % (scheduleItems.length / groupTitles.length)), 0, item);
          }
        });
        
        setScheduleItems(newItems);
      }
    } else {
      const oldIndex = scheduleItems.findIndex(item => item.id === active.id);
      const newIndex = scheduleItems.findIndex(item => item.id === over.id);
      
      if (oldIndex !== newIndex) {
        setScheduleItems(items => arrayMove(items, oldIndex, newIndex));
      }
    }
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

  const handleItemUpdate = (id: number, field: keyof ScheduleItem, value: any) => {
    setScheduleItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addNewItem = (groupTitle: string) => {
    const newItem: ScheduleItem = {
      id: Math.max(...scheduleItems.map(item => item.id), 0) + 1,
      title: "New Item",
      status: "in-progress",
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

  const groupTitles = Array.from(new Set(scheduleItems.map(item => item.groupTitle)));

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <ScheduleHeader
        onNavigateBack={() => navigate(-1)}
        view={view}
        onViewChange={setView}
        onAddGroup={addNewItem}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={groupTitles} strategy={verticalListSortingStrategy}>
          {groupTitles.map((groupTitle) => (
            <SortableGroup
              key={groupTitle}
              groupTitle={groupTitle}
              items={groupedItems[groupTitle]}
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
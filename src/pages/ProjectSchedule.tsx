import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Filter, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ScheduleItem {
  id: number;
  title: string;
  status: "stuck" | "done" | "in-progress";
  date: string;
  groupTitle: string;
}

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

      <Card className="p-4">
        {Object.entries(groupedItems).map(([groupTitle, items]) => (
          <div key={groupTitle} className="mb-4 last:mb-0">
            <div className="flex items-center justify-between mb-2">
              <Input
                value={groupTitle}
                onChange={(e) => {
                  const newGroupTitle = e.target.value;
                  setScheduleItems(items =>
                    items.map(item =>
                      item.groupTitle === groupTitle
                        ? { ...item, groupTitle: newGroupTitle }
                        : item
                    )
                  );
                }}
                className="h-8 min-h-8 w-[200px] font-medium"
              />
              <Button 
                onClick={() => addNewItem(groupTitle)} 
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                New Item
              </Button>
            </div>
            <div className="grid grid-cols-[2fr,1fr,1fr] gap-2 mb-1 font-medium text-sm text-gray-600">
              <div>Title</div>
              <div>Status</div>
              <div>Date</div>
            </div>
            <div className="space-y-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[2fr,1fr,1fr] gap-2 py-1 border-b last:border-b-0 text-sm"
                >
                  <Input
                    value={item.title}
                    onChange={(e) => handleItemUpdate(item.id, 'title', e.target.value)}
                    className="h-7 min-h-7"
                  />
                  <Select 
                    value={item.status} 
                    onValueChange={(value) => handleItemUpdate(item.id, 'status', value)}
                  >
                    <SelectTrigger className="h-7">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stuck">Stuck</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    value={item.date}
                    onChange={(e) => handleItemUpdate(item.id, 'date', e.target.value)}
                    className="h-7 min-h-7"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
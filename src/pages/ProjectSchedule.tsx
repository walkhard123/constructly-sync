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
        </div>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-[2fr,1fr,1fr] gap-4 mb-4 font-medium text-sm text-gray-600">
          <div>Group Title</div>
          <div>Status</div>
          <div>Date</div>
        </div>
        <div className="space-y-2">
          {scheduleItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[2fr,1fr,1fr] gap-4 py-3 border-b last:border-b-0 text-sm"
            >
              <div>{item.title}</div>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-white text-xs
                    ${item.status === 'stuck' ? 'bg-red-500' :
                      item.status === 'done' ? 'bg-green-500' :
                        'bg-gray-500'}`}
                >
                  {item.status}
                </span>
              </div>
              <div>{item.date}</div>
            </div>
          ))}
        </div>
      </Card>

      <Button
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 p-0 shadow-lg"
        size="lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Filter, Plus, Search } from "lucide-react";

interface ScheduleHeaderProps {
  onNavigateBack: () => void;
  view: "table" | "board";
  onViewChange: (value: "table" | "board") => void;
  onAddGroup: () => void;
}

export const ScheduleHeader = ({
  onNavigateBack,
  view,
  onViewChange,
  onAddGroup
}: ScheduleHeaderProps) => {
  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onNavigateBack}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Project Timeline</h1>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Select value={view} onValueChange={(value: "table" | "board") => onViewChange(value)}>
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
          <Button onClick={onAddGroup} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            New Group
          </Button>
        </div>
      </div>
    </>
  );
};
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Save } from "lucide-react";
import { TemplateDialog } from "./TemplateDialog";
import { ScheduleItem } from "./types";

interface ScheduleHeaderProps {
  onNavigateBack: () => void;
  onAddGroup: (groupTitle: string) => void;
  scheduleItems: ScheduleItem[];
  onLoadTemplate: (items: ScheduleItem[]) => void;
}

export const ScheduleHeader = ({
  onNavigateBack,
  onAddGroup,
  scheduleItems,
  onLoadTemplate
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
        <h1 className="text-2xl font-bold">Project Schedule</h1>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Button onClick={() => onAddGroup("New Group")} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            New Group
          </Button>
          <TemplateDialog
            scheduleItems={scheduleItems}
            onLoadTemplate={onLoadTemplate}
          />
        </div>
      </div>
    </>
  );
};
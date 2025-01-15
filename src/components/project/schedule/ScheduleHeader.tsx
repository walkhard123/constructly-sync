import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, Save } from "lucide-react";
import { TemplateDialog } from "./TemplateDialog";
import { ScheduleItem } from "./types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [templates, setTemplates] = useState<{ id: number; name: string }[]>([]);
  const { toast } = useToast();

  const loadTemplates = async () => {
    const { data, error } = await supabase
      .from("schedule_templates")
      .select("id, name");
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive",
      });
      return;
    }

    setTemplates(data || []);
  };

  const handleApplyTemplate = async () => {
    if (!selectedTemplate) {
      toast({
        title: "Error",
        description: "Please select a template",
        variant: "destructive",
      });
      return;
    }

    // Load template data
    const { data: groupsData, error: groupsError } = await supabase
      .from("template_groups")
      .select(`
        id,
        title,
        sort_order,
        template_items (
          id,
          title,
          contractor,
          status,
          duration,
          sort_order,
          template_sub_items (
            id,
            title,
            contractor,
            status,
            duration,
            completed
          )
        )
      `)
      .eq("template_id", selectedTemplate)
      .order("sort_order");

    if (groupsError || !groupsData) {
      toast({
        title: "Error",
        description: "Failed to load template",
        variant: "destructive",
      });
      return;
    }

    // Transform data to ScheduleItem format
    const items: ScheduleItem[] = [];
    let itemId = 1;

    groupsData.forEach(group => {
      group.template_items.forEach((item: any) => {
        items.push({
          id: itemId++,
          title: item.title,
          contractor: item.contractor || "",
          status: item.status,
          duration: item.duration,
          groupTitle: group.title,
          subItems: item.template_sub_items.map((subItem: any) => ({
            id: itemId++,
            title: subItem.title,
            contractor: subItem.contractor,
            status: subItem.status,
            duration: subItem.duration,
            completed: subItem.completed
          }))
        });
      });
    });

    onLoadTemplate(items);
    setIsTemplateDialogOpen(false);
    toast({
      title: "Success",
      description: "Template applied successfully",
    });
  };

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
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              loadTemplates();
              setIsTemplateDialogOpen(true);
            }}
          >
            Choose Template
          </Button>
        </div>
      </div>

      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Template</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select
              value={selectedTemplate}
              onValueChange={(value) => setSelectedTemplate(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id.toString()}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyTemplate}>
                Apply Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
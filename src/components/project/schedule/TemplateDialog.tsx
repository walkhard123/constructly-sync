import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ScheduleItem } from "./types";

interface TemplateDialogProps {
  scheduleItems: ScheduleItem[];
  onLoadTemplate: (items: ScheduleItem[]) => void;
}

export const TemplateDialog = ({ scheduleItems, onLoadTemplate }: TemplateDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templates, setTemplates] = useState<{ id: number; name: string }[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [mode, setMode] = useState<"save" | "load">("save");
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

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }

    // Insert template
    const { data: templateData, error: templateError } = await supabase
      .from("schedule_templates")
      .insert([{ name: templateName }])
      .select()
      .single();

    if (templateError || !templateData) {
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive",
      });
      return;
    }

    // Group items by groupTitle
    const groupedItems = scheduleItems.reduce((acc, item) => {
      if (!acc[item.groupTitle]) {
        acc[item.groupTitle] = [];
      }
      acc[item.groupTitle].push(item);
      return acc;
    }, {} as Record<string, ScheduleItem[]>);

    // Save groups and items
    for (const [groupTitle, items] of Object.entries(groupedItems)) {
      // Insert group
      const { data: groupData, error: groupError } = await supabase
        .from("template_groups")
        .insert([{
          template_id: templateData.id,
          title: groupTitle,
          sort_order: Object.keys(groupedItems).indexOf(groupTitle)
        }])
        .select()
        .single();

      if (groupError || !groupData) {
        continue;
      }

      // Insert items
      for (const item of items) {
        const { data: itemData, error: itemError } = await supabase
          .from("template_items")
          .insert([{
            group_id: groupData.id,
            title: item.title,
            contractor: item.contractor,
            status: item.status,
            duration: item.duration,
            sort_order: items.indexOf(item)
          }])
          .select()
          .single();

        if (itemError || !itemData) {
          continue;
        }

        // Insert sub-items
        if (item.subItems?.length) {
          const subItems = item.subItems.map(subItem => ({
            item_id: itemData.id,
            title: subItem.title,
            contractor: subItem.contractor || "",
            status: subItem.status || "in-progress",
            duration: subItem.duration || 0,
            completed: subItem.completed
          }));

          await supabase
            .from("template_sub_items")
            .insert(subItems);
        }
      }
    }

    toast({
      title: "Success",
      description: "Template saved successfully",
    });
    setIsOpen(false);
  };

  const handleLoadTemplate = async () => {
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
    setIsOpen(false);
    toast({
      title: "Success",
      description: "Template loaded successfully",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => {
            setMode("save");
            loadTemplates();
          }}
        >
          <Save className="h-4 w-4" />
          Save as Template
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "save" ? "Save as Template" : "Load Template"}
          </DialogTitle>
        </DialogHeader>
        {mode === "save" ? (
          <div className="space-y-4">
            <Input
              placeholder="Enter template name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTemplate}>Save</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setSelectedTemplate(Number(e.target.value))}
              value={selectedTemplate || ""}
            >
              <option value="">Select a template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleLoadTemplate}>Load</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
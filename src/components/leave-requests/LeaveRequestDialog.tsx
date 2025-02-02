import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LeaveRequestFormFields } from "./dialog/LeaveRequestFormFields";
import { SupportingDocuments } from "./dialog/SupportingDocuments";

interface LeaveRequestDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    type: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    description: string;
    employee: string;
    file?: File;
  }) => void;
}

export const LeaveRequestDialog = ({ isOpen, onOpenChange, onSubmit }: LeaveRequestDialogProps) => {
  const [formData, setFormData] = React.useState({
    type: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    startTime: "",
    endTime: "",
    description: "",
    employee: "",
    file: undefined as File | undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) return;
    onSubmit(formData as any);
  };

  const handleFormDataChange = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>New Leave Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <LeaveRequestFormFields
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
          <SupportingDocuments
            onFileChange={(file) => handleFormDataChange({ file })}
          />
          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground">
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
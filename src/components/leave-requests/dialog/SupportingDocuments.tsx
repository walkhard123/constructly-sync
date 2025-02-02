import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SupportingDocumentsProps {
  onFileChange: (file?: File) => void;
}

export const SupportingDocuments = ({ onFileChange }: SupportingDocumentsProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileChange(file);
  };

  return (
    <div className="space-y-2">
      <Label>Supporting Documents</Label>
      <Input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        className="w-full"
      />
      <p className="text-sm text-muted-foreground mt-1">
        Upload supporting documents (e.g., medical certificates)
      </p>
    </div>
  );
};
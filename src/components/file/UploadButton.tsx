import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UploadButtonProps {
  onFilesSelected: (files: File[]) => void;
}

export const UploadButton = ({ onFilesSelected }: UploadButtonProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      onFilesSelected(filesArray);
      toast({
        title: "Files uploaded successfully",
        description: `${selectedFiles.length} file(s) have been uploaded.`,
      });
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      <Button 
        className="bg-purple-600 hover:bg-purple-700"
        onClick={handleUploadClick}
      >
        <Upload className="mr-2 h-4 w-4" /> Upload Files
      </Button>
    </>
  );
};
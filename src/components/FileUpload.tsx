import { useState } from "react";
import { SearchBar } from "./file/SearchBar";
import { UploadButton } from "./file/UploadButton";
import { FileList } from "./file/FileList";

interface FileItem {
  id: number;
  name: string;
  size: string;
  date: string;
  type: string;
  uploadedBy: string;
  category: string;
  downloads: number;
}

export const FileUpload = () => {
  const [files, setFiles] = useState<FileItem[]>([
    { 
      id: 1,
      name: "Site Plans.pdf", 
      size: "2.5 MB", 
      date: "2024-03-20",
      type: "PDF",
      uploadedBy: "John Smith",
      category: "Documentation",
      downloads: 12
    },
    { 
      id: 2,
      name: "Safety Protocol.docx", 
      size: "1.2 MB", 
      date: "2024-03-19",
      type: "DOCX",
      uploadedBy: "Sarah Johnson",
      category: "Safety",
      downloads: 8
    },
    { 
      id: 3,
      name: "Budget Report.xlsx", 
      size: "3.8 MB", 
      date: "2024-03-18",
      type: "XLSX",
      uploadedBy: "Mike Williams",
      category: "Financial",
      downloads: 15
    }
  ]);

  const handleFilesSelected = (selectedFiles: File[]) => {
    const newFiles = selectedFiles.map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
      type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
      uploadedBy: "Current User",
      category: "New Upload",
      downloads: 0
    }));

    setFiles([...newFiles, ...files]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <SearchBar />
        <UploadButton onFilesSelected={handleFilesSelected} />
      </div>
      <FileList files={files} />
    </div>
  );
};
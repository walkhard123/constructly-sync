import { useState } from "react";
import { SearchBar } from "./file/SearchBar";
import { UploadButton } from "./file/UploadButton";
import { FileList } from "./file/FileList";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  id: number;
  name: string;
  size: string;
  date: string;
  type: string;
  uploadedBy: string;
  category: string;
  downloads: number;
  folderId?: number | null;
}

interface Folder {
  id: number;
  name: string;
}

export const FileUpload = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileItem[]>([
    { 
      id: 1,
      name: "Site Plans.pdf", 
      size: "2.5 MB", 
      date: "2024-03-20",
      type: "PDF",
      uploadedBy: "John Smith",
      category: "Documentation",
      downloads: 12,
      folderId: null
    },
    { 
      id: 2,
      name: "Safety Protocol.docx", 
      size: "1.2 MB", 
      date: "2024-03-19",
      type: "DOCX",
      uploadedBy: "Sarah Johnson",
      category: "Safety",
      downloads: 8,
      folderId: null
    },
    { 
      id: 3,
      name: "Budget Report.xlsx", 
      size: "3.8 MB", 
      date: "2024-03-18",
      type: "XLSX",
      uploadedBy: "Mike Williams",
      category: "Financial",
      downloads: 15,
      folderId: null
    }
  ]);

  const [folders, setFolders] = useState<Folder[]>([]);

  const handleFilesSelected = (selectedFiles: File[]) => {
    const newFiles = selectedFiles.map((file, index) => ({
      id: files.length + index + 1,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
      type: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
      uploadedBy: "Current User",
      category: "New Upload",
      downloads: 0,
      folderId: null
    }));

    setFiles([...newFiles, ...files]);
  };

  const handleDeleteFile = (fileId: number) => {
    setFiles(files.filter(file => file.id !== fileId));
    toast({
      title: "File deleted",
      description: "The file has been successfully deleted.",
    });
  };

  const handleDownloadFile = (file: FileItem) => {
    // In a real application, this would trigger a file download
    // For demo purposes, we'll just increment the download counter
    setFiles(files.map(f => 
      f.id === file.id 
        ? { ...f, downloads: f.downloads + 1 }
        : f
    ));
    toast({
      title: "File download started",
      description: `Downloading ${file.name}...`,
    });
  };

  const handleCreateFolder = (folderName: string) => {
    const newFolder = {
      id: folders.length + 1,
      name: folderName
    };
    setFolders([...folders, newFolder]);
    toast({
      title: "Folder created",
      description: `Folder "${folderName}" has been created.`,
    });
  };

  const handleMoveToFolder = (fileId: number, folderId: number | null) => {
    setFiles(files.map(file => 
      file.id === fileId 
        ? { ...file, folderId }
        : file
    ));
    toast({
      title: "File moved",
      description: "File has been moved to the selected folder.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <SearchBar />
        <UploadButton onFilesSelected={handleFilesSelected} />
      </div>
      <FileList 
        files={files}
        folders={folders}
        onDeleteFile={handleDeleteFile}
        onDownloadFile={handleDownloadFile}
        onCreateFolder={handleCreateFolder}
        onMoveToFolder={handleMoveToFolder}
      />
    </div>
  );
};
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

export const useFileManagement = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  const handleFilesSelected = async (selectedFiles: File[]) => {
    for (const file of selectedFiles) {
      try {
        const fileExt = file.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('project-files')
          .getPublicUrl(filePath);

        const newFile: FileItem = {
          id: files.length + 1,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          date: new Date().toISOString().split('T')[0],
          type: file.type,
          uploadedBy: "Current User",
          category: "New Upload",
          downloads: 0,
          folderId: null
        };

        setFiles(prev => [...prev, newFile]);

        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}. Please try again.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteFile = async (fileId: number) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    try {
      const { error } = await supabase.storage
        .from('project-files')
        .remove([file.name]);

      if (error) throw error;

      setFiles(files.filter(f => f.id !== fileId));
      toast({
        title: "File deleted",
        description: "The file has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadFile = async (file: FileItem) => {
    try {
      const { data, error } = await supabase.storage
        .from('project-files')
        .download(file.name);

      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setFiles(files.map(f => 
        f.id === file.id 
          ? { ...f, downloads: f.downloads + 1 }
          : f
      ));

      toast({
        title: "File download started",
        description: `Downloading ${file.name}...`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download failed",
        description: "Failed to download the file. Please try again.",
        variant: "destructive",
      });
    }
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

  return {
    files,
    folders,
    handleFilesSelected,
    handleDeleteFile,
    handleDownloadFile,
    handleCreateFolder,
    handleMoveToFolder
  };
};
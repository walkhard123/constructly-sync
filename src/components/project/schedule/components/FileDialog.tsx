import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2, Trash2, Upload, FileText, FileImage, FileVideo, FileAudio, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

interface FileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  itemId?: number;
  subItemId?: number;
  files: Array<{
    id: number;
    filename: string;
    file_path: string;
    content_type?: string;
  }>;
  onFileUpload: () => void;
}

export const FileDialog = ({ isOpen, onClose, itemId, subItemId, files, onFileUpload }: FileDialogProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadPreviews = async () => {
      const newPreviews: Record<string, string> = {};
      for (const file of files) {
        if (file.content_type?.startsWith('image/')) {
          const { data } = await supabase.storage
            .from('project-files')
            .getPublicUrl(file.file_path);
          newPreviews[file.id] = data.publicUrl;
        }
      }
      setPreviews(newPreviews);
    };
    loadPreviews();
  }, [files]);

  const getFileIcon = (contentType?: string) => {
    if (!contentType) return <File className="w-8 h-8" />;
    if (contentType.startsWith('image/')) return <FileImage className="w-8 h-8" />;
    if (contentType.startsWith('video/')) return <FileVideo className="w-8 h-8" />;
    if (contentType.startsWith('audio/')) return <FileAudio className="w-8 h-8" />;
    return <FileText className="w-8 h-8" />;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('schedule_files')
        .insert({
          item_id: itemId,
          sub_item_id: subItemId,
          filename: file.name,
          file_path: filePath,
          content_type: file.type,
          size: file.size
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      onFileUpload();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (filePath: string, filename: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('project-files')
        .download(filePath);

      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Success",
        description: "File downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (filePath: string) => {
    try {
      const { data } = await supabase.storage
        .from('project-files')
        .getPublicUrl(filePath);

      await navigator.clipboard.writeText(data.publicUrl);
      toast({
        title: "Success",
        description: "File link copied to clipboard",
      });
    } catch (error) {
      console.error('Error sharing file:', error);
      toast({
        title: "Error",
        description: "Failed to share file",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (fileId: number, filePath: string) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('project-files')
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('schedule_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      onFileUpload();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>File Management</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={isUploading}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative group border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col items-center gap-2">
                  {previews[file.id] ? (
                    <img
                      src={previews[file.id]}
                      alt={file.filename}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    getFileIcon(file.content_type)
                  )}
                  <span className="text-xs text-center truncate w-full">
                    {file.filename}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(file.file_path)}
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(file.file_path, file.filename)}
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(file.id, file.file_path)}
                    className="text-red-500 hover:text-red-600 hover:bg-white/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
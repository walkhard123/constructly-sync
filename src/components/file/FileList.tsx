import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, Eye, FolderPlus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface FileListProps {
  files: FileItem[];
  folders: Folder[];
  onDeleteFile: (fileId: number) => void;
  onDownloadFile: (file: FileItem) => void;
  onCreateFolder: (folderName: string) => void;
  onMoveToFolder: (fileId: number, folderId: number | null) => void;
}

export const FileList = ({ 
  files, 
  folders, 
  onDeleteFile, 
  onDownloadFile, 
  onCreateFolder,
  onMoveToFolder 
}: FileListProps) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName("");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Document Repository</CardTitle>
          <CardDescription>Manage and organize project files</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FolderPlus className="w-4 h-4 mr-2" />
              New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2">
              <Input
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <Button onClick={handleCreateFolder}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {file.category} • Uploaded by {file.uploadedBy}
                  </p>
                </div>
              </div>
              <div className="text-right mr-4">
                <p className="text-sm font-medium">{file.size}</p>
                <p className="text-sm text-gray-500">
                  {new Date(file.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right mr-4">
                <p className="text-sm font-medium">{file.downloads} downloads</p>
                <p className="text-sm text-gray-500">{file.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <Select onValueChange={(value) => onMoveToFolder(file.id, value === "none" ? null : Number(value))}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Move to folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No folder</SelectItem>
                    {folders.map((folder) => (
                      <SelectItem key={folder.id} value={folder.id.toString()}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onDownloadFile(file)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 hover:text-red-600"
                    onClick={() => onDeleteFile(file.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
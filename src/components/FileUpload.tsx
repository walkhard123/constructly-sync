import { SearchBar } from "./file/SearchBar";
import { UploadButton } from "./file/UploadButton";
import { FileList } from "./file/FileList";
import { useFileManagement } from "@/hooks/useFileManagement";

export const FileUpload = () => {
  const {
    files,
    folders,
    handleFilesSelected,
    handleDeleteFile,
    handleDownloadFile,
    handleCreateFolder,
    handleMoveToFolder
  } = useFileManagement();

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PhotoUploadProps {
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  photos?: string[];
}

export const PhotoUpload = ({ onPhotoUpload, photos }: PhotoUploadProps) => {
  return (
    <div>
      <Label>Upload Photos</Label>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={onPhotoUpload}
        className="mt-1"
      />
      {photos && photos.length > 0 && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Upload preview ${index + 1}`}
              className="w-full h-24 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
};
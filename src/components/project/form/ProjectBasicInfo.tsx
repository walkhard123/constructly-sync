import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ProjectBasicInfoProps {
  name: string;
  address: string;
  onNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export const ProjectBasicInfo = ({
  name,
  address,
  onNameChange,
  onAddressChange,
}: ProjectBasicInfoProps) => {
  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-1">
            Project Name
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
            className="border-gray-300"
            placeholder="Enter project name"
          />
        </div>
        
        <div className="space-y-2 mt-6">
          <Label htmlFor="address" className="flex items-center gap-1">
            Project Address
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            required
            className="border-gray-300"
            placeholder="Enter project address"
          />
        </div>
      </div>
    </>
  );
};
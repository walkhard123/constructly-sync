import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="border-gray-300"
            placeholder="Enter project name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Project Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            className="border-gray-300"
            placeholder="Enter project address"
          />
        </div>
      </div>
    </>
  );
};
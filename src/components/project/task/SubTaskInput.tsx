import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface SubTaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export const SubTaskInput = ({ value, onChange, onAdd }: SubTaskInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleAdd = () => {
    if (value.trim()) {
      onAdd();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      e.preventDefault(); // Prevent form submission on iOS
      onAdd();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full px-2 py-1">
      <Input
        placeholder="Add subtask..."
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="flex-1 min-w-0 text-base"
        style={{
          WebkitAppearance: 'none', // Remove iOS input styling
          borderRadius: '0.375rem' // Maintain rounded corners
        }}
      />
      <Button 
        size="sm" 
        onClick={handleAdd}
        className="touch-manipulation" // Improve touch response
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};
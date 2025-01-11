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

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Add subtask..."
        value={value}
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && value.trim()) {
            onAdd();
          }
        }}
        className="max-w-md"
      />
      <Button size="sm" onClick={handleAdd}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};
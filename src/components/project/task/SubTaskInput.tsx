import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface SubTaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export const SubTaskInput = ({ value, onChange, onAdd }: SubTaskInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Add subtask..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onAdd();
          }
        }}
        className="max-w-md"
      />
      <Button size="sm" onClick={onAdd}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};
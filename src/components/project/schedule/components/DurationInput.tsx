import { Input } from "@/components/ui/input";

interface DurationInputProps {
  duration: number | undefined;
  onDurationChange: (duration: number) => void;
  disabled?: boolean;
}

export const DurationInput = ({ duration, onDurationChange, disabled }: DurationInputProps) => {
  return (
    <Input
      type="number"
      value={duration || ''}
      onChange={(e) => onDurationChange(parseInt(e.target.value) || 0)}
      className="h-8"
      placeholder="Days"
      disabled={disabled}
    />
  );
};
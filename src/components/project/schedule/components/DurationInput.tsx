import { Input } from "@/components/ui/input";

interface DurationInputProps {
  duration: number | undefined;
  onDurationChange: (duration: number) => void;
}

export const DurationInput = ({ duration, onDurationChange }: DurationInputProps) => {
  return (
    <Input
      type="number"
      value={duration || ''}
      onChange={(e) => onDurationChange(parseInt(e.target.value) || 0)}
      className="h-8"
      placeholder="Days"
    />
  );
};
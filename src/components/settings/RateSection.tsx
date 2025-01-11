import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function RateSection() {
  const [rating, setRating] = useState<number | null>(null);

  const handleRate = (value: number) => {
    setRating(value);
    toast.success("Thank you for rating our app!");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Enjoying the app? Rate your experience!
      </p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            variant={rating === value ? "default" : "ghost"}
            size="sm"
            onClick={() => handleRate(value)}
            className="p-2"
          >
            <Star
              className={`h-6 w-6 ${
                rating && value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
              }`}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
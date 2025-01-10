import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface TimeDisplayProps {
  currentTime: Date;
  isClockingIn: boolean;
  onClockInOut: () => void;
}

export const TimeDisplay = ({ currentTime, isClockingIn, onClockInOut }: TimeDisplayProps) => {
  return (
    <Card className="bg-purple-50">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-purple-900">
              {currentTime.toLocaleTimeString()}
            </h3>
            <p className="text-purple-600">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={onClockInOut}
          >
            <Clock className="mr-2 h-4 w-4" />
            {isClockingIn ? 'Clock In' : 'Clock Out'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
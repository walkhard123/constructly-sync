import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Building2 } from "lucide-react";

interface ActivityEntryProps {
  entry: {
    name: string;
    status: string;
    time: string;
    department: string;
    duration: string;
    location: string;
    project: string;
  };
}

export const ActivityEntry = ({ entry }: ActivityEntryProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{entry.name}</h3>
            <p className="text-sm text-gray-500">{entry.department}</p>
          </div>
          <div className="text-right">
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
              entry.status === "Clocked In" 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {entry.status}
            </span>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{entry.time} ({entry.duration})</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{entry.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>{entry.project}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
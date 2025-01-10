import { CheckCircle, XCircle } from "lucide-react";

interface ActivityEntryProps {
  entry: {
    id: number;
    name: string;
    status: string;
    time: string;
    department: string;
    duration: string;
    location: string;
  };
}

export const ActivityEntry = ({ entry }: ActivityEntryProps) => {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          entry.status === "Clocked In" ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {entry.status === "Clocked In" ? 
            <CheckCircle className="w-5 h-5" /> : 
            <XCircle className="w-5 h-5" />
          }
        </div>
        <div>
          <p className="font-medium">{entry.name}</p>
          <p className="text-sm text-gray-500">{entry.department}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${
          entry.status === "Clocked In" ? 'text-green-600' : 'text-red-600'
        }`}>
          {entry.status}
        </p>
        <p className="text-sm text-gray-500">{entry.time}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{entry.duration}</p>
        <p className="text-sm text-gray-500">{entry.location}</p>
      </div>
    </div>
  );
};
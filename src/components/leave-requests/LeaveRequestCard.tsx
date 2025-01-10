import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaveRequestCardProps {
  request: {
    id: number;
    type: string;
    startDate: string;
    endDate: string;
    status: string;
    reason: string;
    employee: string;
  };
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export const LeaveRequestCard = ({ request, onApprove, onReject }: LeaveRequestCardProps) => {
  return (
    <Card key={request.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{request.type}</CardTitle>
            <CardDescription>{request.employee}</CardDescription>
          </div>
          <div className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium",
            request.status === "approved" ? "bg-green-100 text-green-800" :
            request.status === "rejected" ? "bg-red-100 text-red-800" :
            "bg-yellow-100 text-yellow-800"
          )}>
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{request.startDate} - {request.endDate}</span>
          </div>
          <div>
            <h4 className="font-medium mb-2">Reason</h4>
            <p className="text-sm text-gray-600">{request.reason}</p>
          </div>
          {request.status === "pending" && (
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="w-full hover:bg-green-50 hover:text-green-600"
                onClick={() => onApprove(request.id)}
              >
                Approve
              </Button>
              <Button 
                variant="outline" 
                className="w-full hover:bg-red-50 hover:text-red-600"
                onClick={() => onReject(request.id)}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
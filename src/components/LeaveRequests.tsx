import { useState } from "react";
import { LeaveRequestCard } from "./leave-requests/LeaveRequestCard";
import { LeaveRequestHeader } from "./leave-requests/LeaveRequestHeader";
import { LeaveRequestDialog } from "./leave-requests/LeaveRequestDialog";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { format } from "date-fns";

export const LeaveRequests = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    requests,
    isLoading,
    handleAddRequest,
    handleApprove,
    handleReject
  } = useLeaveRequests();

  const handleSubmitRequest = (data: {
    type: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    description: string;
    employee: string;
    file?: File;
  }) => {
    const formattedRequest = {
      type: data.type,
      startDate: format(data.startDate, 'yyyy-MM-dd'),
      endDate: format(data.endDate, 'yyyy-MM-dd'),
      startTime: data.startTime,
      endTime: data.endTime,
      reason: data.description,
      employee: data.employee,
      file: data.file
    };

    handleAddRequest(formattedRequest);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <LeaveRequestHeader onOpenDialog={() => setIsDialogOpen(true)} />
      
      <LeaveRequestDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmitRequest}
      />

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading leave requests...</div>
        ) : requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No leave requests found</div>
        ) : (
          requests.map((request) => (
            <LeaveRequestCard
              key={request.id}
              request={request}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  );
};
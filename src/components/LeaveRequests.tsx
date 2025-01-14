import { useState } from "react";
import { LeaveRequestDialog } from "./leave-requests/LeaveRequestDialog";
import { LeaveRequestCard } from "./leave-requests/LeaveRequestCard";
import { LeaveRequestHeader } from "./leave-requests/LeaveRequestHeader";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { format } from "date-fns";

export const LeaveRequests = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    startTime: "",
    reason: "",
    employee: ""
  });

  const {
    requests,
    handleAddRequest,
    handleApprove,
    handleReject
  } = useLeaveRequests();

  const teamMembers = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Mike Williams" }
  ];

  const handleCancel = () => {
    setNewRequest({
      type: "",
      startDate: undefined,
      endDate: undefined,
      startTime: "",
      reason: "",
      employee: ""
    });
    setIsDialogOpen(false);
  };

  const handleSubmitRequest = () => {
    if (!newRequest.startDate) return;
    
    const formattedRequest = {
      type: newRequest.type,
      startDate: format(newRequest.startDate, 'yyyy-MM-dd'),
      endDate: newRequest.endDate ? format(newRequest.endDate, 'yyyy-MM-dd') : format(newRequest.startDate, 'yyyy-MM-dd'),
      startTime: newRequest.startTime,
      reason: newRequest.reason,
      employee: newRequest.employee
    };

    handleAddRequest(formattedRequest);
    handleCancel();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <LeaveRequestHeader onOpenDialog={() => setIsDialogOpen(true)} />
      
      <LeaveRequestDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        newRequest={newRequest}
        setNewRequest={setNewRequest}
        handleAddRequest={handleSubmitRequest}
        handleCancel={handleCancel}
        teamMembers={teamMembers}
      />

      <div className="space-y-4">
        {requests.map((request) => (
          <LeaveRequestCard
            key={request.id}
            request={request}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
};
import { useState } from "react";
import { LeaveRequestDialog } from "./leave-requests/LeaveRequestDialog";
import { LeaveRequestCard } from "./leave-requests/LeaveRequestCard";
import { LeaveRequestHeader } from "./leave-requests/LeaveRequestHeader";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";

export const LeaveRequests = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: "",
    startDate: "",
    endDate: "",
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
      startDate: "",
      endDate: "",
      reason: "",
      employee: ""
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <LeaveRequestHeader onOpenDialog={() => setIsDialogOpen(true)} />
      
      <LeaveRequestDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        newRequest={newRequest}
        setNewRequest={setNewRequest}
        handleAddRequest={() => {
          handleAddRequest(newRequest);
          handleCancel();
        }}
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
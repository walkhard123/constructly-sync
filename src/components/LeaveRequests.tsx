import { LeaveRequestCard } from "./leave-requests/LeaveRequestCard";
import { LeaveRequestHeader } from "./leave-requests/LeaveRequestHeader";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";

export const LeaveRequests = () => {
  const {
    requests,
    handleApprove,
    handleReject
  } = useLeaveRequests();

  return (
    <div className="space-y-6 animate-fade-in">
      <LeaveRequestHeader />
      
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
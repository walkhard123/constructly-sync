import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface LeaveRequest {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  startTime: string;
  status: string;
  reason: string;
  employee: string;
}

export const useLeaveRequests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      type: "Annual Leave",
      startDate: "2024-04-01",
      endDate: "2024-04-01",
      startTime: "09:00",
      status: "pending",
      reason: "Family vacation",
      employee: "John Smith"
    }
  ]);

  const handleAddRequest = (newRequest: Omit<LeaveRequest, "id" | "status">) => {
    if (!newRequest.type || !newRequest.startDate || !newRequest.startTime || !newRequest.employee) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setRequests([...requests, {
      id: requests.length + 1,
      ...newRequest,
      status: "pending"
    }]);

    toast({
      title: "Success",
      description: "Leave request submitted successfully.",
    });
  };

  const handleApprove = (requestId: number) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: "approved" }
        : request
    ));
    toast({
      title: "Leave Request Approved",
      description: "The leave request has been approved successfully.",
    });
  };

  const handleReject = (requestId: number) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: "rejected" }
        : request
    ));
    toast({
      title: "Leave Request Rejected",
      description: "The leave request has been rejected.",
      variant: "destructive",
    });
  };

  return {
    requests,
    handleAddRequest,
    handleApprove,
    handleReject
  };
};
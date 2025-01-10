import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LeaveRequestDialog } from "./leave-requests/LeaveRequestDialog";
import { LeaveRequestCard } from "./leave-requests/LeaveRequestCard";
import { LeaveRequestHeader } from "./leave-requests/LeaveRequestHeader";

export const LeaveRequests = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "Annual Leave",
      startDate: "2024-04-01",
      endDate: "2024-04-05",
      status: "pending",
      reason: "Family vacation",
      employee: "John Smith"
    }
  ]);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [newRequest, setNewRequest] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
    employee: ""
  });

  const teamMembers = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Mike Williams" }
  ];

  const handleAddRequest = () => {
    if (!newRequest.type || !startDate || !endDate || !newRequest.employee) {
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
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      status: "pending"
    }]);

    handleCancel();
    toast({
      title: "Success",
      description: "Leave request submitted successfully.",
    });
  };

  const handleCancel = () => {
    setNewRequest({
      type: "",
      startDate: "",
      endDate: "",
      reason: "",
      employee: ""
    });
    setStartDate(undefined);
    setEndDate(undefined);
    setIsDialogOpen(false);
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

  return (
    <div className="space-y-6 animate-fade-in">
      <LeaveRequestHeader onOpenDialog={() => setIsDialogOpen(true)} />
      
      <LeaveRequestDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        newRequest={newRequest}
        setNewRequest={setNewRequest}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleAddRequest={handleAddRequest}
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
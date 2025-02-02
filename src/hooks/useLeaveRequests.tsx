import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LeaveRequest {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: string;
  reason: string;
  employee: string;
  file?: File;
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
      endTime: "17:00",
      status: "pending",
      reason: "Family vacation",
      employee: "John Smith"
    }
  ]);

  const handleAddRequest = async (newRequest: Omit<LeaveRequest, "id" | "status">) => {
    if (!newRequest.type || !newRequest.startDate || !newRequest.startTime || !newRequest.employee) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get the current user's session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.user?.id) {
        throw new Error('User must be logged in to submit a leave request');
      }

      let filePath = null;
      
      // Handle file upload if a file is provided
      if (newRequest.file) {
        const fileExt = newRequest.file.name.split('.').pop();
        filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(filePath, newRequest.file);

        if (uploadError) throw uploadError;
      }

      // Insert the leave request into the database
      const { data, error } = await supabase
        .from('leave_requests')
        .insert([
          {
            type: newRequest.type,
            start_date: newRequest.startDate,
            end_date: newRequest.endDate,
            start_time: newRequest.startTime,
            end_time: newRequest.endTime,
            reason: newRequest.reason,
            file_path: filePath,
            status: 'pending',
            user_id: session.user.id  // Add the user_id from the session
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Update local state with the new request
      setRequests([...requests, {
        id: data.id,
        ...newRequest,
        status: "pending"
      }]);

      toast({
        title: "Success",
        description: "Leave request submitted successfully.",
      });
    } catch (error) {
      console.error('Error submitting leave request:', error);
      toast({
        title: "Error",
        description: "Failed to submit leave request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleApprove = (requestId: number) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: "approved" }
        : request
    ));
    toast({
      title: "Success",
      description: "Leave request approved successfully.",
    });
  };

  const handleReject = (requestId: number) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: "rejected" }
        : request
    ));
    toast({
      title: "Request Rejected",
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
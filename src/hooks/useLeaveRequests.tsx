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
  const { toast } = useToast();

  const handleAddRequest = async (newRequest: Omit<LeaveRequest, "id" | "status">) => {
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
            user_id: session.user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Update local state with the new request
      setRequests([...requests, {
        id: data.id,
        type: data.type,
        startDate: data.start_date,
        endDate: data.end_date,
        startTime: data.start_time,
        endTime: data.end_time,
        status: data.status,
        reason: data.reason,
        employee: newRequest.employee
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

  const handleApprove = async (requestId: number) => {
    try {
      const { error } = await supabase
        .from('leave_requests')
        .update({ status: 'approved' })
        .eq('id', requestId);

      if (error) throw error;

      setRequests(requests.map(request => 
        request.id === requestId 
          ? { ...request, status: "approved" }
          : request
      ));

      toast({
        title: "Success",
        description: "Leave request approved successfully.",
      });
    } catch (error) {
      console.error('Error approving leave request:', error);
      toast({
        title: "Error",
        description: "Failed to approve leave request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      const { error } = await supabase
        .from('leave_requests')
        .update({ status: 'rejected' })
        .eq('id', requestId);

      if (error) throw error;

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
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      toast({
        title: "Error",
        description: "Failed to reject leave request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    requests,
    handleAddRequest,
    handleApprove,
    handleReject
  };
};
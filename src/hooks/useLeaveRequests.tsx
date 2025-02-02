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
  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  const handleAddRequest = async (newRequest: Omit<LeaveRequest, "id" | "status">) => {
    try {
      let filePath = null;
      
      // If there's a file, upload it to Supabase storage
      if (newRequest.file) {
        const fileExt = newRequest.file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('project-files')
          .upload(fileName, newRequest.file);

        if (uploadError) throw uploadError;
        filePath = data?.path;
      }

      // Get the current user's ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Insert the leave request into the database
      const { data, error } = await supabase
        .from('leave_requests')
        .insert({
          user_id: user.id,
          type: newRequest.type,
          start_date: newRequest.startDate,
          end_date: newRequest.endDate,
          start_time: newRequest.startTime,
          end_time: newRequest.endTime,
          reason: newRequest.reason,
          file_path: filePath
        })
        .select()
        .single();

      if (error) throw error;

      // Add the new request to the local state
      setRequests([...requests, {
        id: data.id,
        ...newRequest,
        status: 'pending'
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
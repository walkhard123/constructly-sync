import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TeamMemberSelect } from "./dialog/TeamMemberSelect";
import { LeaveTypeSelect } from "./dialog/LeaveTypeSelect";
import { DateRangeSelect } from "./dialog/DateRangeSelect";

interface LeaveRequestDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newRequest: {
    type: string;
    reason: string;
    employee: string;
  };
  setNewRequest: (request: any) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  handleAddRequest: () => void;
  handleCancel: () => void;
  teamMembers: { id: number; name: string; }[];
}

export const LeaveRequestDialog = ({
  isOpen,
  onOpenChange,
  newRequest,
  setNewRequest,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleAddRequest,
  handleCancel,
  teamMembers,
}: LeaveRequestDialogProps) => {
  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(undefined);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && startDate && date >= startDate) {
      setEndDate(date);
    } else if (!startDate) {
      setEndDate(date);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Leave Request</DialogTitle>
          <DialogDescription>
            Request time off by filling out this form
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <TeamMemberSelect
            value={newRequest.employee}
            onChange={(value) => setNewRequest({...newRequest, employee: value})}
            teamMembers={teamMembers}
          />
          <LeaveTypeSelect
            value={newRequest.type}
            onChange={(value) => setNewRequest({...newRequest, type: value})}
          />
          <DateRangeSelect
            startDate={startDate}
            endDate={endDate}
            onStartDateSelect={handleStartDateSelect}
            onEndDateSelect={handleEndDateSelect}
          />
          <div>
            <Label>Reason</Label>
            <Textarea
              value={newRequest.reason}
              onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
              placeholder="Provide a reason for your leave request..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleAddRequest}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
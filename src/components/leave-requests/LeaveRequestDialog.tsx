import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TeamMemberSelect } from "./dialog/TeamMemberSelect";
import { LeaveTypeSelect } from "./dialog/LeaveTypeSelect";

interface LeaveRequestDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newRequest: {
    type: string;
    reason: string;
    employee: string;
  };
  setNewRequest: (request: any) => void;
  handleAddRequest: () => void;
  handleCancel: () => void;
  teamMembers: { id: number; name: string; }[];
}

export const LeaveRequestDialog = ({
  isOpen,
  onOpenChange,
  newRequest,
  setNewRequest,
  handleAddRequest,
  handleCancel,
  teamMembers,
}: LeaveRequestDialogProps) => {
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
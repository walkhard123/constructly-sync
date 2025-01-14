import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TeamMemberSelect } from "./dialog/TeamMemberSelect";
import { LeaveTypeSelect } from "./dialog/LeaveTypeSelect";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LeaveRequestDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newRequest: {
    type: string;
    reason: string;
    employee: string;
    startDate?: Date;
    startTime?: string;
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Submit Leave Request</DialogTitle>
          <DialogDescription>
            Request time off by filling out this form
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <TeamMemberSelect
              value={newRequest.employee}
              onChange={(value) => setNewRequest({...newRequest, employee: value})}
              teamMembers={teamMembers}
            />
            <LeaveTypeSelect
              value={newRequest.type}
              onChange={(value) => setNewRequest({...newRequest, type: value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !newRequest.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newRequest.startDate ? (
                    format(newRequest.startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={newRequest.startDate}
                  onSelect={(date) => setNewRequest({...newRequest, startDate: date})}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Time</Label>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Input
                type="time"
                value={newRequest.startTime || ""}
                onChange={(e) => setNewRequest({...newRequest, startTime: e.target.value})}
                className="flex-1"
              />
            </div>
          </div>

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
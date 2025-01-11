import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  member: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  onMemberChange: (member: Partial<MemberDialogProps['member']>) => void;
  mode: 'add' | 'edit';
}

export const MemberDialog = ({ 
  isOpen, 
  onClose, 
  onSave, 
  member, 
  onMemberChange,
  mode 
}: MemberDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? 'Edit the team member details below.' : 'Fill in the details to add a new team member.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={member.name}
              onChange={(e) => onMemberChange({ name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={member.role}
              onChange={(e) => onMemberChange({ role: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={member.email}
              onChange={(e) => onMemberChange({ email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={member.phone}
              onChange={(e) => onMemberChange({ phone: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {mode === 'edit' ? 'Save Changes' : 'Add Member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
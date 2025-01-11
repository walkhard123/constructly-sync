import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, FileEdit, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";

interface MemberCardProps {
  member: {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    avatar: string;
    projects: number;
    activeHours: number;
    completedTasks: number;
  };
  onEdit: (member: MemberCardProps['member']) => void;
  onDelete: (id: number) => void;
}

export const MemberCard = ({ member, onEdit, onDelete }: MemberCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                {member.avatar}
              </div>
              <div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(member)}
              >
                <FileEdit className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 hover:text-red-600"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-500">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{member.phone}</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500">Active Projects</span>
              <p className="font-medium">{member.projects}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Hours This Month</span>
              <p className="font-medium">{member.activeHours}h</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Completed Tasks</span>
              <p className="font-medium">{member.completedTasks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {member.name}'s account
              and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                onDelete(member.id);
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
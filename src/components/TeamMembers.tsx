import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MemberCard } from "./team/MemberCard";
import { MemberDialog } from "./team/MemberDialog";

export const TeamMembers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<null | {
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
  }>(null);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
  });

  const [members, setMembers] = useState([
    { 
      id: 1, 
      name: "John Smith", 
      role: "Project Manager", 
      projects: 4,
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "JS",
      activeHours: 156,
      completedTasks: 23,
      status: "active"
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      role: "Site Supervisor", 
      projects: 3,
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      avatar: "SJ",
      activeHours: 142,
      completedTasks: 18,
      status: "active"
    },
    { 
      id: 3, 
      name: "Mike Williams", 
      role: "Engineer", 
      projects: 5,
      email: "mike.w@example.com",
      phone: "+1 (555) 345-6789",
      avatar: "MW",
      activeHours: 168,
      completedTasks: 31,
      status: "active"
    }
  ]);

  const handleEditMember = (member: typeof members[0]) => {
    setEditingMember({
      id: member.id,
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
    });
    setNewMember({
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteMember = (memberId: number) => {
    setMembers(members.filter(member => member.id !== memberId));
    toast({
      title: "Success",
      description: "Team member deleted successfully",
    });
  };

  const handleSaveMember = () => {
    if (!newMember.name || !newMember.role || !newMember.email || !newMember.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingMember) {
      setMembers(members.map(member => {
        if (member.id === editingMember.id) {
          return {
            ...member,
            name: newMember.name,
            role: newMember.role,
            email: newMember.email,
            phone: newMember.phone,
            avatar: newMember.name
              .split(' ')
              .map(word => word[0])
              .join('')
              .toUpperCase(),
          };
        }
        return member;
      }));

      toast({
        title: "Success",
        description: "Team member updated successfully",
      });
    } else {
      const avatar = newMember.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

      const newMemberData = {
        id: members.length + 1,
        name: newMember.name,
        role: newMember.role,
        email: newMember.email,
        phone: newMember.phone,
        avatar,
        projects: 0,
        activeHours: 0,
        completedTasks: 0,
        status: "active"
      };

      setMembers([...members, newMemberData]);

      toast({
        title: "Success",
        description: "Team member added successfully",
      });
    }

    setNewMember({
      name: "",
      role: "",
      email: "",
      phone: "",
    });
    setEditingMember(null);
    setIsDialogOpen(false);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex-1">
          <Input 
            placeholder="Search by name..." 
            className="max-w-sm"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => {
            setEditingMember(null);
            setNewMember({
              name: "",
              role: "",
              email: "",
              phone: "",
            });
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <MemberDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingMember(null);
          setNewMember({
            name: "",
            role: "",
            email: "",
            phone: "",
          });
        }}
        onSave={handleSaveMember}
        member={newMember}
        onMemberChange={(changes) => setNewMember({ ...newMember, ...changes })}
        mode={editingMember ? 'edit' : 'add'}
      />

      <div className="grid gap-4">
        {filteredMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        ))}
      </div>
    </div>
  );
};

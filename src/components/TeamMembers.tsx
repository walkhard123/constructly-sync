import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, FileEdit, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
      // Update existing member
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
      // Add new member
      const avatar = newMember.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

      setMembers([
        ...members,
        {
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
        }
      ]);

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
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
            <DialogDescription>
              {editingMember ? 'Edit the team member details below.' : 'Fill in the details to add a new team member.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newMember.phone}
                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsDialogOpen(false);
              setEditingMember(null);
              setNewMember({
                name: "",
                role: "",
                email: "",
                phone: "",
              });
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveMember}>
              {editingMember ? 'Save Changes' : 'Add Member'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
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
                    onClick={() => handleEditMember(member)}
                  >
                    <FileEdit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
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
        ))}
      </div>
    </div>
  );
};
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./project/ProjectHeader";
import { ProjectCard } from "./project/ProjectCard";
import { Project, Task, SubTask } from "./types/project";

export const ProjectManagement = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers] = useState([
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Mike Williams" },
  ]);

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isSubTaskDialogOpen, setIsSubTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTaskForSubtask, setSelectedTaskForSubtask] = useState<number | null>(null);

  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    address: "",
    type: "House",
    description: "",
    startDate: "",
    endDate: "",
    dueDate: "",
    assignedTeam: "",
    status: "Upcoming",
    tasks: []
  });

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    status: "pending",
    subTasks: []
  });

  const [newSubTask, setNewSubTask] = useState<Partial<SubTask>>({
    title: "",
    dueDate: "",
    assignee: "",
    completed: false
  });

  const handleAddProject = () => {
    if (newProject.name && newProject.address && newProject.type && 
        newProject.startDate && newProject.endDate && newProject.dueDate && 
        newProject.assignedTeam) {
      const project: Project = {
        id: projects.length + 1,
        name: newProject.name,
        address: newProject.address,
        type: newProject.type as Project['type'],
        description: newProject.description || "",
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        dueDate: newProject.dueDate,
        assignedTeam: newProject.assignedTeam,
        status: newProject.status as Project['status'],
        tasks: []
      };
      
      setProjects([...projects, project]);
      setIsProjectDialogOpen(false);
      setNewProject({
        name: "",
        address: "",
        type: "House",
        description: "",
        startDate: "",
        endDate: "",
        dueDate: "",
        assignedTeam: "",
        status: "Upcoming",
        tasks: []
      });
      
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const handleAddTask = () => {
    if (selectedProject && newTask.title && newTask.assignee && newTask.dueDate) {
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject) {
          return {
            ...project,
            tasks: [...project.tasks, {
              id: project.tasks.length + 1,
              title: newTask.title || "",
              status: newTask.status || "pending",
              priority: newTask.priority || "medium",
              assignee: newTask.assignee || "",
              dueDate: newTask.dueDate || "",
              subTasks: []
            }]
          };
        }
        return project;
      });
      
      setProjects(updatedProjects);
      setIsTaskDialogOpen(false);
      setNewTask({
        title: "",
        priority: "medium",
        assignee: "",
        dueDate: "",
        status: "pending",
        subTasks: []
      });
      
      toast({
        title: "Success",
        description: "Task added successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const handleAddSubTask = () => {
    if (selectedProject && selectedTaskForSubtask && newSubTask.title && 
        newSubTask.dueDate && newSubTask.assignee) {
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject) {
          return {
            ...project,
            tasks: project.tasks.map(task => {
              if (task.id === selectedTaskForSubtask) {
                return {
                  ...task,
                  subTasks: [...task.subTasks, {
                    id: task.subTasks.length + 1,
                    title: newSubTask.title || "",
                    dueDate: newSubTask.dueDate || "",
                    assignee: newSubTask.assignee || "",
                    completed: false
                  }]
                };
              }
              return task;
            })
          };
        }
        return project;
      });
      
      setProjects(updatedProjects);
      setIsSubTaskDialogOpen(false);
      setNewSubTask({
        title: "",
        dueDate: "",
        assignee: "",
        completed: false
      });
      
      toast({
        title: "Success",
        description: "Subtask added successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  // ... keep existing code (other handler functions)

  return (
    <div className="space-y-6 animate-fade-in">
      <ProjectHeader 
        onOpenTaskDialog={() => {
          if (projects.length === 0) {
            toast({
              title: "Error",
              description: "Please create a project first",
              variant: "destructive",
            });
            return;
          }
          setIsTaskDialogOpen(true);
        }} 
        onOpenProjectDialog={() => setIsProjectDialogOpen(true)}
      />
      
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Fill in the project details below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={newProject.address}
                onChange={(e) => setNewProject({...newProject, address: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select
                value={newProject.type}
                onValueChange={(value) => setNewProject({...newProject, type: value as Project['type']})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Duplex">Duplex</SelectItem>
                  <SelectItem value="Townhouse">Townhouse</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={newProject.endDate}
                onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="assignedTeam">Assigned Team Member *</Label>
              <Select
                value={newProject.assignedTeam}
                onValueChange={(value) => setNewProject({...newProject, assignedTeam: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                value={newProject.status}
                onValueChange={(value) => setNewProject({...newProject, status: value as Project['status']})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProjectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProject}>
              Add Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            <DialogDescription>
              {editingTask ? 'Edit the task details below' : 'Fill in the task details below'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project">Project *</Label>
              <Select
                value={selectedProject?.toString()}
                onValueChange={(value) => setSelectedProject(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value) => setNewTask({...newTask, priority: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assignee">Assignee *</Label>
              <Select
                value={newTask.assignee}
                onValueChange={(value) => setNewTask({...newTask, assignee: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              {editingTask ? 'Update Task' : 'Add Task'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubTaskDialogOpen} onOpenChange={setIsSubTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subtask</DialogTitle>
            <DialogDescription>
              Fill in the subtask details below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Subtask Title *</Label>
              <Input
                id="title"
                value={newSubTask.title}
                onChange={(e) => setNewSubTask({...newSubTask, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={newSubTask.dueDate}
                onChange={(e) => setNewSubTask({...newSubTask, dueDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="assignee">Assignee *</Label>
              <Select
                value={newSubTask.assignee}
                onValueChange={(value) => setNewSubTask({...newSubTask, assignee: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubTask}>
              Add Subtask
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {projects.filter(p => p.status === "Active").map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggleTaskStatus={(taskId) => {
                const updatedProjects = projects.map(p => {
                  if (p.id === project.id) {
                    return {
                      ...p,
                      tasks: p.tasks.map(t => {
                        if (t.id === taskId) {
                          return { ...t, status: t.status === 'completed' ? 'pending' : 'completed' };
                        }
                        return t;
                      })
                    };
                  }
                  return p;
                });
                setProjects(updatedProjects);
              }}
              onEditTask={(taskId) => {
                const task = project.tasks.find(t => t.id === taskId);
                if (task) {
                  setSelectedProject(project.id);
                  setEditingTask(task);
                  setNewTask({
                    title: task.title,
                    priority: task.priority,
                    assignee: task.assignee,
                    dueDate: task.dueDate,
                    status: task.status
                  });
                  setIsTaskDialogOpen(true);
                }
              }}
              onDeleteTask={(taskId) => {
                const updatedProjects = projects.map(p => {
                  if (p.id === project.id) {
                    return {
                      ...p,
                      tasks: p.tasks.filter(t => t.id !== taskId)
                    };
                  }
                  return p;
                });
                setProjects(updatedProjects);
                toast({
                  title: "Success",
                  description: "Task deleted successfully",
                });
              }}
              onAddSubTask={(taskId) => {
                setSelectedProject(project.id);
                setSelectedTaskForSubtask(taskId);
                setIsSubTaskDialogOpen(true);
              }}
              onToggleSubTask={(taskId, subTaskId) => {
                const updatedProjects = projects.map(p => {
                  if (p.id === project.id) {
                    return {
                      ...p,
                      tasks: p.tasks.map(t => {
                        if (t.id === taskId) {
                          return {
                            ...t,
                            subTasks: t.subTasks.map(st => 
                              st.id === subTaskId 
                                ? { ...st, completed: !st.completed }
                                : st
                            )
                          };
                        }
                        return t;
                      })
                    };
                  }
                  return p;
                });
                setProjects(updatedProjects);
              }}
            />
          ))}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {projects.filter(p => p.status === "Completed").map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          {projects.filter(p => p.status === "Upcoming").map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

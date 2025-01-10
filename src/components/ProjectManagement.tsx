import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./project/ProjectHeader";
import { ProjectCard } from "./project/ProjectCard";

interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  subTasks: SubTask[];
}

interface Project {
  id: number;
  name: string;
  phase: string;
  progress: number;
  due: string;
  status: string;
  budget: string;
  risk: string;
  tasks: Task[];
}

export const ProjectManagement = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    { 
      id: 1, 
      name: "Downtown Office Building", 
      phase: "Phase 1", 
      progress: 65, 
      due: "Dec 2024", 
      status: "active", 
      budget: "$2.5M", 
      risk: "medium",
      tasks: [
        { id: 1, title: "Foundation inspection", status: "completed", priority: "high", assignee: "John Doe", dueDate: "2024-03-20", subTasks: [] },
        { id: 2, title: "Electrical wiring", status: "in-progress", priority: "medium", assignee: "Jane Smith", dueDate: "2024-04-15", subTasks: [] }
      ]
    },
    { 
      id: 2, 
      name: "Residential Complex", 
      phase: "Phase 2", 
      progress: 30, 
      due: "Mar 2025", 
      status: "active", 
      budget: "$4.1M", 
      risk: "low",
      tasks: [
        { id: 1, title: "Site preparation", status: "in-progress", priority: "high", assignee: "Mike Johnson", dueDate: "2024-03-25", subTasks: [] }
      ]
    },
    { 
      id: 3, 
      name: "Shopping Mall Renovation", 
      phase: "Phase 1", 
      progress: 85, 
      due: "Nov 2024", 
      status: "active", 
      budget: "$1.8M", 
      risk: "high",
      tasks: []
    },
  ]);

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    status: "pending",
    subTasks: []
  });

  const handleAddTask = () => {
    if (selectedProject && newTask.title && newTask.assignee && newTask.dueDate) {
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject) {
          return {
            ...project,
            tasks: [...project.tasks, {
              id: project.tasks.length + 1,
              ...newTask
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
    }
  };

  const handleToggleTaskStatus = (projectId: number, taskId: number) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              const newStatus = task.status === 'completed' ? 'pending' : 'completed';
              return { ...task, status: newStatus };
            }
            return task;
          })
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    toast({
      title: "Success",
      description: "Task status updated",
    });
  };

  const handleDeleteTask = (projectId: number, taskId: number) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId)
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    toast({
      title: "Success",
      description: "Task deleted successfully",
    });
  };

  const handleEditTask = (projectId: number, taskId: number) => {
    const project = projects.find(p => p.id === projectId);
    const task = project?.tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedProject(projectId);
      setEditingTask(task);
      setNewTask({
        title: task.title,
        priority: task.priority,
        assignee: task.assignee,
        dueDate: task.dueDate,
        status: task.status,
        subTasks: task.subTasks
      });
      setIsTaskDialogOpen(true);
    }
  };

  const handleAddSubTask = (projectId: number, taskId: number, title: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                subTasks: [...(task.subTasks || []), {
                  id: (task.subTasks?.length || 0) + 1,
                  title,
                  completed: false
                }]
              };
            }
            return task;
          })
        };
      }
      return project;
    }));
    toast({
      title: "Success",
      description: "Subtask added successfully",
    });
  };

  const handleToggleSubTask = (projectId: number, taskId: number, subTaskId: number) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                subTasks: task.subTasks.map(subTask => 
                  subTask.id === subTaskId 
                    ? { ...subTask, completed: !subTask.completed }
                    : subTask
                )
              };
            }
            return task;
          })
        };
      }
      return project;
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <ProjectHeader onOpenTaskDialog={() => setIsTaskDialogOpen(true)} />
      
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
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
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
              <Label htmlFor="assignee">Assignee</Label>
              <Input
                id="assignee"
                value={newTask.assignee}
                onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
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
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggleTaskStatus={handleToggleTaskStatus}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onAddSubTask={handleAddSubTask}
              onToggleSubTask={handleToggleSubTask}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

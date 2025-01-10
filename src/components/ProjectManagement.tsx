import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileEdit, Trash2, CheckCircle, AlertCircle, ListTodo } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const ProjectManagement = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState([
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
        { id: 1, title: "Foundation inspection", status: "completed", priority: "high", assignee: "John Doe", dueDate: "2024-03-20" },
        { id: 2, title: "Electrical wiring", status: "in-progress", priority: "medium", assignee: "Jane Smith", dueDate: "2024-04-15" }
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
        { id: 1, title: "Site preparation", status: "in-progress", priority: "high", assignee: "Mike Johnson", dueDate: "2024-03-25" }
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

  const [selectedProject, setSelectedProject] = useState(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    status: "pending"
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
        status: "pending"
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
        status: task.status
      });
      setIsTaskDialogOpen(true);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-2 flex-1">
          <Input 
            placeholder="Search projects..." 
            className="max-w-sm"
            type="search"
          />
          <Button variant="outline">
            <FileEdit className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-purple-100 hover:bg-purple-200">
                <ListTodo className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task for a specific project
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project">Project</Label>
                  <Select onValueChange={(value) => setSelectedProject(Number(value))}>
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
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select onValueChange={(value) => setNewTask({...newTask, priority: value})}>
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
                <Button onClick={handleAddTask}>Add Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription>{project.phase} • Due: {project.due}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileEdit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-sm text-gray-500">Budget</span>
                      <p className="font-medium">{project.budget}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Risk Level</span>
                      <p className={`font-medium ${
                        project.risk === 'high' ? 'text-red-500' : 
                        project.risk === 'medium' ? 'text-yellow-500' : 
                        'text-green-500'
                      }`}>
                        {project.risk.charAt(0).toUpperCase() + project.risk.slice(1)}
                      </p>
                    </div>
                  </div>
                  {/* Tasks Section */}
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Tasks ({project.tasks.length})</h4>
                    <div className="space-y-2">
                      {project.tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleTaskStatus(project.id, task.id)}
                              className="hover:scale-110 transition-transform"
                            >
                              {task.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-yellow-500" />
                              )}
                            </button>
                            <span className={`text-sm ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{task.assignee}</span>
                            <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              task.priority === 'high' ? 'bg-red-100 text-red-700' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {task.priority}
                            </span>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditTask(project.id, task.id)}
                              >
                                <FileEdit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteTask(project.id, task.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

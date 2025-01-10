import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, AlertCircle, Search, Filter, FileEdit, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  project: string;
  subTasks: SubTask[];
}

export const TaskManagement = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: "Foundation inspection", 
      status: "completed", 
      priority: "high", 
      assignee: "John Doe", 
      dueDate: "2024-03-20", 
      project: "Downtown Office Building",
      subTasks: []
    },
    { 
      id: 2, 
      title: "Electrical wiring", 
      status: "in-progress", 
      priority: "medium", 
      assignee: "Jane Smith", 
      dueDate: "2024-04-15", 
      project: "Downtown Office Building",
      subTasks: []
    },
    { 
      id: 3, 
      title: "Site preparation", 
      status: "in-progress", 
      priority: "high", 
      assignee: "Mike Johnson", 
      dueDate: "2024-03-25", 
      project: "Residential Complex",
      subTasks: []
    }
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    project: "",
    status: "in-progress",
    subTasks: []
  });
  const [newSubTask, setNewSubTask] = useState("");

  const handleAddTask = () => {
    if (newTask.title && newTask.assignee && newTask.dueDate && newTask.project) {
      if (editingTask) {
        setTasks(tasks.map(task => 
          task.id === editingTask.id 
            ? { ...task, ...newTask, id: task.id, subTasks: task.subTasks } 
            : task
        ));
        toast({
          title: "Success",
          description: "Task updated successfully",
        });
      } else {
        setTasks([...tasks, { 
          ...newTask as Task, 
          id: tasks.length + 1,
          subTasks: []
        }]);
        toast({
          title: "Success",
          description: "Task added successfully",
        });
      }
      setIsDialogOpen(false);
      setNewTask({
        title: "",
        priority: "medium",
        assignee: "",
        dueDate: "",
        project: "",
        status: "in-progress",
        subTasks: []
      });
      setEditingTask(null);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate,
      project: task.project,
      status: task.status,
      subTasks: task.subTasks
    });
    setIsDialogOpen(true);
  };

  const handleAddSubTask = (taskId: number) => {
    if (newSubTask.trim()) {
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            subTasks: [...task.subTasks, {
              id: task.subTasks.length + 1,
              title: newSubTask,
              completed: false
            }]
          };
        }
        return task;
      }));
      setNewSubTask("");
      toast({
        title: "Success",
        description: "Subtask added successfully",
      });
    }
  };

  const toggleSubTask = (taskId: number, subTaskId: number) => {
    setTasks(tasks.map(task => {
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
    }));
  };

  // ... keep existing code (filterTasks and other utility functions)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => {
          setEditingTask(null);
          setNewTask({
            title: "",
            priority: "medium",
            assignee: "",
            dueDate: "",
            project: "",
            status: "in-progress",
            subTasks: []
          });
          setIsDialogOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                value={newTask.project}
                onChange={(e) => setNewTask({...newTask, project: e.target.value})}
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              {editingTask ? 'Update Task' : 'Add Task'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4">
        {tasks.filter(task => {
          const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               task.project.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus = filterStatus === "all" || task.status === filterStatus;
          return matchesSearch && matchesStatus;
        }).map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <CardDescription>{task.project}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditTask(task)}
                  >
                    <FileEdit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTasks(tasks.filter(t => t.id !== task.id));
                      toast({
                        title: "Success",
                        description: "Task deleted successfully",
                      });
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setTasks(tasks.map(t => {
                        if (t.id === task.id) {
                          return { ...t, status: t.status === 'completed' ? 'in-progress' : 'completed' };
                        }
                        return t;
                      }));
                      toast({
                        title: "Success",
                        description: "Task status updated",
                      });
                    }}
                    className="hover:scale-110 transition-transform"
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    )}
                  </button>
                  <span className={`text-gray-600 ${task.status === 'completed' ? 'line-through' : ''}`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex gap-4 text-gray-500">
                  <span>{task.assignee}</span>
                  <span>Due: {task.dueDate}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add subtask..."
                    value={newSubTask}
                    onChange={(e) => setNewSubTask(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddSubTask(task.id);
                      }
                    }}
                  />
                  <Button size="sm" onClick={() => handleAddSubTask(task.id)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {task.subTasks.map(subTask => (
                  <div key={subTask.id} className="flex items-center gap-2 pl-4">
                    <button
                      onClick={() => toggleSubTask(task.id, subTask.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      {subTask.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      )}
                    </button>
                    <span className={`text-sm ${subTask.completed ? 'line-through text-gray-500' : ''}`}>
                      {subTask.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
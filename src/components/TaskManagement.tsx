import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TaskHeader } from "./task/TaskHeader";
import { TaskDialog } from "./task/TaskDialog";
import { TaskCard } from "./task/TaskCard";
import { Task } from "./types/task";

export const TaskManagement = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects] = useState([
    { id: 1, name: "Downtown Office Building" },
    { id: 2, name: "Residential Complex" },
    { id: 3, name: "Shopping Mall Renovation" },
  ]);
  const [teamMembers] = useState([
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Mike Williams" },
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
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <TaskHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onAddNewTask={() => {
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
        }}
      />

      <TaskDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
        editingTask={editingTask}
        projects={projects}
        teamMembers={teamMembers}
      />

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEditTask={handleEditTask}
            onDeleteTask={(taskId) => {
              setTasks(tasks.filter(t => t.id !== taskId));
              toast({
                title: "Success",
                description: "Task deleted successfully",
              });
            }}
            onToggleStatus={(taskId) => {
              setTasks(tasks.map(t => {
                if (t.id === taskId) {
                  return { ...t, status: t.status === 'completed' ? 'in-progress' : 'completed' };
                }
                return t;
              }));
              toast({
                title: "Success",
                description: "Task status updated",
              });
            }}
            onAddSubTask={handleAddSubTask}
            onToggleSubTask={toggleSubTask}
            newSubTask={newSubTask}
            setNewSubTask={setNewSubTask}
            teamMembers={teamMembers}
          />
        ))}
      </div>
    </div>
  );
};

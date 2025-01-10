import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./project/ProjectHeader";
import { ProjectCard } from "./project/ProjectCard";
import { ProjectDialogForm } from "./project/ProjectDialogForm";
import { TaskDialogForm } from "./project/TaskDialogForm";
import { Project, Task } from "./types/project";

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
        { 
          id: 1, 
          title: "Foundation inspection", 
          status: "completed", 
          priority: "high", 
          assignee: "John Doe", 
          dueDate: "2024-03-20", 
          subTasks: [] 
        },
        { 
          id: 2, 
          title: "Electrical wiring", 
          status: "in-progress", 
          priority: "medium", 
          assignee: "Jane Smith", 
          dueDate: "2024-04-15", 
          subTasks: [] 
        }
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
        { 
          id: 1, 
          title: "Site preparation", 
          status: "in-progress", 
          priority: "high", 
          assignee: "Mike Johnson", 
          dueDate: "2024-03-25", 
          subTasks: [] 
        }
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
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    status: "pending",
    subTasks: []
  });
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    phase: "Phase 1",
    progress: 0,
    due: "",
    status: "active",
    budget: "",
    risk: "low",
    tasks: []
  });

  const handleAddProject = () => {
    if (!newProject.name || !newProject.due || !newProject.budget) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingProject) {
      setProjects(prevProjects => prevProjects.map(project => 
        project.id === editingProject.id 
          ? {
              ...project,
              name: newProject.name,
              phase: newProject.phase || "Phase 1",
              progress: newProject.progress || 0,
              due: newProject.due,
              status: newProject.status || "active",
              budget: newProject.budget,
              risk: newProject.risk || "low"
            }
          : project
      ));
      setEditingProject(null);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } else {
      const newProjectData: Project = {
        id: projects.length + 1,
        name: newProject.name,
        phase: newProject.phase || "Phase 1",
        progress: newProject.progress || 0,
        due: newProject.due,
        status: newProject.status || "active",
        budget: newProject.budget,
        risk: newProject.risk || "low",
        tasks: []
      };

      setProjects(prevProjects => [...prevProjects, newProjectData]);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    }

    setIsProjectDialogOpen(false);
    setNewProject({
      name: "",
      phase: "Phase 1",
      progress: 0,
      due: "",
      status: "active",
      budget: "",
      risk: "low",
      tasks: []
    });
  };

  const handleAddTask = () => {
    if (!selectedProject || !newTask.title || !newTask.assignee || !newTask.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const project = projects.find(p => p.id === selectedProject);
    if (!project) return;

    const newTaskData: Task = {
      id: Math.max(0, ...projects.find(p => p.id === selectedProject)?.tasks.map(t => t.id) || [0]) + 1,
      title: newTask.title,
      status: newTask.status || "pending",
      priority: newTask.priority || "medium",
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      project: project.name,
      subTasks: []
    };

    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id === selectedProject) {
        return {
          ...project,
          tasks: [...project.tasks, newTaskData]
        };
      }
      return project;
    }));

    setIsTaskDialogOpen(false);
    setNewTask({
      title: "",
      priority: "medium",
      assignee: "",
      dueDate: "",
      status: "pending",
      project: "",
      subTasks: []
    });
    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      phase: project.phase,
      progress: project.progress,
      due: project.due,
      status: project.status,
      budget: project.budget,
      risk: project.risk,
      tasks: project.tasks
    });
    setIsProjectDialogOpen(true);
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
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
        onOpenProjectDialog={() => {
          setEditingProject(null);
          setNewProject({
            name: "",
            phase: "Phase 1",
            progress: 0,
            due: "",
            status: "active",
            budget: "",
            risk: "low",
            tasks: []
          });
          setIsProjectDialogOpen(true);
        }}
      />
      
      <ProjectDialogForm
        isOpen={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
        editingProject={editingProject}
        newProject={newProject}
        setNewProject={setNewProject}
        onSave={handleAddProject}
      />

      <TaskDialogForm
        isOpen={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        selectedProject={selectedProject}
        projects={projects}
        setSelectedProject={setSelectedProject}
        editingTask={editingTask}
        newTask={newTask}
        setNewTask={setNewTask}
        onSave={handleAddTask}
      />

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
              onEditProject={() => handleEditProject(project)}
              onDeleteProject={() => handleDeleteProject(project.id)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

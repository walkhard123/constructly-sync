import { useState } from "react";
import { Project, Task } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useProjects = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
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
          project: "Residential Complex",
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

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddProject = (newProject: Partial<Project>, editingProject: Project | null) => {
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
              name: newProject.name!,
              phase: newProject.phase || "Phase 1",
              progress: newProject.progress || 0,
              due: newProject.due!,
              status: newProject.status || "active",
              budget: newProject.budget!,
              risk: newProject.risk || "low"
            }
          : project
      ));
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
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  const handleAddTask = (selectedProject: number | null, newTask: Partial<Task>) => {
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

    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  const handleToggleTaskStatus = (projectId: number, taskId: number) => {
    setProjects(prevProjects => prevProjects.map(project => {
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
    }));
    toast({
      title: "Success",
      description: "Task status updated",
    });
  };

  const handleDeleteTask = (projectId: number, taskId: number) => {
    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId)
        };
      }
      return project;
    }));
    toast({
      title: "Success",
      description: "Task deleted successfully",
    });
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

  return {
    projects: filteredProjects,
    handleSearch,
    handleAddProject,
    handleDeleteProject,
    handleAddTask,
    handleToggleTaskStatus,
    handleDeleteTask,
    handleAddSubTask,
    handleToggleSubTask
  };
};
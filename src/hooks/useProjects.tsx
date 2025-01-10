import { useState } from "react";
import { Project, Task } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";
import { useTaskActions } from "./useTaskActions";

export const useProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { handleAddTask, handleEditTask } = useTaskActions({
    tasks: projects.flatMap(p => p.tasks),
    setTasks: (updatedTasks: Task[]) => {
      setProjects(projects.map(p => ({
        ...p,
        tasks: updatedTasks.filter(t => t.project === p.name)
      })));
    },
    setIsDialogOpen: () => {},
    setNewTask: () => {},
    setEditingTask: () => {}
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddProject = (newProject: Partial<Project>, editingProject: Project | null) => {
    if (!newProject.name || !newProject.endDate || !newProject.budget) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingProject) {
      setProjects(projects.map((project: Project) => 
        project.id === editingProject.id 
          ? {
              ...project,
              ...newProject,
              phase: newProject.phase || "Phase 1",
              progress: newProject.progress || 0,
              status: newProject.status || "active",
              risk: newProject.risk || "low"
            } as Project
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
        address: newProject.address || "",
        type: newProject.type || "house",
        teamMember: newProject.teamMember || "",
        startDate: newProject.startDate || "",
        endDate: newProject.endDate!,
        description: newProject.description || "",
        phase: newProject.phase || "Phase 1",
        progress: newProject.progress || 0,
        status: newProject.status || "active",
        budget: newProject.budget!,
        risk: newProject.risk || "low",
        tasks: []
      };

      setProjects([...projects, newProjectData]);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    }
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter((project: Project) => project.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  const handleToggleTaskStatus = (projectId: number, taskId: number) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                status: task.status === 'completed' ? 'in-progress' : 'completed'
              };
            }
            return task;
          })
        };
      }
      return project;
    }));
  };

  const handleDeleteTask = (projectId: number, taskId: number) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId)
        };
      }
      return project;
    }));
  };

  const handleAddSubTask = (projectId: number, taskId: number, title: string) => {
    if (!title.trim()) return;

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              const newSubTask = {
                id: (task.subTasks?.length || 0) + 1,
                title: title.trim(),
                completed: false
              };
              return {
                ...task,
                subTasks: [...(task.subTasks || []), newSubTask]
              };
            }
            return task;
          })
        };
      }
      return project;
    }));
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
    projects,
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
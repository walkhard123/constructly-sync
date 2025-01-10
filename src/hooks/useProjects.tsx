import { useState } from "react";
import { Project, Task } from "@/components/types/project";
import { useToast } from "@/hooks/use-toast";

export const useProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddProject = (newProject: Partial<Project>, editingProject: Project | null) => {
    if (!newProject.name || !newProject.teamMember || !newProject.startDate || !newProject.endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingProject) {
      setProjects(projects.map(project =>
        project.id === editingProject.id
          ? { ...project, ...newProject }
          : project
      ));
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } else {
      const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
      setProjects([...projects, { id: newId, tasks: [], ...newProject as Project }]);
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    }
  };

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter(project => project.id !== projectId));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  const handleAddTask = (projectId: number | null, newTask: Partial<Task>) => {
    if (!projectId || !newTask.title || !newTask.assignee || !newTask.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const taskId = Math.max(0, ...project.tasks.map(t => t.id)) + 1;
        const task: Task = {
          id: taskId,
          title: newTask.title,
          status: newTask.status || "pending",
          priority: newTask.priority || "medium",
          assignee: newTask.assignee,
          dueDate: newTask.dueDate,
          project: project.name,
          subTasks: []
        };
        return {
          ...project,
          tasks: [...project.tasks, task]
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
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                status: task.status === 'completed' ? 'pending' : 'completed'
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
    toast({
      title: "Success",
      description: "Task deleted successfully",
    });
  };

  const handleAddSubTask = (projectId: number, taskId: number, title: string) => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a subtask title",
        variant: "destructive",
      });
      return;
    }

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              const subTasks = task.subTasks || [];
              const newSubTask = {
                id: Math.max(0, ...subTasks.map(st => st.id), 0) + 1,
                title: title.trim(),
                completed: false
              };
              return {
                ...task,
                subTasks: [...subTasks, newSubTask]
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
                subTasks: (task.subTasks || []).map(subTask =>
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

  const filteredProjects = searchTerm
    ? projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

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
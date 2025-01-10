import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "./project/ProjectHeader";
import { ProjectDialogForm } from "./project/ProjectDialogForm";
import { TaskDialogForm } from "./project/TaskDialogForm";
import { ProjectTabs } from "./project/ProjectTabs";
import { Project, Task } from "./types/project";
import { useProjects } from "@/hooks/useProjects";

export const ProjectManagement = () => {
  const { toast } = useToast();
  const {
    projects,
    handleSearch,
    handleAddProject,
    handleDeleteProject,
    handleAddTask,
    handleToggleTaskStatus,
    handleDeleteTask,
    handleAddSubTask,
    toggleSubTask
  } = useProjects();

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
    project: "",
    subTasks: []
  });
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    address: "",
    type: "house",
    teamMember: "",
    startDate: "",
    endDate: "",
    description: "",
    phase: "Phase 1",
    progress: 0,
    status: "active",
    budget: "",
    risk: "low",
    tasks: []
  });

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      address: project.address,
      type: project.type,
      teamMember: project.teamMember,
      startDate: project.startDate,
      endDate: project.endDate,
      description: project.description,
      phase: project.phase,
      progress: project.progress,
      status: project.status,
      budget: project.budget,
      risk: project.risk,
      tasks: project.tasks
    });
    setIsProjectDialogOpen(true);
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
        project: task.project,
        subTasks: task.subTasks
      });
      setIsTaskDialogOpen(true);
    }
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
            address: "",
            type: "house",
            teamMember: "",
            startDate: "",
            endDate: "",
            description: "",
            phase: "Phase 1",
            progress: 0,
            status: "active",
            budget: "",
            risk: "low",
            tasks: []
          });
          setIsProjectDialogOpen(true);
        }}
        onSearch={handleSearch}
      />
      
      <ProjectDialogForm
        isOpen={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
        editingProject={editingProject}
        newProject={newProject}
        setNewProject={setNewProject}
        onSave={() => handleAddProject(newProject, editingProject)}
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
        onSave={() => handleAddTask(newTask, editingTask)}
      />

      <ProjectTabs
        projects={projects}
        onToggleTaskStatus={handleToggleTaskStatus}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onAddSubTask={handleAddSubTask}
        onToggleSubTask={toggleSubTask}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  );
};
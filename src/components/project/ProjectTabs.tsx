import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Project } from "../types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectTabsProps {
  projects: Project[];
  onToggleTaskStatus: (projectId: number, taskId: number) => void;
  onEditTask: (projectId: number, taskId: number) => void;
  onDeleteTask: (projectId: number, taskId: number) => void;
  onAddSubTask: (projectId: number, taskId: number, title: string) => void;
  onToggleSubTask: (projectId: number, taskId: number, subTaskId: number) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: number) => void;
}

export const ProjectTabs = ({
  projects,
  onToggleTaskStatus,
  onEditTask,
  onDeleteTask,
  onAddSubTask,
  onToggleSubTask,
  onEditProject,
  onDeleteProject
}: ProjectTabsProps) => {
  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="active">Active Projects</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="all">All Projects</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="space-y-4">
        {projects.filter(p => p.status === 'active').map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleTaskStatus={onToggleTaskStatus}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onAddSubTask={onAddSubTask}
            onToggleSubTask={onToggleSubTask}
            onEditProject={() => onEditProject(project)}
            onDeleteProject={() => onDeleteProject(project.id)}
          />
        ))}
      </TabsContent>
      <TabsContent value="upcoming" className="space-y-4">
        {projects.filter(p => p.status === 'upcoming').map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleTaskStatus={onToggleTaskStatus}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onAddSubTask={onAddSubTask}
            onToggleSubTask={onToggleSubTask}
            onEditProject={() => onEditProject(project)}
            onDeleteProject={() => onDeleteProject(project.id)}
          />
        ))}
      </TabsContent>
      <TabsContent value="completed" className="space-y-4">
        {projects.filter(p => p.status === 'completed').map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleTaskStatus={onToggleTaskStatus}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onAddSubTask={onAddSubTask}
            onToggleSubTask={onToggleSubTask}
            onEditProject={() => onEditProject(project)}
            onDeleteProject={() => onDeleteProject(project.id)}
          />
        ))}
      </TabsContent>
      <TabsContent value="all" className="space-y-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleTaskStatus={onToggleTaskStatus}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onAddSubTask={onAddSubTask}
            onToggleSubTask={onToggleSubTask}
            onEditProject={() => onEditProject(project)}
            onDeleteProject={() => onDeleteProject(project.id)}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};
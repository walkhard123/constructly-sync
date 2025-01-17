import { useQuery } from "@tanstack/react-query";
import { StatCard } from "./dashboard/StatCard";
import { ActivityList } from "./dashboard/ActivityList";
import { ProjectProgress } from "./dashboard/ProjectProgress";
import { BarChart, Calendar, Clock, ClipboardList, ListTodo, Users, FileText, Home, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";
import { useTaskState } from "@/hooks/useTaskState";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { tasks } = useTaskState();

  // Calculate project statistics
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const upcomingDeadlines = projects.filter(p => {
    const endDate = new Date(p.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && p.status === 'active';
  }).length;

  // Calculate task statistics
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const pendingTasks = tasks.filter(t => !t.status || t.status === 'pending').length;

  const statCards = [
    {
      title: "Projects",
      value: projects.length,
      subtitle: `${activeProjects} Active • ${completedProjects} Completed`,
      highlight: `${upcomingDeadlines} upcoming deadlines`,
      icon: ClipboardList,
      onClick: () => navigate('/', { state: { selectedSection: 'Projects Management' } })
    },
    {
      title: "Tasks",
      value: tasks.length,
      subtitle: `${completedTasks} Completed • ${inProgressTasks} In Progress`,
      highlight: `${pendingTasks} tasks pending`,
      icon: ListTodo,
      onClick: () => navigate('/', { state: { selectedSection: 'Tasks' } })
    }
  ];

  // Extract project progress data
  const projectProgress = projects
    .filter(project => project.status === 'active')
    .slice(0, 3)
    .map(project => ({
      name: project.name,
      progress: project.progress
    }));

  // Recent activities based on tasks and projects
  const recentActivities = [
    ...tasks.slice(0, 2).map(task => ({
      time: "Today",
      text: `Task "${task.title}" ${task.status === 'completed' ? 'completed' : 'in progress'}`
    })),
    ...projects.slice(0, 1).map(project => ({
      time: "Yesterday",
      text: `Project "${project.name}" updated`
    }))
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] animate-fade-in">
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-sm text-gray-600">Here's your daily overview</p>
      </div>
      
      <div className="px-6 grid grid-cols-2 gap-6 mb-8">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <div className="px-6 space-y-8">
        <ProjectProgress projects={projectProgress} />
        <ActivityList activities={recentActivities} />
      </div>
    </div>
  );
};
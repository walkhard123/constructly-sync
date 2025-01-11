import { useQuery } from "@tanstack/react-query";
import { StatCard } from "./dashboard/StatCard";
import { ActivityList } from "./dashboard/ActivityList";
import { ProjectProgress } from "./dashboard/ProjectProgress";
import { BarChart, Calendar, Clock, ClipboardList, ListTodo, Users, FileText } from "lucide-react";
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
    },
    {
      title: "Time Clock",
      value: "Active",
      subtitle: "2 team members clocked in",
      highlight: "Current shift: 6h 30m",
      icon: Clock,
      onClick: () => navigate('/', { state: { selectedSection: 'Time Clock' } })
    },
    {
      title: "Daily Logs",
      value: "12",
      subtitle: "Logs submitted today",
      highlight: "3 requiring review",
      icon: Calendar,
      onClick: () => navigate('/', { state: { selectedSection: 'Daily Logs' } })
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
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityList activities={recentActivities} />
        <ProjectProgress projects={projectProgress} />
      </div>
    </div>
  );
};
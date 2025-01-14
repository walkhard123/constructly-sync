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
    <div className="min-h-screen bg-[#F5F5F5] pb-20">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-1">Welcome Back!</h1>
        <p className="text-sm text-[#6B6B6B]">Here's your daily overview</p>
      </div>
      
      <div className="px-4 grid grid-cols-2 gap-4 mb-6">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      <div className="px-4 space-y-6">
        <ProjectProgress projects={projectProgress} />
        <ActivityList activities={recentActivities} />
      </div>

      <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 flex justify-around items-center px-4 z-50">
        <button className="nav-item active">
          <Home className="w-6 h-6 text-[#4B3F8F]" />
          <span className="text-xs text-[#4B3F8F]">Home</span>
        </button>
        <button className="nav-item">
          <Calendar className="w-6 h-6 text-[#6B6B6B]" />
          <span className="text-xs text-[#6B6B6B]">Calendar</span>
        </button>
        <button className="nav-item">
          <ListTodo className="w-6 h-6 text-[#6B6B6B]" />
          <span className="text-xs text-[#6B6B6B]">Tasks</span>
        </button>
        <button className="nav-item">
          <Settings className="w-6 h-6 text-[#6B6B6B]" />
          <span className="text-xs text-[#6B6B6B]">Settings</span>
        </button>
      </nav>
    </div>
  );
};
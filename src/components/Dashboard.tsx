import { useQuery } from "@tanstack/react-query";
import { StatCard } from "./dashboard/StatCard";
import { ActivityList } from "./dashboard/ActivityList";
import { ProjectProgress } from "./dashboard/ProjectProgress";
import { BarChart, Calendar, Clock, ClipboardList, ListTodo, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  const { data: projectStats } = useQuery({
    queryKey: ['projectStats'],
    queryFn: () => ({
      total: 3,
      active: 2,
      completed: 1,
      upcomingDeadlines: 2
    })
  });

  const { data: taskStats } = useQuery({
    queryKey: ['taskStats'],
    queryFn: () => ({
      total: 4,
      completed: 1,
      inProgress: 2,
      pending: 1
    })
  });

  const { data: teamStats } = useQuery({
    queryKey: ['teamStats'],
    queryFn: () => ({
      totalMembers: 3,
      activeToday: 2,
      averageHours: 7.5
    })
  });

  const statCards = [
    {
      title: "Projects",
      value: projectStats?.total || 0,
      subtitle: `${projectStats?.active || 0} Active • ${projectStats?.completed || 0} Completed`,
      highlight: `${projectStats?.upcomingDeadlines || 0} upcoming deadlines`,
      icon: ClipboardList,
      onClick: () => navigate('/', { state: { section: 'Projects Management' } })
    },
    {
      title: "Tasks",
      value: taskStats?.total || 0,
      subtitle: `${taskStats?.completed || 0} Completed • ${taskStats?.inProgress || 0} In Progress`,
      highlight: `${taskStats?.pending || 0} tasks pending`,
      icon: ListTodo,
      onClick: () => navigate('/', { state: { section: 'Tasks' } })
    },
    {
      title: "Team",
      value: teamStats?.totalMembers || 0,
      subtitle: `${teamStats?.activeToday || 0} active today`,
      highlight: `${teamStats?.averageHours || 0}h avg. working hours`,
      icon: Users,
      onClick: () => navigate('/', { state: { section: 'Team Members' } })
    },
    {
      title: "Time Tracking",
      value: "2/3",
      subtitle: "Team members clocked in",
      highlight: "Current shift: 6h 30m",
      icon: Clock
    },
    {
      title: "Daily Logs",
      value: "12",
      subtitle: "Logs submitted today",
      highlight: "3 requiring review",
      icon: Calendar,
      onClick: () => navigate('/', { state: { section: 'Daily Logs' } })
    },
    {
      title: "Documents",
      value: "45",
      subtitle: "Total documents",
      highlight: "5 recent uploads",
      icon: FileText,
      onClick: () => navigate('/', { state: { section: 'File Upload' } })
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, FileEdit, Trash2 } from "lucide-react";

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
}

interface ProjectTaskListProps {
  tasks: Task[];
  onToggleStatus: (taskId: number) => void;
  onEditTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

export const ProjectTaskList = ({ 
  tasks, 
  onToggleStatus, 
  onEditTask, 
  onDeleteTask 
}: ProjectTaskListProps) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleStatus(task.id)}
              className="hover:scale-110 transition-transform"
            >
              {task.status === 'completed' ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
            </button>
            <span className={`text-sm ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{task.assignee}</span>
            <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              task.priority === 'high' ? 'bg-red-100 text-red-700' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {task.priority}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditTask(task.id)}
              >
                <FileEdit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteTask(task.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
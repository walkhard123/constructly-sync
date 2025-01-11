import { CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Task } from "../../types/project";

interface TaskHeaderProps {
  task: Task;
  isExpanded: boolean;
  onToggleStatus: (e: React.MouseEvent) => void;
}

export const TaskHeader = ({ task, isExpanded, onToggleStatus }: TaskHeaderProps) => {
  return (
    <div className="flex items-center gap-2 flex-1">
      <button
        onClick={onToggleStatus}
        className="hover:scale-110 transition-transform"
      >
        {task.status === 'completed' ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <AlertCircle className="w-4 h-4 text-yellow-500" />
        )}
      </button>
      <span className={`text-sm ${task.status === 'completed' ? 'line-through text-gray-500' : ''} ${
        task.subTasks?.length > 0 ? 'font-medium text-purple-700' : ''
      }`}>
        {task.title}
      </span>
      {task.subTasks?.length > 0 && (
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
          {task.subTasks.length} subtasks
        </span>
      )}
      {isExpanded ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      )}
    </div>
  );
};
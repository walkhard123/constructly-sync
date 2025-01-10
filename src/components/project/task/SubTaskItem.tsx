import { CheckCircle, AlertCircle } from "lucide-react";
import { SubTask } from "../../types/project";

interface SubTaskItemProps {
  subTask: SubTask;
  onToggle: () => void;
}

export const SubTaskItem = ({ subTask, onToggle }: SubTaskItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className="hover:scale-110 transition-transform"
      >
        {subTask.completed ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <AlertCircle className="w-4 h-4 text-yellow-500" />
        )}
      </button>
      <span className={`text-sm ${subTask.completed ? 'line-through text-gray-500' : ''}`}>
        {subTask.title}
      </span>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, AlertCircle, FileEdit, Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  subTasks: SubTask[];
}

interface ProjectTaskListProps {
  tasks: Task[];
  onToggleStatus: (taskId: number) => void;
  onEditTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  onAddSubTask: (taskId: number, title: string) => void;
  onToggleSubTask: (taskId: number, subTaskId: number) => void;
}

export const ProjectTaskList = ({ 
  tasks, 
  onToggleStatus, 
  onEditTask, 
  onDeleteTask,
  onAddSubTask,
  onToggleSubTask
}: ProjectTaskListProps) => {
  const [newSubTasks, setNewSubTasks] = useState<{ [key: number]: string }>({});
  const [expandedTasks, setExpandedTasks] = useState<{ [key: number]: boolean }>({});

  const handleAddSubTask = (taskId: number) => {
    if (newSubTasks[taskId]?.trim()) {
      onAddSubTask(taskId, newSubTasks[taskId]);
      setNewSubTasks(prev => ({ ...prev, [taskId]: '' }));
    }
  };

  const toggleTaskExpansion = (taskId: number) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="space-y-2">
          <div 
            className={`flex items-center justify-between p-2 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
              task.subTasks.length > 0 ? 'border-l-4 border-purple-500' : ''
            }`}
            onClick={() => toggleTaskExpansion(task.id)}
          >
            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStatus(task.id);
                }}
                className="hover:scale-110 transition-transform"
              >
                {task.status === 'completed' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                )}
              </button>
              <span className={`text-sm ${task.status === 'completed' ? 'line-through text-gray-500' : ''} ${
                task.subTasks.length > 0 ? 'font-medium text-purple-700' : ''
              }`}>
                {task.title}
              </span>
              {task.subTasks.length > 0 && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  {task.subTasks.length} subtasks
                </span>
              )}
              {expandedTasks[task.id] ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
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
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
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
          {expandedTasks[task.id] && (
            <div className="pl-8 space-y-2" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add subtask..."
                  value={newSubTasks[task.id] || ''}
                  onChange={(e) => setNewSubTasks(prev => ({ ...prev, [task.id]: e.target.value }))}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddSubTask(task.id);
                    }
                  }}
                  className="max-w-md"
                />
                <Button size="sm" onClick={() => handleAddSubTask(task.id)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {task.subTasks?.map(subTask => (
                <div key={subTask.id} className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSubTask(task.id, subTask.id)}
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
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
import { useState } from "react";
import { Task } from "../types/project";
import { SubTaskInput } from "./task/SubTaskInput";
import { SubTaskItem } from "./task/SubTaskItem";
import { TaskActions } from "./task/TaskActions";
import { TaskHeader } from "./task/TaskHeader";

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
              task.subTasks?.length > 0 ? 'border-l-4 border-purple-500' : ''
            }`}
            onClick={() => toggleTaskExpansion(task.id)}
          >
            <TaskHeader
              task={task}
              isExpanded={expandedTasks[task.id]}
              onToggleStatus={() => onToggleStatus(task.id)}
            />
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
              <TaskActions
                onEdit={() => onEditTask(task.id)}
                onDelete={() => onDeleteTask(task.id)}
              />
            </div>
          </div>
          {expandedTasks[task.id] && (
            <div className="pl-8 space-y-2" onClick={(e) => e.stopPropagation()}>
              <SubTaskInput
                value={newSubTasks[task.id] || ''}
                onChange={(value) => setNewSubTasks(prev => ({ ...prev, [task.id]: value }))}
                onAdd={() => handleAddSubTask(task.id)}
              />
              {task.subTasks?.map((subTask) => (
                <SubTaskItem
                  key={subTask.id}
                  subTask={subTask}
                  onToggle={() => onToggleSubTask(task.id, subTask.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, AlertCircle, FileEdit, Trash2, Plus } from "lucide-react";
import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  onToggleStatus: (taskId: number) => void;
  onAddSubTask: (taskId: number) => void;
  onToggleSubTask: (taskId: number, subTaskId: number) => void;
  newSubTask: string;
  setNewSubTask: (value: string) => void;
}

export const TaskCard = ({
  task,
  onEditTask,
  onDeleteTask,
  onToggleStatus,
  onAddSubTask,
  onToggleSubTask,
  newSubTask,
  setNewSubTask
}: TaskCardProps) => {
  return (
    <Card key={task.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <CardDescription>{task.project}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-full text-xs ${
              task.priority === 'high' ? 'bg-red-100 text-red-700' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {task.priority}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditTask(task)}
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
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm mb-4">
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
            <span className={`text-gray-600 ${task.status === 'completed' ? 'line-through' : ''}`}>
              {task.status}
            </span>
          </div>
          <div className="flex gap-4 text-gray-500">
            <span>{task.assignee}</span>
            <span>Due: {task.dueDate}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add subtask..."
              value={newSubTask}
              onChange={(e) => setNewSubTask(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onAddSubTask(task.id);
                }
              }}
            />
            <Button size="sm" onClick={() => onAddSubTask(task.id)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {task.subTasks.map(subTask => (
            <div key={subTask.id} className="flex items-center gap-2 pl-4">
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
      </CardContent>
    </Card>
  );
};
import { TaskCard } from "./TaskCard";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  onToggleStatus: (taskId: number) => void;
  onAddSubTask: (taskId: number) => void;
  onToggleSubTask: (taskId: number, subTaskId: number) => void;
  newSubTasks: { [key: number]: string };
  setNewSubTasks: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
}

export const TaskList = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onToggleStatus,
  onAddSubTask,
  onToggleSubTask,
  newSubTasks,
  setNewSubTasks
}: TaskListProps) => {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onToggleStatus={onToggleStatus}
          onAddSubTask={onAddSubTask}
          onToggleSubTask={onToggleSubTask}
          newSubTask={newSubTasks[task.id] || ''}
          setNewSubTask={(value: string) => 
            setNewSubTasks(prev => ({ ...prev, [task.id]: value }))
          }
        />
      ))}
    </div>
  );
};
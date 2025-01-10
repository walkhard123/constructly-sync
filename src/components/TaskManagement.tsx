import { TaskHeader } from "./task/TaskHeader";
import { TaskDialog } from "./task/TaskDialog";
import { TaskList } from "./task/TaskList";
import { useTaskState } from "@/hooks/useTaskState";
import { useTaskActions } from "@/hooks/useTaskActions";
import { useTaskFilter } from "./task/TaskFilter";
import { useToast } from "@/hooks/use-toast";

export const TaskManagement = () => {
  const { toast } = useToast();
  const {
    tasks,
    setTasks,
    projects,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    setIsDialogOpen,
    editingTask,
    setEditingTask,
    newSubTasks,
    setNewSubTasks,
    newTask,
    setNewTask
  } = useTaskState();

  const { handleAddTask, handleEditTask, handleAddSubTask, handleToggleSubTask } = useTaskActions({
    tasks,
    setTasks,
    setIsDialogOpen,
    setNewTask,
    setEditingTask
  });

  const { filteredTasks } = useTaskFilter({
    tasks,
    searchQuery,
    filterStatus
  });

  return (
    <div className="space-y-6">
      <TaskHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onAddNewTask={() => {
          setEditingTask(null);
          setNewTask({
            title: "",
            priority: "medium",
            assignee: "",
            dueDate: "",
            project: "",
            status: "in-progress",
            subTasks: []
          });
          setIsDialogOpen(true);
        }}
      />

      <TaskDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={() => handleAddTask(newTask, editingTask)}
        editingTask={editingTask}
        projects={projects}
      />

      <TaskList
        tasks={filteredTasks}
        onEditTask={handleEditTask}
        onDeleteTask={(taskId) => {
          setTasks(tasks.filter(t => t.id !== taskId));
          toast({
            title: "Success",
            description: "Task deleted successfully",
          });
        }}
        onToggleStatus={(taskId) => {
          setTasks(tasks.map(t => {
            if (t.id === taskId) {
              return { ...t, status: t.status === 'completed' ? 'in-progress' : 'completed' };
            }
            return t;
          }));
          toast({
            title: "Success",
            description: "Task status updated",
          });
        }}
        onAddSubTask={(taskId) => handleAddSubTask(taskId, newSubTasks, setNewSubTasks)}
        onToggleSubTask={handleToggleSubTask}
        newSubTasks={newSubTasks}
        setNewSubTasks={setNewSubTasks}
      />
    </div>
  );
};
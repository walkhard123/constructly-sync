import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "../types/task";

interface TaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newTask: Partial<Task>;
  setNewTask: (task: Partial<Task>) => void;
  handleAddTask: () => void;
  editingTask: Task | null;
}

export const TaskDialog = ({
  isOpen,
  onOpenChange,
  newTask,
  setNewTask,
  handleAddTask,
  editingTask
}: TaskDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          <DialogDescription>
            {editingTask ? 'Edit the task details below' : 'Fill in the task details below'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={newTask.priority}
              onValueChange={(value) => setNewTask({...newTask, priority: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              value={newTask.assignee}
              onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="project">Project</Label>
            <Input
              id="project"
              value={newTask.project}
              onChange={(e) => setNewTask({...newTask, project: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddTask}>
            {editingTask ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
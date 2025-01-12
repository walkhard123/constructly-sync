export interface SubScheduleItem {
  id: number;
  title: string;
  completed: boolean;
}

export interface ScheduleItem {
  id: number;
  title: string;
  contractor: string;
  status: "stuck" | "done" | "in-progress";
  startDate?: string;
  endDate?: string;
  duration?: number;
  groupTitle: string;
  subItems?: SubScheduleItem[];
}
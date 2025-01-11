export interface ScheduleItem {
  id: number;
  title: string;
  status: "stuck" | "done" | "in-progress";
  startDate?: string;
  endDate?: string;
  groupTitle: string;
}
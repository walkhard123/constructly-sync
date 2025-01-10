export interface LogEntry {
  id: number;
  project: string;
  date: string;
  startTime: string;
  endTime: string;
  activities: string;
  deliveries: string;
  attachments: number;
  tags: string[];
  photos: string[];
}
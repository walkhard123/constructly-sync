import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  name: string;
  progress: number;
}

interface ProjectProgressProps {
  projects: Project[];
}

export const ProjectProgress = ({ projects }: ProjectProgressProps) => {
  return (
    <Card className="rounded-2xl border-0 shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
      <CardHeader className="pb-2 pt-5 px-4">
        <CardTitle className="text-lg font-semibold text-[#1A1A1A]">Project Progress</CardTitle>
        <CardDescription className="text-sm text-[#6B6B6B]">Overall completion status</CardDescription>
      </CardHeader>
      <CardContent className="pb-5 px-4">
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[#1A1A1A]">{project.name}</span>
                <span className="text-[#6B6B6B]">{project.progress}%</span>
              </div>
              <div className="h-1 bg-[#E8E7F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4B3F8F] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
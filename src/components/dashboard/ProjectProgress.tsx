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
    <Card className="app-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">Project Progress</CardTitle>
        <CardDescription className="text-sm text-gray-500">Overall completion status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{project.name}</span>
                <span className="text-gray-500">{project.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${project.progress}%`,
                    background: 'linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
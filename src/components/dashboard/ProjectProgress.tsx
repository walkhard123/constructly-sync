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
    <Card className="mobile-card">
      <CardHeader>
        <CardTitle className="text-subheading">Project Progress</CardTitle>
        <CardDescription className="text-caption">Overall completion status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{project.name}</span>
                <span className="text-caption">{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ '--progress-width': `${project.progress}%` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
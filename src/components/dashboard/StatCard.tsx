import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  highlight?: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  highlight,
  icon: Icon,
  onClick
}: StatCardProps) => {
  return (
    <Card 
      className="app-card cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="icon-container w-12 h-12">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-500">{subtitle}</div>
          </div>
        </div>
        {highlight && (
          <div className="text-sm font-medium text-primary mt-2">
            {highlight}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
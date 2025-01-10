import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  highlight?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  highlight,
  icon: Icon,
  iconColor = "text-purple-600"
}: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">
          {subtitle}
        </div>
        {highlight && (
          <div className="mt-4 text-sm text-purple-600">
            {highlight}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
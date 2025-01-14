import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  highlight?: string;
  icon: LucideIcon;
  iconColor?: string;
  onClick?: () => void;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  highlight,
  icon: Icon,
  iconColor = "text-primary",
  onClick
}: StatCardProps) => {
  return (
    <Card 
      className={`mobile-card ${onClick ? 'cursor-pointer hover:shadow-lg transition-all' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-subheading">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-caption">
          {subtitle}
        </div>
        {highlight && (
          <div className="mt-2 text-sm text-primary font-medium">
            {highlight}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
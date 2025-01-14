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
  iconColor = "text-[#4B3F8F]",
  onClick
}: StatCardProps) => {
  return (
    <Card 
      className={`rounded-2xl border-0 shadow-[0px_2px_8px_rgba(0,0,0,0.08)] ${onClick ? 'cursor-pointer hover:shadow-lg transition-all duration-200' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-base font-medium text-[#1A1A1A]">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className="text-2xl font-semibold text-[#1A1A1A]">{value}</div>
        <div className="text-sm text-[#6B6B6B] mt-1">
          {subtitle}
        </div>
        {highlight && (
          <div className="mt-2 text-sm font-medium text-[#4B3F8F]">
            {highlight}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
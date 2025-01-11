import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mail, BellRing } from "lucide-react";
import { toast } from "sonner";

interface NotificationsSectionProps {
  emailNotifications: boolean;
  pushNotifications: boolean;
  onNotificationChange: (type: 'email' | 'push', enabled: boolean) => void;
}

export function NotificationsSection({
  emailNotifications,
  pushNotifications,
  onNotificationChange,
}: NotificationsSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Notification Preferences</h3>
      <p className="text-sm text-muted-foreground">Choose how you want to receive notifications.</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <Label htmlFor="email-notifications">Email Notifications</Label>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={(checked) => onNotificationChange('email', checked)}
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <BellRing className="h-4 w-4" />
            <Label htmlFor="push-notifications">Push Notifications</Label>
          </div>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={(checked) => onNotificationChange('push', checked)}
          />
        </div>
      </div>
    </div>
  );
}
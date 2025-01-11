import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bell, Globe, Key, BookOpen, MessageSquare, Star, Mail, BellRing } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Settings() {
  const [activeSection, setActiveSection] = useState<string>("account");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    toast.info(`Navigated to ${section} settings`);
  };

  const handleNotificationChange = (type: 'email' | 'push', enabled: boolean) => {
    if (type === 'email') {
      setEmailNotifications(enabled);
      toast.success(`Email notifications ${enabled ? 'enabled' : 'disabled'}`);
    } else {
      setPushNotifications(enabled);
      toast.success(`Push notifications ${enabled ? 'enabled' : 'disabled'}`);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    toast.success(`Language changed to ${language}`);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p>Manage your account preferences and personal information.</p>
        </div>;
      case "notifications":
        return <div className="space-y-6">
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
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
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
                onCheckedChange={(checked) => handleNotificationChange('push', checked)}
              />
            </div>
          </div>
        </div>;
      case "language":
        return <div className="space-y-6">
          <h3 className="text-lg font-medium">Language Settings</h3>
          <p className="text-sm text-muted-foreground">Choose your preferred language.</p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Globe className="h-4 w-4" />
              <div className="w-[180px]">
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>;
      default:
        return <div>Select a section to view settings</div>;
    }
  };

  const sections = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "language", label: "Language", icon: Globe },
    { id: "password", label: "Change Password", icon: Key },
    { id: "privacy", label: "Privacy Policy", icon: BookOpen },
    { id: "tutorial", label: "Intro Tutorial", icon: BookOpen },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "rate", label: "Rate the App", icon: Star },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleSectionChange(section.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {section.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>
              {sections.find((s) => s.id === activeSection)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
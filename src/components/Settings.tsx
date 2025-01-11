import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bell, Globe, Key, BookOpen, MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";
import { AccountSection } from "./settings/AccountSection";
import { NotificationsSection } from "./settings/NotificationsSection";
import { LanguageSection } from "./settings/LanguageSection";
import { ChangePasswordSection } from "./settings/ChangePasswordSection";

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
        return <AccountSection />;
      case "notifications":
        return (
          <NotificationsSection
            emailNotifications={emailNotifications}
            pushNotifications={pushNotifications}
            onNotificationChange={handleNotificationChange}
          />
        );
      case "language":
        return (
          <LanguageSection
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
          />
        );
      case "password":
        return <ChangePasswordSection />;
      default:
        return <div>Select a section to view settings</div>;
    }
  };

  const sections = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "language", label: "Language", icon: Globe },
    { id: "password", label: "Change Password", icon: Key },
    { id: "tutorial", label: "Intro Tutorial", icon: BookOpen },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "rate", label: "Rate the App", icon: Star },
    { id: "privacy", label: "Privacy Policy", icon: BookOpen },
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
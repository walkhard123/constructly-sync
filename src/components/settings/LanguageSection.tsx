import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSectionProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSection({ selectedLanguage, onLanguageChange }: LanguageSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Language Settings</h3>
      <p className="text-sm text-muted-foreground">Choose your preferred language.</p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Globe className="h-4 w-4" />
          <div className="w-[180px]">
            <Select value={selectedLanguage} onValueChange={onLanguageChange}>
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
    </div>
  );
}
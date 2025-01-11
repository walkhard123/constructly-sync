import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function TutorialSection() {
  const startTutorial = () => {
    toast.info("Starting tutorial...");
    // Tutorial logic would go here
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Start the interactive tutorial to learn how to use the application effectively.
      </p>
      <Button onClick={startTutorial}>Start Tutorial</Button>
    </div>
  );
}
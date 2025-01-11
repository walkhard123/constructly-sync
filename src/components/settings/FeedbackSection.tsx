import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export function FeedbackSection() {
  const [feedback, setFeedback] = useState("");

  const submitFeedback = () => {
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }
    
    toast.success("Thank you for your feedback!");
    setFeedback("");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        We value your feedback! Let us know how we can improve your experience.
      </p>
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback here..."
        className="min-h-[100px]"
      />
      <Button onClick={submitFeedback}>Submit Feedback</Button>
    </div>
  );
}
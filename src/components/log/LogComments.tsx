import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Comment } from "../types/comment";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface LogCommentsProps {
  logId: number;
  user: User | null;
}

export const LogComments = ({ logId, user }: LogCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("log_comments")
      .select("*")
      .eq("log_id", logId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error);
      return;
    }

    setComments(data || []);
  };

  const handleAddComment = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to comment",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from("log_comments").insert({
      log_id: logId,
      user_id: user.id,
      content: newComment.trim(),
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Comment added successfully",
    });

    setNewComment("");
    fetchComments();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-3 bg-gray-50 rounded-lg space-y-1"
          >
            <p className="text-sm text-gray-600">{comment.content}</p>
            <p className="text-xs text-gray-400">
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {user && (
        <div className="space-y-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[80px]"
          />
          <Button
            onClick={handleAddComment}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Adding Comment..." : "Add Comment"}
          </Button>
        </div>
      )}
    </div>
  );
};
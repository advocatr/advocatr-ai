import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FeedbackFormProps {
  progressId: number;
  onSuccess?: () => void;
}

export default function FeedbackForm({ progressId, onSuccess }: FeedbackFormProps) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/feedback/${progressId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, rating: parseInt(rating) }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Feedback submitted successfully" });
      setContent("");
      setRating("");
      queryClient.invalidateQueries({ queryKey: [`/api/feedback/${progressId}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !rating) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Rating</label>
        <Select value={rating} onValueChange={setRating}>
          <SelectTrigger>
            <SelectValue placeholder="Select a rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 - Poor</SelectItem>
            <SelectItem value="2">2 - Fair</SelectItem>
            <SelectItem value="3">3 - Good</SelectItem>
            <SelectItem value="4">4 - Very Good</SelectItem>
            <SelectItem value="5">5 - Excellent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Feedback</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your feedback..."
          className="min-h-[100px]"
        />
      </div>

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full"
      >
        Submit Feedback
      </Button>
    </form>
  );
}

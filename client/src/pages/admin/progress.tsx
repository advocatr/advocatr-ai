import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Progress {
  id: number;
  userId: number;
  exerciseId: number;
  completed: boolean;
  updatedAt: string;
  user: {
    username: string;
    email: string;
  };
  exercise: {
    title: string;
  };
}

export default function AdminProgress() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: progress } = useQuery({
    queryKey: ["/api/admin/progress"],
    queryFn: async () => {
      const response = await fetch("/api/admin/progress");
      if (!response.ok) throw new Error("Failed to fetch progress data");
      return response.json();
    },
  });

  const resetMutation = useMutation({
    mutationFn: async (progressId: number) => {
      const response = await fetch(`/api/admin/progress/${progressId}/reset`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to reset progress");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Progress reset successfully" });

      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ["/api/admin/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/exercises"] });
      queryClient.invalidateQueries({ 
        predicate: (query) => {
          const key = query.queryKey[0];
          return (
            key === "/api/progress" || 
            (typeof key === "string" && key.startsWith("/api/progress/"))
          );
        }
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Candidate Progress</h1>

      <Card>
        <CardHeader>
          <CardTitle>Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Exercise</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progress?.map((p: Progress) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{p.user.username}</p>
                      <p className="text-sm text-gray-500">{p.user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{p.exercise.title}</TableCell>
                  <TableCell>
                    {p.completed ? (
                      <span className="text-green-600">Completed</span>
                    ) : (
                      <span className="text-yellow-600">In Progress</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resetMutation.mutate(p.id)}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset Progress
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
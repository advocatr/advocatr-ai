import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const exerciseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  demoVideoUrl: z.string().url("Must be a valid URL"),
  professionalAnswerUrl: z.string().url("Must be a valid URL"),
  order: z.number().min(1, "Order must be at least 1"),
});

type ExerciseFormData = z.infer<typeof exerciseSchema>;

export default function AdminExercises() {
  const { toast } = useToast();

  const { data: exercises, refetch } = useQuery({
    queryKey: ["/api/exercises"],
    queryFn: async () => {
      const response = await fetch("/api/exercises");
      if (!response.ok) throw new Error("Failed to fetch exercises");
      return response.json();
    },
  });

  const form = useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      title: "",
      description: "",
      demoVideoUrl: "",
      professionalAnswerUrl: "",
      order: 1,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: ExerciseFormData) => {
      const response = await fetch("/api/admin/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create exercise");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Exercise created successfully" });
      refetch();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ExerciseFormData) => {
    createMutation.mutate(data);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Exercises</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Exercise</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="demoVideoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demo Video URL</FormLabel>
                      <FormControl>
                        <Input {...field} type="url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="professionalAnswerUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Answer Video URL</FormLabel>
                      <FormControl>
                        <Input {...field} type="url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Exercise
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {exercises?.map((exercise: any) => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>
                  {exercise.order}. {exercise.title}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{exercise.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

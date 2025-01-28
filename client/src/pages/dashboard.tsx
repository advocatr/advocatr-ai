import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import ExerciseCard from "@/components/exercise-card";
import { LogOut } from "lucide-react";

interface Exercise {
  id: number;
  title: string;
  description: string;
  demoVideoUrl: string;
  order: number;
}

interface Progress {
  exerciseId: number;
  completed: boolean;
  videoUrl: string | null;
}

export default function Dashboard() {
  const { logout, user } = useUser();
  
  const { data: exercises } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
  });

  const { data: progress } = useQuery<Progress[]>({
    queryKey: ["/api/progress"],
  });

  const getProgress = (exerciseId: number) => {
    return progress?.find((p) => p.exerciseId === exerciseId);
  };

  const isExerciseUnlocked = (order: number) => {
    if (order === 1) return true;
    const previousExercise = exercises?.find((e) => e.order === order - 1);
    if (!previousExercise) return false;
    return getProgress(previousExercise.id)?.completed ?? false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.username}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Track your progress through the advocacy exercises
            </p>
          </div>
          <Button variant="outline" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises?.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              progress={getProgress(exercise.id)}
              isUnlocked={isExerciseUnlocked(exercise.order)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import ExerciseCard from "@/components/exercise-card";
import { LogOut, Loader2, User, Settings } from "lucide-react";
import { useLocation } from "wouter";
import { SiteNavigation } from "@/components/ui/site-navigation";

interface Exercise {
  id: number;
  title: string;
  description: string;
  demoVideoUrl: string;
  order: number;
}

import { useEffect } from "react";

interface Progress {
  exerciseId: number;
  completed: boolean;
  videoUrl: string | null;
}

export default function Dashboard() {
  const { logout, user } = useUser();
  const [, setLocation] = useLocation();
  
  // Redirect unauthenticated users to auth page
  useEffect(() => {
    if (!user) {
      setLocation("/auth");
    }
  }, [user, setLocation]);

  const { data: exercises, isLoading: exercisesLoading } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
    enabled: !!user,
  });

  const { data: progress, isLoading: progressLoading } = useQuery<Progress[]>({
    queryKey: ["/api/progress"],
    enabled: !!user,
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

  const isLoading = exercisesLoading || progressLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-500" />
          <p className="mt-2 text-gray-600">Loading exercises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <a href="/" className="inline-block hover:opacity-90 transition-opacity">
                <h1 className="text-3xl font-bold text-gray-900">
                  <img src="/advocatr-logo.png" alt="Advocatr" className="inline-block h-8 w-8 mr-2" /> Advocatr
                </h1>
              </a>
              <p className="mt-1 text-sm text-gray-600">
                Track your progress through the advocacy exercises
              </p>
            </div>
            <div className="flex items-center">
              <SiteNavigation />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {exercises && exercises.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                progress={getProgress(exercise.id)}
                isUnlocked={isExerciseUnlocked(exercise.order)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No exercises available</p>
          </div>
        )}
      </main>
    </div>
  );
}
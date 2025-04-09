
import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import ExerciseCard from "@/components/exercise-card";

interface Exercise {
  id: number;
  title: string;
  description: string;
  order: number;
}

interface Progress {
  exerciseId: number;
  completed: boolean;
  videoUrl: string | null;
}

export default function ExercisesPage() {
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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Available Exercises</h1>
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
      </div>
    </Layout>
  );
}

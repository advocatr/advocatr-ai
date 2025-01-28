import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Lock, CheckCircle } from "lucide-react";

interface Exercise {
  id: number;
  title: string;
  description: string;
  order: number;
}

interface Progress {
  completed: boolean;
  videoUrl: string | null;
}

interface ExerciseCardProps {
  exercise: Exercise;
  progress?: Progress;
  isUnlocked: boolean;
}

export default function ExerciseCard({
  exercise,
  progress,
  isUnlocked,
}: ExerciseCardProps) {
  const [, setLocation] = useLocation();

  return (
    <Card className={!isUnlocked ? "opacity-75" : undefined}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Exercise {exercise.order}</span>
          {progress?.completed && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{exercise.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
        <Button
          className="w-full"
          onClick={() => setLocation(`/exercise/${exercise.id}`)}
          disabled={!isUnlocked}
        >
          {!isUnlocked ? (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Locked
            </>
          ) : progress?.completed ? (
            "Review"
          ) : (
            "Start Exercise"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

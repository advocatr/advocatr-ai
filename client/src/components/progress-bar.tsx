import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <Progress value={value} className="h-2" />
      <p className="text-sm text-gray-600 text-right">{value}% complete</p>
    </div>
  );
}

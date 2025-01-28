import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <AspectRatio ratio={16 / 9}>
      <video
        src={url}
        controls
        className="w-full h-full object-cover rounded-lg"
      />
    </AspectRatio>
  );
}

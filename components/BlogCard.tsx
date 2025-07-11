import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  image: string;
  tag: string;
  title: string;
  author: string;
  authorImage: string;
  date: string;
}

export function BlogCard({
  image,
  tag,
  title,
  author,
  authorImage,
  date,
}: BlogCardProps) {
  return (
    <Card className="rounded-md shadow-sm hover:shadow-md transitiontext-sm">
      <div className="relative w-full h-48">
        <Image src={image} alt={title} fill className="object-cover p-3" />
      </div>

      <CardContent className="p-3 space-y-2">
        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-600 font-medium">
          {tag}
        </span>
        <h3 className="text-lg font-semibold leading-snug line-clamp-2">{title}</h3>
        <div className="flex gap-2">
          <Image
            src={authorImage}
            alt={author}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-xs text-muted-foreground">{author}</span>
          <span className="ml-auto text-[10px] text-muted-foreground">{date}</span>
        </div>
      </CardContent>
    </Card>
  );
}

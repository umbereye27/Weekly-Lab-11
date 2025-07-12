import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogPost, getBlogPosts } from "@/lib/api";
// import { PostContentSkeleton } from '@/components/ui/loading-skeleton';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 86400; // Revalidate daily

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - InsightEdge`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.cover_image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover_image],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const lastGenerated = new Date().toISOString();

  return (
    <Suspense>
      <article className="max-w-6xl mx-auto px-4 md:px-6 py-10 bg-background text-foreground">
        <div className="mb-10">
          <Button
            variant="ghost"
            asChild
            className="mb-6 px-0 hover:underline text-muted-foreground"
          >
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
          </Button>

          <div className="flex flex-wrap gap-2 mb-4">
            {Array.isArray(post.tag_list) &&
              post.tag_list.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm px-3 py-1 rounded-full hover:bg-primary/10"
                >
                  #{tag}
                </Badge>
              ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b border-border">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <Avatar className="h-12 w-12 shadow-md ring-2 ring-primary/30">
                <AvatarImage
                  src={post.user.profile_image}
                  alt={post.user.name}
                />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-lg">{post.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  @{post.user.username}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.reading_time_minutes} min read</span>
              </div>
            </div>
          </div>
        </div>

        {post.cover_image && (
          <div className="relative h-[28rem] mb-10 rounded-xl overflow-hidden shadow-lg border">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body_html }}
        />

        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>Page generated at: {new Date(lastGenerated).toLocaleString()}</p>
        </div>
      </article>
    </Suspense>
  );
}

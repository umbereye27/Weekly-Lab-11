// import { Suspense } from "react";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import { getBlogPost, getBlogPosts } from "@/lib/api";
// // import { PostContentSkeleton } from '@/components/ui/loading-skeleton';
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Metadata } from "next";

// export const revalidate = 86400; // Revalidate daily

// export async function generateStaticParams() {
//   const posts = await getBlogPosts();
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const post = await getBlogPost(params.slug);

//   if (!post) {
//     return {
//       title: "Post Not Found",
//     };
//   }

//   return {
//     title: `${post.title} - InsightEdge`,
//     description: post.description,
//     openGraph: {
//       title: post.title,
//       description: post.description,
//       images: [post.cover_image],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post.title,
//       description: post.description,
//       images: [post.cover_image],
//     },
//   };
// }

// export default async function PostPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const post = await getBlogPost(params.slug);

//   if (!post) {
//     notFound();
//   }

//   const lastGenerated = new Date().toISOString();

//   return (
//     <Suspense>
//       <article className="max-w-6xl mx-auto px-4 md:px-6 py-10 bg-background text-foreground">
//   <div className="mb-10">
//     <Button variant="ghost" asChild className="mb-6 px-0 hover:underline text-muted-foreground">
//       <Link href="/" className="flex items-center space-x-2">
//         <ArrowLeft className="h-4 w-4" />
//         <span>Back</span>
//       </Link>
//     </Button>

//     <div className="flex flex-wrap gap-2 mb-4">
//       {Array.isArray(post.tag_list) &&
//         post.tag_list.map((tag) => (
//           <Badge
//             key={tag}
//             variant="secondary"
//             className="text-sm px-3 py-1 rounded-full hover:bg-primary/10"
//           >
//             #{tag}
//           </Badge>
//         ))}
//     </div>

//     <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
//       {post.title}
//     </h1>

//     <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b border-border">
//       <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//         <Avatar className="h-12 w-12 shadow-md ring-2 ring-primary/30">
//           <AvatarImage src={post.user.profile_image} alt={post.user.name} />
//           <AvatarFallback>
//             <User className="h-6 w-6" />
//           </AvatarFallback>
//         </Avatar>
//         <div>
//           <p className="font-medium text-lg">{post.user.name}</p>
//           <p className="text-sm text-muted-foreground">@{post.user.username}</p>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//         <div className="flex items-center space-x-1">
//           <Calendar className="h-4 w-4" />
//           <span>{new Date(post.published_at).toLocaleDateString()}</span>
//         </div>
//         <div className="flex items-center space-x-1">
//           <Clock className="h-4 w-4" />
//           <span>{post.reading_time_minutes} min read</span>
//         </div>
//       </div>
//     </div>
//   </div>

//   {post.cover_image && (
//     <div className="relative h-[28rem] mb-10 rounded-xl overflow-hidden shadow-lg border">
//       <Image
//         src={post.cover_image}
//         alt={post.title}
//         fill
//         className="object-cover"
//         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
//         priority
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//     </div>
//   )}

//   <div
//     className="prose prose-lg prose-invert max-w-none"
//     dangerouslySetInnerHTML={{ __html: post.body_html }}
//   />

//   <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
//     <p>Page generated at: {new Date(lastGenerated).toLocaleString()}</p>
//   </div>
// </article>

//     </Suspense>
//   );
// }


import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPost, getBlogPosts } from '@/lib/api';
// import { PostContentSkeleton } from '@/components/ui/loading-skeleton';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 86400; // Revalidate daily

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
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
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.cover_image],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const lastGenerated = new Date().toISOString();

  return (
    <div className="min-h-screen bg-white">
      <Suspense >
        {/* Header Navigation */}
        <div className="border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Blog</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Category Badge */}
          <div className="mb-6">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm font-medium">
              {post.tag_list[0] || 'Technology'}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>

          {/* Author and Meta Info */}
          <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-100">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.user.profile_image} alt={post.user.name} />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-900">{post.user.name}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{new Date(post.published_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{post.reading_time_minutes} min read</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.cover_image && (
            <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.body_html }}
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {post.tag_list.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={post.user.profile_image} alt={post.user.name} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Written by {post.user.name}
                </h3>
                <p className="text-gray-600 mb-3">
                  @{post.user.username} is a passionate developer sharing insights about technology and web development.
                </p>
                <Button variant="outline" size="sm">
                  Follow @{post.user.username}
                </Button>
              </div>
            </div>
          </div>

          {/* Generation Timestamp */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Page generated at: {new Date(lastGenerated).toLocaleString()}
            </p>
          </div>
        </article>
      </Suspense>

      <style jsx global>{`
        .article-content {
          line-height: 1.8;
        }
        
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
          font-weight: 700;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .article-content h2 {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        
        .article-content h3 {
          font-size: 1.5rem;
          line-height: 2rem;
        }
        
        .article-content p {
          margin-bottom: 1.5rem;
          color: #374151;
          font-size: 1.125rem;
          line-height: 1.8;
        }
        
        .article-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #6b7280;
          background-color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
        }
        
        .article-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
        }
        
        .article-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        
        .article-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
        
        .article-content ul,
        .article-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        
        .article-content li {
          margin-bottom: 0.5rem;
          color: #374151;
          font-size: 1.125rem;
          line-height: 1.8;
        }
        
        .article-content a {
          color: #3b82f6;
          text-decoration: underline;
          text-decoration-color: #93c5fd;
          text-underline-offset: 2px;
        }
        
        .article-content a:hover {
          color: #1d4ed8;
          text-decoration-color: #3b82f6;
        }
        
        .article-content img {
          border-radius: 0.5rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
        }
        
        .article-content th,
        .article-content td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
          text-align: left;
        }
        
        .article-content th {
          background-color: #f9fafb;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
"use client";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function PostsList() {
  const [articles, setArticles] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("https://dev.to/api/articles");
      const data = await res.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);
  return (
    <div className="bg-background text-foreground max-w-6xl mx-auto py-26">
      <h2 className="text-2xl font-bold py-4">Latest Post</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 9).map((article, i) => (
          <BlogCard
            key={i}
            image={article.cover_image || "/Image.png"}
            tag={article.tag_list ? article.tag_list[0] : "Technology"}
            title={article.title}
            author={
              article.user?.name || article.user?.username || "Unknown Author"
            }
            authorImage={article.user?.profile_image || "/Image.png"}
            date={article.readable_publish_date || "Unknown Date"}
            id={article.id}
          />
        ))}
      </div>
      <div className="flex justify-center py-4 bg-background">
        <Button className="font-extralight">View All Post</Button>
      </div>
    </div>
  );
}

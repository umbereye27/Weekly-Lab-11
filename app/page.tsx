import Navbar from "@/components/NavigationBar";
import HomePage from "@/components/HomeContent";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
const dummyData = Array.from({ length: 9 }, (_, i) => ({
  image: "/Image.png",
  tag: "Technology",
  title: `The Impact of Technology #${i + 1}`,
  author: "Tracey Wilson",
  authorImage: "/Image.png",
  date: "August 20, 2022",
}));
export default function Home() {
  return (
    <div>
     
      <HomePage />
      <div className="bg-background text-foreground max-w-6xl mx-auto py-26">
        <h2 className="text-2xl font-bold py-4">Latest Post</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyData.map((data, i) => (
            <BlogCard key={i} {...data} />
          ))}
        </div>
        <div className="flex justify-center py-4 bg-background">
          <Button className="font-extralight">View All Post</Button>
        </div>
      </div>
    </div>
   
  );
}

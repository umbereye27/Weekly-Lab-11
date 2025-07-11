import NavigationBar from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <main className="flex gap-8 justify-center ">
        <h1 className="text-red-300 text-2xl ">Home Page</h1>
        <Button>Home</Button>

      </main>
    
    </div>
  );
}

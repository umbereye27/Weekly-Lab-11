"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Protected = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="h-screen bg-background text-foreground w-screen flex flex-col justify-center items-center gap-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
        <p className="text-lg">Hello, {session.user?.name}</p>
        <p className="text-muted-foreground">{session.user?.email}</p>
      </div>
      <Button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="w-40"
        variant="secondary"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Protected;

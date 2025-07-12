"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";

export default function LoginPage() {
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleOAuthSignIn = async (provider: string) => {
    setOauthLoading(provider);
    try {
      const res = await signIn(provider, { redirectTo: "/dashboard" });
      console.log("res: ", res);
    } catch (error) {
      toast({
        title: "Sign In Failed",
        description: `Failed to sign in with ${provider}. Please try again.`,
      });
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in with your Google account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("google")}
              disabled={!!oauthLoading}
              className="w-full h-12"
            >
              {oauthLoading === "google" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

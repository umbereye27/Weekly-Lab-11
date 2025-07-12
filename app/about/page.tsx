import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Zap, Shield, BarChart3, Image, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About - InsightEdge",
  description:
    "Learn about InsightEdge, a performance-focused blog reader built with Next.js",
};

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Curated Content",
      description:
        "High-quality blog posts from dev.to, carefully selected for relevance and insights.",
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description:
        "Built with Next.js 13+ App Router, ISR, and Web Vitals tracking for optimal performance.",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "NextAuth.js integration with multiple providers for secure user management.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Real-time Web Vitals monitoring and performance metrics visualization.",
    },
    {
      icon: Image,
      title: "Image Optimization",
      description:
        "next/image with blur placeholders and WebP format for faster loading.",
    },
    {
      icon: Users,
      title: "User Experience",
      description:
        "Responsive design with dark mode support and intuitive navigation.",
    },
  ];

  const technologies = [
    "Next.js 13+",
    "React 18",
    "TypeScript",
    "Tailwind CSS",
    "NextAuth.js",
    "Web Vitals",
    "Recharts",
    "Shadcn/ui",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About InsightEdge</h1>
          <p className="text-xl  max-w-3xl mx-auto">
            InsightEdge is a performance-focused blog reader designed to
            showcase modern web development best practices. Built with Next.js
            13+, it demonstrates advanced features like ISR, Web Vitals
            tracking, and optimized image delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Technologies Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• Incremental Static Regeneration (ISR)</li>
                <li>• Web Vitals tracking and visualization</li>
                <li>• Optimized image delivery with blur placeholders</li>
                <li>• Middleware for logging and access control</li>
                <li>• Protected routes with NextAuth.js</li>
                <li>• Responsive design with Tailwind CSS</li>
                <li>• SEO optimization with metadata</li>
                <li>• Manual revalidation API endpoints</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Learning Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This project serves as a comprehensive example of modern Next.js
              development, demonstrating best practices for performance,
              security, and user experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Performance Optimization</h4>
                <ul className="text-sm  space-y-1">
                  <li>• Image optimization with next/image</li>
                  <li>• Static generation with ISR</li>
                  <li>• Web Vitals monitoring</li>
                  <li>• Efficient data fetching</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Advanced Features</h4>
                <ul className="text-sm space-y-1">
                  <li>• Authentication and authorization</li>
                  <li>• Middleware implementation</li>
                  <li>• Dynamic routing and layouts</li>
                  <li>• API route handlers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

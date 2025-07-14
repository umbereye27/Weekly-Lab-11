"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WebVitalsChart } from "@/components/dashboard/web-vitals-chart";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Activity, TrendingUp, Users, BookOpen } from "lucide-react";

const Protected = () => {
  const stats = [
    {
      title: "Total Posts",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: BookOpen,
    },
    {
      title: "Active Users",
      value: "892",
      change: "+8%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Avg. Load Time",
      value: "1.2s",
      change: "-5%",
      trend: "down",
      icon: Activity,
    },
    {
      title: "Performance Score",
      value: "95",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

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
    // <div className="h-screen bg-background text-foreground w-screen flex flex-col justify-center items-center gap-10">
    //   <div className="text-center">
    //     <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
    //     <p className="text-lg">Hello, {session.user?.name}</p>
    //     <p className="text-muted-foreground">{session.user?.email}</p>
    //   </div>
    //   <Button
    //     onClick={() => signOut({ callbackUrl: "/" })}
    //     className="w-40"
    //     variant="secondary"
    //   >
    //     Sign Out
    //   </Button>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-gray-600">
                Welcome back, {session.user?.name}!
              </p>
              {session.user?.name && (
                <Badge variant="secondary" className="text-xs">
                  {session.user.email}
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Web Vitals</CardTitle>
            <p className="text-gray-600">
              Real-time performance metrics for your application
            </p>
          </CardHeader>
          <CardContent>
            <WebVitalsChart />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">New post published</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Page revalidated</p>
                    <p className="text-xs text-gray-500">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Performance alert</p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Status</span>
                  <span className="text-sm font-medium text-green-600">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <span className="text-sm font-medium text-green-600">
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">CDN</span>
                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Authentication</span>
                  <span className="text-sm font-medium text-green-600">
                    Online
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Protected;

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { WebVitalsMetric, getWebVitals } from '@/lib/web-vitals';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function WebVitalsChart() {
  const [vitals, setVitals] = useState<WebVitalsMetric[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(getWebVitals());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const latestVitals = vitals.reduce((acc, vital) => {
    const existing = acc.find(v => v.name === vital.name);
    if (!existing || vital.timestamp > existing.timestamp) {
      const index = acc.findIndex(v => v.name === vital.name);
      if (index >= 0) {
        acc[index] = vital;
      } else {
        acc.push(vital);
      }
    }
    return acc;
  }, [] as WebVitalsMetric[]);

  const chartData = vitals.map(vital => ({
    name: vital.name,
    value: vital.value,
    timestamp: new Date(vital.timestamp).toLocaleTimeString(),
  }));

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'bg-green-500';
      case 'needs-improvement': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good': return <TrendingUp className="h-4 w-4" />;
      case 'needs-improvement': return <Minus className="h-4 w-4" />;
      case 'poor': return <TrendingDown className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestVitals.map((vital) => (
          <Card key={vital.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{vital.name}</CardTitle>
              <div className={`p-2 rounded-full ${getRatingColor(vital.rating)}`}>
                {getRatingIcon(vital.rating)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vital.value.toFixed(2)}</div>
              <div className="flex items-center justify-between mt-2">
                <Badge variant={vital.rating === 'good' ? 'default' : vital.rating === 'needs-improvement' ? 'secondary' : 'destructive'}>
                  {vital.rating}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {new Date(vital.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Web Vitals Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
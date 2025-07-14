import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
  timestamp: number;
}

const vitalsData: WebVitalsMetric[] = [];

export function reportWebVitals(metric: any) {
  const webVitalsMetric: WebVitalsMetric = {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
    timestamp: Date.now(),
  };

  vitalsData.push(webVitalsMetric);
  
  // Log to console for debugging
  console.log('Web Vitals:', webVitalsMetric);
  
  // In a real app, you'd send this to your analytics service
  // analytics.track('Web Vitals', webVitalsMetric);
}

export function getWebVitals(): WebVitalsMetric[] {
  return vitalsData;
}

export function initWebVitals() {
  onCLS(reportWebVitals);
  onINP(reportWebVitals);
  onFCP(reportWebVitals);
  onLCP(reportWebVitals);
  onTTFB(reportWebVitals);
}
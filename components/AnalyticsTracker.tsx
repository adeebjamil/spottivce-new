import { useEffect } from 'react';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    pageStartTime?: number;
  }
}

export default function AnalyticsTracker() {
  const router = useRouter();

  useEffect(() => {
    // Generate or get session ID
    let sessionId = sessionStorage.getItem('analytics_session');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session', sessionId);
    }

    // Track page view
    const trackPageView = async (path: string) => {
      try {
        console.log('📊 Tracking visitor:', {
          sessionId,
          path,
          device: /Mobile|Android|iPhone/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          timestamp: new Date().toISOString()
        });

        const response = await fetch('/api/analytics/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            userAgent: navigator.userAgent,
            path,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            timeOnSite: Date.now() - (window.pageStartTime || Date.now())
          }),
        });

        const result = await response.json();
        console.log('✅ Analytics response:', result);
      } catch (error) {
        console.error('❌ Analytics tracking failed:', error);
      }
    };

    // Track initial page load
    window.pageStartTime = Date.now();
    trackPageView(router.asPath);

    // Track route changes
    const handleRouteChange = (url: string) => {
      window.pageStartTime = Date.now();
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return null;
}
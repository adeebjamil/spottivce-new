import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AnalyticsTracker() {
  const router = useRouter();
  
  useEffect(() => {
    let startTime = Date.now();
    
    // Handle page unload to track time on site
    const handleBeforeUnload = async () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      try {
        // Use Navigator.sendBeacon for more reliable sending during page unload
        if (navigator.sendBeacon) {
          const blob = new Blob([
            JSON.stringify({
              path: router.pathname,
              timeOnSite: timeSpent
            })
          ], { type: 'application/json' });
          
          navigator.sendBeacon('/api/analytics/update-time', blob);
        } else {
          // Fallback to fetch
          await fetch('/api/analytics/update-time', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              path: router.pathname,
              timeOnSite: timeSpent
            }),
            // Keeping it short to increase chances of completion
            keepalive: true
          });
        }
      } catch (error) {
        console.error('Error updating time on site', error);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router.pathname]);
  
  return null;
}
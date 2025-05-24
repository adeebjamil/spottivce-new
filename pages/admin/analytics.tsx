import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AnalyticsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center h-full">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">View website and business analytics</p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Analytics page coming soon...</p>
      </div>
    </div>
  );
};

export default AnalyticsPage;
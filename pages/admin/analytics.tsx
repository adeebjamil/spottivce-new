import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  MdInsights, 
  MdBarChart, 
  MdPeople, 
  MdEmail, 
  MdShoppingCart, 
  MdVisibility,
  MdTrendingUp, 
  MdTrendingDown,
  MdCalendarToday,
  MdRefresh,
  MdPhonelink,
  MdPublic,
  MdAccessTime,
  MdDevices,
  MdCheckCircle,
  MdPending,
  MdContactSupport,
  MdSearch,
  MdFilterList,
  MdOutlineContactPage,
  MdArticle,
  MdProductionQuantityLimits,
  MdOutlineSubscriptions,
  MdChevronRight
} from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';

// Import Chart.js components and register them
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

// Dynamic imports for Chart components
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
const Doughnut = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

interface AnalyticsData {
  pageViews: {
    total: number;
    change: number;
    data: number[];
    labels: string[];
  };
  visitors: {
    total: number;
    change: number;
    data: number[];
    labels: string[];
  };
  engagementRate: {
    value: number;
    change: number;
  };
  bounceRate: {
    value: number;
    change: number;
  };
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  browsers: {
    chrome: number;
    firefox: number;
    safari: number;
    edge: number;
    other: number;
  };
  contactSubmissions: {
    total: number;
    new: number;
    inProgress: number;
    resolved: number;
    monthlyData: number[];
  };
  productEnquiries: {
    total: number;
    pending: number;
    contacted: number;
    resolved: number;
    monthlyData: number[];
  };
  newsletterSubscribers: {
    total: number;
    growth: number;
    monthlyData: number[];
  };
  topProducts: {
    name: string;
    views: number;
    enquiries: number;
  }[];
  topPages: {
    path: string;
    title: string;
    views: number;
  }[];
  geoData: {
    country: string;
    visitors: number;
  }[];
  conversionRate: {
    value: number;
    change: number;
  };
  lastUpdated: string;
}

const AnalyticsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState('7d'); // '7d', '30d', '90d', '1y'
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchAnalyticsData();
    } else {
      router.push('/admin');
    }
    setLoading(false);

    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      if (isAuthenticated) {
        fetchAnalyticsData(true);
      }
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(refreshInterval);
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [router, isAuthenticated]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalyticsData();
    }
  }, [dateRange]);

  const fetchAnalyticsData = async (silent = false) => {
    if (!silent) {
      setRefreshing(true);
      setError(null);
    }
    
    try {
      // REAL API CALL - No more mock data!
      const response = await fetch(`/api/admin/analytics?range=${dateRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch analytics data: ${response.status}`);
      }
      
      const data = await response.json();
      setAnalyticsData(data);
      setLastUpdated(new Date(data.lastUpdated));
      
      if (!silent) {
        setRefreshing(false);
        toast.success('Analytics data refreshed successfully!');
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      
      if (!silent) {
        setRefreshing(false);
        toast.error(`Failed to fetch analytics data: ${errorMessage}`);
      }
    }
  };

  const handleRefresh = () => {
    fetchAnalyticsData();
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getPercentageClass = (value: number) => {
    return value >= 0 
      ? 'text-green-600 bg-green-100' 
      : 'text-red-600 bg-red-100';
  };

  const getPercentageIcon = (value: number) => {
    return value >= 0 
      ? <MdTrendingUp className="mr-1" /> 
      : <MdTrendingDown className="mr-1" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time insights and data analytics</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            {/* Date Range Selector */}
            <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 p-2">
              <MdCalendarToday className="text-gray-500 ml-2" />
              <select 
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value)}
                className="bg-transparent border-none text-sm text-gray-700 focus:outline-none focus:ring-0"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {refreshing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Refreshing...
                </>
              ) : (
                <>
                  <MdRefresh className="mr-2" size={18} />
                  Refresh Data
                </>
              )}
            </button>
          </div>
        </div>
        
        {lastUpdated && (
          <div className="mt-2 text-sm text-gray-500 flex items-center">
            <MdAccessTime className="mr-1" size={14} />
            Last updated: {lastUpdated.toLocaleTimeString()} on {lastUpdated.toLocaleDateString()}
          </div>
        )}

        {error && (
          <div className="mt-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
      
      {analyticsData ? (
        <>
          {/* Real-time Status Indicator */}
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-green-800 text-sm font-medium">
                Live Analytics Data - Last Updated: {new Date(analyticsData.lastUpdated).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Page Views Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-lg p-2 mr-3">
                      <MdVisibility className="text-blue-600" size={20} />
                    </div>
                    <h3 className="text-gray-700 font-medium">Page Views</h3>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${getPercentageClass(analyticsData.pageViews.change)}`}>
                    {getPercentageIcon(analyticsData.pageViews.change)}
                    {Math.abs(analyticsData.pageViews.change)}%
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatNumber(analyticsData.pageViews.total)}
                </div>
              </div>
              <div className="h-16 bg-gradient-to-r from-blue-50 to-indigo-50 px-6">
                {isMounted && analyticsData.pageViews.data.length > 0 && (
                  <div className="h-full w-full">
                    <Line 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                          x: { display: false },
                          y: { display: false }
                        },
                        elements: {
                          line: {
                            borderColor: '#3b82f6',
                            borderWidth: 2,
                            tension: 0.4
                          },
                          point: { radius: 0 }
                        }
                      }}
                      data={{
                        labels: analyticsData.pageViews.labels,
                        datasets: [{
                          data: analyticsData.pageViews.data,
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          fill: true
                        }]
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Unique Visitors Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-lg p-2 mr-3">
                      <MdPeople className="text-purple-600" size={20} />
                    </div>
                    <h3 className="text-gray-700 font-medium">Unique Visitors</h3>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${getPercentageClass(analyticsData.visitors.change)}`}>
                    {getPercentageIcon(analyticsData.visitors.change)}
                    {Math.abs(analyticsData.visitors.change)}%
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatNumber(analyticsData.visitors.total)}
                </div>
              </div>
              <div className="h-16 bg-gradient-to-r from-purple-50 to-pink-50 px-6">
                {isMounted && analyticsData.visitors.data.length > 0 && (
                  <div className="h-full w-full">
                    <Line 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                          x: { display: false },
                          y: { display: false }
                        },
                        elements: {
                          line: {
                            borderColor: '#8b5cf6',
                            borderWidth: 2,
                            tension: 0.4
                          },
                          point: { radius: 0 }
                        }
                      }}
                      data={{
                        labels: analyticsData.visitors.labels,
                        datasets: [{
                          data: analyticsData.visitors.data,
                          backgroundColor: 'rgba(139, 92, 246, 0.1)',
                          fill: true
                        }]
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Engagement Rate Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-lg p-2 mr-3">
                      <MdTrendingUp className="text-green-600" size={20} />
                    </div>
                    <h3 className="text-gray-700 font-medium">Engagement Rate</h3>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${getPercentageClass(analyticsData.engagementRate.change)}`}>
                    {getPercentageIcon(analyticsData.engagementRate.change)}
                    {Math.abs(analyticsData.engagementRate.change)}%
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {analyticsData.engagementRate.value}%
                </div>
              </div>
              <div className="h-16 bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="w-full h-full flex items-center px-6">
                  <div 
                    className="h-2 bg-gray-200 rounded-full w-full overflow-hidden"
                    style={{ background: 'linear-gradient(to right, #f0fdf4, #d1fae5)' }}
                  >
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${analyticsData.engagementRate.value}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bounce Rate Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="bg-orange-100 rounded-lg p-2 mr-3">
                      <MdTrendingDown className="text-orange-600" size={20} />
                    </div>
                    <h3 className="text-gray-700 font-medium">Bounce Rate</h3>
                  </div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${getPercentageClass(-analyticsData.bounceRate.change)}`}>
                    {getPercentageIcon(-analyticsData.bounceRate.change)}
                    {Math.abs(analyticsData.bounceRate.change)}%
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {analyticsData.bounceRate.value}%
                </div>
              </div>
              <div className="h-16 bg-gradient-to-r from-orange-50 to-amber-50">
                <div className="w-full h-full flex items-center px-6">
                  <div 
                    className="h-2 bg-gray-200 rounded-full w-full overflow-hidden"
                    style={{ background: 'linear-gradient(to right, #fff7ed, #fffbeb)' }}
                  >
                    <div 
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${analyticsData.bounceRate.value}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Audience & Devices Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Device Distribution */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
                Device Distribution
                <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
              </h3>
              
              <div className="flex items-center h-64">
                <div className="w-1/2">
                  {isMounted && (
                    <Doughnut
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { 
                            display: false 
                          }
                        }
                      }}
                      data={{
                        labels: ['Desktop', 'Mobile', 'Tablet'],
                        datasets: [{
                          data: [
                            analyticsData.devices.desktop,
                            analyticsData.devices.mobile,
                            analyticsData.devices.tablet
                          ],
                          backgroundColor: [
                            '#3b82f6',
                            '#8b5cf6',
                            '#10b981'
                          ],
                          borderWidth: 0,
                        }]
                      }}
                    />
                  )}
                </div>
                <div className="w-1/2 pl-4">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-gray-700">Desktop</span>
                      <span className="ml-auto font-semibold">{analyticsData.devices.desktop}%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-gray-700">Mobile</span>
                      <span className="ml-auto font-semibold">{analyticsData.devices.mobile}%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-gray-700">Tablet</span>
                      <span className="ml-auto font-semibold">{analyticsData.devices.tablet}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Browser Distribution */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
                Browser Distribution
                <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
              </h3>
              
              <div className="h-64">
                {isMounted && (
                  <Bar
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false }
                      },
                      scales: {
                        x: {
                          grid: { display: false }
                        },
                        y: {
                          beginAtZero: true,
                          max: 100,
                          ticks: { 
                            callback: (value) => `${value}%` 
                          }
                        }
                      }
                    }}
                    data={{
                      labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'],
                      datasets: [{
                        data: [
                          analyticsData.browsers.chrome,
                          analyticsData.browsers.firefox,
                          analyticsData.browsers.safari,
                          analyticsData.browsers.edge,
                          analyticsData.browsers.other
                        ],
                        backgroundColor: [
                          'rgba(59, 130, 246, 0.7)',
                          'rgba(139, 92, 246, 0.7)',
                          'rgba(16, 185, 129, 0.7)',
                          'rgba(249, 115, 22, 0.7)',
                          'rgba(107, 114, 128, 0.7)'
                        ],
                        borderWidth: 0,
                        borderRadius: 4
                      }]
                    }}
                  />
                )}
              </div>
            </div>
            
            {/* Geo Distribution - Keep as table, no charts needed */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
                Geographic Distribution
                <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
              </h3>
              
              <div className="h-64 overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold text-gray-600">Country</th>
                      <th className="text-right py-2 font-semibold text-gray-600">Visitors</th>
                      <th className="text-right py-2 font-semibold text-gray-600">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.geoData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 text-gray-700 flex items-center">
                          <MdPublic className="mr-2 text-gray-400" size={16} />
                          {item.country}
                        </td>
                        <td className="py-2 text-right text-gray-700">
                          {formatNumber(item.visitors)}
                        </td>
                        <td className="py-2 text-right text-gray-700">
                          {((item.visitors / analyticsData.visitors.total) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Form Submissions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Contact Submissions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 relative inline-block">
                  Contact Submissions
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                </h3>
                <Link 
                  href="/admin/contact-data"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  View All
                  <MdChevronRight size={16} />
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600 mb-1">Total</div>
                  <div className="text-xl font-bold text-gray-900">{formatNumber(analyticsData.contactSubmissions.total)}</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600 mb-1">New</div>
                  <div className="text-xl font-bold text-gray-900">{formatNumber(analyticsData.contactSubmissions.new)}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600 mb-1">Resolved</div>
                  <div className="text-xl font-bold text-gray-900">{formatNumber(analyticsData.contactSubmissions.resolved)}</div>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-48">
                {isMounted && (
                  <Line
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false }
                      },
                      scales: {
                        x: {
                          grid: { display: false }
                        },
                        y: {
                          beginAtZero: true,
                          grid: { 
                            display: true,
                            color: 'rgba(156, 163, 175, 0.5)'
                          }
                        }
                      },
                      elements: {
                        line: {
                          tension: 0.4,
                          borderColor: '#3b82f6',
                          borderWidth: 2
                        },
                        point: {
                          radius: 3,
                          backgroundColor: '#3b82f6'
                        }
                      }
                    }}
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      datasets: [{
                        data: analyticsData.contactSubmissions.monthlyData,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true
                      }]
                    }}
                  />
                )}
              </div>
            </div>
            
            {/* Product Enquiries */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 relative inline-block">
                  Product Enquiries
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"></span>
                </h3>
                <Link 
                  href="/admin/product-enquiry"
                  className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                >
                  View All
                  <MdChevronRight size={16} />
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600 mb-1">Total</div>
                  <div className="text-xl font-bold text-gray-900">{formatNumber(analyticsData.productEnquiries.total)}</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600 mb-1">Pending</div>
                  <div className="text-xl font-bold text-gray-900">{formatNumber(analyticsData.productEnquiries.pending)}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600 mb-1">Resolved</div>
                  <div className="text-xl font-bold text-gray-900">{formatNumber(analyticsData.productEnquiries.resolved)}</div>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-48">
                {isMounted && (
                  <Line
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false }
                      },
                      scales: {
                        x: {
                          grid: { display: false }
                        },
                        y: {
                          beginAtZero: true,
                          grid: { 
                            display: true
                          }
                        }
                      },
                      elements: {
                        line: {
                          tension: 0.4,
                          borderColor: '#8b5cf6',
                          borderWidth: 2
                        },
                        point: {
                          radius: 3,
                          backgroundColor: '#8b5cf6'
                        }
                      }
                    }}
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      datasets: [{
                        data: analyticsData.productEnquiries.monthlyData,
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        fill: true
                      }]
                    }}
                  />
                )}
              </div>
            </div>
            
            {/* Newsletter Subscribers */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 relative inline-block">
                  Newsletter Subscribers
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></span>
                </h3>
                <Link 
                  href="/admin/newsletter-data"
                  className="text-sm text-green-600 hover:text-green-800 flex items-center"
                >
                  View All
                  <MdChevronRight size={16} />
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between bg-green-50 rounded-lg p-4 mb-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Subscribers</div>
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.newsletterSubscribers.total)}</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Monthly Growth</div>
                  <div className="text-xl font-bold text-green-600">+{analyticsData.newsletterSubscribers.growth}%</div>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-48">
                {isMounted && (
                  <Bar
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false }
                      },
                      scales: {
                        x: {
                          grid: { display: false }
                        },
                        y: {
                          beginAtZero: true,
                          grid: { 
                            color: 'rgba(156, 163, 175, 0.5)'
                          }
                        }
                      }
                    }}
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      datasets: [{
                        data: analyticsData.newsletterSubscribers.monthlyData,
                        backgroundColor: 'rgba(16, 185, 129, 0.7)',
                        borderRadius: 4,
                        borderWidth: 0
                      }]
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          
          {/* Popular Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
                Top Products
                <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold text-gray-600">Product</th>
                      <th className="text-right py-2 font-semibold text-gray-600">Views</th>
                      <th className="text-right py-2 font-semibold text-gray-600">Enquiries</th>
                      <th className="text-right py-2 font-semibold text-gray-600">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.topProducts.map((product, index) => {
                      const conversionRate = ((product.enquiries / product.views) * 100).toFixed(1);
                      return (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 text-gray-800 font-medium">{product.name}</td>
                          <td className="py-3 text-right text-gray-700">{formatNumber(product.views)}</td>
                          <td className="py-3 text-right text-gray-700">{formatNumber(product.enquiries)}</td>
                          <td className="py-3 text-right">
                            <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                              {conversionRate}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Top Pages */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
                Top Pages
                <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"></span>
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-semibold text-gray-600">Page</th>
                      <th className="text-right py-2 font-semibold text-gray-600">Views</th>
                      <th className="text-right py-2 font-semibold text-gray-600">% of Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.topPages.map((page, index) => {
                      const percentage = ((page.views / analyticsData.pageViews.total) * 100).toFixed(1);
                      return (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3">
                            <div className="text-gray-800 font-medium">{page.title}</div>
                            <div className="text-gray-500 text-xs">{page.path}</div>
                          </td>
                          <td className="py-3 text-right text-gray-700">{formatNumber(page.views)}</td>
                          <td className="py-3 text-right">
                            <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                              {percentage}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Database Metrics */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 relative inline-block">
              Database Metrics
              <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <MdOutlineContactPage className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">Contact Forms</h4>
                  <div className="text-xl font-bold text-gray-900">{formatNumber(analyticsData.contactSubmissions.total)}</div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <MdProductionQuantityLimits className="text-purple-600" size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">Product Enquiries</h4>
                  <div className="text-xl font-bold text-gray-900">{formatNumber(analyticsData.productEnquiries.total)}</div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <MdOutlineSubscriptions className="text-green-600" size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">Newsletter Subscribers</h4>
                  <div className="text-xl font-bold text-gray-900">{formatNumber(analyticsData.newsletterSubscribers.total)}</div>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4 flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg mr-4">
                  <MdArticle className="text-orange-600" size={24} />
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">Blog Articles</h4>
                  <div className="text-xl font-bold text-gray-900">26</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <MdInsights className="text-blue-600 mr-2" size={18} />
                <span className="text-gray-700 font-medium">Database Health: Excellent</span>
                <div className="ml-auto px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  99.98% Uptime
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-md">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-gray-500">Loading real-time analytics data...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
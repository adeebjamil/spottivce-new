// filepath: c:\Users\USER\Desktop\spo\my-project\pages\admin\dashboard.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  MdInventory, 
  MdDescription, 
  MdAssignment, 
  MdContactPhone, 
  MdContacts,
  MdRefresh,
  MdAccessTime,
  MdArrowForward,
  MdOutlineArrowUpward,
  MdOutlineArrowDownward
} from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define interfaces for each data type
interface ProductData {
  total: number;
  recent: Array<{
    id: string;
    name: string;
    timestamp: string;
  }>;
  change: number;
}

interface ProductDetailData {
  total: number;
  recent: Array<{
    id: string;
    productName: string;
    detailType: string;
    timestamp: string;
  }>;
  change: number;
}

interface ProductAssignmentData {
  total: number;
  recent: Array<{
    id: string;
    productName: string;
    brandName: string;
    timestamp: string;
  }>;
  change: number;
}

interface ProductEnquiryData {
  total: number;
  recent: Array<{
    id: string;
    productName: string;
    customerName: string;
    status: string;
    timestamp: string;
  }>;
  pending: number;
  resolved: number;
}

interface ContactData {
  total: number;
  recent: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    status: string;
    timestamp: string;
  }>;
  pending: number;
  resolved: number;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const router = useRouter();

  // State for all required data
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [productDetailData, setProductDetailData] = useState<ProductDetailData | null>(null);
  const [productAssignmentData, setProductAssignmentData] = useState<ProductAssignmentData | null>(null);
  const [productEnquiryData, setProductEnquiryData] = useState<ProductEnquiryData | null>(null);
  const [contactData, setContactData] = useState<ContactData | null>(null);

  // Function to fetch all dashboard data
  const fetchDashboardData = useCallback(async (silent = false) => {
    if (!silent) {
      setRefreshing(true);
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem('adminToken');
      
      // Make authenticated request
      const response = await fetch('/api/admin/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}` // Include token in Authorization header
        }
      });
      
      if (!response.ok) {
        // Handle unauthorized error
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          router.push('/admin');
          toast.error('Session expired or access denied. Please log in again.');
          return;
        }
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Set all the data states
      setProductData(data.productData);
      setProductDetailData(data.productDetailData);
      setProductAssignmentData(data.productAssignmentData);
      setProductEnquiryData(data.productEnquiryData);
      setContactData(data.contactData);
      setLastUpdated(new Date(data.lastUpdated));
      
      if (!silent) {
        setRefreshing(false);
        toast.success('Dashboard data refreshed successfully!');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (!silent) {
        setRefreshing(false);
        toast.error('Failed to refresh dashboard data');
      }
    }
  }, [router]);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      router.push('/admin');
    }
    setLoading(false);

    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      if (isAuthenticated) {
        fetchDashboardData(true);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [router, isAuthenticated, fetchDashboardData]);

  // Function to format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to calculate time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hr ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day ago`;
  };

  // Function to get status badge style
  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to render change indicator
  const renderChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
          <MdOutlineArrowUpward className="mr-0.5" />
          {change}%
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
          <MdOutlineArrowDownward className="mr-0.5" />
          {Math.abs(change)}%
        </div>
      );
    }
    return null;
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
      
      {/* Dashboard Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Real-time data from Spottive Technologies database</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <button
            onClick={() => fetchDashboardData()}
            disabled={refreshing}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {refreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Refreshing...
              </>
            ) : (
              <>
                <MdRefresh className="mr-2" />
                Refresh Data
              </>
            )}
          </button>
          
          {lastUpdated && (
            <div className="ml-4 text-sm text-gray-500 flex items-center">
              <MdAccessTime className="mr-1" size={14} />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Products Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-2 mr-3">
                  <MdInventory className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-gray-700 font-medium">Products</h3>
                  <div className="text-2xl font-bold text-gray-900">
                    {productData?.total || 0}
                  </div>
                </div>
              </div>
              {productData && renderChangeIndicator(productData.change)}
            </div>
          </div>
          <Link href="/admin/products" className="block p-4 text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors">
            <div className="flex items-center justify-between">
              <span>View All Products</span>
              <MdArrowForward size={16} />
            </div>
          </Link>
        </div>
        
        {/* Product Details Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-lg p-2 mr-3">
                  <MdDescription className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-gray-700 font-medium">Product Details</h3>
                  <div className="text-2xl font-bold text-gray-900">
                    {productDetailData?.total || 0}
                  </div>
                </div>
              </div>
              {productDetailData && renderChangeIndicator(productDetailData.change)}
            </div>
          </div>
          <Link href="/admin/product-details" className="block p-4 text-purple-600 hover:bg-purple-50 text-sm font-medium transition-colors">
            <div className="flex items-center justify-between">
              <span>View All Details</span>
              <MdArrowForward size={16} />
            </div>
          </Link>
        </div>
        
        {/* Product Assignments Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-2 mr-3">
                  <MdAssignment className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-gray-700 font-medium">Product Assignments</h3>
                  <div className="text-2xl font-bold text-gray-900">
                    {productAssignmentData?.total || 0}
                  </div>
                </div>
              </div>
              {productAssignmentData && renderChangeIndicator(productAssignmentData.change)}
            </div>
          </div>
          <Link href="/admin/product-assignment" className="block p-4 text-green-600 hover:bg-green-50 text-sm font-medium transition-colors">
            <div className="flex items-center justify-between">
              <span>View All Assignments</span>
              <MdArrowForward size={16} />
            </div>
          </Link>
        </div>
        
        {/* Product Enquiries Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-lg p-2 mr-3">
                  <MdContactPhone className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="text-gray-700 font-medium">Product Enquiries</h3>
                  <div className="text-2xl font-bold text-gray-900">
                    {productEnquiryData?.total || 0}
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                {productEnquiryData?.pending || 0} pending
              </div>
            </div>
          </div>
          <Link href="/admin/product-enquiry" className="block p-4 text-orange-600 hover:bg-orange-50 text-sm font-medium transition-colors">
            <div className="flex items-center justify-between">
              <span>View All Enquiries</span>
              <MdArrowForward size={16} />
            </div>
          </Link>
        </div>
        
        {/* Contact Data Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-teal-100 rounded-lg p-2 mr-3">
                  <MdContacts className="text-teal-600" size={24} />
                </div>
                <div>
                  <h3 className="text-gray-700 font-medium">Contact Submissions</h3>
                  <div className="text-2xl font-bold text-gray-900">
                    {contactData?.total || 0}
                  </div>
                </div>
              </div>
              <div className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                {contactData?.pending || 0} pending
              </div>
            </div>
          </div>
          <Link href="/admin/contact-data" className="block p-4 text-teal-600 hover:bg-teal-50 text-sm font-medium transition-colors">
            <div className="flex items-center justify-between">
              <span>View All Submissions</span>
              <MdArrowForward size={16} />
            </div>
          </Link>
        </div>
      </div>
      
      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <MdInventory className="mr-2 text-blue-600" />
              Recent Products
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {productData?.recent.map(product => (
              <div key={product.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 font-medium">{product.name}</h4>
                    <div className="text-sm text-gray-500">
                      Product ID: {product.id}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {getTimeAgo(product.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Product Details */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <MdDescription className="mr-2 text-purple-600" />
              Recent Product Details
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {productDetailData?.recent.map(detail => (
              <div key={detail.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 font-medium">{detail.productName}</h4>
                    <div className="text-sm text-gray-500">
                      Type: {detail.detailType}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {getTimeAgo(detail.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Product Assignments */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <MdAssignment className="mr-2 text-green-600" />
              Recent Product Assignments
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {productAssignmentData?.recent.map(assignment => (
              <div key={assignment.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 font-medium">{assignment.productName}</h4>
                    <div className="text-sm text-gray-500">
                      Brand: {assignment.brandName}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {getTimeAgo(assignment.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Product Enquiries */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <MdContactPhone className="mr-2 text-orange-600" />
              Recent Product Enquiries
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {productEnquiryData?.recent.map(enquiry => (
              <div key={enquiry.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 font-medium">{enquiry.productName}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">
                        From: {enquiry.customerName}
                      </div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeStyle(enquiry.status)}`}>
                        {enquiry.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {getTimeAgo(enquiry.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Contact Submissions */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <MdContacts className="mr-2 text-teal-600" />
              Recent Contact Submissions
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {contactData?.recent.map(contact => (
              <div key={contact.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 font-medium">{contact.subject}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">
                        From: {contact.name}
                      </div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeStyle(contact.status)}`}>
                        {contact.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {getTimeAgo(contact.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
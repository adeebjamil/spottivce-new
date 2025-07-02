import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  MdEmail,
  MdDelete,
  MdCheckCircle,
  MdCancel,
  MdSearch,
  MdFilterList,
  MdDownload,
  MdPeople,
  MdTrendingUp,
  MdCalendarToday,
  MdVerified
} from 'react-icons/md';
import { toast } from 'react-toastify';

interface NewsletterSubscriber {
  _id: string;
  email: string;
  source: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  preferences?: {
    security_tips: boolean;
    product_updates: boolean;
    industry_news: boolean;
  };
}

interface NewsletterStats {
  total: number;
  active: number;
  thisMonth: number;
  growth: string;
}

const NewsletterDataPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [stats, setStats] = useState<NewsletterStats>({
    total: 0,
    active: 0,
    thisMonth: 0,
    growth: '0'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchNewsletterData();
    } else {
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  // Fetch newsletter data from API
  const fetchNewsletterData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('/api/admin/newsletter', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        setSubscribers(result.data.subscribers);
        setFilteredSubscribers(result.data.subscribers);
        setStats(result.data.stats);
      } else {
        // If unauthorized (401), redirect to login
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          router.push('/admin');
          toast.error('Session expired. Please log in again.');
          return;
        }
        toast.error('Failed to fetch newsletter data');
      }
    } catch (error) {
      console.error('Error fetching newsletter data:', error);
      toast.error('Failed to fetch newsletter data');
    }
  };

  // Filter subscribers based on search and filters
  useEffect(() => {
    let filtered = [...subscribers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(subscriber => subscriber.status === statusFilter);
    }

    // Apply source filter
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(subscriber => subscriber.source === sourceFilter);
    }

    setFilteredSubscribers(filtered);
    setCurrentPage(1);
  }, [subscribers, searchTerm, statusFilter, sourceFilter]);

  // Delete subscriber
  const deleteSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;

    setDeleting(subscriberId);
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`/api/admin/newsletter?id=${subscriberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await fetchNewsletterData();
        toast.success('Subscriber deleted successfully!');
      } else {
        // Handle auth errors
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          router.push('/admin');
          toast.error('Session expired. Please log in again.');
          return;
        }
        const error = await response.json();
        toast.error(error.message || 'Failed to delete subscriber');
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      toast.error('Failed to delete subscriber');
    } finally {
      setDeleting(null);
    }
  };

  // Update subscriber status
  const updateStatus = async (subscriberId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('/api/admin/newsletter', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: subscriberId, status: newStatus }),
      });

      if (response.ok) {
        await fetchNewsletterData();
        toast.success('Status updated successfully!');
      } else {
        // Handle auth errors
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          router.push('/admin');
          toast.error('Session expired. Please log in again.');
          return;
        }
        const error = await response.json();
        toast.error(error.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  // Export subscribers to CSV
  const exportToCSV = () => {
    const headers = ['Email', 'Source', 'Status', 'Subscribed Date'];
    const csvContent = [
      headers.join(','),
      ...filteredSubscribers.map(subscriber => [
        subscriber.email,
        subscriber.source,
        subscriber.status,
        new Date(subscriber.subscribedAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Get unique sources for filter
  const uniqueSources = [...new Set(subscribers.map(sub => sub.source))];

  // Pagination
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubscribers.slice(indexOfFirstItem, indexOfLastItem);

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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter Subscribers</h1>
        <p className="text-gray-600">Manage newsletter subscribers and view subscription analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <MdPeople className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Subscribers</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <MdVerified className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl font-bold text-purple-600">{stats.thisMonth}</p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <MdCalendarToday className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
              <p className="text-2xl font-bold text-orange-600">+{stats.growth}%</p>
            </div>
            <div className="bg-orange-100 rounded-full p-3">
              <MdTrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>

            {/* Source Filter */}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Sources</option>
              {uniqueSources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdDownload size={20} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Results Info */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {Math.min(currentItems.length, itemsPerPage)} of {filteredSubscribers.length} subscribers
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscribed Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((subscriber) => (
                <tr key={subscriber._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <MdEmail className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {subscriber.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {subscriber.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      subscriber.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {subscriber.status === 'active' ? (
                        <>
                          <MdCheckCircle className="mr-1" size={12} />
                          Active
                        </>
                      ) : (
                        <>
                          <MdCancel className="mr-1" size={12} />
                          Unsubscribed
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(subscriber.subscribedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {/* Status Toggle */}
                      <select
                        value={subscriber.status}
                        onChange={(e) => updateStatus(subscriber._id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                      </select>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteSubscriber(subscriber._id)}
                        disabled={deleting === subscriber._id}
                        className={`inline-flex items-center p-1 rounded text-red-600 hover:bg-red-50 transition-colors ${
                          deleting === subscriber._id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        title="Delete subscriber"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredSubscribers.length === 0 && !loading && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <MdEmail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No subscribers found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' || sourceFilter !== 'all'
              ? "No subscribers match your current filters."
              : "No newsletter subscribers yet."}
          </p>
          {(searchTerm || statusFilter !== 'all' || sourceFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSourceFilter('all');
              }}
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsletterDataPage;
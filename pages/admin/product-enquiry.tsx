import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { 
  MdEmail, 
  MdPhone, 
  MdPerson, 
  MdMessage,
  MdDelete,
  MdCheckCircle,
  MdPending,
  MdContactSupport,
  MdSearch,
  MdFilterList
} from 'react-icons/md';
import { toast } from 'react-toastify';

interface ProductEnquiry {
  _id: string;
  productId?: string;
  productName: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

const ProductEnquiryPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState<ProductEnquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<ProductEnquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Changed to 5 items per page
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchEnquiries();
    } else {
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  // Add this helper function
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('adminAuth');
    return {
      'Content-Type': 'application/json',
      'Authorization': token && token !== 'true' ? `Bearer ${token}` : ''
    };
  };

  // Fetch enquiries from API
  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/product-enquiry', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Enquiries fetched:", data.length); // Debug log
        
        // Sort data by most recent first
        const sortedData = data.sort((a: ProductEnquiry, b: ProductEnquiry) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        setEnquiries(sortedData);
        setFilteredEnquiries(sortedData);
        
        // Reset to page 1 when new data is loaded
        setCurrentPage(1);
      } else if (response.status === 401 || response.status === 403) {
        // Handle authentication errors
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        router.push('/admin');
      } else {
        const errorData = await response.text();
        console.error('Failed to fetch enquiries:', errorData);
        toast.error('Failed to fetch enquiries');
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Failed to fetch enquiries. Please check your connection.');
    }
  };

  // Filter enquiries based on search and status
  useEffect(() => {
    let filtered = [...enquiries];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(enquiry => 
        enquiry.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.userMobile.includes(searchTerm)
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(enquiry => enquiry.status === statusFilter);
    }

    setFilteredEnquiries(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [enquiries, searchTerm, statusFilter]);

  // Update enquiry status
  const updateStatus = async (enquiryId: string, newStatus: string) => {
    if (updating) return; // Prevent multiple simultaneous updates
    
    setUpdating(enquiryId);
    
    try {
      const response = await fetch(`/api/product-enquiry/${enquiryId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Update result:', result);
        await fetchEnquiries();
        toast.success('Status updated successfully!');
      } else {
        const errorText = await response.text();
        console.error('Update failed:', errorText);
        
        try {
          const error = JSON.parse(errorText);
          toast.error(error.error || 'Failed to update status');
        } catch {
          toast.error(`Failed to update status. Server returned: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status. Please check your connection.');
    } finally {
      setUpdating(null);
    }
  };

  // Delete enquiry
  const deleteEnquiry = async (enquiryId: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const response = await fetch(`/api/product-enquiry/${enquiryId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Delete result:', result);
        await fetchEnquiries();
        toast.success('Enquiry deleted successfully!');
      } else {
        const errorText = await response.text();
        console.error('Delete failed:', errorText);
        toast.error(`Failed to delete enquiry. Server returned: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      toast.error('Failed to delete enquiry. Please check your connection.');
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <MdPending size={12} className="mr-1" />
            Pending
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <MdContactSupport size={12} className="mr-1" />
            Contacted
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <MdCheckCircle size={12} className="mr-1" />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  // Debug function - add this to help troubleshoot
  const logPaginationDebug = () => {
    console.log({
      totalItems: filteredEnquiries.length,
      currentPage,
      itemsPerPage,
      indexOfFirstItem,
      indexOfLastItem,
      currentItemsCount: currentItems.length,
      totalPages
    });
  };

  // Call this in an effect or when data changes
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      logPaginationDebug();
    }
  }, [currentPage, filteredEnquiries]);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
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
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Enquiries</h1>
        <p className="text-gray-600">Manage customer product enquiries and requests</p>
        <p className="text-sm text-blue-600 mt-1">Showing {itemsPerPage} enquiries per page</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <MdMessage className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Enquiries</p>
              <p className="text-2xl font-bold text-gray-900">{enquiries.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <MdPending className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {enquiries.filter(e => e.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <MdContactSupport className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Contacted</p>
              <p className="text-2xl font-bold text-gray-900">
                {enquiries.filter(e => e.status === 'contacted').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <MdCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {enquiries.filter(e => e.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by product name, customer name, email, or mobile..."
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <div className="relative">
              <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MdMessage size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {enquiries.length === 0 ? 'No enquiries found' : 'No matching enquiries'}
            </h3>
            <p>
              {enquiries.length === 0 
                ? 'Customer enquiries will appear here!' 
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Enquiries ({filteredEnquiries.length})
                </h3>
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages} • Showing {Math.min(currentItems.length, itemsPerPage)} of {filteredEnquiries.length}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <MdPerson className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {enquiry.userName}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              <MdEmail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              <span className="truncate">{enquiry.userEmail}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MdPhone className="flex-shrink-0 mr-1.5 h-4 w-4" />
                              <span>{enquiry.userMobile}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {enquiry.productName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs">
                          {enquiry.message ? (
                            <span className="truncate block" title={enquiry.message}>
                              {enquiry.message.length > 50 
                                ? `${enquiry.message.substring(0, 50)}...` 
                                : enquiry.message
                              }
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">No message</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(enquiry.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {/* Status Update Dropdown */}
                          <select
                            value={enquiry.status}
                            onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                            disabled={updating === enquiry._id}
                            className={`text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                              updating === enquiry._id ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="resolved">Resolved</option>
                          </select>

                          {/* Delete Button */}
                          <button
                            onClick={() => deleteEnquiry(enquiry._id)}
                            disabled={updating === enquiry._id}
                            className={`inline-flex items-center p-1 rounded text-red-600 hover:bg-red-50 transition-colors ${
                              updating === enquiry._id ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            title="Delete enquiry"
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

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                        <span className="font-medium">{Math.min(indexOfLastItem, filteredEnquiries.length)}</span> of{' '}
                        <span className="font-medium">{filteredEnquiries.length}</span> results
                        <span className="text-blue-600 ml-2">• {itemsPerPage} per page</span>
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        
                        {/* Page Numbers */}
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                          let pageNumber;
                          if (totalPages <= 7) {
                            pageNumber = i + 1;
                          } else if (currentPage <= 4) {
                            pageNumber = i + 1;
                          } else if (currentPage >= totalPages - 3) {
                            pageNumber = totalPages - 6 + i;
                          } else {
                            pageNumber = currentPage - 3 + i;
                          }
                          
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => goToPage(pageNumber)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                pageNumber === currentPage
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}

                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <strong>Debug Info:</strong> Total: {enquiries.length}, Filtered: {filteredEnquiries.length}, 
          Current Page: {currentPage}, Total Pages: {totalPages}, Items per page: {itemsPerPage}
        </div>
      )}
    </div>
  );
};

export default ProductEnquiryPage;
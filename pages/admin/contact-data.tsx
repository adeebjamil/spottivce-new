// filepath: c:\Users\USER\Desktop\spo\my-project\pages\admin\contact-data.tsx
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
  MdFilterList,
  MdBusiness
} from 'react-icons/md';
import { toast } from 'react-toastify';

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

const ContactDataPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  // Fetch submissions from API
  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        setSubmissions(result.data);
        setFilteredSubmissions(result.data);
      } else {
        // If unauthorized (401), redirect to login
        if (response.status === 401) {
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          router.push('/admin');
          toast.error('Session expired. Please log in again.');
          return;
        }
        toast.error('Failed to fetch contact submissions');
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to fetch contact submissions');
    }
  };

  // Filter submissions based on search and status
  useEffect(() => {
    let filtered = [...submissions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(submission => 
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (submission.phone && submission.phone.includes(searchTerm)) ||
        (submission.service && submission.service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(submission => submission.status === statusFilter);
    }

    setFilteredSubmissions(filtered);
    setCurrentPage(1);
  }, [submissions, searchTerm, statusFilter]);

  // Update submission status
  const updateStatus = async (submissionId: string, newStatus: string) => {
    if (updating) return;
    
    setUpdating(submissionId);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add JWT token for authentication
        },
        body: JSON.stringify({ id: submissionId, status: newStatus }),
      });

      if (response.ok) {
        await fetchSubmissions();
        toast.success('Status updated successfully!');
      } else {
        // Handle authentication errors consistently
        if (response.status === 401) {
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
    } finally {
      setUpdating(null);
    }
  };

  // Delete submission
  const deleteSubmission = async (submissionId: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`/api/admin/contacts?id=${submissionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Add JWT token for authentication
        }
      });

      if (response.ok) {
        await fetchSubmissions();
        toast.success('Contact submission deleted successfully!');
      } else {
        // Handle authentication errors consistently
        if (response.status === 401) {
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          router.push('/admin');
          toast.error('Session expired. Please log in again.');
          return;
        }
        
        const error = await response.json();
        toast.error(error.message || 'Failed to delete submission');
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast.error('Failed to delete submission');
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <MdPending size={12} className="mr-1" />
            New
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <MdContactSupport size={12} className="mr-1" />
            In Progress
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
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
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
        <h1 className="text-3xl font-bold text-gray-900">Contact Data</h1>
        <p className="text-gray-600">View and manage contact form submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <MdMessage className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Submissions</p>
              <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <MdPending className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">New</p>
              <p className="text-2xl font-bold text-gray-900">
                {submissions.filter(s => s.status === 'new').length}
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
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {submissions.filter(s => s.status === 'in-progress').length}
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
                {submissions.filter(s => s.status === 'resolved').length}
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
                placeholder="Search by name, email, message, phone, or service..."
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
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MdMessage size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {submissions.length === 0 ? 'No contact submissions found' : 'No matching submissions'}
            </h3>
            <p>
              {submissions.length === 0 
                ? 'Contact form submissions will appear here!' 
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
                  Contact Submissions ({filteredSubmissions.length})
                </h3>
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages} • Showing {Math.min(currentItems.length, itemsPerPage)} of {filteredSubmissions.length}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {/* Add scrollable container */}
              <div 
                style={{ 
                  height: "600px", 
                  overflowY: "scroll", 
                  border: "1px solid #f3f4f6",
                  borderRadius: "0.5rem",
                }}
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
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
                    {currentItems.map((submission) => (
                      <tr key={submission._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <MdPerson className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {submission.name}
                              </p>
                              <div className="flex items-center text-sm text-gray-500">
                                <MdEmail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                                <span className="truncate">{submission.email}</span>
                              </div>
                              {submission.phone && (
                                <div className="flex items-center text-sm text-gray-500">
                                  <MdPhone className="flex-shrink-0 mr-1.5 h-4 w-4" />
                                  <span>{submission.phone}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <MdBusiness className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {submission.service || 'Not specified'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-xs">
                            {submission.message ? (
                              <span className="truncate block" title={submission.message}>
                                {submission.message.length > 50 
                                  ? `${submission.message.substring(0, 50)}...` 
                                  : submission.message
                                }
                              </span>
                            ) : (
                              <span className="text-gray-400 italic">No message</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(submission.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(submission.createdAt).toLocaleDateString('en-US', {
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
                              value={submission.status}
                              onChange={(e) => updateStatus(submission._id, e.target.value)}
                              disabled={updating === submission._id}
                              className={`text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                updating === submission._id ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="in-progress">In Progress</option>
                              <option value="resolved">Resolved</option>
                            </select>

                            {/* Delete Button */}
                            <button
                              onClick={() => deleteSubmission(submission._id)}
                              disabled={updating === submission._id}
                              className={`inline-flex items-center p-1 rounded text-red-600 hover:bg-red-50 transition-colors ${
                                updating === submission._id ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                              title="Delete submission"
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
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSubmissions.length)} of {filteredSubmissions.length} results
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactDataPage;
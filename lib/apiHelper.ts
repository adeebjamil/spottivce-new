export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    // Clear auth state and redirect
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
    throw new Error('No authentication token found. Please login.');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle token expiry globally
    if (response.status === 401) {
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
      throw new Error('Session expired. Please login again.');
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Helper function to refresh all admin data
export const refreshAdminData = async () => {
  try {
    // Trigger refresh events for all admin components
    window.dispatchEvent(new CustomEvent('refreshProducts'));
    window.dispatchEvent(new CustomEvent('refreshProductDetails'));
    window.dispatchEvent(new CustomEvent('refreshProductAssignments'));
    window.dispatchEvent(new CustomEvent('refreshAnalytics'));
  } catch (error) {
    console.error('Error refreshing admin data:', error);
  }
};
export function getAuthHeaders() {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  // Get token from the correct localStorage key
  const token = localStorage.getItem('adminToken'); // Make sure this matches where token is stored
  
  // Prepare headers
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };
  
  // Make the authenticated request
  return fetch(url, {
    ...options,
    headers
  });
};
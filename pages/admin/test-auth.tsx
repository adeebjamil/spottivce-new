import { useState, useEffect } from 'react';

export default function TestAuth() {
  const [result, setResult] = useState('Testing...');
  
  useEffect(() => {
    async function testAuth() {
      try {
        // 1. Check what's in localStorage
        const token = localStorage.getItem('adminAuth');
        console.log('Token in storage:', token);
        
        // 2. Try a test request
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: 'Test Product',
            shortDesc: 'Test Description',
            category: 'Test Category',
            subCategory: 'Test Subcategory'
          })
        });
        
        const data = await response.json();
        console.log('Response:', data);
        
        if (response.ok) {
          setResult('Success! Authentication is working.');
        } else {
          setResult(`Failed: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Test failed:', error);
        setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    testAuth();
  }, []);
  
  return (
    <div style={{ padding: 20 }}>
      <h1>Authentication Test</h1>
      <div>Result: {result}</div>
      <div>Check browser console for details</div>
    </div>
  );
}
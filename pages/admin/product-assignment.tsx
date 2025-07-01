import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { authenticatedFetch } from '../../lib/apiHelper';
import AdminLayout from '../../components/AdminLayout';

interface Product {
  _id: string;
  name: string;
  shortDesc: string;
  category: string;
  subCategory: string;
  image: string;
}

const ProductAssignmentPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    const token = localStorage.getItem('adminToken');
    
    if (auth === 'true' && token) {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminToken');
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  // Listen for refresh events
  useEffect(() => {
    const handleRefresh = () => {
      fetchProducts();
    };

    window.addEventListener('refreshProducts', handleRefresh);
    window.addEventListener('refreshProductAssignments', handleRefresh);
    
    return () => {
      window.removeEventListener('refreshProducts', handleRefresh);
      window.removeEventListener('refreshProductAssignments', handleRefresh);
    };
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Use authenticatedFetch instead of regular fetch
      const response = await authenticatedFetch('/api/products');
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        console.log('Products fetched:', data); // Debug log
      } else {
        toast.error('Failed to fetch products');
        console.error('Fetch error:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Handle brand assignment modal
  const handleAssignToBrand = (brandName: string) => {
    setSelectedBrand(brandName);
    setShowModal(true);
  };

  // Handle product assignment
  const handleAssignProducts = async () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product');
      return;
    }

    try {
      const response = await authenticatedFetch('/api/product-assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds: selectedProducts,
          brandName: selectedBrand
        })
      });

      if (response.ok) {
        toast.success(`Products assigned to ${selectedBrand} successfully!`);
        setSelectedProducts([]);
        setShowModal(false);
        fetchProducts(); // Refresh data
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to assign products');
      }
    } catch (error) {
      console.error('Error assigning products:', error);
      toast.error('Failed to assign products');
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Assignment</h1>
          <p className="text-gray-600">Assign products to brand categories for the navbar dropdown</p>
        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {['Hikvision', 'UNV', 'Dahua', 'Uniview'].map((brand) => (
            <div key={brand} className="bg-white rounded-lg shadow-md p-6 text-center">
              <img 
                src={`/${brand.toLowerCase()}-logo.png`} 
                alt={brand}
                className="h-16 mx-auto mb-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                }}
              />
              <h3 className="text-lg font-semibold mb-2">{brand}</h3>
              <p className="text-sm text-gray-600 mb-4">0 Products Assigned</p>
              <button
                onClick={() => handleAssignToBrand(brand)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Manage Products
              </button>
            </div>
          ))}
        </div>

        {/* Assignment Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Assign Products to {selectedBrand}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Products List */}
              <div className="max-h-96 overflow-y-auto mb-4">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No products found</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {products.length === 0 ? 'Try adding some products first' : 'Try adjusting your search criteria'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product._id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedProducts.includes(product._id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          if (selectedProducts.includes(product._id)) {
                            setSelectedProducts(prev => prev.filter(id => id !== product._id));
                          } else {
                            setSelectedProducts(prev => [...prev, product._id]);
                          }
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => {}}
                            className="w-4 h-4 text-blue-600"
                          />
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category} - {product.subCategory}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  {selectedProducts.length} products selected
                </p>
                <div className="space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignProducts}
                    disabled={selectedProducts.length === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Assign Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductAssignmentPage;
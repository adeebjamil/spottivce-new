import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdClose, 
  MdSave,
  MdCancel,
  MdSearch,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdAssignment,
  MdInfo
} from 'react-icons/md';
import { toast } from 'react-toastify';

interface Product {
  _id: string;
  name: string;
  image: string;
  category: string;
  subCategory: string;
  shortDesc: string;
}

interface ProductAssignment {
  _id?: string;
  brand: string;
  productIds: string[];
  updatedAt: Date;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  hoverColor: string;
  link: string;
}

const brands: Brand[] = [
  {
    id: 'hikvision',
    name: 'Hikvision',
    logo: '/brand/hikvision.png',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    hoverColor: 'hover:bg-blue-100',
    link: '/product/hikvision'
  },
  {
    id: 'unv',
    name: 'UNV',
    logo: '/brand/unv.png',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-600',
    hoverColor: 'hover:bg-gray-100',
    link: '/product/unv'
  },
  {
    id: 'dahua',
    name: 'Dahua',
    logo: '/brand/dahua.png',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    hoverColor: 'hover:bg-purple-100',
    link: '/product/dahua'
  },
  {
    id: 'uniview',
    name: 'Uniview',
    logo: '/brand/newunv.png',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    hoverColor: 'hover:bg-green-100',
    link: '/product/uniview'
  }
];

const ProductAssignmentPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [assignments, setAssignments] = useState<ProductAssignment[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchProducts();
      fetchAssignments();
    } else {
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  // Add this helper function (after the useEffect for authentication check)
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('adminAuth');
    return {
      'Content-Type': 'application/json',
      'Authorization': token && token !== 'true' ? `Bearer ${token}` : ''
    };
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      console.log('🔍 Fetching products for assignment...');
      
      // Get the auth token from localStorage
      const token = localStorage.getItem('adminToken') || localStorage.getItem('adminAuth');
      console.log('🔍 Auth token found:', !!token);
      
      const headers: any = {
        'Content-Type': 'application/json',
      };
      
      // Add Authorization header if token exists
      if (token && token !== 'true') {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/products', {
        method: 'GET',
        headers
      });
      
      console.log('🔍 API Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 Raw products from API:', data);
        console.log('🔍 Number of products received:', data.length);
        
        const validProducts = data.filter((product: Product) => product.name && product._id);
        console.log('🔍 Valid products after filter:', validProducts);
        
        setProducts(validProducts);
      } else {
        console.error('❌ API failed with status:', response.status);
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        
        // If 401, might need to re-authenticate
        if (response.status === 401) {
          console.log('🔍 Authentication failed, redirecting to login...');
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          router.push('/admin');
        }
      }
    } catch (error) {
      console.error('❌ Network error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  // Fetch assignments
  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/product-assignments', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setAssignments(data);
      } else if (response.status === 401 || response.status === 403) {
        // Handle authentication error
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        router.push('/admin');
      } else {
        console.error('Error fetching assignments:', await response.text());
        toast.error('Failed to fetch assignments');
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error('Failed to fetch assignments');
    }
  };

  // Get assignment for specific brand
  const getAssignmentForBrand = (brandId: string) => {
    return assignments.find(assignment => assignment.brand === brandId);
  };

  // Get assigned products for brand
  const getAssignedProducts = (brandId: string) => {
    const assignment = getAssignmentForBrand(brandId);
    if (!assignment) return [];
    
    return products.filter(product => assignment.productIds.includes(product._id));
  };

  // Handle brand selection
  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    const assignment = getAssignmentForBrand(brand.id);
    setSelectedProductIds(assignment ? assignment.productIds : []);
    setShowAssignModal(true);
    setSearchTerm('');
  };

  // Handle product selection
  const handleProductToggle = (productId: string) => {
    setSelectedProductIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Update the handleSaveAssignment function
  const handleSaveAssignment = async () => {
    if (!selectedBrand) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/product-assignments', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          brand: selectedBrand.id,
          productIds: selectedProductIds
        }),
      });

      if (response.ok) {
        toast.success(`Products assigned to ${selectedBrand.name} successfully!`);
        fetchAssignments();
        setShowAssignModal(false);
        setSelectedBrand(null);
        setSelectedProductIds([]);
      } else if (response.status === 401 || response.status === 403) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        router.push('/admin');
      } else {
        toast.error('Failed to save assignment');
      }
    } catch (error) {
      console.error('Error saving assignment:', error);
      toast.error('Failed to save assignment');
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel assignment
  const handleCancel = () => {
    setShowAssignModal(false);
    setSelectedBrand(null);
    setSelectedProductIds([]);
    setSearchTerm('');
  };

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <MdAssignment size={32} className="mr-3 text-blue-600" />
          Product Assignment
        </h1>
        <p className="text-gray-600 mt-2">Assign products to brand categories for the navbar dropdown</p>
      </div>

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {brands.map((brand) => {
          const assignedProducts = getAssignedProducts(brand.id);
          const assignment = getAssignmentForBrand(brand.id);
          
          return (
            <div
              key={brand.id}
              className={`group ${brand.bgColor} border ${brand.borderColor} p-6 rounded-xl flex flex-col ${brand.hoverColor} transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer relative`}
              onClick={() => handleBrandSelect(brand)}
            >
              {/* Assignment Indicator */}
              {assignment && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              )}

              <div className="flex-grow flex items-center justify-center mb-4">
                <Image 
                  src={brand.logo} 
                  alt={`${brand.name} Logo`} 
                  width={120} 
                  height={60} 
                  className="object-contain transition-transform duration-300 group-hover:scale-110" 
                />
              </div>
              
              <h4 className="font-semibold text-center mb-3 text-gray-900">{brand.name}</h4>
              
              {/* Product Count */}
              <div className="text-center mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${brand.textColor} bg-white`}>
                  {assignedProducts.length} Products Assigned
                </span>
              </div>

              <button className={`flex items-center text-sm font-medium justify-center ${brand.textColor} hover:opacity-80 transition-colors`}>
                <MdEdit size={16} className="mr-1" />
                Manage Products
              </button>
            </div>
          );
        })}
      </div>

      {/* Assignments Overview */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <MdInfo size={20} className="mr-2 text-blue-600" />
            Current Assignments Overview
          </h3>
        </div>

        <div className="p-6">
          {assignments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MdAssignment size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-lg">No product assignments yet</p>
              <p className="text-sm">Click on any brand card above to start assigning products</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {brands.map((brand) => {
                const assignedProducts = getAssignedProducts(brand.id);
                const assignment = getAssignmentForBrand(brand.id);
                
                return (
                  <div key={brand.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <Image 
                        src={brand.logo} 
                        alt={brand.name} 
                        width={40} 
                        height={20} 
                        className="object-contain mr-2" 
                      />
                      <h4 className="font-medium text-gray-900">{brand.name}</h4>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>{assignedProducts.length}</strong> products assigned
                      </p>
                      {assignment && (
                        <p className="text-xs text-gray-500">
                          Last updated: {new Date(assignment.updatedAt).toLocaleDateString()}
                        </p>
                      )}
                      
                      {assignedProducts.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Recent products:</p>
                          <div className="space-y-1">
                            {assignedProducts.slice(0, 2).map((product) => (
                              <p key={product._id} className="text-xs text-gray-600 truncate">
                                • {product.name}
                              </p>
                            ))}
                            {assignedProducts.length > 2 && (
                              <p className="text-xs text-gray-500">
                                +{assignedProducts.length - 2} more...
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignModal && selectedBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image 
                    src={selectedBrand.logo} 
                    alt={selectedBrand.name} 
                    width={60} 
                    height={30} 
                    className="object-contain mr-3" 
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Assign Products to {selectedBrand.name}
                    </h3>
                    <p className="text-gray-600">
                      Selected: {selectedProductIds.length} products
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                  <MdClose size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">No products found</p>
                  <p className="text-sm">Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProductIds.includes(product._id);
                    
                    return (
                      <div
                        key={product._id}
                        onClick={() => handleProductToggle(product._id)}
                        className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Checkbox */}
                          <div className="mt-1">
                            {isSelected ? (
                              <MdCheckBox size={20} className="text-blue-600" />
                            ) : (
                              <MdCheckBoxOutlineBlank size={20} className="text-gray-400" />
                            )}
                          </div>

                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <MdAdd size={24} className="text-gray-400" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {product.category} - {product.subCategory}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                              {product.shortDesc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedProductIds.length} products selected
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <MdCancel size={18} className="mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssignment}
                  disabled={submitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
                >
                  <MdSave size={18} className="mr-2" />
                  {submitting ? 'Saving...' : 'Assign Products'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAssignmentPage;
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdClose, 
  MdCloudUpload, 
  MdImage,
  MdSave,
  MdCancel,
  MdAutoAwesome,
  MdSearch,
  MdInfoOutline
} from 'react-icons/md';
import { toast } from 'react-toastify';

interface Product {
  _id: string;
  name: string;
  shortDesc: string;
  category: string;
  subCategory: string;
  image: string;
}

interface ProductDetail {
  _id?: string;
  productId: string;
  productTitle: string;
  productDescription: string;
  features: string[];
  specifications: { [key: string]: string };
  featureImages: string[];
  seo: {
    focusKeywords: string[];
    seoKeyword: string;
    autoTitle: string;
    autoDescription: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

const ProductDetailsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDetail, setEditingDetail] = useState<ProductDetail | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [formData, setFormData] = useState<ProductDetail>({
    productId: '',
    productTitle: '',
    productDescription: '',
    features: [''],
    specifications: {},
    featureImages: [],
    seo: {
      focusKeywords: [],
      seoKeyword: '',
      autoTitle: '',
      autoDescription: ''
    }
  });

  const [specifications, setSpecifications] = useState<{key: string, value: string}[]>([{key: '', value: ''}]);

  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const router = useRouter();

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('adminAuth');
    const headers: any = {
      'Content-Type': 'application/json',
    };
    
    if (token && token !== 'true') {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  };

  // Authentication check
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchProducts();
      fetchProductDetails();
    } else {
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  // Fetch products with authentication
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        router.push('/admin');
        toast.error('Session expired. Please log in again.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  // Fetch product details with authentication
  const fetchProductDetails = async () => {
    try {
      const response = await fetch('/api/product-details', {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setProductDetails(data);
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        router.push('/admin');
        toast.error('Session expired. Please log in again.');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Failed to fetch product details');
    }
  };

  // Delete function with authentication
  const handleDelete = async (detailId: string) => {
    if (!confirm('Are you sure you want to delete this product detail? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/product-details/${detailId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        await fetchProductDetails();
        toast.success('Product detail deleted successfully!');
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        router.push('/admin');
        toast.error('Session expired. Please log in again.');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete product detail');
      }
    } catch (error) {
      console.error('Error deleting product detail:', error);
      toast.error('Failed to delete product detail');
    }
  };

  // Handle multiple file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 5) {
      toast.error('You can only upload up to 5 images');
      return;
    }
    
    setSelectedFiles(files);
    
    // Create previews
    const previews: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target?.result as string);
        if (previews.length === files.length) {
          setPreviewImages(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Upload images with authentication
  const uploadImages = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return formData.featureImages;

    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of selectedFiles) {
        const formDataUpload = new FormData();
        formDataUpload.append('image', file);

        // Get token for authentication
        const token = localStorage.getItem('adminToken') || localStorage.getItem('adminAuth');
        const headers: any = {};
        
        if (token && token !== 'true') {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          headers,
          body: formDataUpload,
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        } else if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          router.push('/admin');
          toast.error('Session expired. Please log in again.');
          return [];
        }
      }
      
      if (uploadedUrls.length > 0) {
        toast.success(`${uploadedUrls.length} images uploaded successfully!`);
      }
      
      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
      return [];
    } finally {
      setUploadingImages(false);
    }
  };

  // Auto-generate SEO content
  const generateSEOContent = async () => {
    if (!formData.productTitle || !formData.productDescription) {
      toast.error('Please fill in product title and description first');
      return;
    }

    try {
      // Get focus keywords and single SEO keyword with safety checks
      const focusKeywords = (formData.seo.focusKeywords || [])
        .filter(keyword => keyword && keyword.trim() !== '')
        .map(keyword => keyword.trim());
      const seoKeyword = (formData.seo.seoKeyword || '').trim();
      
      console.log('Focus Keywords:', focusKeywords); // Debug log
      console.log('SEO Keyword:', seoKeyword); // Debug log
      
      // Generate title using ONLY the FIRST focus keyword + SEO keyword
      let autoTitle = '';
      const primaryFocusKeyword = focusKeywords.length > 0 ? focusKeywords[0] : '';
      
      if (primaryFocusKeyword && seoKeyword) {
        // Best case: First focus keyword + SEO keyword
        autoTitle = `${formData.productTitle} - ${primaryFocusKeyword} | ${seoKeyword}`;
      } else if (primaryFocusKeyword) {
        // Only first focus keyword available
        autoTitle = `${formData.productTitle} - ${primaryFocusKeyword} | Premium ${primaryFocusKeyword}`;
      } else if (seoKeyword) {
        // Only SEO keyword available
        autoTitle = `${formData.productTitle} - ${seoKeyword} | Professional ${seoKeyword}`;
      } else {
        // Fallback if no keywords
        autoTitle = `${formData.productTitle} - High Quality ${formData.productTitle}`;
      }

      // Ensure title is not too long (optimal: 50-60 characters)
      if (autoTitle.length > 60) {
        if (primaryFocusKeyword && seoKeyword) {
          autoTitle = `${formData.productTitle} - ${primaryFocusKeyword} ${seoKeyword}`;
        } else if (primaryFocusKeyword) {
          autoTitle = `${formData.productTitle} - ${primaryFocusKeyword}`;
        } else if (seoKeyword) {
          autoTitle = `${formData.productTitle} - ${seoKeyword}`;
        }
      }

      // Generate description using ALL focus keywords + SEO keyword
      let autoDescription = '';
    
      // Start with product description
      let description = `Discover our premium ${formData.productTitle}. `;
    
      // Add primary focus keyword if available
      if (primaryFocusKeyword) {
        description += `This ${primaryFocusKeyword} offers exceptional quality and performance. `;
      }
    
      // Add main description (shortened to leave room for keywords)
      description += formData.productDescription.substring(0, 50);
    
      // Add ALL focus keywords naturally
      if (focusKeywords.length > 0) {
        if (focusKeywords.length === 1) {
          description += ` Perfect for ${focusKeywords[0]}.`;
        } else if (focusKeywords.length === 2) {
          description += ` Ideal for ${focusKeywords[0]} and ${focusKeywords[1]}.`;
        } else {
          description += ` Perfect for ${focusKeywords.slice(0, 2).join(', ')}, ${focusKeywords.slice(2).join(', ')}.`;
        }
      }
    
      // Add SEO keyword if available and there's room
      if (seoKeyword && description.length < 120) {
        description += ` Best ${seoKeyword} available.`;
      }
    
      // Add primary focus keyword again for better density
      if (primaryFocusKeyword && description.length < 140) {
        description += ` Get the best ${primaryFocusKeyword} today.`;
      }
    
      // Ensure it's not too long (keep under 160 characters)
      if (description.length > 157) {
        autoDescription = description.substring(0, 157) + '...';
      } else {
        autoDescription = description;
      }
    
      console.log('Generated Title:', autoTitle); // Debug log
      console.log('Generated Description:', autoDescription); // Debug log
    
      // Update the form data with safety checks
      setFormData(prev => ({
        ...prev,
        seo: {
          focusKeywords: prev.seo.focusKeywords || [],
          seoKeyword: prev.seo.seoKeyword || '',
          autoTitle,
          autoDescription
        }
      }));
    
      toast.success('SEO content generated! Title uses first focus keyword, description uses all focus keywords.');
    } catch (error) {
      console.error('Error generating SEO content:', error);
      toast.error('Failed to generate SEO content');
    }
  };

  // Add/remove features
  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  // Add/remove focus keywords (NEW)
  const addFocusKeyword = () => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        focusKeywords: [...prev.seo.focusKeywords, '']
      }
    }));
  };

  const removeFocusKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        focusKeywords: prev.seo.focusKeywords.filter((_, i) => i !== index)
      }
    }));
  };

  const updateFocusKeyword = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        focusKeywords: prev.seo.focusKeywords.map((keyword, i) => i === index ? value : keyword)
      }
    }));
  };

  // Add/remove specifications
  const addSpecification = () => {
    setSpecifications(prev => [...prev, {key: '', value: ''}]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(prev => prev.filter((_, i) => i !== index));
  };

  const updateSpecification = (index: number, field: 'key' | 'value', newValue: string) => {
    setSpecifications(prev => 
      prev.map((spec, i) => 
        i === index ? {...spec, [field]: newValue} : spec
      )
    );
  };

  // Convert specifications array to object before submitting
  const convertSpecificationsToObject = () => {
    const specsObject: { [key: string]: string } = {};
    specifications.forEach(spec => {
      if (spec.key.trim() && spec.value.trim()) {
        specsObject[spec.key.trim()] = spec.value.trim();
      }
    });
    return specsObject;
  };

  // Convert specifications object to array for editing
  const convertObjectToSpecifications = (specsObject: { [key: string]: string }) => {
    const specsArray = Object.entries(specsObject).map(([key, value]) => ({key, value}));
    return specsArray.length > 0 ? specsArray : [{key: '', value: ''}];
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Check for existing details if not editing
      if (!editingDetail) {
        const existingDetail = productDetails.find(detail => detail.productId === formData.productId);
        if (existingDetail) {
          toast.error('This product already has details. Please edit the existing details instead.');
          setSubmitting(false);
          return;
        }
      }

      // Upload new images if selected
      const imageUrls = await uploadImages();
      
      const method = editingDetail ? 'PUT' : 'POST';
      const url = editingDetail 
        ? `/api/product-details/${editingDetail._id}` 
        : '/api/product-details';
      
      const submitData = {
        ...formData,
        featureImages: imageUrls,
        specifications: convertSpecificationsToObject(),
        seo: {
          ...formData.seo,
          focusKeywords: formData.seo.focusKeywords.filter(keyword => keyword.trim() !== '') // Fixed
        }
      };

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        await fetchProductDetails();
        resetForm();
        setShowForm(false);
        toast.success(editingDetail ? 'Product details updated!' : 'Product details created!');
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        router.push('/admin');
        toast.error('Session expired. Please log in again.');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error saving product details:', error);
      toast.error('Failed to save product details');
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      productId: '',
      productTitle: '',
      productDescription: '',
      features: [''],
      specifications: {},
      featureImages: [],
      seo: {
        focusKeywords: [],
        seoKeyword: '',
        autoTitle: '',
        autoDescription: ''
      }
    });
    setSpecifications([{key: '', value: ''}]);
    setEditingDetail(null);
    setSelectedFiles([]);
    setPreviewImages([]);
    setProductSearchTerm('');
    setShowProductDropdown(false);
    setSelectedProduct(null);
    setCurrentPage(1);
  };

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setFormData({...formData, productId: product._id});
    setProductSearchTerm(product.name);
    setShowProductDropdown(false);
  };

  // useEffect to handle the specifications conversion when editing:
  useEffect(() => {
    if (editingDetail) {
      // Handle backward compatibility for old data structure
      const editingFormData = {
        ...editingDetail,
        seo: {
          focusKeywords: editingDetail.seo.focusKeywords || [], // Ensure it's an array
          seoKeyword: editingDetail.seo.seoKeyword || '', // Ensure it's a string
          autoTitle: editingDetail.seo.autoTitle || '',
          autoDescription: editingDetail.seo.autoDescription || ''
        }
      };
      
      setFormData(editingFormData);
      setSpecifications(convertObjectToSpecifications(editingDetail.specifications));
      
      // Find and set the selected product
      const product = products.find(p => p._id === editingDetail.productId);
      if (product) {
        setSelectedProduct(product);
        setProductSearchTerm(product.name);
      }
    }
  }, [editingDetail, products]);

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.product-search-container')) {
        setShowProductDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const filteredProducts = products.filter(product => {
    // Check if this product already has details
    const hasExistingDetails = productDetails.some(detail => detail.productId === product._id);
    
    // If we're editing, allow the current product to be shown
    const isCurrentlyEditing = editingDetail && editingDetail.productId === product._id;
    
    // Filter by search term
    const matchesSearch = product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(productSearchTerm.toLowerCase());
    
    // Show product if it matches search AND (doesn't have details OR is currently being edited)
    return matchesSearch && (!hasExistingDetails || isCurrentlyEditing);
  });

  // Calculate pagination values (moved this logic here, after all hooks)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productDetails.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productDetails.length / itemsPerPage);

  // Pagination helper functions
  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
          <p className="text-gray-600">Manage detailed product information and SEO</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <MdAdd size={20} className="mr-2" />
          Add Product Details
        </button>
      </div>

      {/* Product Details Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingDetail ? 'Edit Product Details' : 'Add Product Details'}
                </h3>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                  <MdClose size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Selection */}
                <div className="product-search-container">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Product *
                  </label>
                  <div className="relative">
                    {/* Selected Product Display */}
                    {selectedProduct ? (
                      <div className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            {selectedProduct.image ? (
                              <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <MdImage size={20} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{selectedProduct.name}</h4>
                            <p className="text-xs text-gray-500">{selectedProduct.category} - {selectedProduct.subCategory}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedProduct(null);
                            setFormData({...formData, productId: ''});
                            setProductSearchTerm('');
                            setShowProductDropdown(true);
                          }}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <MdClose size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Search Input */}
                        <div className="relative">
                          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={productSearchTerm}
                            onChange={(e) => {
                              setProductSearchTerm(e.target.value);
                              setShowProductDropdown(true);
                            }}
                            onFocus={() => setShowProductDropdown(true)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            placeholder="Search products by name, category, or subcategory..."
                            required={!selectedProduct}
                          />
                        </div>

                        {/* Dropdown Results */}
                        {showProductDropdown && productSearchTerm && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                            {filteredProducts.length > 0 ? (
                              filteredProducts.map(product => (
                                <button
                                  key={product._id}
                                  type="button"
                                  onClick={() => handleProductSelect(product)}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                      {product.image ? (
                                        <img
                                          src={product.image}
                                          alt={product.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                          <MdImage size={16} className="text-gray-400" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                                      <p className="text-xs text-gray-500">{product.category} - {product.subCategory}</p>
                                      <p className="text-xs text-gray-400 truncate mt-1">{product.shortDesc}</p>
                                    </div>
                                  </div>
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                No products found matching "{productSearchTerm}"
                              </div>
                            )}
                          </div>
                        )}

                        {/* Show all products dropdown when no search term */}
                        {showProductDropdown && !productSearchTerm && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                            <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                              Available Products ({products.filter(p => {
                                const hasExistingDetails = productDetails.some(detail => detail.productId === p._id);
                                const isCurrentlyEditing = editingDetail && editingDetail.productId === p._id;
                                return !hasExistingDetails || isCurrentlyEditing;
                              }).length})
                            </div>
                            {products
                              .filter(product => {
                                const hasExistingDetails = productDetails.some(detail => detail.productId === product._id);
                                const isCurrentlyEditing = editingDetail && editingDetail.productId === product._id;
                                return !hasExistingDetails || isCurrentlyEditing;
                              })
                              .map(product => (
                                <button
                                  key={product._id}
                                  type="button"
                                  onClick={() => handleProductSelect(product)}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                      {product.image ? (
                                        <img
                                          src={product.image}
                                          alt={product.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                          <MdImage size={16} className="text-gray-400" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                                      <p className="text-xs text-gray-500">{product.category} - {product.subCategory}</p>
                                      <p className="text-xs text-gray-400 truncate mt-1">{product.shortDesc}</p>
                                    </div>
                                  </div>
                                </button>
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Search and select a product to add detailed information. Products with existing details are hidden.
                  </p>
                </div>

                {/* Product Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    value={formData.productTitle}
                    onChange={(e) => setFormData({...formData, productTitle: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Product Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Description *
                  </label>
                  <textarea
                    value={formData.productDescription}
                    onChange={(e) => setFormData({...formData, productDescription: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    rows={4}
                    required
                  />
                </div>

                {/* Feature Images Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feature Images (2-5 images)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    {previewImages.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {previewImages.map((preview, index) => (
                          <img
                            key={index}
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    ) : (
                      <MdImage size={48} className="mx-auto text-gray-400 mb-4" />
                    )}
                    
                    <label
                      htmlFor="feature-images"
                      className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      <MdCloudUpload size={20} className="mr-2" />
                      {previewImages.length > 0 ? 'Change Images' : 'Upload Images'}
                      <input
                        id="feature-images"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Features
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Feature
                    </button>
                  </div>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Feature ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <MdDelete size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Specifications */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Specifications
                    </label>
                    <button
                      type="button"
                      onClick={addSpecification}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Add Specification
                    </button>
                  </div>
                  <div className="space-y-3">
                    {specifications.map((spec, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="text"
                            value={spec.key}
                            onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Specification name (e.g., Weight)"
                          />
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Value (e.g., 1.5kg)"
                          />
                          {specifications.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSpecification(index)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <MdDelete size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Add product specifications like weight, dimensions, material, etc.
                  </p>
                </div>

                {/* SEO Section */}
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">SEO Settings</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Add multiple focus keywords and one main SEO keyword, then generate optimized content
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={generateSEOContent}
                      className="inline-flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <MdAutoAwesome size={16} className="mr-1" />
                      Auto Generate
                    </button>
                  </div>

                  {/* Focus Keywords (Multiple) */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Focus Keywords * (Multiple allowed)
                      </label>
                      <button
                        type="button"
                        onClick={addFocusKeyword}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        + Add Focus Keyword
                      </button>
                    </div>
                    {/* Add safety check here */}
                    {(formData.seo.focusKeywords || []).map((keyword, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={keyword}
                            onChange={(e) => updateFocusKeyword(index, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={index === 0 ? "Primary focus keyword (used in title)" : `Focus keyword ${index + 1}`}
                          />
                          {index === 0 && (
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                              Title
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFocusKeyword(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 mt-1">
                      First keyword will be used in title, all keywords will be used in description
                    </p>
                  </div>

                  {/* SEO Keyword (Single) */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Keyword (One main keyword)
                    </label>
                    <input
                      type="text"
                      value={formData.seo.seoKeyword}
                      onChange={(e) => setFormData({
                        ...formData, 
                        seo: {...formData.seo, seoKeyword: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., professional equipment, high quality, premium brand"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Main category/type keyword for broader SEO reach
                    </p>
                  </div>

                  {/* Strategy Info Box */}
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <MdInfoOutline className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-green-800">SEO Strategy</h4>
                        <div className="text-sm text-green-700 mt-1 space-y-1">
                          <p><strong>Title:</strong> Product Name + First Focus Keyword + SEO Keyword</p>
                          <p><strong>Description:</strong> Product Info + ALL Focus Keywords + SEO Keyword</p>
                          <p><strong>Benefits:</strong> Better keyword density, natural language, Google-friendly</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warning/Info Box */}
                  {(!(formData.seo.focusKeywords || []).filter(k => k && k.trim()).length && !(formData.seo.seoKeyword || '').trim()) && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <MdInfoOutline className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-800">
                            <strong>Tip:</strong> Add focus keywords and SEO keyword before generating content for better SEO results.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Auto Generated Title */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto Generated Title
                      {formData.seo.autoTitle && (
                        <span className="text-green-600 text-xs ml-2">✓ Generated (First Focus + SEO Keyword)</span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={formData.seo.autoTitle}
                      onChange={(e) => setFormData({
                        ...formData, 
                        seo: {...formData.seo, autoTitle: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      placeholder="Click 'Auto Generate' to create SEO optimized title"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formData.seo.autoTitle.length}/60 characters (optimal: 50-60)</span>
                      <span className="text-blue-600">
                        {(formData.seo.focusKeywords || []).filter(k => k && k.trim()).length > 0 && (formData.seo.seoKeyword || '').trim()
                          ? '✓ Will use first focus keyword + SEO keyword'
                          : (formData.seo.focusKeywords || []).filter(k => k && k.trim()).length > 0
                          ? '⚠ Will use first focus keyword only'
                          : (formData.seo.seoKeyword || '').trim()
                          ? '⚠ Will use SEO keyword only'
                          : '⚠ No keywords to include'
                        }
                      </span>
                    </div>
                  </div>

                  {/* Auto Generated Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto Generated Description
                      {formData.seo.autoDescription && (
                        <span className="text-green-600 text-xs ml-2">✓ Generated (All Focus + SEO Keywords)</span>
                      )}
                    </label>
                    <textarea
                      value={formData.seo.autoDescription}
                      onChange={(e) => setFormData({
                        ...formData, 
                        seo: {...formData.seo, autoDescription: e.target.value}
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      rows={3}
                      placeholder="Click 'Auto Generate' to create SEO optimized description"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.seo.autoDescription.length}/160 characters (optimal: 150-160)
                    </p>
                  </div>

                  {/* Debug Info Box */}
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-blue-800">
                          <strong>Debug:</strong> 
                          Focus Keywords: [{(formData.seo.focusKeywords || []).filter(k => k && k.trim()).map(k => `"${k}"`).join(', ')}] | 
                          SEO: "{formData.seo.seoKeyword || ''}"
                        </p>
                        <p className="text-xs text-blue-600">
                          <strong>Title will use:</strong> {(formData.seo.focusKeywords || []).filter(k => k && k.trim())[0] || 'No focus keyword'} + {formData.seo.seoKeyword || 'No SEO keyword'}
                        </p>
                        <p className="text-xs text-blue-600">
                          <strong>Description will use:</strong> All {(formData.seo.focusKeywords || []).filter(k => k && k.trim()).length} focus keywords + SEO keyword
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            seo: {
                              ...prev.seo,
                              focusKeywords: ['drone camera', '4K camera drone', 'aerial photography drone'],
                              seoKeyword: 'professional equipment'
                            }
                          }));
                          toast.success('Sample SEO data added!');
                        }}
                        className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Add Sample Data
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <MdCancel size={20} className="mr-2" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || uploadingImages}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 flex items-center"
                  >
                    <MdSave size={20} className="mr-2" />
                    {submitting ? (uploadingImages ? 'Uploading...' : 'Saving...') : (editingDetail ? 'Update Details' : 'Save Details')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Product Details List */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {productDetails.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MdSearch size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No product details found</h3>
            <p>Add your first product details to get started!</p>
          </div>
        ) : (
          <>
            {/* Table Header with Count */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Product Details ({productDetails.length})
                </h3>
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, productDetails.length)} of {productDetails.length}
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
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Features
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SEO
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((detail) => {
                      const product = products.find(p => p._id === detail.productId);
                      return (
                        <tr key={detail._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-200">
                                  {product?.image ? (
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="h-10 w-10 object-cover"
                                    />
                                  ) : (
                                    <div className="h-10 w-10 flex items-center justify-center">
                                      <MdImage size={20} className="text-gray-400" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product?.name || 'Unknown Product'}
                                </div>
                                <div className="text-sm text-gray-500">{product?.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {detail.productTitle}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {detail.productDescription}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {detail.features.filter(f => f.trim()).length} features
                            </div>
                            <div className="text-sm text-gray-500">
                              {detail.featureImages.length} images
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {detail.seo.focusKeywords?.[0] || 'No focus keyword'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {(detail.seo.focusKeywords?.length || 0)} focus keywords
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setEditingDetail(detail);
                                  setFormData(detail);
                                  setSpecifications(convertObjectToSpecifications(detail.specifications));
                                  setPreviewImages(detail.featureImages);
                                  setShowForm(true);
                                }}
                                className="inline-flex items-center px-3 py-1 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                              >
                                <MdEdit size={16} className="mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(detail._id!)}
                                className="inline-flex items-center px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <MdDelete size={16} className="mr-1" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {/* Add invisible spacer to force scrollbar if needed */}
                <div style={{ height: "50px", width: "1px" }}></div>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                      <span className="font-medium">{Math.min(indexOfLastItem, productDetails.length)}</span> of{' '}
                      <span className="font-medium">{productDetails.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first page, last page, current page, and pages around current page
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                page === currentPage
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span
                              key={page}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}

                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Show existing details info */}
      {!editingDetail && productDetails.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <MdInfoOutline className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Products with existing details ({productDetails.length})
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {productDetails.slice(0, 4).map((detail) => {
                    const product = products.find(p => p._id === detail.productId);
                    return (
                      <div key={detail._id} className="flex items-center space-x-2">
                        <span className="text-blue-600">•</span>
                        <span className="truncate">{product?.name || 'Unknown Product'}</span>
                      </div>
                    );
                  })}
                  {productDetails.length > 4 && (
                    <div className="text-blue-600 text-xs">
                      +{productDetails.length - 4} more...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
import { useEffect, useState } from 'react';
import { 
  MdSearch, 
  MdFilterList, 
  MdSort, 
  MdClose,
  MdShoppingCart,
  MdStar,
  MdStarBorder,
  MdGridView,
  MdViewList,
  MdTrendingUp,
  MdSecurity,
  MdVideocam
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  name: string;
  shortDesc: string;
  category: string;
  subCategory: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();
  
  // Get unique categories and subcategories
  const categories = [...new Set(products.map(product => product.category))];
  const subCategories = selectedCategory 
    ? [...new Set(products.filter(p => p.category === selectedCategory).map(p => p.subCategory))]
    : [...new Set(products.map(product => product.subCategory))];

  // Generate dynamic rating for each product (4.5 to 4.9)
  const generateRating = (productId: string) => {
    // Use product ID to ensure consistent rating for each product
    const hash = productId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Generate rating between 4.5 and 4.9
    const rating = 4.5 + (Math.abs(hash) % 40) / 100;
    return Math.round(rating * 10) / 10;
  };

  // Generate dynamic review count
  const generateReviewCount = (productId: string) => {
    const hash = productId.split('').reduce((a, b) => {
      a = ((a << 7) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Generate review count between 50 and 500
    return 50 + (Math.abs(hash) % 450);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<MdStar key={i} size={16} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <MdStarBorder size={16} className="text-yellow-400" />
          <MdStar size={16} className="text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<MdStarBorder key={`empty-${i}`} size={16} className="text-gray-300" />);
    }
    
    return stars;
  };

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply subcategory filter
    if (selectedSubCategory) {
      filtered = filtered.filter(product => product.subCategory === selectedSubCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filtered.sort((a, b) => generateRating(b._id) - generateRating(a._id));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedSubCategory, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSortBy('newest');
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(''); // Reset subcategory when category changes
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-yellow-200 border-t-yellow-500 mx-auto animate-ping"></div>
          </div>
          <p className="mt-6 text-lg text-gray-900 font-medium">Loading CCTV products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Clean White Hero Section with Yellow Accents */}
      <div className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <MdSecurity className="text-gray-900" size={48} />
              <MdVideocam className="text-yellow-500" size={48} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
              Premium CCTV Solutions
              <span className="block text-yellow-500">
                Dubai's Trusted Seller
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Secure your property with our comprehensive range of professional CCTV cameras, surveillance systems, and security solutions across Dubai & UAE
            </p>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{products.length}+</div>
                <div className="text-gray-600 text-sm">CCTV Products</div>
              </div>
              <div className="text-center bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">{categories.length}+</div>
                <div className="text-gray-600 text-sm">Categories</div>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600 text-sm">Installations</div>
              </div>
              <div className="text-center bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">24/7</div>
                <div className="text-gray-600 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" size={24} />
              <input
                type="text"
                placeholder="Search CCTV cameras, surveillance systems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 min-w-[160px] bg-white"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Subcategory Filter */}
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 min-w-[160px] bg-white"
                disabled={!selectedCategory && subCategories.length === 0}
              >
                <option value="">All Subcategories</option>
                {subCategories.map(subCategory => (
                  <option key={subCategory} value={subCategory}>{subCategory}</option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3 px-6 py-4 border-2 border-gray-200 rounded-xl bg-white">
                <MdSort className="text-gray-400" size={20} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="focus:outline-none min-w-[120px] bg-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-yellow-600 shadow-md' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MdGridView size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white text-yellow-600 shadow-md' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MdViewList size={20} />
                </button>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory || selectedSubCategory || sortBy !== 'newest') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-6 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-all border-2 border-red-200 hover:border-red-300"
                >
                  <MdClose size={20} />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="text-lg text-gray-700">
              Showing <span className="font-bold text-yellow-600">{filteredProducts.length}</span> of{' '}
              <span className="font-bold text-gray-900">{products.length}</span> CCTV products
            </p>
            {filteredProducts.length > 0 && (
              <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                <MdSecurity size={16} />
                <span className="text-sm font-medium">Professional Grade</span>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <MdVideocam size={80} className="mx-auto text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No CCTV products found</h3>
            <p className="text-gray-500 mb-8 text-lg">Try adjusting your search criteria or explore different categories</p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all transform hover:scale-105 font-medium text-lg"
            >
              <MdClose size={20} className="mr-2" />
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => {
              const rating = generateRating(product._id);
              const reviewCount = generateReviewCount(product._id);
              const isNewProduct = index < 3; // Mark first 3 as new
              
              return viewMode === 'grid' ? (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-50">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-56 flex items-center justify-center bg-gray-50">
                        <MdVideocam size={64} className="text-gray-400" />
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full shadow-lg">
                        {product.category}
                      </span>
                      {isNewProduct && (
                        <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-white shadow-lg px-3 py-1 rounded-full">
                        <MdStar className="text-yellow-400" size={16} />
                        <span className="text-sm font-bold text-gray-900">{rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.shortDesc}
                    </p>
                    
                    {/* Subcategory */}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {product.subCategory}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-6">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {renderStars(rating)}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">({reviewCount})</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={() => router.push(`/product/${product._id}`)}
                      className="w-full bg-yellow-500 text-white py-4 rounded-xl font-bold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ) : (
                // List View
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-50 rounded-xl flex-shrink-0">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-32 h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-32 h-32 flex items-center justify-center bg-gray-50">
                          <MdVideocam size={48} className="text-gray-400" />
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                            <MdStar className="text-yellow-400" size={18} />
                            <span className="text-sm font-bold text-gray-900">{rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {product.shortDesc}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                            {product.subCategory}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {renderStars(rating)}
                            </div>
                            <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <button 
                          onClick={() => router.push(`/product/${product._id}`)}
                          className="px-8 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
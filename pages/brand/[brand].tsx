import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MdArrowBack, 
  MdSearch, 
  MdFilterList, 
  MdViewModule, 
  MdViewList,
  MdStar,
  MdStarBorder,
  MdShoppingCart,
  MdVerified,
  MdSecurity,
  MdTrendingUp,
  MdFavorite,
  MdFavoriteBorder,
  MdVisibility,
  MdShare,
  MdLocationOn,
  MdCheckCircle
} from 'react-icons/md';
import { toast } from 'react-toastify';

interface Product {
  _id: string;
  name: string;
  shortDesc: string;
  category: string;
  subCategory: string;
  image: string;
  createdAt: string;
}

interface BrandInfo {
  id: string;
  name: string;
  logo: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  features: string[];
  gradientFrom: string;
  gradientTo: string;
  buttonGradient: string;
}

const brandConfig: Record<string, BrandInfo> = {
  hikvision: {
    id: 'hikvision',
    name: 'Hikvision',
    logo: '/brand/hikvision.png',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    description: 'Leading provider of innovative security products and solutions worldwide',
    heroTitle: 'Leading the Future of Security Technology',
    heroSubtitle: 'Discover Hikvision\'s cutting-edge surveillance solutions designed to protect what matters most',
    features: ['AI-Powered Analytics', 'Crystal Clear Imaging', 'Global Trust & Reliability'],
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-blue-800',
    buttonGradient: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
  },
  unv: {
    id: 'unv',
    name: 'UNV',
    logo: '/brand/unv.png',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-600',
    description: 'Professional IP video surveillance solutions with cutting-edge technology',
    heroTitle: 'Professional Video Surveillance Excellence',
    heroSubtitle: 'Experience UNV\'s professional-grade IP surveillance solutions with advanced features',
    features: ['Professional Grade', 'Advanced IP Technology', 'Scalable Solutions'],
    gradientFrom: 'from-gray-700',
    gradientTo: 'to-gray-900',
    buttonGradient: 'from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
  },
  dahua: {
    id: 'dahua',
    name: 'Dahua',
    logo: '/brand/dahua.png',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    description: 'Global leader in video surveillance solutions and services',
    heroTitle: 'Global Leader in Smart Surveillance',
    heroSubtitle: 'Explore Dahua\'s innovative smart surveillance technologies for comprehensive security',
    features: ['Smart AI Technology', 'Global Leadership', 'Comprehensive Security'],
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-purple-800',
    buttonGradient: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
  },
  uniview: {
    id: 'uniview',
    name: 'Uniview',
    logo: '/brand/newunv.png',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    description: 'Pioneer in IP video surveillance with smart and reliable solutions',
    heroTitle: 'Pioneer in Smart IP Surveillance',
    heroSubtitle: 'Discover Uniview\'s innovative IP surveillance solutions with unmatched reliability',
    features: ['IP Innovation Pioneer', 'Smart Solutions', 'Reliable Performance'],
    gradientFrom: 'from-green-600',
    gradientTo: 'to-green-800',
    buttonGradient: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
  }
};

const BrandProductsPage = () => {
  const router = useRouter();
  const { brand } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const brandInfo = brand ? brandConfig[brand as string] : null;

  // Generate dynamic rating for each product (4.5 to 4.9)
  const generateRating = (productId: string) => {
    const hash = productId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const rating = 4.5 + (Math.abs(hash) % 40) / 100;
    return Math.round(rating * 10) / 10;
  };

  // Generate dynamic review count
  const generateReviewCount = (productId: string) => {
    const hash = productId.split('').reduce((a, b) => {
      a = ((a << 7) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return 50 + (Math.abs(hash) % 450);
  };

  // Toggle favorite
  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(productId)) {
      newFavorites.delete(productId);
      toast.success('Removed from favorites');
    } else {
      newFavorites.add(productId);
      toast.success('Added to favorites');
    }
    setFavorites(newFavorites);
  };

  // Share product functionality
  const shareProduct = async (product: Product) => {
    const shareData = {
      title: `${product.name} - ${brandInfo?.name || 'CCTV Dubai'}`,
      text: `Check out this ${product.category}: ${product.shortDesc}`,
      url: `${window.location.origin}/product/${product._id}`
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('Product shared successfully!');
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Product link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Final fallback: try copying URL
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast.success('Product link copied to clipboard!');
      } catch (clipboardError) {
        toast.error('Unable to share product. Please try again.');
      }
    }
  };

  // Quick view product functionality
  const quickViewProduct = (product: Product) => {
    // Open product in new tab for quick preview
    const productUrl = `/product/${product._id}`;
    window.open(productUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    toast.info('Opening product in new tab...');
  };

  // Render star rating
  const renderStars = (rating: number, size: number = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<MdStar key={i} size={size} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <MdStarBorder size={size} className="text-yellow-400" />
          <MdStar size={size} className="text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<MdStarBorder key={`empty-${i}`} size={size} className="text-gray-300" />);
    }
    
    return stars;
  };

  // Fetch brand products
  const fetchBrandProducts = async (brandId: string) => {
    try {
      // 1. First fetch the product assignments with special header
      const assignmentResponse = await fetch(`/api/product-assignments/${brandId}`, {
        headers: {
          'X-App-Client': 'spottive-frontend'
        }
      });
      
      if (assignmentResponse.status === 404) {
        // No assignments found for this brand
        setProducts([]);
        setLoading(false);
        return;
      }
      
      if (!assignmentResponse.ok) {
        console.error('Failed to fetch brand assignments');
        setLoading(false);
        return;
      }
      
      const assignment = await assignmentResponse.json();
      
      if (!assignment.productIds || assignment.productIds.length === 0) {
        // No products assigned
        setProducts([]);
        setLoading(false);
        return;
      }
      
      // 2. Then fetch the actual product details with special header
      const productResponse = await fetch('/api/products-by-ids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-App-Client': 'spottive-frontend'
        },
        body: JSON.stringify({ ids: assignment.productIds })
      });
      
      if (!productResponse.ok) {
        console.error('Failed to fetch products');
        setLoading(false);
        return;
      }
      
      const products = await productResponse.json();
      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching brand products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (brand && brandInfo) {
      fetchBrandProducts(brand as string);
    }
  }, [brand, brandInfo]);

  // Update the fetchAssignedProducts function to remove console logs
  const fetchAssignedProducts = async (brandName: string) => {
    try {
      // First fetch the assignment for this brand
      const assignmentResponse = await fetch(`/api/product-assignments/${brandName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!assignmentResponse.ok) {
        return [];
      }
      
      const assignment = await assignmentResponse.json();
      const productIds = assignment.productIds || [];
      
      if (productIds.length === 0) {
        return [];
      }
      
      // Use the public API endpoint instead
      const productsResponse = await fetch('/api/public/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!productsResponse.ok) {
        return [];
      }
      
      const allProducts = await productsResponse.json();
      
      // Filter products to only those assigned to this brand
      const filteredProducts = allProducts.filter((product: Product) =>
        productIds.includes(product._id)
      );
      
      return filteredProducts;
      
    } catch (error) {
      return [];
    }
  };

  // Update the useEffect to remove console logs
  useEffect(() => {
    const loadProducts = async () => {
      if (brand) {
        setLoading(true);
        try {
          const fetchedProducts = await fetchAssignedProducts(brand as string);
          setProducts(fetchedProducts);
        } catch (error) {
          setProducts([]); 
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadProducts();
  }, [brand]);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products for {brand}...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!brandInfo) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Brand Not Found</h1>
            <p className="text-gray-600 mb-8">The requested brand "{brand}" could not be found.</p>
            <Link 
              href="/product" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MdArrowBack size={20} className="mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Beautiful Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${brandInfo.gradientFrom} ${brandInfo.gradientTo} pt-20`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-white/70 mb-8">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/product" className="hover:text-white transition-colors">Products</Link>
                <span>/</span>
                <Link href="/brand" className="hover:text-white transition-colors">Brands</Link>
                <span>/</span>
                <span className="text-white font-medium">{brandInfo.name}</span>
              </nav>

              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                  <MdVerified size={16} className="mr-2" />
                  Trusted Brand Partner
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  {brandInfo.heroTitle}
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                  {brandInfo.heroSubtitle}
                </p>
              </div>

              {/* Brand Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {brandInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      {index === 0 && <MdSecurity size={20} />}
                      {index === 1 && <MdStar size={20} />}
                      {index === 2 && <MdTrendingUp size={20} />}
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    const productsSection = document.getElementById('products-section');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Explore Products
                </button>
                <Link 
                  href="/product" 
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all duration-300"
                >
                  View All Products
                </Link>
              </div>
            </div>

            {/* Hero Image/Logo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative Background */}
                <div className="absolute -inset-4 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-6"></div>
                <div className="absolute -inset-2 bg-white/20 backdrop-blur-sm rounded-3xl transform -rotate-3"></div>
                
                {/* Brand Logo Container */}
                <div className="relative bg-white p-12 lg:p-16 rounded-3xl shadow-2xl">
                  <Image 
                    src={brandInfo.logo} 
                    alt={`${brandInfo.name} Logo`} 
                    width={200} 
                    height={100} 
                    className="object-contain mx-auto" 
                    priority
                  />
                </div>

                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">25+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">50M+</div>
                    <div className="text-sm text-gray-600">Devices Worldwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      {/* Products Section */}
      <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-xl p-12">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Image 
                    src={brandInfo.logo} 
                    alt={brandInfo.name} 
                    width={60} 
                    height={30} 
                    className="object-contain opacity-50" 
                  />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Products Coming Soon</h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                We're currently updating our {brandInfo.name} product catalog. Check back soon for the latest offerings, or explore our other available products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/admin/product-assignment" 
                  className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${brandInfo.buttonGradient} text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg`}
                >
                  <MdSecurity size={20} className="mr-2" />
                  Assign Products (Admin)
                </Link>
                <Link 
                  href="/product" 
                  className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
                >
                  <MdArrowBack size={20} className="mr-2" />
                  Browse All Products
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {brandInfo.name} Products
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of {brandInfo.name} security and surveillance solutions
              </p>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Category Filter & View Mode */}
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <MdViewModule size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <MdViewList size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 font-medium">
                  {filteredProducts.length === products.length 
                    ? `All ${products.length} products` 
                    : `Showing ${filteredProducts.length} of ${products.length} products`}
                  {searchTerm && ` for "${searchTerm}"`}
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </p>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-lg p-12">
                  <MdSearch size={64} className="mx-auto text-gray-300 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
                  <p className="text-gray-600 text-lg mb-8">Try adjusting your search or filter criteria to find what you're looking for.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                : 'space-y-8'
              }>
                {filteredProducts.map((product, index) => {
                  const rating = generateRating(product._id);
                  const reviewCount = generateReviewCount(product._id);
                  const isFavorite = favorites.has(product._id);
                  const isNew = index < 3; // Mark first 3 as new
                  const isPopular = rating >= 4.7; // High rated products

                  return viewMode === 'grid' ? (
                    // Enhanced Grid View Card with brand name badge
                    <div
                      key={product._id}
                      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                    >
                      {/* Product Image Container with Gradient Overlay */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-square">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Elegant Dark Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Brand Badge - Replaces POPULAR badge with brand name */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm text-white bg-gradient-to-r ${brandInfo.buttonGradient.split(' ')[0]} ${brandInfo.buttonGradient.split(' ')[1]}`}>
                            {brandInfo.name}
                          </span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-md">
                            {product.category}
                          </span>
                        </div>

                        {/* New Badge */}
                        {isNew && (
                          <div className="absolute bottom-4 left-4">
                            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-md">
                              NEW
                            </span>
                          </div>
                        )}

                        {/* Action Buttons - Now in a horizontal layout at the bottom */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(product._id);
                            }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
                            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {isFavorite ? (
                              <MdFavorite size={18} className="text-red-500" />
                            ) : (
                              <MdFavoriteBorder size={18} className="text-gray-600" />
                            )}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              shareProduct(product);
                            }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
                            title="Share product"
                          >
                            <MdShare size={18} className="text-gray-600" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              quickViewProduct(product);
                            }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
                            title="Quick view"
                          >
                            <MdVisibility size={18} className="text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info - Redesigned with cleaner look */}
                      <div className="p-5">
                        {/* Product Title and Rating */}
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center justify-between mt-1.5">
                            <div className="flex">
                              {renderStars(rating, 14)}
                            </div>
                            <span className="text-sm font-medium text-gray-500">{reviewCount}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.shortDesc}
                        </p>

                        {/* Bottom Section - Subcategory and Action Button */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                            {product.subCategory}
                          </span>
                          
                          <span className="flex items-center text-xs font-medium text-gray-500">
                            <MdLocationOn size={12} className="mr-1" />
                            UAE Stock
                          </span>
                        </div>

                        {/* View Details Button */}
                        <button 
                          onClick={() => router.push(`/product/${product._id}`)}
                          className={`w-full mt-4 px-5 py-2.5 bg-gradient-to-r ${brandInfo.buttonGradient} text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center`}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Enhanced List View Card with brand name badge
                    <div
                      key={product._id}
                      className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="flex gap-6 p-5">
                        {/* Product Image with Overlay */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex-shrink-0 w-32 h-32 sm:w-44 sm:h-44">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          />
                          
                          {/* Brand Badge - Replaces POPULAR */}
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-md text-white bg-gradient-to-r ${brandInfo.buttonGradient.split(' ')[0]} ${brandInfo.buttonGradient.split(' ')[1]}`}>
                              {brandInfo.name}
                            </span>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute bottom-2 left-2">
                            <span className="px-2 py-1 bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-sm">
                              {product.category}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            {/* Header with Title and Actions */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5 line-clamp-1">
                                  {product.name}
                                </h3>
                                
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
                                    {product.subCategory}
                                  </span>
                                  
                                  {isNew && (
                                    <span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-md">
                                      NEW
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(product._id);
                                  }}
                                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                  {isFavorite ? (
                                    <MdFavorite size={18} className="text-red-500" />
                                  ) : (
                                    <MdFavoriteBorder size={18} className="text-gray-400" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    shareProduct(product);
                                  }}
                                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                                  title="Share product"
                                >
                                  <MdShare size={18} className="text-gray-400" />
                                </button>
                              </div>
                            </div>
                            
                            {/* Description */}
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {product.shortDesc}
                            </p>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {renderStars(rating, 14)}
                              </div>
                              <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
                            </div>
                          </div>

                          {/* Bottom section with Availability and View Button */}
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <MdLocationOn size={14} />
                              <span>Available in UAE</span>
                            </div>
                            <Link 
                              href={`/product/${product._id}`}
                              className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${brandInfo.buttonGradient} text-white rounded-xl font-medium hover:shadow-md transition-all duration-200 text-sm`}
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrandProductsPage;
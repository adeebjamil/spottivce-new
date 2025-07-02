import { GetStaticProps, GetStaticPaths } from 'next';
import { useState, useEffect } from 'react';
import { 
  MdStar, MdStarHalf, MdStarOutline,
  MdFavorite, MdFavoriteBorder,
  MdShare, MdZoomIn,
  MdArrowBack, MdClose,
  MdPhone, MdEmail,
  MdPerson, MdMessage,
  MdCheckCircle, MdArrowForward,
  MdLocationOn, MdVerified,
  MdShield, MdInfo
} from 'react-icons/md';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import Head from 'next/head';

interface Product {
  _id: string;
  name: string;
  shortDesc: string;
  category: string;
  subCategory: string;
  image: string;
}

interface ProductDetail {
  _id: string;
  productId: string;
  productTitle: string;
  productDescription: string;
  features: string[];
  specifications: { [key: string]: string };
  featureImages: string[];
  seo: {
    focusKeyword: string;
    seoKeywords: string[];
    autoTitle: string;
    autoDescription: string;
  };
}

interface Props {
  product: Product | null;
  productDetail: ProductDetail | null;
}

const ProductDetailPage = ({ product, productDetail }: Props) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [scrolled, setScrolled] = useState(false);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    productName: '',
    userName: '',
    userEmail: '',
    userMobile: '',
    message: ''
  });

  // Handle scrolling effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize product name when component mounts
  useEffect(() => {
    if (product) {
      setContactForm(prev => ({
        ...prev,
        productName: productDetail?.productTitle || product.name
      }));
    }
  }, [product, productDetail]);

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: productDetail?.productTitle || product?.name || 'Check out this product',
        text: productDetail?.productDescription || product?.shortDesc || 'I found this amazing product',
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
        toast.info('Product link copied to clipboard!');
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info('Product link copied to clipboard!');
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/product-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          productId: product?._id,
          createdAt: new Date()
        }),
      });

      if (response.ok) {
        // Close contact modal
        setShowContactModal(false);
        
        // Show success modal
        setShowSuccessModal(true);
        
        // Reset form
        setContactForm({
          productName: productDetail?.productTitle || product?.name || '',
          userName: '',
          userEmail: '',
          userMobile: '',
          message: ''
        });

        // Show toast notification
        toast.success('Your enquiry has been submitted successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast.error('Failed to submit enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-16 w-16 relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-blue-600 border-opacity-25 rounded-full"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md text-center px-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6">
            <MdInfo className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8 text-lg">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/product')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <MdArrowBack size={20} className="mr-2" />
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  // Safely get all images
  const allImages = [
    product.image,
    ...(productDetail?.featureImages || [])
  ].filter(Boolean);

  // Product with no detailed info state
  if (!productDetail) {
    return (
      <div className="min-h-screen bg-white">
        <Head>
          <title>{product.name} | Spottive Technologies</title>
          <meta name="description" content={product.shortDesc} />
        </Head>

        {/* Sticky Header */}
        <div className={`sticky top-0 z-30 bg-white shadow-sm transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <nav className="flex items-center space-x-2 text-sm">
                <button
                  onClick={() => router.push('/product')}
                  className="text-blue-600 hover:text-blue-700 transition-colors flex items-center"
                >
                  <MdArrowBack className="mr-1" size={16} />
                  <span>Back to Products</span>
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{product.category}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
              </nav>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Add to favorites"
                >
                  {isFavorite ? (
                    <MdFavorite size={20} className="text-red-500" />
                  ) : (
                    <MdFavoriteBorder size={20} className="text-gray-500" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Share product"
                >
                  <MdShare size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-lg aspect-square flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="text-center p-12">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
                      <MdPhone size={40} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">Image not available</p>
                  </div>
                )}
                
        
                
                {/* Quick View Button */}
                {product.image && (
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110"
                  >
                    <MdZoomIn size={24} className="text-gray-700" />
                  </button>
                )}
              </div>
              
              {/* Product Highlights */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                  <MdVerified className="mr-2" size={20} />
                  Product Highlights
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-blue-700">Official warranty included</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-blue-700">Free delivery in UAE</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-blue-700">Expert technical support available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-blue-700">Installation service optional</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Title and Badges */}
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {product.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                    {product.subCategory}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <MdStar key={i} size={22} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-600 ml-2">
                      (5.0) Top Rated
                    </span>
                  </div>
                  
                  <div className="flex items-center text-green-600">
                    <MdVerified size={20} className="mr-1" />
                    <span className="text-sm font-medium">Authentic Product</span>
                  </div>
                  
                  <div className="flex items-center text-blue-600">
                    <MdLocationOn size={20} className="mr-1" />
                    <span className="text-sm font-medium">Available in UAE</span>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="flex border-b border-gray-200">
                  <button
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'description' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'details' 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                </div>
                
                <div className="p-6">
                  {activeTab === 'description' && (
                    <div className="prose prose-blue max-w-none">
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {product.shortDesc}
                      </p>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <MdInfo className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              Detailed product information is not available yet. Please contact us for more details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'details' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Product Code</p>
                          <p className="font-medium text-gray-900">{product._id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Category</p>
                          <p className="font-medium text-gray-900">{product.category}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Sub Category</p>
                          <p className="font-medium text-gray-900">{product.subCategory}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Availability</p>
                          <p className="font-medium text-green-600">In Stock</p>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                        <p className="text-yellow-800 text-sm">
                          <strong>Note:</strong> For complete technical specifications and detailed information, please click the "Contact for Details" button below.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MdVerified size={24} className="text-blue-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-800">Authentic Product</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MdShield size={24} className="text-green-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-800">Official Warranty</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MdPhone size={24} className="text-purple-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-800">24/7 Support</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MdLocationOn size={24} className="text-orange-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-800">UAE Delivery</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <button 
                  onClick={() => {
                    setContactForm(prev => ({
                      ...prev,
                      productName: product.name
                    }));
                    setShowContactModal(true);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <MdPhone size={24} className="mr-3" />
                  Contact For Details & Pricing
                </button>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex-1 bg-white border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    {isFavorite ? (
                      <>
                        <MdFavorite size={20} className="mr-2 text-red-500" />
                        Saved
                      </>
                    ) : (
                      <>
                        <MdFavoriteBorder size={20} className="mr-2 text-gray-600" />
                        Save
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="flex-1 bg-white border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <MdShare size={20} className="mr-2 text-gray-600" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section - Would be added here */}
      </div>
    );
  }

  // Full product with details view
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{productDetail.productTitle} | Spottive Technologies</title>
        <meta name="description" content={productDetail.productDescription.slice(0, 160)} />
        <meta name="keywords" content={productDetail.seo?.seoKeywords?.join(', ')} />
      </Head>

      {/* Sticky Header */}
      <div className={`sticky top-0 z-30 bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => router.push('/product')}
                className="text-blue-600 hover:text-blue-700 transition-colors flex items-center"
              >
                <MdArrowBack className="mr-1" size={16} />
                <span>Back to Products</span>
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{product.category}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{productDetail.productTitle}</span>
            </nav>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Add to favorites"
              >
                {isFavorite ? (
                  <MdFavorite size={20} className="text-red-500" />
                ) : (
                  <MdFavoriteBorder size={20} className="text-gray-500" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Share product"
              >
                <MdShare size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-lg aspect-square flex items-center justify-center group">
              {allImages.length > 0 ? (
                <>
                  <img
                    src={allImages[selectedImage]}
                    alt={productDetail.productTitle}
                    className="w-full h-full object-contain p-8 transition-all duration-300 group-hover:scale-[1.02]"
                    onClick={() => setShowImageModal(true)}
                  />
                  
                  {/* Zoom Button */}
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-200 transform opacity-0 group-hover:opacity-100 hover:scale-110"
                  >
                    <MdZoomIn size={24} className="text-gray-700" />
                  </button>
                  
                  {/* Image Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                        disabled={allImages.length <= 1}
                      >
                        <MdArrowBack size={24} className="text-gray-700" />
                      </button>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100"
                        disabled={allImages.length <= 1}
                      >
                        <MdArrowForward size={24} className="text-gray-700" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center p-12">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
                    <MdPhone size={40} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Image not available</p>
                </div>
              )}
              
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all transform ${
                      selectedImage === index 
                        ? 'border-blue-500 shadow-md scale-105' 
                        : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productDetail.productTitle} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MdVerified size={24} className="text-blue-600" />
                </div>
                <p className="text-xs font-medium text-gray-800">Authentic Product</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MdShield size={24} className="text-green-600" />
                </div>
                <p className="text-xs font-medium text-gray-800">Official Warranty</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MdPhone size={24} className="text-purple-600" />
                </div>
                <p className="text-xs font-medium text-gray-800">24/7 Support</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MdLocationOn size={24} className="text-orange-600" />
                </div>
                <p className="text-xs font-medium text-gray-800">UAE Delivery</p>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Badges */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">
                  {product.subCategory}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {productDetail.productTitle}
              </h1>
              
              <div className="flex items-center flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <MdStar key={i} size={22} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600 ml-2">
                    (5.0) Top Rated
                  </span>
                </div>
                
                <div className="flex items-center text-green-600">
                  <MdVerified size={20} className="mr-1" />
                  <span className="text-sm font-medium">Authentic Product</span>
                </div>
                
                <div className="flex items-center text-blue-600">
                  <MdLocationOn size={20} className="mr-1" />
                  <span className="text-sm font-medium">Available in UAE</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-4 text-center font-medium ${
                    activeTab === 'description' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium ${
                    activeTab === 'features' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium ${
                    activeTab === 'specs' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('specs')}
                >
                  Specs
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="prose prose-blue max-w-none">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {productDetail.productDescription}
                    </p>
                  </div>
                )}
                
                {activeTab === 'features' && (
                  <div>
                    {productDetail.features && productDetail.features.filter(f => f && f.trim()).length > 0 ? (
                      <ul className="space-y-3">
                        {productDetail.features.filter(f => f && f.trim()).map((feature, index) => (
                          <li key={index} className="flex items-start bg-gray-50 p-3 rounded-xl">
                            <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            </span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <MdInfo className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              No specific features have been added for this product.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'specs' && (
                  <div>
                    {productDetail.specifications && typeof productDetail.specifications === 'object' && Object.keys(productDetail.specifications).length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {Object.entries(productDetail.specifications).map(([key, value], index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-gray-100 last:border-0">
                            <dt className="text-sm font-medium text-gray-500 sm:w-1/3 mb-1 sm:mb-0">{key}</dt>
                            <dd className="text-sm font-semibold text-gray-900 sm:w-2/3">
                              {typeof value === 'string' ? value : JSON.stringify(value)}
                            </dd>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <MdInfo className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              No specifications have been added for this product.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <button 
                onClick={() => {
                  setContactForm(prev => ({
                    ...prev,
                    productName: productDetail.productTitle
                  }));
                  setShowContactModal(true);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <MdPhone size={24} className="mr-3" />
                Contact For Pricing & More Details
              </button>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex-1 bg-white border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  {isFavorite ? (
                    <>
                      <MdFavorite size={20} className="mr-2 text-red-500" />
                      Saved
                    </>
                  ) : (
                    <>
                      <MdFavoriteBorder size={20} className="mr-2 text-gray-600" />
                      Save
                    </>
                  )}
                </button>
                
                <button 
                  onClick={handleShare}
                  className="flex-1 bg-white border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <MdShare size={20} className="mr-2 text-gray-600" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Specifications Section */}
        {productDetail.specifications && typeof productDetail.specifications === 'object' && Object.keys(productDetail.specifications).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="w-3 h-3 bg-blue-600 rounded-lg"></span>
              </span>
              Technical Specifications
            </h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
                {Object.entries(productDetail.specifications).map(([key, value], index) => (
                  <div key={index} className="bg-white p-6 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-500 mb-2">{key}</dt>
                    <dd className="text-base font-semibold text-gray-900">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Product Features Section (if available) */}
        {productDetail.features && productDetail.features.filter(f => f && f.trim()).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="w-3 h-3 bg-green-600 rounded-lg"></span>
              </span>
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productDetail.features.filter(f => f && f.trim()).map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors focus:outline-none"
                >
                  <MdClose size={24} />
                </button>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-5">
                {/* Product Name (Predefined) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product
                  </label>
                  <input
                    type="text"
                    value={contactForm.productName}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      value={contactForm.userName}
                      onChange={(e) => setContactForm({...contactForm, userName: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* User Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="email"
                      value={contactForm.userEmail}
                      onChange={(e) => setContactForm({...contactForm, userEmail: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* User Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Mobile Number *
                  </label>
                  <div className="relative">
                    <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="tel"
                      value={contactForm.userMobile}
                      onChange={(e) => setContactForm({...contactForm, userMobile: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <MdMessage className="absolute left-3 top-3 text-gray-500" size={20} />
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      placeholder="I'm interested in this product and would like to know more..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 transition-all duration-200 flex items-center"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : 'Send Enquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}  
          >
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <MdCheckCircle className="w-12 h-12 text-green-600" />
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Thank You!
              </h3>
              <p className="text-lg text-gray-700 mb-2">
                Your enquiry has been submitted successfully.
              </p>
              <p className="text-base text-gray-600 mb-8">
                Our team will reach out to you shortly with pricing and more details about this product.
              </p>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Your Enquiry Details:</h4>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3">
                    <span className="text-gray-500">Product:</span>
                    <span className="col-span-2 font-medium text-gray-900">{contactForm.productName}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-gray-500">Name:</span>
                    <span className="col-span-2 font-medium text-gray-900">{contactForm.userName}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-gray-500">Email:</span>
                    <span className="col-span-2 font-medium text-gray-900">{contactForm.userEmail}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-gray-500">Mobile:</span>
                    <span className="col-span-2 font-medium text-gray-900">{contactForm.userMobile}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    router.push('/');
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-800 transition-all duration-200"
                >
                  Go to Home
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors focus:outline-none"
              >
                <MdClose size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && allImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="relative max-w-5xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 p-2 bg-white/20 backdrop-blur-sm rounded-full z-10 hover:bg-white/30 transition-colors"
            >
              <MdClose size={24} className="text-white" />
            </button>
            
            <div className="relative">
              <img
                src={allImages[selectedImage]}
                alt={productDetail.productTitle}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <MdArrowBack size={24} className="text-white" />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <MdArrowForward size={24} className="text-white" />
                  </button>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(index);
                        }}
                        className={`w-3 h-3 rounded-full ${
                          selectedImage === index 
                            ? 'bg-white' 
                            : 'bg-white/40 hover:bg-white/60'
                        } transition-all duration-200`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="text-center mt-4">
              <p className="text-white/70 text-sm">
                {selectedImage + 1} / {allImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Server-side code remains the same
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    
    const products = await db.collection('products').find({}, { projection: { _id: 1 } }).toArray();

    const paths = products.map((product) => ({
      params: { id: product._id.toString() }
    }));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    
    const productId = params?.id as string;
    
    if (!ObjectId.isValid(productId)) {
      return { notFound: true };
    }

    const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
    const productDetail = await db.collection('productDetails').findOne({ productId });

    if (!product) {
      return { notFound: true };
    }

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        productDetail: productDetail ? JSON.parse(JSON.stringify(productDetail)) : null,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
};

export default ProductDetailPage;
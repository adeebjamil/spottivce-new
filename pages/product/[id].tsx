// filepath: [[id].tsx](http://_vscodecontentref_/1)
import { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import { 
  MdStar, 
  MdFavorite, 
  MdShare,
  MdZoomIn,
  MdArrowBack,
  MdClose,
  MdPhone,
  MdEmail,
  MdPerson,
  MdMessage,
  MdCheckCircle
} from 'react-icons/md';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

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
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    productName: '',
    userName: '',
    userEmail: '',
    userMobile: '',
    message: ''
  });

  // Initialize product name when component mounts
  useState(() => {
    if (product) {
      setContactForm(prev => ({
        ...prev,
        productName: productDetail?.productTitle || product.name
      }));
    }
  });

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

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/product')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <MdArrowBack size={20} className="mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Handle case where product exists but no detailed info
  if (!productDetail) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => router.push('/product')}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Products
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{product.category}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                    <MdPhone size={64} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Basic Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <MdStar key={i} size={20} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(4.8) 128 reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {product.subCategory}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.shortDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    setContactForm(prev => ({
                      ...prev,
                      productName: product.name
                    }));
                    setShowContactModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  <MdPhone size={20} className="mr-2" />
                  Contact for this Product
                </button>
                <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <MdFavorite size={20} className="text-red-500" />
                </button>
                <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <MdShare size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> Detailed product information is not available yet. Please contact us for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Safely get all images
  const allImages = [
    product.image,
    ...(productDetail.featureImages || [])
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => router.push('/product')}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Products
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group">
              {allImages.length > 0 ? (
                <>
                  <img
                    src={allImages[selectedImage]}
                    alt={productDetail.productTitle}
                    className="w-full h-96 object-cover cursor-zoom-in"
                    onClick={() => setShowImageModal(true)}
                  />
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MdZoomIn size={20} className="text-gray-600" />
                  </button>
                </>
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                  <MdPhone size={64} className="text-gray-400" />
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
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-blue-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
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
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productDetail.productTitle}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <MdStar key={i} size={20} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(4.8) 128 reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {product.subCategory}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {productDetail.productDescription}
              </p>
            </div>

            {/* Features */}
            {productDetail.features && productDetail.features.filter(f => f && f.trim()).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {productDetail.features.filter(f => f && f.trim()).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setContactForm(prev => ({
                    ...prev,
                    productName: productDetail.productTitle
                  }));
                  setShowContactModal(true);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                <MdPhone size={20} className="mr-2" />
                Contact for this Product
              </button>
              <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <MdFavorite size={20} className="text-red-500" />
              </button>
              <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <MdShare size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {productDetail.specifications && typeof productDetail.specifications === 'object' && Object.keys(productDetail.specifications).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Specifications</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
                {Object.entries(productDetail.specifications).map(([key, value], index) => (
                  <div key={index} className="bg-white p-6">
                    <dt className="text-sm font-medium text-gray-500 mb-1">{key}</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Contact for Product</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                  <MdClose size={20} />
                </button>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Product Name (Predefined) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
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
                    <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={contactForm.userName}
                      onChange={(e) => setContactForm({...contactForm, userName: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={contactForm.userEmail}
                      onChange={(e) => setContactForm({...contactForm, userEmail: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={contactForm.userMobile}
                      onChange={(e) => setContactForm({...contactForm, userMobile: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MdMessage className="absolute left-3 top-3 text-gray-400" size={20} />
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Enter your message or enquiry about this product..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 flex items-center"
                  >
                    {submitting ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <MdCheckCircle className="w-12 h-12 text-green-500" />
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Thank You!
              </h3>
              <p className="text-lg text-gray-600 mb-2">
                Thank you for contacting us.
              </p>
              <p className="text-base text-gray-500 mb-8">
                We will reach out to you soon with more details about this product.
              </p>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Enquiry Details:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Product:</strong> {contactForm.productName}</p>
                  <p><strong>Name:</strong> {contactForm.userName}</p>
                  <p><strong>Email:</strong> {contactForm.userEmail}</p>
                  <p><strong>Mobile:</strong> {contactForm.userMobile}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    router.push('/');
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Go to Home
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <MdClose size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && allImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-10"
            >
              <MdArrowBack size={20} className="text-gray-600" />
            </button>
            <img
              src={allImages[selectedImage]}
              alt={productDetail.productTitle}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Tell Next.js which product IDs exist (for Static Site Generation)
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    
    // Fetch all product IDs from database
    const products = await db.collection('products').find({}, { projection: { _id: 1 } }).toArray();

    // Generate paths for each product
    const paths = products.map((product) => ({
      params: { id: product._id.toString() }
    }));

    return {
      paths,
      fallback: 'blocking' // Generate pages on-demand for new products
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

// Fetch data for each product at build time (for Static Site Generation)
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    
    const productId = params?.id as string;
    
    if (!ObjectId.isValid(productId)) {
      return { 
        notFound: true 
      };
    }

    // Fetch product
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
    
    // Fetch product detail
    const productDetail = await db.collection('productDetails').findOne({ productId });

    if (!product) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        productDetail: productDetail ? JSON.parse(JSON.stringify(productDetail)) : null,
      },
      revalidate: 3600, // Revalidate every hour (ISR)
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { 
      notFound: true 
    };
  }
};

export default ProductDetailPage;
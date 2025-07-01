import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MdArrowBack, 
  MdVideocam, 
  MdSecurity, 
  MdShield, 
  MdCloud,
  MdCheckCircle,
  MdStar,
  MdTrendingUp,
  MdDownload,
  MdPhone,
  MdEmail,
  MdPlayArrow,
  MdArrowForward,
  MdVerified,
  MdFlashOn,
  MdSettings,
  MdWifi,
  MdNotifications,
  MdLock,
  MdVisibility,
  MdStorage,
  MdAnalytics
} from 'react-icons/md';

type ProductData = {
  title: string;
  subtitle: string;
  description: string;
  hero: string;
  icon: any;
  color: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  gallery: string[];
  features: Array<{
    title: string;
    description: string;
    icon: any;
  }>;
  specifications: Array<{
    category: string;
    specs: Array<{ name: string; value: string; }>;
  }>;
  benefits: Array<{ title: string; value: string; }>;
  testimonials: Array<{
    name: string;
    company: string;
    rating: number;
    comment: string;
    avatar: string;
  }>;
};

const productsData: Record<string, ProductData> = {
  surveillance: {
    title: "AI-Powered Surveillance Systems",
    subtitle: "Next-Generation CCTV Technology",
    description: "Revolutionary surveillance technology that combines artificial intelligence with advanced video analytics to provide unparalleled security monitoring and threat detection capabilities for modern businesses.",
    hero: "/feature-grid/img5.webp",
    icon: MdVideocam,
    color: "blue",
    price: "Starting at $2,999",
    originalPrice: "$3,999",
    badge: "Best Seller",
    gallery: [
      "/feature-grid/img5.webp",
      "/feature-grid/img6.webp",
      "/feature-grid/img7.webp",
      "/feature-grid/img8.webp"
    ],
    features: [
      {
        title: "AI-Powered Detection",
        description: "Advanced machine learning algorithms for real-time threat detection and facial recognition",
        icon: MdAnalytics
      },
      {
        title: "4K/8K Resolution",
        description: "Ultra-high definition video recording with crystal clear image quality",
        icon: MdVisibility
      },
      {
        title: "Night Vision",
        description: "Advanced infrared technology for 24/7 monitoring in complete darkness",
        icon: MdFlashOn
      },
      {
        title: "Cloud Storage",
        description: "Secure cloud backup with unlimited storage and global accessibility",
        icon: MdCloud
      },
      {
        title: "Mobile Integration",
        description: "Real-time mobile alerts and remote viewing through dedicated apps",
        icon: MdNotifications
      },
      {
        title: "Smart Analytics",
        description: "Intelligent video analytics with motion detection and behavior analysis",
        icon: MdTrendingUp
      }
    ],
    specifications: [
      {
        category: "Camera Specifications",
        specs: [
          { name: "Resolution", value: "4K/8K Ultra HD" },
          { name: "Frame Rate", value: "60fps" },
          { name: "Field of View", value: "110° Wide Angle" },
          { name: "Night Vision Range", value: "100ft IR Range" },
          { name: "Weather Rating", value: "IP67 Weatherproof" }
        ]
      },
      {
        category: "AI Features",
        specs: [
          { name: "Facial Recognition", value: "99.9% Accuracy" },
          { name: "Motion Detection", value: "Smart Zone Detection" },
          { name: "Object Tracking", value: "Real-time Tracking" },
          { name: "Behavior Analysis", value: "Advanced AI Analytics" },
          { name: "Alert System", value: "Instant Notifications" }
        ]
      },
      {
        category: "Storage & Connectivity",
        specs: [
          { name: "Local Storage", value: "2TB HDD Included" },
          { name: "Cloud Storage", value: "Unlimited (Premium)" },
          { name: "Connectivity", value: "WiFi 6, Ethernet, 4G/5G" },
          { name: "Power", value: "PoE+ Powered" },
          { name: "Mobile App", value: "iOS & Android" }
        ]
      }
    ],
    benefits: [
      { title: "Crime Reduction", value: "85%" },
      { title: "False Alarms", value: "-90%" },
      { title: "Response Time", value: "60% Faster" },
      { title: "Detection Accuracy", value: "99.9%" }
    ],
  
    testimonials: [
      {
        name: "John Smith",
        company: "TechCorp Inc.",
        rating: 5,
        comment: "The AI detection capabilities are incredible. We've reduced false alarms by 90% and the image quality is outstanding.",
        avatar: "/feature-grid/img19.webp"
      },
      {
        name: "Sarah Johnson",
        company: "Retail Solutions",
        rating: 5,
        comment: "Installation was seamless and the mobile app makes monitoring so easy. Highly recommended for any business.",
        avatar: "/feature-grid/img20.webp"
      }
    ]
  },
  commercial: {
    title: "Enterprise Security Solutions",
    subtitle: "Complete Commercial Protection",
    description: "Comprehensive commercial security solutions designed for offices, retail stores, warehouses, and industrial facilities with professional-grade monitoring and management systems.",
    hero: "/feature-grid/img9.webp",
    icon: MdSecurity,
    color: "purple",
    price: "Starting at $4,999",
    originalPrice: "$6,999",
    badge: "Enterprise Choice",
    gallery: [
      "/feature-grid/img9.webp",
      "/feature-grid/img10.webp",
      "/feature-grid/img11.webp"

    ],
    features: [
      {
        title: "Multi-Site Control",
        description: "Centralized management of multiple locations from a single dashboard",
        icon: MdSettings
      },
      {
        title: "Access Control",
        description: "Advanced keycard and biometric access control systems",
        icon: MdLock
      },
      {
        title: "Real-time Alerts",
        description: "Instant notifications for security breaches and system events",
        icon: MdNotifications
      },
      {
        title: "Custom Reports",
        description: "Detailed analytics and custom reporting for business insights",
        icon: MdAnalytics
      },
      {
        title: "Professional Installation",
        description: "Expert installation and configuration by certified technicians",
        icon: MdVerified
      },
      {
        title: "24/7 Monitoring",
        description: "Round-the-clock professional monitoring and response services",
        icon: MdSecurity
      }
    ],
    specifications: [
      {
        category: "System Capabilities",
        specs: [
          { name: "Camera Capacity", value: "Up to 64 Cameras" },
          { name: "Storage", value: "10TB RAID Storage" },
          { name: "Recording", value: "30 Days Continuous" },
          { name: "Remote Access", value: "Multi-user Support" },
          { name: "Integration", value: "Third-party Compatible" }
        ]
      },
      {
        category: "Access Control",
        specs: [
          { name: "User Capacity", value: "10,000+ Users" },
          { name: "Card Types", value: "RFID, NFC, Biometric" },
          { name: "Door Control", value: "Magnetic Locks" },
          { name: "Time Zones", value: "Unlimited Schedules" },
          { name: "Audit Trail", value: "Complete Logging" }
        ]
      }
    ],
    benefits: [
      { title: "Security Incidents", value: "-75%" },
      { title: "Operational Efficiency", value: "+60%" },
      { title: "Cost Reduction", value: "40%" },
      { title: "Response Time", value: "80% Faster" }
    ],
 
    testimonials: [
      {
        name: "Michael Chen",
        company: "Global Logistics",
        rating: 5,
        comment: "Managing security across 15 locations has never been easier. The centralized dashboard is a game-changer.",
        avatar: "/feature-grid/img18.webp"
      }
    ]
  },
  residential: {
    title: "Smart Home Security",
    subtitle: "Advanced Residential Protection",
    description: "Intelligent home security systems with wireless cameras, smart doorbells, and seamless home automation integration for complete peace of mind.",
    hero: "/feature-grid/img12.webp",
    icon: MdShield,
    color: "emerald",
    price: "Starting at $799",
    originalPrice: "$1,199",
    badge: "Most Popular",
    gallery: [
      "/feature-grid/img12.webp",
      "/feature-grid/img13.webp"
    ],
    features: [
      {
        title: "Wireless Installation",
        description: "Easy DIY installation with wireless cameras and sensors",
        icon: MdWifi
      },
      {
        title: "Smart Integration",
        description: "Works with Alexa, Google Home, and Apple HomeKit",
        icon: MdSettings
      },
      {
        title: "Mobile Alerts",
        description: "Instant smartphone notifications with live video streaming",
        icon: MdNotifications
      },
      {
        title: "Two-Way Audio",
        description: "Communicate with visitors through built-in speakers and microphones",
        icon: MdVideocam
      },
      {
        title: "Smart Detection",
        description: "AI-powered person, pet, and package detection",
        icon: MdAnalytics
      },
      {
        title: "Cloud Recording",
        description: "Secure cloud storage with easy video retrieval",
        icon: MdCloud
      }
    ],
    specifications: [
      {
        category: "Camera Features",
        specs: [
          { name: "Resolution", value: "1080p Full HD" },
          { name: "Field of View", value: "130° Wide Angle" },
          { name: "Night Vision", value: "30ft Range" },
          { name: "Audio", value: "Two-way Communication" },
          { name: "Storage", value: "Local & Cloud" }
        ]
      },
      {
        category: "Smart Features",
        specs: [
          { name: "AI Detection", value: "Person, Pet, Package" },
          { name: "Voice Control", value: "Alexa, Google, Siri" },
          { name: "Mobile App", value: "iOS & Android" },
          { name: "Notifications", value: "Real-time Alerts" },
          { name: "Recording", value: "Motion Triggered" }
        ]
      }
    ],
    benefits: [
      { title: "Peace of Mind", value: "24/7" },
      { title: "False Alarms", value: "-95%" },
      { title: "Easy Setup", value: "30 min" },
      { title: "Battery Life", value: "6 months" }
    ],
 
    testimonials: [
      {
        name: "Lisa Williams",
        company: "Homeowner",
        rating: 5,
        comment: "Setup was incredibly easy and the app is so user-friendly. I feel much safer knowing I can check on my home anytime.",
        avatar: "/feature-grid/img17.webp"
      }
    ]
  },
  cloud: {
    title: "Cloud Security Infrastructure",
    subtitle: "Next-Gen Cloud Platform",
    description: "Scalable cloud-based security platform with edge computing, real-time synchronization, and unlimited storage capacity for enterprises of any size.",
    hero: "/feature-grid/img14.webp",
    icon: MdCloud,
    color: "orange",
    price: "Starting at $99/month",
    badge: "Future Ready",
    gallery: [
      "/feature-grid/img14.webp",
      "/feature-grid/img15.webp"
    ],
    features: [
      {
        title: "Edge Computing",
        description: "Distributed processing for faster response times and reduced latency",
        icon: MdFlashOn
      },
      {
        title: "Auto Backup",
        description: "Automatic data backup and redundancy across multiple data centers",
        icon: MdStorage
      },
      {
        title: "Global Access",
        description: "Access your security system from anywhere in the world",
        icon: MdWifi
      },
      {
        title: "Scalable Storage",
        description: "Unlimited storage that grows with your business needs",
        icon: MdTrendingUp
      },
      {
        title: "AI Analytics",
        description: "Cloud-powered AI for advanced video analytics and insights",
        icon: MdAnalytics
      },
      {
        title: "99.99% Uptime",
        description: "Enterprise-grade reliability with guaranteed uptime SLA",
        icon: MdVerified
      }
    ],
    specifications: [
      {
        category: "Cloud Infrastructure",
        specs: [
          { name: "Data Centers", value: "Global Network" },
          { name: "Uptime SLA", value: "99.99% Guaranteed" },
          { name: "Storage", value: "Unlimited Scalable" },
          { name: "Bandwidth", value: "High-speed CDN" },
          { name: "Security", value: "Enterprise Encryption" }
        ]
      },
      {
        category: "Platform Features",
        specs: [
          { name: "API Access", value: "RESTful APIs" },
          { name: "Integration", value: "Third-party Compatible" },
          { name: "Analytics", value: "Real-time Processing" },
          { name: "Monitoring", value: "24/7 System Health" },
          { name: "Support", value: "Dedicated Teams" }
        ]
      }
    ],
    benefits: [
      { title: "Cost Reduction", value: "60%" },
      { title: "Scalability", value: "Unlimited" },
      { title: "Performance", value: "300% Faster" },
      { title: "Reliability", value: "99.99%" }
    ],
    testimonials: [
      {
        name: "David Rodriguez",
        company: "Tech Innovations",
        rating: 5,
        comment: "The cloud platform scales perfectly with our growth. The reliability and performance have exceeded our expectations.",
        avatar: "/feature-grid/img16.webp"
      }
    ]
  }
};

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    if (slug && productsData[slug as string]) {
      setProduct(productsData[slug as string]);
    }
  }, [slug]);

  // Download brochure handler
  const handleDownloadBrochure = () => {
    // Map product slugs to actual PDF files
    const brochureMap: Record<string, string> = {
      'surveillance': 'surveillance-brochure.pdf',
      'commercial': 'commercial-brochure.pdf',
      'residential': 'residential-brochure.pdf',
      'cloud': 'cloud-brochure.pdf'
    };

    const brochureFile = brochureMap[slug as string];
    
    if (brochureFile) {
      // Direct download of actual PDF
      const link = document.createElement('a');
      link.href = `/brochures/${brochureFile}`;
      link.download = brochureFile;
      link.target = '_blank'; // Fallback to open in new tab
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`Downloading: ${brochureFile}`);
    } else {
      alert('Brochure not available. Please contact us for more information.');
    }
  };

  // Call now handler
  const handleCallNow = () => {
    const phoneNumber = '+971552341712'; // Remove spaces for tel: link
    window.location.href = `tel:${phoneNumber}`;
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  const IconComponent = product.icon;

  return (
    <>
      <Head>
        <title>{product.title} | Spottive Security Products</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Back Button */}
            <Link href="/#features" className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group">
              <MdArrowBack size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Products</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Product Info */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r from-${product?.color}-500 to-${product?.color}-600 rounded-2xl flex items-center justify-center`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  
                  {product?.badge && (
                    <span className={`px-3 py-1 bg-${product.color}-100 text-${product.color}-800 text-sm font-semibold rounded-full`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                    {product?.title}
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {product?.description}
                </p>

                {/* Pricing */}
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-3xl font-bold text-gray-900">{product?.price}</span>
                  {product?.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                
                  
                  <button 
                    onClick={handleDownloadBrochure}
                    className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MdDownload size={16} />
                    <span>Download Brochure</span>
                  </button>

                  <button 
                    onClick={handleCallNow}
                    className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MdPhone size={16} />
                    <span>Call Now</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center space-x-6 mt-8 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MdVerified className="text-green-500" size={16} />
                    <span>Certified Quality</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MdStar className="text-yellow-500" size={16} />
                    <span>5-Star Rated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MdSecurity className="text-blue-500" size={16} />
                    <span>Secure & Reliable</span>
                  </div>
                </div>

                {/* Contact Info Display */}
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <MdPhone className="text-green-600" size={20} />
                    <div>
                      <div className="text-sm text-green-800 font-medium">Call us directly:</div>
                      <div className="text-lg font-bold text-green-900">+971 55 234 1712</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl mb-6">
                  <Image
                    src={product.gallery[selectedImage]}
                    alt={product.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                </div>
                
                {/* Image Gallery */}
                <div className="grid grid-cols-4 gap-4">
                  {product.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedImage === index 
                          ? 'ring-2 ring-blue-500 scale-105' 
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        width={150}
                        height={100}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                {['features', 'specifications', ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab
                        ? `bg-gradient-to-r from-${product.color}-500 to-${product.color}-600 text-white shadow-lg`
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-6xl mx-auto">
              {activeTab === 'features' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {product.features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className={`w-12 h-12 bg-gradient-to-r from-${product.color}-500 to-${product.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                        <feature.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid lg:grid-cols-2 gap-8">
                  {product.specifications.map((category, index) => (
                    <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                      <div className="space-y-4">
                        {category.specs.map((spec, idx) => (
                          <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                            <span className="text-gray-600 font-medium">{spec.name}</span>
                            <span className="text-gray-900 font-semibold">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
              <p className="text-xl text-gray-600">See the impact on your security operations</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{benefit.value}</div>
                  <div className="text-gray-700 font-medium">{benefit.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
              <p className="text-xl text-gray-600">What our customers say about this product</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {product.testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-4 mb-6">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.company}</div>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <MdStar key={i} className="text-yellow-500" size={16} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-20 bg-gradient-to-r from-${product.color}-600 to-purple-600`}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact our experts today for a free consultation and custom quote.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact/sales">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <MdPhone size={20} />
                  <span>Contact Sales</span>
                </button>
              </Link>
              <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <MdEmail size={20} />
                <span>Request Demo</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
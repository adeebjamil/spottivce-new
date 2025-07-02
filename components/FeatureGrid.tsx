import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MdSecurity, 
  MdVideocam, 
  MdShield, 
  MdCloud,
  MdAnalytics,
  MdLock,
  MdVisibility,
  MdNotifications,
  MdArrowForward,
  MdStar,
  MdTrendingUp,
  MdVerified,
  MdFlashOn
} from 'react-icons/md';

// Update the component to use consistent HTML structure
export default function FeatureGrid() {
  const [isMounted, setIsMounted] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [isMounted]);

  const gridItems = [
    {
      title: "AI-Powered Surveillance",
      description: "Next-generation CCTV systems with artificial intelligence, facial recognition, and smart analytics for unmatched security monitoring.",
      image: "/feature-grid/img1.webp",
      icon: MdVideocam,
      category: "AI Technology",
      color: "blue",
      stats: "99.9% Accuracy",
      features: ["4K/8K Resolution", "Night Vision", "Motion Detection", "Cloud Storage"],
      link: "/products/surveillance"
    },
    {
      title: "Enterprise Security",
      description: "Complete commercial security solutions for offices, retail stores, warehouses, and industrial facilities with 24/7 monitoring.",
      image: "/feature-grid/img2.webp",
      icon: MdSecurity,
      category: "Commercial",
      color: "purple",
      stats: "500+ Projects",
      features: ["Multi-Site Control", "Real-time Alerts", "Custom Reports", "Mobile Access"],
      link: "/products/commercial"
    },
    {
      title: "Smart Home Security",
      description: "Advanced residential security systems with wireless cameras, smart doorbells, and intelligent home automation integration.",
      image: "/feature-grid/img3.webp",
      icon: MdShield,
      category: "Residential",
      color: "emerald",
      stats: "Smart Integration",
      features: ["Wireless Setup", "Smart Alerts", "Voice Control", "Easy Install"],
      link: "/products/residential"
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud-based security platform with edge computing, real-time sync, and unlimited storage capacity.",
      image: "/feature-grid/img4.webp",
      icon: MdCloud,
      category: "Cloud Tech",
      color: "orange",
      stats: "99.99% Uptime",
      features: ["Edge Computing", "Auto Backup", "Global Access", "Scalable Storage"],
      link: "/products/cloud"
    }
  ];

  if (!isMounted) {
    return (
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-32 h-8 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-full max-w-md mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-full max-w-sm mx-auto animate-pulse"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {/* Skeleton cards */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded-full mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)] opacity-60"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ddd6fe%22%20fill-opacity%3D%220.03%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22m0%2040l40-40h-40v40zm40%200v-40h-40l40%2040z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 via-purple-50 to-indigo-100 border border-blue-200/50 text-blue-800 rounded-2xl text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm">
            <MdStar className="mr-2 text-yellow-500" size={16} />
            Premium Security Solutions
            <MdVerified className="ml-2 text-green-500" size={16} />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Advanced Security
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Technology Solutions
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of cutting-edge security solutions designed to protect what matters most with the latest in surveillance technology.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <MdFlashOn className="text-yellow-500" size={16} />
              <span>Industry Leading</span>
            </div>
            <div className="flex items-center space-x-2">
              <MdVerified className="text-green-500" size={16} />
              <span>Certified Solutions</span>
            </div>
            <div className="flex items-center space-x-2">
              <MdTrendingUp className="text-blue-500" size={16} />
              <span>Proven Results</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {gridItems.map((item, index) => (
            <div 
              key={index}
              data-index={index}
              className={`grid-item group relative transition-all duration-700 ${
                visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link href={item.link}>
                <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 group-hover:scale-[1.02] h-full">
                  
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1.5 bg-${item.color}-500 text-white text-xs font-bold rounded-full shadow-lg`}>
                        <item.icon className="mr-1.5" size={12} />
                        {item.category}
                      </span>
                    </div>
                    
                    {/* Stats Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-lg">
                        <MdTrendingUp className="mr-1.5 text-green-500" size={12} />
                        {item.stats}
                      </span>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                      hoveredCard === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <MdArrowForward className="text-gray-800" size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {item.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 bg-${item.color}-500 rounded-full`}></div>
                          <span className="text-sm text-gray-600 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-semibold text-gray-500">Learn More</span>
                      <div className={`transform transition-transform duration-300 ${
                        hoveredCard === index ? 'translate-x-2' : 'translate-x-0'
                      }`}>
                        <MdArrowForward className={`text-${item.color}-500`} size={20} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                    <div 
                      className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 transition-all duration-500`}
                      style={{ width: hoveredCard === index ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Upgrade Your Security?
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of satisfied customers who trust our advanced security solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg">
                    Get Free Consultation
                  </button>
                </Link>
                <Link href="/products">
                  <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300">
                    View All Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: "10K+", label: "Happy Customers", icon: MdStar, color: "yellow" },
            { number: "50+", label: "Global Brands", icon: MdVerified, color: "green" },
            { number: "24/7", label: "Support", icon: MdSecurity, color: "blue" },
            { number: "99.9%", label: "Uptime", icon: MdTrendingUp, color: "purple" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
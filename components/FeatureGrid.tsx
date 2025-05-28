import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { 
  MdSecurity, 
  MdVideocam, 
  MdShield, 
  MdCloud,
  MdAnalytics,
  MdLock,
  MdVisibility,
  MdNotifications
} from 'react-icons/md';

export default function FeatureGrid() {
  // Add a mounted state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Ensure component is mounted before running client-side code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // High-tech CCTV Distribution Portfolio
  const gridItems = [
    {
      title: "Advanced Surveillance Systems",
      description: "We distribute cutting-edge 4K/8K CCTV cameras, AI-powered analytics, and smart surveillance solutions from leading global manufacturers for comprehensive security coverage across all industries.",
      image: "/feature-grid/img1.webp",
      bgColor: "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800",
      textColor: "text-white",
      category: "SURVEILLANCE TECH",
      icon: MdVideocam,
      accentColor: "from-blue-400 to-cyan-500"
    },
    {
      title: "Commercial Security Solutions",
      description: "Complete range of high-tech CCTV systems for offices, retail, warehouses, and industrial facilities. We provide enterprise-grade security equipment with professional installation support.",
      image: "/feature-grid/img2.webp",
      bgColor: "bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800",
      textColor: "text-white",
      category: "COMMERCIAL GRADE",
      icon: MdSecurity,
      accentColor: "from-purple-400 to-pink-500"
    },
    {
      title: "Smart Home Security Systems",
      description: "Premium residential CCTV solutions featuring wireless cameras, smart doorbells, and mobile monitoring systems. Perfect for modern homes requiring advanced security technology.",
      image: "/feature-grid/img3.webp",
      bgColor: "bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800",
      textColor: "text-white",
      category: "RESIDENTIAL TECH",
      icon: MdCloud,
      accentColor: "from-emerald-400 to-teal-500"
    },
    {
      title: "Specialized Security Applications",
      description: "High-tech CCTV solutions for unique requirements including traffic monitoring, perimeter security, license plate recognition, and facial recognition systems for specialized applications.",
      image: "/feature-grid/img4.webp",
      bgColor: "bg-gradient-to-br from-orange-600 via-red-600 to-pink-700",
      textColor: "text-white",
      category: "SPECIALIZED TECH",
      icon: MdLock,
      accentColor: "from-orange-400 to-red-500"
    }
  ];

  // Set up intersection observer only after component is mounted
  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
          } else {
            setVisibleItems(prev => {
              const updated = new Set([...prev]);
              updated.delete(index);
              return updated;
            });
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    // Observe all grid items
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, [isMounted]);

  // Show loading state during SSR and before mount
  if (!isMounted) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-green-300 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg">
              <MdShield className="mr-1.5 sm:mr-2" size={14} />
              Premium CCTV Distribution
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                High-Tech CCTV Solutions
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                For Every Purpose
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
              Your trusted distributor of advanced CCTV and surveillance technologies. We supply cutting-edge security solutions from world-renowned manufacturers for residential, commercial, and specialized applications.
            </p>
          </div>
          
          {/* Loading skeleton - Mobile Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-200 animate-pulse rounded-2xl md:rounded-3xl h-80 sm:h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background - Mobile Responsive */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-green-300 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Mobile Responsive */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg">
            <MdShield className="mr-1.5 sm:mr-2" size={14} />
            Premium CCTV Distribution
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              High-Tech CCTV Solutions
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              For Every Purpose
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
            Your trusted distributor of advanced CCTV and surveillance technologies. We supply cutting-edge security solutions from world-renowned manufacturers for residential, commercial, and specialized applications.
          </p>
        </div>
        
        {/* Grid - Mobile Responsive with Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {gridItems.map((item, index) => (
            <div 
              key={index}
              data-index={index}
              className={`grid-item relative overflow-hidden rounded-2xl md:rounded-3xl group transition-all duration-700 transform hover:scale-[1.02] ${
                visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`${item.bgColor} p-4 sm:p-6 md:p-6 h-full flex flex-col relative overflow-hidden border border-white/10 shadow-2xl`}>
                {/* Floating Icon - Mobile Responsive */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <item.icon className="text-white" size={20} />
                  </div>
                </div>

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16 group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full transform -translate-x-8 sm:-translate-x-12 translate-y-8 sm:translate-y-12 group-hover:scale-125 transition-transform duration-1000 delay-200"></div>
                </div>
                
                {/* Enhanced Category tag - Mobile Responsive */}
                <div className="relative z-10 mb-3 sm:mb-4 md:mb-6">
                  <span className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r ${item.accentColor} text-white text-xs font-bold tracking-wider rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                    <MdVisibility className="mr-1 sm:mr-1.5 md:mr-2" size={10} />
                    <span className="hidden sm:inline">{item.category}</span>
                    <span className="sm:hidden">{item.category.split(' ')[0]}</span>
                  </span>
                </div>
                
                {/* Content area - Mobile Responsive */}
                <div className="flex flex-col h-full relative z-10">
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 ${item.textColor} group-hover:scale-105 transition-transform duration-300 leading-tight`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs sm:text-sm md:text-base opacity-90 ${item.textColor} leading-relaxed group-hover:opacity-100 transition-all duration-300 line-clamp-3 sm:line-clamp-4`}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Enhanced Image container - Mobile Responsive */}
                  <div className="mt-auto mb-3 sm:mb-4 relative">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 overflow-hidden group-hover:bg-white/20 transition-all duration-500 border border-white/20">
                      <div className="transform transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2 relative w-full aspect-video">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
                        <Image 
                          src={item.image}
                          alt={item.title}
                          width={500}
                          height={300}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover rounded-lg sm:rounded-xl shadow-2xl"
                          loading="lazy"
                        />
                        {/* Floating indicators - Mobile Responsive */}
                        <div className="absolute top-2 left-2 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center space-x-1">
                          <MdNotifications className="text-white opacity-80" size={12} />
                          <span className="text-white text-xs font-medium opacity-80 hidden sm:inline">HIGH-TECH</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar animation */}
                    <div className="mt-2 sm:mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${item.accentColor} rounded-full transform transition-all duration-1000 ${
                          visibleItems.has(index) ? 'translate-x-0' : '-translate-x-full'
                        }`}
                        style={{ transitionDelay: `${index * 200 + 500}ms` }}
                      ></div>
                    </div>
                  </div>

                  {/* Feature highlights - Mobile Responsive */}
                  <div className="flex items-center justify-between mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-white/20">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-xs opacity-80 hidden sm:inline">Distributor Network</span>
                        <span className="text-white text-xs opacity-80 sm:hidden">Network</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MdAnalytics className="text-white opacity-80" size={12} />
                        <span className="text-white text-xs opacity-80 hidden sm:inline">Advanced Tech</span>
                        <span className="text-white text-xs opacity-80 sm:hidden">Tech</span>
                      </div>
                    </div>
                    <div className="text-white text-xs opacity-60 font-medium">
                      <span className="hidden sm:inline">Global Brands</span>
                      <span className="sm:hidden">Global</span>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl md:rounded-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statistics - Mobile Responsive */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <MdSecurity className="text-white" size={20} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">50+</div>
            <div className="text-gray-600 text-xs sm:text-sm">Global Brands</div>
          </div>
          <div className="text-center group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <MdVideocam className="text-white" size={20} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">1000+</div>
            <div className="text-gray-600 text-xs sm:text-sm">Product Models</div>
          </div>
          <div className="text-center group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <MdCloud className="text-white" size={20} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">24/7</div>
            <div className="text-gray-600 text-xs sm:text-sm">Support Service</div>
          </div>
          <div className="text-center group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
              <MdAnalytics className="text-white" size={20} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">15+</div>
            <div className="text-gray-600 text-xs sm:text-sm">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
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
  // Track which items are visible for animations
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  
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

  // Set up intersection observer for scroll animations
  useEffect(() => {
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
  }, []);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-green-300 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-6 shadow-lg">
            <MdShield className="mr-2" size={16} />
            Premium CCTV Distribution
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              High-Tech CCTV Solutions
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              For Every Purpose
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted distributor of advanced CCTV and surveillance technologies. We supply cutting-edge security solutions from world-renowned manufacturers for residential, commercial, and specialized applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {gridItems.map((item, index) => (
            <div 
              key={index}
              data-index={index}
              className={`grid-item relative overflow-hidden rounded-3xl group transition-all duration-700 transform hover:scale-[1.02] ${
                visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`${item.bgColor} p-8 h-full flex flex-col relative overflow-hidden border border-white/10 shadow-2xl`}>
                {/* Floating Icon */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <item.icon className="text-white" size={28} />
                  </div>
                </div>

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-1000 delay-200"></div>
                </div>
                
                {/* Enhanced Category tag */}
                <div className="relative z-10 mb-6">
                  <span className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${item.accentColor} text-white text-xs font-bold tracking-wider rounded-full shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                    <MdVisibility className="mr-2" size={12} />
                    {item.category}
                  </span>
                </div>
                
                {/* Content area */}
                <div className="flex flex-col h-full relative z-10">
                  <div className="mb-8">
                    <h3 className={`text-2xl font-bold mb-4 ${item.textColor} group-hover:scale-105 transition-transform duration-300`}>
                      {item.title}
                    </h3>
                    <p className={`text-base opacity-90 ${item.textColor} leading-relaxed group-hover:opacity-100 transition-all duration-300`}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Enhanced Image container */}
                  <div className="mt-auto mb-4 relative">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 overflow-hidden group-hover:bg-white/20 transition-all duration-500 border border-white/20">
                      <div className="transform transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2 relative w-full aspect-video">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl"></div>
                        <Image 
                          src={item.image}
                          alt={item.title}
                          width={500}
                          height={300}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover rounded-xl shadow-2xl"
                          loading="lazy"
                        />
                        {/* Floating indicators */}
                        <div className="absolute top-3 left-3 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                        <div className="absolute top-3 right-3 flex items-center space-x-1">
                          <MdNotifications className="text-white opacity-80" size={16} />
                          <span className="text-white text-xs font-medium opacity-80">HIGH-TECH</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar animation */}
                    <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${item.accentColor} rounded-full transform transition-all duration-1000 ${
                          visibleItems.has(index) ? 'translate-x-0' : '-translate-x-full'
                        }`}
                        style={{ transitionDelay: `${index * 200 + 500}ms` }}
                      ></div>
                    </div>
                  </div>

                  {/* Feature highlights */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-xs opacity-80">Distributor Network</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MdAnalytics className="text-white opacity-80" size={14} />
                        <span className="text-white text-xs opacity-80">Advanced Tech</span>
                      </div>
                    </div>
                    <div className="text-white text-xs opacity-60 font-medium">
                      Global Brands
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statistics - Distribution specific */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MdSecurity className="text-white" size={32} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600 text-sm">Global Brands</div>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MdVideocam className="text-white" size={32} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
            <div className="text-gray-600 text-sm">Product Models</div>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MdCloud className="text-white" size={32} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600 text-sm">Support Service</div>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MdAnalytics className="text-white" size={32} />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
            <div className="text-gray-600 text-sm">Years Experience</div>
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
      `}</style>
    </section>
  );
}
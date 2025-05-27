'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  MdSecurity, 
  MdHome, 
  MdBusiness,
  MdPlayArrow,
  MdCheckCircle,
  MdArrowForward,
  MdShield,
  MdVisibility,
  MdNotifications,
  MdCloud,
  MdSmartphone,
  MdVideoCall
} from 'react-icons/md';

export default function MarketingUseCases() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    {
      id: 'commercial',
      title: 'Commercial Security',
      subtitle: 'Enterprise Solutions',
      description: 'Advanced AI-powered CCTV systems designed for businesses, retail stores, offices, and industrial facilities with 24/7 monitoring.',
      image: '/features-card/img0.webp',
      icon: MdBusiness,
      color: 'from-blue-500 via-blue-600 to-purple-600',
      accent: 'bg-blue-500',
      features: [
        { icon: MdShield, text: 'AI Detection' },
        { icon: MdVisibility, text: '4K Ultra HD' },
        { icon: MdNotifications, text: '24/7 Monitoring' },
        { icon: MdCloud, text: 'Cloud Storage' }
      ],
      stats: { clients: '500+', uptime: '99.9%', coverage: '24/7' }
    },
    {
      id: 'residential',
      title: 'Home Security',
      subtitle: 'Smart Protection',
      description: 'Intelligent home security systems with mobile app control, instant alerts, and smart home integration for complete family protection.',
      image: '/features-card/img1.webp',
      icon: MdHome,
      color: 'from-emerald-500 via-green-600 to-teal-600',
      accent: 'bg-emerald-500',
      features: [
        { icon: MdSmartphone, text: 'Mobile App' },
        { icon: MdNotifications, text: 'Smart Alerts' },
        { icon: MdVisibility, text: 'Night Vision' },
        { icon: MdCheckCircle, text: 'Easy Setup' }
      ],
      stats: { clients: '1000+', uptime: '99.8%', coverage: '24/7' }
    },
    {
      id: 'specialized',
      title: 'Specialized Systems',
      subtitle: 'Advanced Tech',
      description: 'Cutting-edge solutions for traffic monitoring, facial recognition, license plate detection, and perimeter security applications.',
      image: '/features-card/img2.webp',
      icon: MdSecurity,
      color: 'from-orange-500 via-red-500 to-pink-600',
      accent: 'bg-orange-500',
      features: [
        { icon: MdVideoCall, text: 'Face Recognition' },
        { icon: MdShield, text: 'License Plate' },
        { icon: MdVisibility, text: 'Traffic Monitor' },
        { icon: MdSecurity, text: 'Perimeter Security' }
      ],
      stats: { clients: '200+', uptime: '99.7%', coverage: '24/7' }
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveCategory((prev) => (prev + 1) % categories.length);
      }, 4000);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, categories.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveCategory((prev) => (prev + 1) % categories.length);
    }
    if (isRightSwipe) {
      setActiveCategory((prev) => (prev - 1 + categories.length) % categories.length);
    }
    
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const currentCategory = categories[activeCategory];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated background - Updated for light theme */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-300 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000ms"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 lg:py-20">
        {/* Header Section - Updated for light theme */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold mb-6 rounded-full shadow-lg">
            <MdShield className="mr-2" size={16} />
            SECURITY SOLUTIONS
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Next-Generation
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              CCTV Security
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Experience the future of security with AI-powered surveillance systems designed to protect what matters most to you.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-7xl mx-auto">
          
          {/* Left Side - Category Selector - Updated for light theme */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Choose Your Solution</h3>
              
              <div className="space-y-3">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const isActive = index === activeCategory;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(index)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-500 group ${
                        isActive 
                          ? `bg-gradient-to-r ${category.color} shadow-2xl transform scale-[1.02] text-white` 
                          : 'bg-gray-50/80 hover:bg-gray-100/80 hover:scale-[1.01] text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${isActive ? 'bg-white/20' : 'bg-white/70 shadow-sm'} transition-all duration-300`}>
                          <Icon className={`${isActive ? 'text-white' : 'text-gray-600'}`} size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold text-base mb-1 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                            {category.title}
                          </h4>
                          <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                            {category.subtitle}
                          </p>
                        </div>
                        <MdArrowForward 
                          className={`transition-transform duration-300 ${
                            isActive ? 'text-white translate-x-1' : 'text-gray-400 group-hover:translate-x-1'
                          }`} 
                          size={20} 
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {categories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryClick(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeCategory 
                        ? `w-8 ${currentCategory.accent}` 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Stats Card - Updated for light theme */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl">
              <h4 className="text-gray-900 font-bold mb-4">Live Statistics</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${currentCategory.accent.replace('bg-', 'text-')} mb-1`}>
                    {currentCategory.stats.clients}
                  </div>
                  <div className="text-xs text-gray-500">Clients</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${currentCategory.accent.replace('bg-', 'text-')} mb-1`}>
                    {currentCategory.stats.uptime}
                  </div>
                  <div className="text-xs text-gray-500">Uptime</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${currentCategory.accent.replace('bg-', 'text-')} mb-1`}>
                    {currentCategory.stats.coverage}
                  </div>
                  <div className="text-xs text-gray-500">Coverage</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content Display - Updated for light theme */}
          <div className="lg:col-span-8">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl overflow-hidden shadow-xl">
              
              {/* Image Section */}
              <div 
                className="relative h-64 md:h-80 lg:h-96 overflow-hidden cursor-pointer"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeCategory 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-105'
                    }`}
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                  </div>
                ))}

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">LIVE MONITORING</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {currentCategory.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 ${currentCategory.accent} rounded-full text-sm font-medium`}>
                      {currentCategory.subtitle}
                    </span>
                    <span className="text-sm opacity-80">
                      Advanced Security Solution
                    </span>
                  </div>
                </div>

                {/* Navigation arrows for desktop */}
                <button 
                  onClick={() => setActiveCategory((prev) => (prev - 1 + categories.length) % categories.length)}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <MdArrowForward className="rotate-180" size={20} />
                </button>
                
                <button 
                  onClick={() => setActiveCategory((prev) => (prev + 1) % categories.length)}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                  <MdArrowForward size={20} />
                </button>
              </div>

              {/* Content Section - Updated for light theme */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-xl md:text-2xl font-bold mb-3">
                    {currentCategory.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {currentCategory.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {currentCategory.features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div 
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-lg hover:bg-gray-100/80 transition-colors duration-300 border border-gray-200/50"
                      >
                        <div className={`p-2 ${currentCategory.accent} rounded-lg shadow-sm`}>
                          <FeatureIcon className="text-white" size={16} />
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className={`flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r ${currentCategory.color} text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                    <MdPlayArrow className="mr-2" size={20} />
                    Get Free Quote
                  </button>
                  
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-play indicator - Updated for light theme */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-gray-600 text-sm">
        <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
        <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
      </div>

      <style jsx>{`
        .animation-delay-2000ms {
          animation-delay: 2000ms;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
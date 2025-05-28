import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MdSecurity, 
  MdVideocam, 
  MdShield, 
  MdAnalytics,
  MdCloud,
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md';

export default function FeatureCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cardsData = [
    {
      bgColor: "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800",
      imageBg: "bg-blue-50/90",
      image: "/features-card/img0.webp",
      imageAlt: "Advanced CCTV Monitoring",
      icon: MdVideocam,
      badgeBg: "bg-white/95 backdrop-blur-sm",
      badgeText: "text-blue-800",
      badgeLabel: "🎥 24/7 Monitoring",
      textColor: "text-white",
      title: "Smart Surveillance Systems",
      description: "Advanced AI-powered CCTV solutions that provide real-time monitoring, intelligent alerts, and seamless integration for comprehensive security coverage.",
      features: ["AI Detection", "Night Vision", "Cloud Storage"],
      link: "/product"
    },
    {
      bgColor: "bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800",
      imageBg: "bg-purple-50/90",
      image: "/features-card/img1.webp",
      imageAlt: "Security Asset Management",
      icon: MdShield,
      badgeBg: "bg-white/95 backdrop-blur-sm",
      badgeText: "text-purple-800",
      badgeLabel: "🛡️ Asset Protection",
      textColor: "text-white",
      title: "Centralized Security Hub",
      description: "All your security assets and monitoring systems centralized in one intelligent dashboard, keeping your premises protected and organized.",
      features: ["Unified Dashboard", "Multi-site Control", "Real-time Alerts"],
      link: "/brand/hikvision"
    },
    {
      bgColor: "bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800",
      imageBg: "bg-emerald-50/90",
      image: "/features-card/img2.webp",
      imageAlt: "Security Review Process",
      icon: MdSecurity,
      badgeBg: "bg-white/95 backdrop-blur-sm",
      badgeText: "text-emerald-800",
      badgeLabel: "⚡ Instant Response",
      textColor: "text-white",
      title: "Rapid Security Response",
      description: "Swift incident detection and response system that ensures immediate action on security threats with automated alerts and notifications.",
      features: ["Instant Alerts", "Mobile Access", "Emergency Protocol"],
      link: "/brand/dahua"
    },
    {
      bgColor: "bg-gradient-to-br from-orange-600 via-red-600 to-pink-700",
      imageBg: "bg-orange-50/90",
      image: "/features-card/img3.webp",
      imageAlt: "Security Team Collaboration",
      icon: MdCloud,
      badgeBg: "bg-white/95 backdrop-blur-sm",
      badgeText: "text-orange-800",
      badgeLabel: "🔄 Cloud Integration",
      textColor: "text-white",
      title: "Cloud-Based Security",
      description: "Seamless cloud integration for your security infrastructure, enabling remote monitoring, data backup, and scalable security solutions.",
      features: ["Remote Access", "Data Backup", "Scalable Solutions"],
      link: "/brand/uniview"
    },
    {
      bgColor: "bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-800",
      imageBg: "bg-indigo-50/90",
      image: "/features-card/img4.webp",
      imageAlt: "Security Analytics Dashboard",
      icon: MdAnalytics,
      badgeBg: "bg-white/95 backdrop-blur-sm",
      badgeText: "text-indigo-800",
      badgeLabel: "📊 Smart Analytics",
      textColor: "text-white",
      title: "Intelligent Security Analytics",
      description: "Advanced analytics and reporting tools that provide deep insights into security patterns, threats, and system performance optimization.",
      features: ["Behavioral Analysis", "Threat Detection", "Performance Reports"],
      link: "/brand/unv"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === cardsData.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, cardsData.length]);

  const maxIndex = cardsData.length - 1;
  
  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  // Responsive visible card count
  const getVisibleCardCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile: 1 card
      if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
      return 3; // Desktop: 3 cards
    }
    return 3;
  };

  const [visibleCardCount, setVisibleCardCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCardCount(getVisibleCardCount());
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background - Responsive */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header - Mobile Responsive */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <MdSecurity className="mr-1.5 sm:mr-2" size={14} />
            Security Solutions
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Smart Solutions for
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Modern Security
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
            Discover our comprehensive range of AI-powered security solutions designed to protect what matters most to your business.
          </p>
        </div>
        
        <div className="relative">
          {/* Enhanced Navigation Buttons - Hidden on mobile */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-20 bg-white/90 backdrop-blur-md border border-white/20 rounded-full p-3 lg:p-4 shadow-2xl hover:shadow-3xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 group"
            aria-label="Previous slide"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <MdChevronLeft size={20} className="lg:text-2xl text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>
          
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-20 bg-white/90 backdrop-blur-md border border-white/20 rounded-full p-3 lg:p-4 shadow-2xl hover:shadow-3xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 group"
            aria-label="Next slide"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <MdChevronRight size={20} className="lg:text-2xl text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>
          
          {/* Enhanced Cards Container - Mobile Responsive */}
          <div 
            className="overflow-hidden rounded-2xl md:rounded-3xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCardCount)}%)` }}
            >
              {cardsData.map((card, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2 sm:p-3"
                >
                  <div className={`${card.bgColor} rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 h-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 group cursor-pointer border border-white/10`}>
                    {/* Floating Icon - Responsive */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <card.icon className="text-white" size={16} />
                      </div>
                    </div>

                    {/* Enhanced Image Container - Mobile Responsive */}
                    <div className={`${card.imageBg} backdrop-blur-sm rounded-xl md:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 transition-all duration-500 group-hover:scale-105 group-hover:rotate-1`}>
                      <div className="h-24 sm:h-28 md:h-32 w-full flex items-center justify-center overflow-hidden rounded-lg sm:rounded-xl">
                        <Image
                          src={card.image}
                          alt={card.imageAlt}
                          width={400}
                          height={300}
                          className="object-cover transition-transform duration-700 group-hover:scale-125"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    
                    {/* Enhanced Badge - Mobile Responsive */}
                    <div className={`inline-flex items-center ${card.badgeBg} ${card.badgeText} font-bold text-xs py-1 px-2 sm:py-1.5 sm:px-3 rounded-full mb-2 sm:mb-3 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105`}>
                      {card.badgeLabel}
                    </div>
                    
                    {/* Title - Mobile Responsive */}
                    <h3 className={`${card.textColor} text-base sm:text-lg font-bold mb-2 group-hover:text-white transition-colors duration-300 leading-tight`}>
                      {card.title}
                    </h3>

                    {/* Description - Mobile Responsive */}
                    <p className={`${card.textColor} text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed opacity-90 group-hover:opacity-100 transition-all duration-300 line-clamp-3`}>
                      {card.description}
                    </p>

                    {/* Feature List - Mobile Responsive */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                      {card.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/10 group-hover:bg-white/30 transition-colors duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Enhanced Hover Button - Mobile Responsive */}
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 transform translate-y-4 scale-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500">
                      <Link href={card.link}>
                        <button className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 group">
                          <MdArrowForward className="text-white group-hover:translate-x-1 transition-transform duration-300" size={14} />
                        </button>
                      </Link>
                    </div>

                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Navigation Buttons */}
          <div className="flex md:hidden justify-center space-x-4 mt-6">
            <button
              onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
              className="bg-white/90 backdrop-blur-md border border-white/20 rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              aria-label="Previous slide"
            >
              <MdChevronLeft size={20} className="text-gray-700" />
            </button>
            
            <button
              onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
              className="bg-white/90 backdrop-blur-md border border-white/20 rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              aria-label="Next slide"
            >
              <MdChevronRight size={20} className="text-gray-700" />
            </button>
          </div>
          
          {/* Enhanced Pagination Indicators - Mobile Responsive */}
          <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 space-x-2 sm:space-x-3">
            {cardsData.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
                className={`relative h-2 sm:h-3 rounded-full transition-all duration-500 ${
                  currentIndex === index 
                    ? 'w-8 sm:w-12 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
                    : 'w-2 sm:w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {currentIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Auto-play Indicator - Mobile Responsive */}
          <div className="flex justify-center mt-4 sm:mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                isAutoPlaying 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isAutoPlaying ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'}`}></div>
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
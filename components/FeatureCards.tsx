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
      link: "/product" // Main products page for surveillance systems
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
      link: "/brand/hikvision" // Brand page for centralized solutions
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
      link: "/brand/dahua" // Brand page for response systems
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
      link: "/brand/uniview" // Brand page for cloud solutions
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
      link: "/brand/unv" // Brand page for analytics solutions
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

  const visibleCardCount = 3;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <MdSecurity className="mr-2" size={16} />
            Security Solutions
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Smart Solutions for
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Modern Security
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of AI-powered security solutions designed to protect what matters most to your business.
          </p>
        </div>
        
        <div className="relative">
          {/* Enhanced Navigation Buttons */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-white/90 backdrop-blur-md border border-white/20 rounded-full p-4 shadow-2xl hover:shadow-3xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 group"
            aria-label="Previous slide"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <MdChevronLeft size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>
          
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-white/90 backdrop-blur-md border border-white/20 rounded-full p-4 shadow-2xl hover:shadow-3xl hover:bg-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 group"
            aria-label="Next slide"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <MdChevronRight size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
          </button>
          
          {/* Enhanced Cards Container */}
          <div 
            className="overflow-hidden rounded-3xl"
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
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3"
                >
                  <div className={`${card.bgColor} rounded-3xl p-8 h-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 group cursor-pointer border border-white/10`}>
                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <card.icon className="text-white" size={24} />
                      </div>
                    </div>

                    {/* Enhanced Image Container */}
                    <div className={`${card.imageBg} backdrop-blur-sm rounded-2xl p-6 mb-6 transition-all duration-500 group-hover:scale-105 group-hover:rotate-1`}>
                      <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-xl">
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
                    
                    {/* Enhanced Badge */}
                    <div className={`inline-flex items-center ${card.badgeBg} ${card.badgeText} font-bold text-sm py-2 px-4 rounded-full mb-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-105`}>
                      {card.badgeLabel}
                    </div>
                    
                    {/* Title */}
                    <h3 className={`${card.textColor} text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300`}>
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className={`${card.textColor} text-base mb-6 leading-relaxed opacity-90 group-hover:opacity-100 transition-all duration-300`}>
                      {card.description}
                    </p>

                    {/* Feature List */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {card.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/10 group-hover:bg-white/30 transition-colors duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Enhanced Hover Button */}
                    <div className="absolute bottom-6 right-6 opacity-0 transform translate-y-4 scale-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-500">
                      <Link href={card.link}>
                        <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 hover:scale-110 transition-all duration-300 group">
                          <MdArrowForward className="text-white group-hover:translate-x-1 transition-transform duration-300" size={20} />
                        </button>
                      </Link>
                    </div>

                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Pagination Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {cardsData.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
                className={`relative h-3 rounded-full transition-all duration-500 ${
                  currentIndex === index 
                    ? 'w-12 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {currentIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isAutoPlaying 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-blue-600 animate-pulse' : 'bg-gray-400'}`}></div>
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
      `}</style>
    </section>
  );
}
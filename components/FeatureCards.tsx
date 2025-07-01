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
  MdChevronRight,
  MdPlayArrow,
  MdPause,
  MdStar,
  MdTrendingUp
} from 'react-icons/md';

export default function FeatureCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cardsData = [
    {
      icon: MdVideocam,
      badgeIcon: MdStar,
      badgeLabel: "AI Powered",
      title: "Smart Surveillance Systems",
      description: "Revolutionary AI-powered CCTV solutions with real-time threat detection, facial recognition, and intelligent behavioral analysis.",
      features: ["AI Detection", "Night Vision", "Cloud Storage", "Mobile Alerts"],
      rating: 4.9,
      users: "2.5K+ Users",
      link: "/product",
      learnMoreLink: "/solutions/surveillance",
      image: "/features-card/img0.webp",
      imageAlt: "Advanced CCTV Monitoring"
    },
    {
      icon: MdShield,
      badgeIcon: MdTrendingUp,
      badgeLabel: "Enterprise",
      title: "Unified Security Command Center",
      description: "Centralized security management platform that integrates all your security assets, providing comprehensive oversight and intelligent automation.",
      features: ["Unified Dashboard", "Multi-site Control", "Real-time Analytics", "Custom Reports"],
      rating: 4.8,
      users: "1.8K+ Users",
      link: "/brand/hikvision",
      learnMoreLink: "/solutions/command-center",
      image: "/features-card/img1.webp",
      imageAlt: "Security Asset Management"
    },
    {
      icon: MdSecurity,
      badgeIcon: MdPlayArrow,
      badgeLabel: "Instant",
      title: "Rapid Response Protocol",
      description: "Lightning-fast incident detection and automated response system with AI-driven threat assessment and emergency protocol activation.",
      features: ["Instant Alerts", "Mobile Access", "Emergency Protocol", "GPS Tracking"],
      rating: 4.9,
      users: "3.2K+ Users",
      link: "/brand/dahua",
      learnMoreLink: "/solutions/rapid-response",
      image: "/features-card/img2.webp",
      imageAlt: "Security Response System"
    },
    {
      icon: MdCloud,
      badgeIcon: MdCloud,
      badgeLabel: "Cloud Native",
      title: "Next-Gen Cloud Security",
      description: "Advanced cloud-based security infrastructure with edge computing, real-time synchronization, and unlimited scalability for modern businesses.",
      features: ["Edge Computing", "Auto Backup", "Infinite Scale", "99.9% Uptime"],
      rating: 4.8,
      users: "1.9K+ Users",
      link: "/brand/uniview",
      learnMoreLink: "/solutions/cloud-security",
      image: "/features-card/img3.webp",
      imageAlt: "Cloud Security Platform"
    },
    {
      icon: MdAnalytics,
      badgeIcon: MdAnalytics,
      badgeLabel: "Analytics Pro",
      title: "Predictive Security Intelligence",
      description: "Machine learning-powered analytics platform that predicts security threats, optimizes performance, and provides actionable business insights.",
      features: ["Predictive AI", "Threat Modeling", "Performance Optimization", "Business Intelligence"],
      rating: 4.9,
      users: "2.1K+ Users",
      link: "/brand/unv",
      learnMoreLink: "/solutions/security-analytics",
      image: "/features-card/img4.webp",
      imageAlt: "Security Analytics Platform"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === cardsData.length - 1 ? 0 : prevIndex + 1));
    }, 6000);

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
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [visibleCardCount, setVisibleCardCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCardCount(getVisibleCardCount());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Advanced Animated Background */}
        <div className="absolute inset-0">
          {/* Primary Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/80"></div>
          
          {/* Floating Orbs */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-emerald-400/30 to-cyan-500/30 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-pink-400/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 via-purple-50 to-indigo-100 border border-blue-200/50 text-blue-800 rounded-2xl text-sm font-semibold mb-6 shadow-lg backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
              <MdSecurity className="mr-2" size={16} />
              Advanced Security Solutions
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                Revolutionary Security
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                For Modern Business
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 mb-8">
              Discover our comprehensive range of AI-powered security solutions designed to protect and empower your business with cutting-edge technology.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm sm:text-base">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 font-medium">10K+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 font-medium">99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600 font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Enhanced Navigation Buttons */}
            <button
              onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-30 group"
              aria-label="Previous slide"
            >
              <div className="bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:bg-white">
                <MdChevronLeft size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>
            
            <button
              onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-30 group"
              aria-label="Next slide"
            >
              <div className="bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:bg-white">
                <MdChevronRight size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>
            
            {/* Modern Square Cards Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-1000 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleCardCount)}%)` }}
              >
                {cardsData.map((card, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3 sm:p-4"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Modern Square Card Design */}
                    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer border border-gray-100/50 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                      
                      {/* Badge and Icon Header */}
                      <div className="relative p-6 pb-4">
                        {/* Floating Icon */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className={`w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-blue-100 ${hoveredCard === index ? 'animate-bounce bg-blue-100' : ''}`}>
                            <card.icon className="text-blue-600" size={20} />
                          </div>
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-sm py-2 px-4 rounded-full mb-4 shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                          <card.badgeIcon className="mr-2" size={14} />
                          {card.badgeLabel}
                        </div>
                      </div>

                      {/* Square Image Container */}
                      <div className="px-6 mb-6">
                        <div className="aspect-square w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 overflow-hidden border border-blue-100/50 transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
                          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl relative">
                            <Image
                              src={card.image}
                              alt={card.imageAlt}
                              width={400}
                              height={400}
                              className="object-cover w-full h-full transition-all duration-1000 group-hover:scale-125 group-hover:brightness-110"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="px-6 pb-6 flex-1 flex flex-col">
                        {/* Rating and Users */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-1">
                            <MdStar className="text-yellow-400" size={16} />
                            <span className="text-gray-700 font-semibold text-sm">{card.rating}</span>
                          </div>
                          <span className="text-gray-500 text-xs font-medium">{card.users}</span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-gray-900 text-xl sm:text-2xl font-bold mb-3 group-hover:text-blue-900 transition-colors duration-500 leading-tight">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed flex-1">
                          {card.description}
                        </p>

                        {/* Feature Tags */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {card.features.map((feature, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center space-x-2 px-3 py-2 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:scale-105 transition-all duration-300"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 mt-auto">
                          <Link href={card.learnMoreLink} className="flex-1">
                            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-500 group-hover:scale-105 hover:shadow-lg">
                              <span>Learn More</span>
                              <MdArrowForward className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                            </button>
                          </Link>
                          
                          <Link href={card.link}>
                            <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:scale-110 transition-all duration-500 group">
                              <MdArrowForward className="text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" size={18} />
                            </button>
                          </Link>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700"
                            style={{ width: hoveredCard === index ? '100%' : '0%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center space-x-4 mt-8">
              <button
                onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
                className="bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl p-3 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <MdChevronLeft size={20} className="text-gray-700" />
              </button>
              
              <button
                onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
                className="bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl p-3 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <MdChevronRight size={20} className="text-gray-700" />
              </button>
            </div>
            
            {/* Enhanced Pagination */}
            <div className="flex justify-center mt-10 sm:mt-12 space-x-3">
              {cardsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
                  className={`relative h-3 rounded-full transition-all duration-700 ${
                    currentIndex === index 
                      ? 'w-12 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30' 
                      : 'w-3 bg-gray-300/60 hover:bg-gray-400/80 hover:scale-125'
                  }`}
                >
                  {currentIndex === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Enhanced Auto-play Control */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-500 backdrop-blur-xl border shadow-lg ${
                  isAutoPlaying 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-500/30 shadow-blue-500/20 hover:shadow-blue-500/40' 
                    : 'bg-white/90 text-gray-700 border-gray-200/50 hover:bg-white hover:shadow-xl'
                }`}
              >
                {isAutoPlaying ? <MdPause size={16} /> : <MdPlayArrow size={16} />}
                <span>{isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}</span>
                <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          25% { transform: translate(20px, -30px) scale(1.05) rotate(1deg); }
          50% { transform: translate(-15px, 20px) scale(0.95) rotate(-1deg); }
          75% { transform: translate(25px, 10px) scale(1.02) rotate(0.5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(-25px, -20px) scale(1.08) rotate(-1deg); }
          66% { transform: translate(20px, 25px) scale(0.92) rotate(1deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MdArrowForward,
  MdStar,
  MdSecurity,
  MdVerified,
  MdTrendingUp,
  MdBusiness,
  MdLocationOn,
  MdLanguage,
  MdEmojiEvents,
  MdShield,
  MdVisibility,
  MdPlayArrow,
  MdCheckCircle
} from 'react-icons/md';

export default function BrandsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeBrand, setActiveBrand] = useState(0);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-cycle featured brands
    const interval = setInterval(() => {
      setActiveBrand((prev) => (prev + 1) % brands.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const brands = [
    {
      id: 'hikvision',
      name: 'Hikvision',
      logo: '/brand/hikvision.png',
      description: 'World\'s leading provider of innovative security products and solutions',
      established: '2001',
      headquarters: 'China',
      specialties: ['AI-Powered Analytics', 'Crystal Clear Imaging', 'Global Trust & Reliability'],
      bgColor: 'from-blue-500 to-blue-700',
      products: '120+',
      marketShare: '#1 Globally',
      features: [
        'Advanced AI Technology',
        '4K Ultra HD Recording',
        'Cloud Integration',
        'Mobile App Control',
        'Night Vision Excellence',
        'Weather Resistant'
      ],
      achievements: [
        'Fortune Global 500',
        'R&D Innovation Leader',
        'Patent Portfolio 7000+',
        'Global Presence 150+ Countries'
      ]
    },
    {
      id: 'dahua',
      name: 'Dahua',
      logo: '/brand/dahua.png',
      description: 'Global leader in video surveillance solutions and services',
      established: '2001',
      headquarters: 'China',
      specialties: ['Smart AI Technology', 'Global Leadership', 'Comprehensive Security'],
      bgColor: 'from-purple-500 to-purple-700',
      products: '80+',
      marketShare: '#2 Globally',
      features: [
        'Smart Detection',
        'Thermal Imaging',
        'Perimeter Protection',
        'Access Control',
        'Video Analytics',
        'IoT Integration'
      ],
      achievements: [
        'Fortune China 500',
        'Innovation Awards',
        'Global R&D Centers',
        'Smart City Solutions'
      ]
    },
    {
      id: 'unv',
      name: 'UNV (Uniview)',
      logo: '/brand/unv.png',
      description: 'Professional IP video surveillance solutions with cutting-edge technology',
      established: '2005',
      headquarters: 'China',
      specialties: ['Professional Grade', 'Advanced IP Technology', 'Scalable Solutions'],
      bgColor: 'from-gray-600 to-gray-800',
      products: '60+',
      marketShare: 'Top 5 Globally',
      features: [
        'Professional IP Cameras',
        'Network Video Recorders',
        'Video Management Software',
        'Intelligent Analytics',
        'Easy Installation',
        'Cost Effective'
      ],
      achievements: [
        'Professional Recognition',
        'Quality Certifications',
        'Technical Innovation',
        'Customer Satisfaction'
      ]
    },
    {
      id: 'uniview',
      name: 'Uniview',
      logo: '/brand/uniview.png',
      description: 'Pioneer in IP video surveillance with smart and reliable solutions',
      established: '2005',
      headquarters: 'China',
      specialties: ['IP Innovation Pioneer', 'Smart Solutions', 'Reliable Performance'],
      bgColor: 'from-green-500 to-green-700',
      products: '50+',
      marketShare: 'Growing Fast',
      features: [
        'Smart IP Solutions',
        'Reliable Hardware',
        'Easy Integration',
        'Cost-Effective',
        'Technical Support',
        'Local Service'
      ],
      achievements: [
        'Industry Pioneer',
        'Quality Products',
        'Growing Market',
        'Innovation Focus'
      ]
    }
  ];

  const stats = [
    { number: '4', label: 'Premium Brands', icon: MdBusiness },
    { number: '300+', label: 'Product Models', icon: MdShield },
    { number: '15+', label: 'Years Partnership', icon: MdEmojiEvents },
    { number: '100%', label: 'Authentic Products', icon: MdVerified }
  ];

  const whyChooseUs = [
    {
      icon: MdVerified,
      title: 'Authorized Dealer',
      description: 'Official partnerships with all major security brands ensuring authenticity and warranty'
    },
    {
      icon: MdStar,
      title: 'Expert Consultation',
      description: 'Professional guidance to help you choose the perfect security solution for your needs'
    },
    {
      icon: MdShield,
      title: 'Quality Assurance',
      description: 'All products undergo rigorous testing and come with comprehensive warranty coverage'
    },
    {
      icon: MdTrendingUp,
      title: 'Latest Technology',
      description: 'Access to cutting-edge security innovations and the newest product releases'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-300 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div 
              className={`text-center mb-16 transition-all duration-1000 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold mb-6 rounded-full shadow-lg animate-bounce-slow">
                <MdBusiness className="mr-2" size={16} />
                TRUSTED BRANDS
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  World-Class
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Security Brands
                </span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                Explore our carefully curated selection of premium security brands, each chosen for their innovation, reliability, and proven track record in protecting what matters most.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={index}
                      className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl text-center"
                    >
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-3">
                        <Icon className="text-white" size={20} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                      <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Brand Showcase */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Brand Spotlight
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover the cutting-edge technology and innovative solutions from our partner brands
              </p>
            </div>

            <div className="relative">
              <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-2xl">
                {brands.map((brand, index) => (
                  <div 
                    key={brand.id}
                    className={`transition-all duration-700 ${
                      index === activeBrand ? 'opacity-100 block' : 'opacity-0 hidden'
                    }`}
                  >
                    <div className={`bg-gradient-to-r ${brand.bgColor} p-8 md:p-12 text-white`}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                          <div className="flex items-center mb-6">
                            <div className="bg-white p-4 rounded-2xl shadow-lg mr-6">
                              <Image
                                src={brand.logo}
                                alt={`${brand.name} Logo`}
                                width={80}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold">{brand.name}</h3>
                              <p className="text-white/80">Market Leader Since {brand.established}</p>
                            </div>
                          </div>
                          
                          <p className="text-xl mb-6 text-white/90 leading-relaxed">
                            {brand.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                              <div className="text-2xl font-bold">{brand.products}</div>
                              <div className="text-white/80 text-sm">Products Available</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                              <div className="text-2xl font-bold">{brand.marketShare}</div>
                              <div className="text-white/80 text-sm">Market Position</div>
                            </div>
                          </div>

                          <Link 
                            href={`/brand/${brand.id}`}
                            className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                          >
                            Explore {brand.name} Products
                            <MdArrowForward className="ml-2" size={20} />
                          </Link>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-xl font-bold mb-4">Key Features</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {brand.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg p-3">
                                <MdCheckCircle className="text-white mr-3 flex-shrink-0" size={20} />
                                <span className="text-sm font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Brand Navigation */}
              <div className="flex justify-center mt-8 space-x-2">
                {brands.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveBrand(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === activeBrand 
                        ? 'w-8 bg-blue-600' 
                        : 'w-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Brands Grid */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Brand Portfolio
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive selection of trusted security brands for every need and budget
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {brands.map((brand, index) => (
                <Link
                  key={brand.id}
                  href={`/brand/${brand.id}`}
                  className="group"
                  onMouseEnter={() => setHoveredBrand(brand.id)}
                  onMouseLeave={() => setHoveredBrand(null)}
                >
                  <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                    {/* Brand Logo */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} Logo`}
                        width={120}
                        height={60}
                        className="object-contain mx-auto"
                      />
                    </div>

                    {/* Brand Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{brand.description}</p>
                      
                      {/* Specialties */}
                      <div className="space-y-2 mb-6">
                        {brand.specialties.slice(0, 2).map((specialty, specialtyIndex) => (
                          <div key={specialtyIndex} className="flex items-center justify-center text-xs text-gray-500">
                            <MdStar className="text-yellow-400 mr-1" size={14} />
                            {specialty}
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{brand.products}</div>
                          <div className="text-xs text-gray-500">Products</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">Since {brand.established}</div>
                          <div className="text-xs text-gray-500">Established</div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${brand.bgColor} text-white rounded-xl font-medium text-sm transition-all duration-300 group-hover:scale-105`}>
                        Explore Products
                        <MdArrowForward 
                          className={`ml-2 transition-transform duration-300 ${
                            hoveredBrand === brand.id ? 'translate-x-1' : ''
                          }`} 
                          size={16} 
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Brands */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Brands?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We partner with only the most trusted and innovative security brands in the industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-6">
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Choose Your Security Brand?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get expert consultation to find the perfect security solution for your needs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <MdPlayArrow className="mr-2" size={20} />
                  Get Free Consultation
                </Link>
                <Link 
                  href="/product"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  <MdVisibility className="mr-2" size={20} />
                  Browse All Products
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -8px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
      `}</style>
    </div>
  );
}
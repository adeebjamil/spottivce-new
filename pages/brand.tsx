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
  MdCheckCircle,
  MdStore,
  MdInventory,
  MdHandshake,
  MdGrade,
  MdWorkspacePremium,
  MdShoppingCart,
  MdSearch,
  MdCategory,
  MdViewModule
} from 'react-icons/md';

export default function BrandsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeBrand, setActiveBrand] = useState(0);
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [activeOtherBrand, setActiveOtherBrand] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-cycle featured brands
    const interval = setInterval(() => {
      setActiveBrand((prev) => (prev + 1) % brands.length);
    }, 4000);

    // Auto-cycle other brands
    const otherBrandsInterval = setInterval(() => {
      setActiveOtherBrand((prev) => (prev + 1) % otherBrands.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(otherBrandsInterval);
    };
  }, []);

  const brands = [
    {
      id: 'hikvision',
      name: 'Hikvision',
      logo: '/brand/hikvision.png',
      productLink: '/brand/hikvision',
      description: 'World\'s leading provider of innovative security products and solutions distributed by Spottive Technologies across UAE and Middle East',
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
      productLink: '/brand/dahua',
      description: 'Global leader in video surveillance solutions and services, exclusively available through Spottive Technologies in UAE',
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
      productLink: '/brand/unv',
      description: 'Professional IP video surveillance solutions with cutting-edge technology, distributed by Spottive Technologies',
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
      logo: '/brand/id_BRVGCZ-_1748322463519.png',
      productLink: '/brand/uniview',
      description: 'Pioneer in IP video surveillance with smart and reliable solutions, exclusively supplied by Spottive Technologies',
      established: '2005',
      headquarters: 'China',
      specialties: ['IP Innovation Pioneer', 'Smart Solutions', 'Reliable Performance',],
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

  // Other brands from your folder with product links
  const otherBrands = [
    { id: 1, name: 'Security Brand 1', image: '/brand/2.jpg', category: 'Surveillance' },
    { id: 2, name: 'Tech Solutions 2', image: '/brand/3.jpg', category: 'Access Control' },
    { id: 3, name: 'Smart Security 3', image: '/brand/4.jpg', category: 'IoT Solutions' },
    { id: 4, name: 'Advanced Systems 4', image: '/brand/5.jpg', category: 'AI Analytics' },
    { id: 5, name: 'Professional Grade 5', image: '/brand/6.jpg', category: 'Enterprise' },
    { id: 6, name: 'Innovation Tech 6', image: '/brand/7.jpg', category: 'Cloud Solutions' },
    { id: 7, name: 'Secure Vision 7', image: '/brand/8.jpg', category: 'Thermal Imaging' },
    { id: 8, name: 'Global Security 8', image: '/brand/9.jpg', category: 'Network Security' },
    { id: 9, name: 'Smart Guard 9', image: '/brand/10.jpg', category: 'Mobile Solutions' },
    { id: 10, name: 'Tech Pro 10', image: '/brand/11.jpg', category: 'Video Analytics' },
    { id: 11, name: 'Advanced Shield 11', image: '/brand/12.jpg', category: 'Perimeter Security' },
    { id: 12, name: 'Security Plus 12', image: '/brand/13.jpg', category: 'Digital Solutions' },
    { id: 13, name: 'Vision Pro 13', image: '/brand/14.jpg', category: 'HD Technology' },
    { id: 14, name: 'Smart Tech 14', image: '/brand/15.jpg', category: 'Wireless Systems' },
    { id: 15, name: 'Guard Elite 15', image: '/brand/16.jpg', category: 'Premium Solutions' },
    { id: 16, name: 'Secure Max 16', image: '/brand/17.jpg', category: 'Industrial Grade' },
    { id: 17, name: 'Tech Vision 17', image: '/brand/18.jpg', category: 'Smart Cities' },
    { id: 18, name: 'Pro Security 18', image: '/brand/19.jpg', category: 'Commercial' },
    { id: 19, name: 'Advanced Guard 19', image: '/brand/20.jpg', category: 'Residential' },
    { id: 20, name: 'Elite Systems 20', image: '/brand/21.jpg', category: 'Enterprise Solutions' }
  ];

  const stats = [
    { number: '50+', label: 'Premium Brands', icon: MdBusiness },
    { number: '1000+', label: 'Product Models', icon: MdShield },
    { number: '15+', label: 'Years Partnership', icon: MdEmojiEvents },
    { number: '100%', label: 'Authentic Products', icon: MdVerified }
  ];

  const whyChooseSpottive = [
    {
      icon: MdVerified,
      title: 'Authorized Distributor',
      description: 'Spottive Technologies is the official distributor of premium security brands across UAE and Middle East'
    },
    {
      icon: MdStar,
      title: 'Expert Consultation',
      description: 'Our team provides professional guidance as the best CCTV supplier in Dubai, UAE, and Middle East'
    },
    {
      icon: MdShield,
      title: 'Quality Guarantee',
      description: 'All products undergo rigorous testing with comprehensive warranty coverage from Spottive Technologies'
    },
    {
      icon: MdTrendingUp,
      title: 'Latest Technology',
      description: 'Access to cutting-edge security innovations through Spottive\'s extensive brand partnerships'
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
                SPOTTIVE TECHNOLOGIES - TRUSTED BRANDS
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  UAE's Premier
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Security Brand Distributor
                </span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                Spottive Technologies is the best supplier of CCTV in Dubai, UAE, and Middle East region. We distribute premium security brands, ensuring you receive high-quality, reliable equipment for your specific needs.
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link 
                  href="/product"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <MdViewModule className="mr-2" size={20} />
                  Browse All Products
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-white transition-all duration-300"
                >
                  <MdPlayArrow className="mr-2" size={20} />
                  Get Brand Consultation
                </Link>
              </div>

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

        {/* Spottive Technologies Introduction */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                      <MdWorkspacePremium className="text-white" size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Spottive Technologies</h2>
                      <p className="text-white/80">UAE's #1 CCTV Supplier & Distributor</p>
                    </div>
                  </div>
                  
                  <p className="text-xl mb-6 text-white/90 leading-relaxed">
                    As the leading wholesaler in CCTV in the UAE, Spottive Technologies provides comprehensive range of surveillance systems from globally recognized brands. We are the vital technology provider in the Middle East region.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-white/80 text-sm">Global Brands</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <div className="text-2xl font-bold">#1</div>
                      <div className="text-white/80 text-sm">UAE Supplier</div>
                    </div>
                  </div>

                  {/* Product Overview Button */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      href="/product"
                      className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <MdCategory className="mr-2" size={20} />
                      Product Overview
                    </Link>
                    <Link 
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-xl hover:bg-white/30 transition-all duration-300"
                    >
                      <MdPlayArrow className="mr-2" size={20} />
                      Contact Spottive
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-bold mb-4">Why Choose Spottive?</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Best CCTV Supplier in Dubai & UAE',
                      'Authorized Distributor of Multiple Brands',
                      'Advanced AV Services & Solutions',
                      'Digital Signage Expertise',
                      'Leading Wholesaler in Middle East',
                      'Comprehensive Technical Support'
                    ].map((feature, featureIndex) => (
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
        </section>

        {/* Featured Brand Showcase */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Brand Portfolio
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                Discover the cutting-edge technology from our premium brand partners, exclusively distributed by Spottive Technologies
              </p>
              
              {/* Browse Products CTA */}
              <Link 
                href="/product"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <MdShoppingCart className="mr-2" size={20} />
                Browse All Brand Products
              </Link>
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
                                alt={`${brand.name} Logo - Distributed by Spottive Technologies`}
                                width={80}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold">{brand.name}</h3>
                              <p className="text-white/80">Distributed by Spottive Technologies</p>
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

                          {/* Brand Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Link 
                              href={brand.productLink}
                              className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                              <MdInventory className="mr-2" size={20} />
                              View {brand.name} Products
                            </Link>
                            <Link 
                              href="/contact"
                              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-xl hover:bg-white/30 transition-all duration-300"
                            >
                              <MdPlayArrow className="mr-2" size={20} />
                              Contact Spottive
                            </Link>
                          </div>
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
                          
                          {/* Product Browse Link */}
                          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                            <div className="flex items-center justify-between">
                              <span className="text-white/90 text-sm font-medium">Explore {brand.name} catalog</span>
                              <Link 
                                href={brand.productLink} 
                                className="text-white hover:text-white/80 transition-colors duration-300"
                              >
                                <MdArrowForward size={20} />
                              </Link>
                            </div>
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
                Main Brand Partners
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                Comprehensive selection of trusted security brands exclusively distributed by Spottive Technologies
              </p>
              
              {/* Product Overview Button */}
              <Link 
                href="/product"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <MdSearch className="mr-2" size={20} />
                Product Overview & Catalog
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {brands.map((brand, index) => (
                <div
                  key={brand.id}
                  className="group"
                  onMouseEnter={() => setHoveredBrand(brand.id)}
                  onMouseLeave={() => setHoveredBrand(null)}
                >
                  <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                    {/* Brand Logo */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} Logo - Spottive Technologies`}
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

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Link 
                          href={brand.productLink}
                          className={`w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r ${brand.bgColor} text-white rounded-xl font-medium text-sm transition-all duration-300 group-hover:scale-105`}
                        >
                          <MdViewModule className="mr-2" size={16} />
                          View Products
                        </Link>
                        <Link 
                          href="/contact"
                          className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-all duration-300"
                        >
                          <MdPlayArrow className="mr-2" size={16} />
                          Contact Spottive
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Brands Showcase */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Extended Brand Portfolio
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                Discover our extensive range of security and technology brands, all available through Spottive Technologies
              </p>
              
              <Link 
                href="/product"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <MdCategory className="mr-2" size={20} />
                Browse Complete Product Range
              </Link>
            </div>

            {/* Featured Other Brand */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <Image
                    src={otherBrands[activeOtherBrand].image}
                    alt={`${otherBrands[activeOtherBrand].name} - Spottive Technologies`}
                    width={500}
                    height={300}
                    className="object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {otherBrands[activeOtherBrand].category}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {otherBrands[activeOtherBrand].name}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    Premium security solutions in {otherBrands[activeOtherBrand].category} category, exclusively distributed by Spottive Technologies across UAE and Middle East region. We ensure quality, reliability, and cutting-edge technology.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Spottive Exclusive
                    </span>
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      UAE Authorized
                    </span>
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Premium Quality
                    </span>
                  </div>
                  
                 
                </div>
              </div>

              {/* Brand Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {otherBrands.slice(0, 10).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveOtherBrand(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeOtherBrand 
                        ? 'w-8 bg-blue-600' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Other Brands Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {otherBrands.map((brand, index) => (
                <div 
                  key={brand.id}
                  className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
                  onClick={() => setActiveOtherBrand(index)}
                >
                  <div className="relative mb-4">
                    <Image
                      src={brand.image}
                      alt={`${brand.name} - Spottive Technologies`}
                      width={200}
                      height={120}
                      className="object-cover rounded-lg w-full h-24"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg group-hover:from-black/40 transition-all duration-300"></div>
                  </div>
                  
                  <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-1">{brand.name}</h4>
                  <p className="text-xs text-gray-600 mb-3">{brand.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      Spottive
                    </span>
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Spottive */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Spottive Technologies?
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The best CCTV supplier in Dubai, UAE, and Middle East region with unmatched brand partnerships
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseSpottive.map((item, index) => {
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
                    <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
                    
                    {/* Quick Access Links */}
                    <div className="flex flex-col gap-2">
                      <Link 
                        href="/product"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300"
                      >
                        View Products →
                      </Link>
                    </div>
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
                Partner with UAE's Best Brand Distributor
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get expert consultation from Spottive Technologies - the leading CCTV supplier in Dubai, UAE, and Middle East
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/product"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <MdShoppingCart className="mr-2" size={20} />
                  Browse Our Products
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  <MdPlayArrow className="mr-2" size={20} />
                  Contact Spottive Now
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
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MdSecurity, 
  MdVerifiedUser, 
  MdPeople,
  MdTrendingUp,
  MdWorkspacePremium,
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdStars,
  MdBusiness,
  MdHandshake,
  MdShield,
  MdVisibility,
  MdSupport,
  MdCheckCircle,
  MdArrowForward,
  MdPlayArrow,
  MdPerson,
  MdVideocam,
  MdDesktopMac,
  MdDisplaySettings,
  MdStore
} from 'react-icons/md';

export default function WhoWeAre() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeValue, setActiveValue] = useState(0);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-cycle testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    // Auto-cycle values
    const valueInterval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % companyValues.length);
    }, 3000);

    // Auto-cycle services
    const serviceInterval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3500);

    return () => {
      clearInterval(testimonialInterval);
      clearInterval(valueInterval);
      clearInterval(serviceInterval);
    };
  }, []);

  const stats = [
    { number: '15+', label: 'Years Leading UAE Market', icon: MdTrendingUp, color: 'from-blue-500 to-blue-600' },
    { number: '50+', label: 'Global Brands Distributed', icon: MdCheckCircle, color: 'from-green-500 to-green-600' },
    { number: '5000+', label: 'Satisfied Customers', icon: MdPeople, color: 'from-purple-500 to-purple-600' },
    { number: '#1', label: 'CCTV Supplier in UAE', icon: MdSupport, color: 'from-orange-500 to-orange-600' }
  ];

  const services = [
    {
      icon: MdStore,
      title: 'Distributor of Multiple Brands',
      description: 'As an authorized distributor, we offer a wide range of products from globally recognized brands, ensuring you receive high-quality, reliable equipment that meets your specific needs.',
      color: 'from-blue-500 to-blue-600',
      bgImage: 'bg-gradient-to-br from-blue-50 to-indigo-100'
    },
    {
      icon: MdDesktopMac,
      title: 'Advanced AV Services',
      description: 'Our Audio-Visual (AV) services are designed to enhance communication and collaboration. We provide state-of-the-art equipment and seamless integration for optimal performance.',
      color: 'from-purple-500 to-purple-600',
      bgImage: 'bg-gradient-to-br from-purple-50 to-pink-100'
    },
    {
      icon: MdVideocam,
      title: 'Leading Wholesaler in CCTV',
      description: 'As the leading wholesaler in CCTV in the UAE, we provide a comprehensive range of surveillance systems. Our CCTV offerings ensure high-quality video surveillance for enhanced security and peace of mind.',
      color: 'from-green-500 to-green-600',
      bgImage: 'bg-gradient-to-br from-green-50 to-emerald-100'
    },
    {
      icon: MdDisplaySettings,
      title: 'Digital Signage Expertise',
      description: 'We specialize in digital signage, offering a versatile platform for displaying text, video, and multimedia content in public venues. Our offerings are customizable, catering to various settings and marketing needs.',
      color: 'from-orange-500 to-orange-600',
      bgImage: 'bg-gradient-to-br from-orange-50 to-red-100'
    }
  ];

  const teamMembers = [
    {
      name: 'Mohammed Al-Hashemi',
      position: 'CEO & Founder',
      image: '/team/ceo.jpg',
      description: 'Visionary leader driving Spottive Technologies as UAE\'s premier CCTV supplier',
      expertise: ['Strategic Leadership', 'Market Expansion', 'Technology Innovation']
    },
    {
      name: 'Sarah Al-Mansouri',
      position: 'Technical Director',
      image: '/team/tech-director.jpg',
      description: 'Expert in surveillance technology and AV solutions for the Middle East region',
      expertise: ['CCTV Systems', 'AV Integration', 'Digital Signage']
    },
    {
      name: 'Ahmed Hassan',
      position: 'Distribution Manager',
      image: '/team/ops-manager.jpg',
      description: 'Managing our extensive network of global brand partnerships across UAE',
      expertise: ['Brand Relations', 'Supply Chain', 'Market Distribution']
    },
    {
      name: 'Fatima Al-Zahra',
      position: 'Business Development',
      image: '/team/consultant.jpg',
      description: 'Expanding Spottive\'s reach across Dubai, UAE, and Middle East markets',
      expertise: ['Business Growth', 'Client Relations', 'Regional Expansion']
    }
  ];

  const testimonials = [
    {
      name: 'Dubai Shopping Festival',
      company: 'Dubai Department of Tourism',
      message: 'Spottive Technologies provided exceptional CCTV solutions for our major events. Their expertise in surveillance technology is unmatched in the UAE region.',
      rating: 5,
      image: '/testimonials/dubai-festival.jpg'
    },
    {
      name: 'Abu Dhabi Convention Center',
      company: 'ADNEC Group',
      message: 'As the leading CCTV supplier in UAE, Spottive delivered comprehensive security solutions that exceeded our expectations. Professional service throughout the Middle East.',
      rating: 5,
      image: '/testimonials/adnec.jpg'
    },
    {
      name: 'Emirates Palace Hotel',
      company: 'Mandarin Oriental',
      message: 'Spottive Technologies is our trusted partner for all surveillance needs. Their position as Dubai\'s best CCTV supplier is well-deserved.',
      rating: 5,
      image: '/testimonials/emirates-palace.jpg'
    }
  ];

  const companyValues = [
    {
      icon: MdSecurity,
      title: 'Market Leadership',
      description: 'Leading the UAE and Middle East region as the premier CCTV and surveillance technology supplier',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MdVerifiedUser,
      title: 'Quality Assurance',
      description: 'Providing only the highest quality products from globally recognized brands to ensure customer satisfaction',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MdTrendingUp,
      title: 'Technology Innovation',
      description: 'Staying ahead with cutting-edge surveillance and AV technologies for the evolving Middle East market',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MdHandshake,
      title: 'Customer Partnership',
      description: 'Building lasting relationships as the trusted technology provider across Dubai, UAE, and beyond',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const milestones = [
    { year: '2008', title: 'Spottive Founded', description: 'Established as UAE\'s premier technology solutions provider in Dubai' },
    { year: '2012', title: 'Market Leader', description: 'Became the leading CCTV wholesaler in UAE and Middle East region' },
    { year: '2016', title: 'Brand Expansion', description: 'Expanded to distribute 50+ global technology brands across the region' },
    { year: '2020', title: 'Digital Innovation', description: 'Pioneered digital signage and advanced AV solutions in Middle East' },
    { year: '2024', title: 'Regional Dominance', description: 'Recognized as #1 CCTV supplier in Dubai, UAE, and Middle East' }
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
                <MdShield className="mr-2" size={16} />
                SPOTTIVE TECHNOLOGIES
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  UAE's #1 CCTV Supplier
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  & Technology Provider
                </span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                Spottive Technologies is the best supplier of CCTV in Dubai, UAE, and the Middle East region. We are the vital technology provider, ensuring cutting-edge surveillance solutions for the evolving market.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <MdPhone className="mr-2" size={20} />
                  Contact UAE's Best
                </Link>
                <Link 
                  href="/product"
                  className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-white transition-all duration-300"
                >
                  <MdPlayArrow className="mr-2" size={20} />
                  Explore Our Range
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className={`bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl text-center transition-all duration-500 hover:scale-105 ${
                      isVisible ? 'animate-fadeInUp' : ''
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-4`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <MdVisibility className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">OUR VISION</h2>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-4">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">SPOTTIVE TECHNOLOGIES</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To be the vital technology provider in the region. By ensuring well-being of employees to adapt necessity to grow and advance along with customers. As the best CCTV supplier in Dubai, UAE, and Middle East, we envision leading the surveillance technology revolution.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <MdSecurity className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">OUR MISSION</h2>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-4">
                  <h3 className="text-lg font-bold text-green-800 mb-3">SPOTTIVE TECHNOLOGIES</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To provide integrated technology solutions for ever-changing technology world. We become integral part of our customer to meet the evolving needs of the technology market through bespoke service, insight and top class execution as UAE's premier CCTV distributor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Services
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive technology solutions that make Spottive the best CCTV supplier in Dubai, UAE, and Middle East
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = index === activeService;
                
                return (
                  <div 
                    key={index}
                    className={`${service.bgImage} border border-gray-200/50 rounded-2xl p-8 shadow-xl transition-all duration-500 hover:scale-105 ${
                      isActive ? 'ring-2 ring-blue-400 ring-opacity-50 scale-102' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                        <Icon className="text-white" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                    
                    {index === 2 && ( // CCTV Service highlight
                      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-green-200">
                        <div className="flex items-center mb-2">
                          <MdWorkspacePremium className="text-green-600 mr-2" size={20} />
                          <span className="text-green-800 font-bold text-sm">UAE's #1 CCTV Supplier</span>
                        </div>
                        <p className="text-green-700 text-sm">
                          Trusted across Dubai, UAE, and Middle East region
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Story Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Success Story
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  <strong>Spottive Technologies</strong> has established itself as the best supplier of CCTV in Dubai, UAE, and the Middle East region. Since our founding, we have been the vital technology provider, ensuring well-being of our employees while adapting to customer needs.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Today, we serve as the leading wholesaler in CCTV across the UAE, providing comprehensive surveillance systems and integrated technology solutions. Our position as the premier distributor of multiple global brands makes us the go-to choice for technology needs in the Middle East.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['UAE Licensed', 'Best CCTV Supplier', 'Middle East Leader', 'Global Brands Partner'].map((badge, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full"
                    >
                      <MdCheckCircle className="mr-2" size={16} />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                  <Image
                    src="/who/img1.webp"
                    alt="Spottive Technologies - Best CCTV Supplier in UAE"
                    width={500}
                    height={400}
                    className="w-full h-auto rounded-xl object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+kABexcdxd6fQTc2y1Zy9kQQHMnOb9HVp4uJlTpKcm1kktCBVsC6zbq7y3vb2+azF9PJHWNyqzRqzgBKu6jkDYaC1vdlA="
                  />
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-xl shadow-lg">
                    <MdWorkspacePremium size={24} />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg">
                    <span className="text-sm font-bold">#1 in UAE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Values Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The principles that drive Spottive Technologies as the best CCTV supplier in Dubai, UAE, and Middle East
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => {
                const Icon = value.icon;
                const isActive = index === activeValue;
                
                return (
                  <div 
                    key={index}
                    className={`bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-xl text-center transition-all duration-500 hover:scale-105 ${
                      isActive ? 'ring-2 ring-blue-400 ring-opacity-50 scale-105' : ''
                    }`}
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl mb-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        
        {/* Team Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Expert Team
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The professionals driving Spottive Technologies as the best CCTV supplier in Dubai, UAE, and Middle East
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <MdPerson size={64} className="text-gray-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                    
                    <div className="space-y-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full mr-2 mb-2"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Client Success Stories
              </h2>
              <p className="text-gray-600 text-lg">
                Why organizations across UAE and Middle East trust Spottive as their CCTV supplier
              </p>
            </div>

            <div className="relative">
              <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className={`transition-all duration-500 ${
                      index === activeTestimonial ? 'opacity-100 block' : 'opacity-0 hidden'
                    }`}
                  >
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <MdStars key={i} className="text-yellow-400" size={24} />
                        ))}
                      </div>
                      
                      <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                        "{testimonial.message}"
                      </blockquote>
                      
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <MdBusiness className="text-white" size={24} />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-gray-600">{testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'w-8 bg-blue-600' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Partner with UAE's Best CCTV Supplier
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers across Dubai, UAE, and Middle East who trust Spottive Technologies
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <MdEmail className="mr-2" size={20} />
                  Get Expert Consultation
                </Link>
                <Link 
                  href="/product"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  <MdArrowForward className="mr-2" size={20} />
                  Explore Our Solutions
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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
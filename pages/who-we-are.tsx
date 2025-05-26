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
  MdPerson
} from 'react-icons/md';

export default function WhoWeAre() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeValue, setActiveValue] = useState(0);

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

    return () => {
      clearInterval(testimonialInterval);
      clearInterval(valueInterval);
    };
  }, []);

  const stats = [
    { number: '15+', label: 'Years Experience', icon: MdTrendingUp, color: 'from-blue-500 to-blue-600' },
    { number: '5000+', label: 'Projects Completed', icon: MdCheckCircle, color: 'from-green-500 to-green-600' },
    { number: '1000+', label: 'Happy Clients', icon: MdPeople, color: 'from-purple-500 to-purple-600' },
    { number: '24/7', label: 'Support Available', icon: MdSupport, color: 'from-orange-500 to-orange-600' }
  ];

  const teamMembers = [
    {
      name: 'Ahmed Al-Mansouri',
      position: 'CEO & Founder',
      image: '/team/ceo.jpg',
      description: 'Visionary leader with 20+ years in security technology',
      expertise: ['Strategic Planning', 'Business Development', 'Technology Innovation']
    },
    {
      name: 'Sarah Johnson',
      position: 'Technical Director',
      image: '/team/tech-director.jpg',
      description: 'Expert in AI-powered surveillance systems and IoT integration',
      expertise: ['AI Technology', 'System Integration', 'Technical Strategy']
    },
    {
      name: 'Mohammed Hassan',
      position: 'Operations Manager',
      image: '/team/ops-manager.jpg',
      description: 'Ensures seamless project delivery and customer satisfaction',
      expertise: ['Project Management', 'Quality Assurance', 'Client Relations']
    },
    {
      name: 'Lisa Chen',
      position: 'Security Consultant',
      image: '/team/consultant.jpg',
      description: 'Specialist in enterprise security solutions and risk assessment',
      expertise: ['Security Analysis', 'Risk Assessment', 'Compliance']
    }
  ];

  const testimonials = [
    {
      name: 'Dubai Mall Management',
      company: 'Emaar Properties',
      message: 'Exceptional service and cutting-edge security solutions. Their team transformed our surveillance infrastructure.',
      rating: 5,
      image: '/testimonials/dubai-mall.jpg'
    },
    {
      name: 'Emirates Airlines',
      company: 'Aviation Industry',
      message: 'Professional, reliable, and innovative. They delivered a comprehensive security system that exceeded expectations.',
      rating: 5,
      image: '/testimonials/emirates.jpg'
    },
    {
      name: 'ADNOC Headquarters',
      company: 'Energy Sector',
      message: 'Their expertise in enterprise security is unmatched. Highly recommend for critical infrastructure protection.',
      rating: 5,
      image: '/testimonials/adnoc.jpg'
    }
  ];

  const companyValues = [
    {
      icon: MdSecurity,
      title: 'Security First',
      description: 'We prioritize the highest security standards in every solution we deliver',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MdVerifiedUser,
      title: 'Trust & Reliability',
      description: 'Building long-term relationships through consistent, dependable service',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MdTrendingUp,
      title: 'Innovation',
      description: 'Embracing cutting-edge technology to stay ahead of security challenges',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MdHandshake,
      title: 'Customer Success',
      description: 'Your success is our success - we go above and beyond for every client',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const milestones = [
    { year: '2008', title: 'Company Founded', description: 'Started with a vision to revolutionize security in UAE' },
    { year: '2012', title: 'First Major Contract', description: 'Secured Dubai Metro surveillance system project' },
    { year: '2016', title: 'AI Integration', description: 'Pioneered AI-powered analytics in regional market' },
    { year: '2020', title: 'Digital Transformation', description: 'Launched cloud-based monitoring solutions' },
    { year: '2024', title: 'Industry Leadership', description: 'Recognized as UAE\'s leading security solutions provider' }
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
                ABOUT OUR COMPANY
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Securing the Future
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Since 2008
                </span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                We are UAE's leading security solutions provider, dedicated to protecting what matters most to you with cutting-edge surveillance technology and unparalleled expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <MdPhone className="mr-2" size={20} />
                  Get In Touch
                </Link>
                <Link 
                  href="/product"
                  className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-white transition-all duration-300"
                >
                  <MdPlayArrow className="mr-2" size={20} />
                  View Our Work
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

        {/* Company Story Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Founded in 2008 with a vision to revolutionize security in the UAE, we have grown from a small startup to the region's most trusted security solutions provider. Our journey has been marked by continuous innovation, unwavering commitment to quality, and an ever-expanding portfolio of successful projects.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Today, we serve diverse sectors including retail, hospitality, government, healthcare, and residential communities. Our team of certified professionals combines deep technical expertise with intimate knowledge of local security challenges.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['ISO Certified', 'UAE Licensed', 'Award Winning', '24/7 Support'].map((badge, index) => (
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
                    src="/about-us/company-story.jpg"
                    alt="Our Company Story"
                    width={500}
                    height={400}
                    className="w-full h-auto rounded-xl object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+kABexcdxd6fQTc2y1Zy9kQQHMnOb9HVp4uJlTpKcm1kktCBVsC6zbq7y3vb2+azF9PJHWNyqzRqzgBKu6jkDYaC1vdlA="
                  />
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-xl shadow-lg">
                    <MdWorkspacePremium size={24} />
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
                The principles that guide every decision we make and every solution we deliver
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

        {/* Timeline Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Journey
              </h2>
              <p className="text-gray-600 text-lg">
                Key milestones that shaped our company
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                    
                    {/* Content */}
                    <div className="ml-16 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The experts behind our success, dedicated to delivering exceptional security solutions
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
                What Our Clients Say
              </h2>
              <p className="text-gray-600 text-lg">
                Trusted by leading organizations across the UAE
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
                Ready to Secure Your Future?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied clients who trust us with their security needs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <MdEmail className="mr-2" size={20} />
                  Get Free Consultation
                </Link>
                <Link 
                  href="/product"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  <MdArrowForward className="mr-2" size={20} />
                  Explore Solutions
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
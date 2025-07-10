"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaRegClock,
  FaChevronRight,
  FaHeart
} from 'react-icons/fa';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          source: 'footer' 
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubscribed(true);
        setEmail('');
        // Show success message for longer
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        // Handle errors (like duplicate email)
        alert(result.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert('Network error. Please try again.');
    }
  };
  
  const quickLinks = [
    { name: 'About Us', href: '/who-we-are' },
    { name: 'Products', href: '/product' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];
  
  const productCategories = [
    { name: 'Surveillance Systems', href: '/products/surveillance' },
    { name: 'Enterprise Security Solutions', href: '/products/commercial' },
    { name: 'Home Security', href: '/products/residential' },
    { name: 'Cloud Security', href: '/products/cloud' },
  ];
  
  const brands = [
    { name: 'Hikvision', href: '/brand/hikvision' },
    { name: 'Dahua', href: '/brand/dahua' },
    { name: 'EZVIZ', href: '/brand/ezviz' },
    { name: 'Uniview', href: '/brand/uniview' },
  ];
  
  const socialMedia = [
    { name: 'facebook', icon: FaFacebookF, color: '#3b5998', href: 'https://facebook.com' },
    { name: 'twitter', icon: FaTwitter, color: '#1da1f2', href: 'https://twitter.com' },
    { name: 'instagram', icon: FaInstagram, color: '#e1306c', href: 'https://instagram.com' },
    { name: 'linkedin', icon: FaLinkedinIn, color: '#0077b5', href: 'https://linkedin.com' },
    { name: 'youtube', icon: FaYoutube, color: '#ff0000', href: 'https://youtube.com' },
  ];

  return (
    <>
      {/* Curved Divider */}
      <div className="relative h-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <svg 
          className="absolute bottom-0 w-full h-24" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path 
            fill="#f8fafc" 
            fillOpacity="1" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,186.7C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        
        {/* Small decorative dots */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + (i * 12) + (Math.random() * 5)}%`,
                opacity: 0.6 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>
      </div>
      
      <footer 
        ref={footerRef} 
        className="bg-slate-50 pt-16 pb-8 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Top section with logo and newsletter */}
            <div 
              className={`mb-16 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-50 rounded-full opacity-70"></div>
                <div className="absolute -left-16 -top-16 w-48 h-48 bg-indigo-50 rounded-full opacity-70"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
                  <div className="text-center lg:text-left">
                    <div className="mb-4 inline-block">
                      <Image 
                        src="/logo.png" 
                        alt="Spottive Logo" 
                        width={180} 
                        height={50} 
                        className="h-10 w-auto" 
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Stay connected with us</h2>
                    <p className="text-gray-600 mb-4 max-w-lg mx-auto lg:mx-0">
                      Subscribe to our newsletter for the latest updates on security technology, 
                      exclusive offers, and industry insights.
                    </p>
                  </div>
                  
                  <div className="relative">
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-grow">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-4 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center"
                      >
                        {isSubscribed ? (
                          <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Subscribed
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <FaPaperPlane className="mr-2" />
                            Subscribe
                          </span>
                        )}
                      </button>
                    </form>
                    {isSubscribed && (
                      <div className="absolute -bottom-6 left-0 w-full text-center text-sm text-green-600 font-medium">
                        Thank you for subscribing to our newsletter!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          
            {/* Main Footer Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {/* Company Information */}
              <div 
                className={`transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h3 className="text-gray-900 font-bold text-lg mb-5 relative inline-block">
                  Get In Touch
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                </h3>
                
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-start">
                    <div className="bg-blue-50 rounded-lg p-2 mr-3">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    <div>
                      <p className="leading-tight">#2 Lootah Building AI Raffa St. Bur Dubai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-50 rounded-lg p-2 mr-3">
                      <FaPhone className="text-blue-600" />
                    </div>
                    <div>
                      <a href="tel:+971552341712" className="hover:text-blue-600 transition-colors">
                        +971 55 234 1712
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-50 rounded-lg p-2 mr-3">
                      <FaEnvelope className="text-blue-600" />
                    </div>
                    <div>
                      <a href="mailto:sales@spottive.com" className="hover:text-blue-600 transition-colors">
                        sales@spottive.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-blue-50 rounded-lg p-2 mr-3">
                      <FaRegClock className="text-blue-600" />
                    </div>
                    <div>
                      <p className="leading-tight">9:30 AM - 10:00 PM<br/><span className="text-sm text-gray-500">(Mon-Sat)</span></p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Icons */}
                <div className="mt-6">
                  <div className="flex items-center space-x-3">
                    {socialMedia.map((social) => {
                      const SocialIcon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                          style={{ 
                            boxShadow: `0 2px 10px rgba(0,0,0,0.05)` 
                          }}
                          aria-label={`Follow us on ${social.name}`}
                        >
                          <SocialIcon 
                            style={{ color: social.color }} 
                            className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" 
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div 
                className={`transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h3 className="text-gray-900 font-bold text-lg mb-5 relative inline-block">
                  Quick Links
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                </h3>
                
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={link.name} className="transition-all duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                      <Link 
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 flex items-center group transition-all duration-300"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-100 group-hover:bg-blue-500 mr-3 transition-all duration-300"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Products */}
              <div 
                className={`transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h3 className="text-gray-900 font-bold text-lg mb-5 relative inline-block">
                  Products
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                </h3>
                
                <ul className="space-y-3">
                  {productCategories.map((category, index) => (
                    <li key={category.name} className="transition-all duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                      <Link 
                        href={category.href}
                        className="text-gray-600 hover:text-blue-600 flex items-center group transition-all duration-300"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-100 group-hover:bg-blue-500 mr-3 transition-all duration-300"></span>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Brands */}
              <div 
                className={`transition-all duration-700 delay-400 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h3 className="text-gray-900 font-bold text-lg mb-5 relative inline-block">
                  Brands
                  <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                </h3>
                
                <ul className="space-y-3">
                  {brands.map((brand, index) => (
                    <li key={brand.name} className="transition-all duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                      <Link 
                        href={brand.href}
                        className="text-gray-600 hover:text-blue-600 flex items-center group transition-all duration-300"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-100 group-hover:bg-blue-500 mr-3 transition-all duration-300"></span>
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Trusted partnerships</span> with global security technology leaders
                  </p>
                </div>
              </div>
            </div>
            
            {/* Footer Bottom */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div 
                className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm"
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                  transitionDelay: '0.5s'
                }}
              >
                <div className="mb-4 md:mb-0 flex items-center">
                  <span>&copy; {new Date().getFullYear()} Spottive Technologies. All rights reserved.</span>
                  <span className="hidden md:inline-flex items-center ml-2">
                    <span className="mx-1">•</span>
                    <span>Made with</span> 
                    <FaHeart className="mx-1 text-red-500 animate-pulse" size={10} /> 
                    <span>in UAE</span>
                  </span>
                </div>
                
<div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
  {[
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' }
  ].map((item) => (
    <Link 
      key={item.name} 
      href={item.href}
      className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
    >
      {item.name}
    </Link>
  ))}
</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating decoration */}
        <div className="absolute top-32 right-8 w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-80 hidden lg:block" style={{ filter: 'blur(10px)' }}></div>
        <div className="absolute bottom-16 left-8 w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-60 hidden lg:block" style={{ filter: 'blur(8px)' }}></div>
      </footer>
    </>
  );
}
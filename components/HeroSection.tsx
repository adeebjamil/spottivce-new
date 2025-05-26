"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MdSecurity, 
  MdVideocam, 
  MdShield, 
  MdCloudQueue,
  MdPlayArrow,
  MdVerified,
  MdTrendingUp,
  MdFlashOn
} from 'react-icons/md';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showTrustedText, setShowTrustedText] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testimonial data
  const testimonials = [
    { company: "Dubai Mall", rating: 5, text: "Exceptional security solutions" },
    { company: "Emirates Airlines", rating: 5, text: "24/7 reliable monitoring" },
    { company: "ADNOC", rating: 5, text: "Advanced AI detection" }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const stepTimers = [1, 2, 3, 4].map((step) => {
        return setTimeout(() => {
          setLoadingStep(step);
          if (step === 4) {
            setTimeout(() => setShowTrustedText(true), 400);
          }
        }, step * 500);
      });

      return () => stepTimers.forEach(timer => clearTimeout(timer));
    }
  }, [isVisible]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Blobs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-20 pb-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Enhanced Text Content - Left Side */}
          <div 
            className={`space-y-8 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg">
              <MdFlashOn className="mr-2" size={16} />
              <span>Next-Gen Security Solutions</span>
              <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading with Gradient Text */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Secure Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                  Digital World
                </span>
              </h1>
              
              <div className="flex items-center space-x-2">
                <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                <div className="h-1 w-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
                <div className="h-1 w-4 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
              Advanced CCTV systems with <span className="font-semibold text-blue-600">AI-powered detection</span>, 
              real-time monitoring, and enterprise-grade security for Dubai's leading businesses.
            </p>
            
            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products" 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  <span>Explore Solutions</span>
                  <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    <MdPlayArrow size={20} />
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/contact" 
                className="group px-8 py-4 border-2 border-gray-300 text-gray-800 font-semibold rounded-2xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center justify-center backdrop-blur-sm bg-white/80"
              >
                <MdVideocam className="mr-2 group-hover:animate-pulse" size={20} />
                <span>Watch Demo</span>
              </Link>
            </div>

            {/* Enhanced Stats Section */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { number: "1000+", label: "Projects", icon: MdTrendingUp },
                { number: "99.9%", label: "Uptime", icon: MdShield },
                { number: "24/7", label: "Support", icon: MdCloudQueue }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-700 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl mb-2">
                    <stat.icon className="text-blue-600" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Animated Testimonial Carousel */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <MdVerified className="text-white" size={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-yellow-400">⭐</div>
                    ))}
                  </div>
                  <p className="text-gray-800 font-medium">
                    "{testimonials[currentSlide].text}"
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    - {testimonials[currentSlide].company}
                  </p>
                </div>
              </div>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-blue-600 w-6' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Enhanced Hero Visual - Right Side */}
          <div 
            className={`relative transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Main Hero Image Container */}
            <div className="relative">
              {/* Glowing Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur-3xl opacity-20 scale-110 animate-pulse-slow"></div>
              
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-white/20 backdrop-blur-sm">
                <Image
                  src="/hero1.png"
                  alt="Advanced CCTV Security Solutions"
                  width={600}
                  height={500}
                  fetchPriority="high"
                  priority={true}
                  className="w-full h-auto object-contain rounded-2xl"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wgARCAAPABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQAE/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAVNyvCsf/8QAGhAAAgIDAAAAAAAAAAAAAAAAAQIDBBITIf/aAAgBAQABBQJWZTmYT2pOZSlyb//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAACEBIhMVH/2gAIAQEABj8CrGHPlh6f/8QAGxAAAgMBAQEAAAAAAAAAAAAAAAERITFBYVH/2gAIAQEAAT8hFgXpZZssEtNifZo0QlL6P//aAAwDAQACAAMAAAAQzB//xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAIAQMBAT8QGI//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/ED//xAAcEAEAAgIDAQAAAAAAAAAAAAABESEAMUFRYXH/2gAIAQEAAT8QE5JuYche2OoaLuIWih6znWbLMXsGku8iQFpPgx//2Q=="
                />
              </div>
              
              {/* Top Left Floating Info Card - Live Monitoring */}
              <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20" style={{
                animation: 'float 6s ease-in-out infinite',
                zIndex: 30
              }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <MdSecurity className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Live Monitoring</div>
                    <div className="text-xs text-green-600 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Active
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Right Floating Info Card - Cloud Storage */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20" style={{
                animation: 'float 6s ease-in-out infinite 2s',
                zIndex: 20
              }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <MdCloudQueue className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Cloud Storage</div>
                    <div className="text-xs text-yellow-600">Unlimited</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Particles - Reduced number for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Add CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}
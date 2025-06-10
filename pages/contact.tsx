'use client';
import React, { useState, useEffect } from 'react';
import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdAccessTime,
  MdSend,
  MdPerson,
  MdMessage,
  MdBusiness,
  MdCheckCircle,
  MdStar,
  MdSecurity,
  MdSupport,
  MdSchedule,
  MdError
} from 'react-icons/md';
import { FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [activeMethod, setActiveMethod] = useState(0);

  const contactMethods = [
    {
      icon: MdEmail,
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'sales@spottive.com',
      action: 'mailto:sales@spottive.com',
      color: 'from-blue-500 to-blue-600',
      available: '24/7'
    },
    {
      icon: MdPhone,
      title: 'Call Us',
      description: 'Speak with our experts',
      value: '+971 55 234 1712',
      action: 'tel:+971552341712',
      color: 'from-green-500 to-green-600',
      available: '9:30AM-10:00PM (Mon-Sat)'
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      description: 'Quick chat support',
      value: '+971 55 234 1712',
      action: 'https://wa.me/971552341712',
      color: 'from-emerald-500 to-emerald-600',
      available: '9:30AM-10:00PM (Mon-Sat)'
    },
    {
      icon: MdLocationOn,
      title: 'Visit Us',
      description: 'Our office location',
      value: '#2 Lootah Building AI Raffa St. Bur Dubai',
      action: 'https://maps.app.goo.gl/mTj8YNH8nrgsNuXs9',
      color: 'from-purple-500 to-purple-600',
      available: '9:30AM-10:00PM (Mon-Sat)'
    }
  ];

  const services = [
    'Commercial Security',
    'Home Security',
    'Specialized Systems',
    'Installation Services',
    'Maintenance & Support',
    'Consultation',
    'Other'
  ];

  // Auto-cycle contact methods
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMethod((prev) => (prev + 1) % contactMethods.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [contactMethods.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
        setSubmitMessage('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-300 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <section className="pt-20 pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold mb-6 rounded-full shadow-lg animate-bounce-slow">
                <MdSupport className="mr-2" size={16} />
                GET IN TOUCH
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Contact Our
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Security Experts
                </span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Ready to secure your property? Our team of experts is here to help you choose the perfect CCTV solution for your needs.
              </p>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const isActive = index === activeMethod;
                
                return (
                  <a
                    key={index}
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : '_self'}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                    className={`group relative p-6 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                      isActive ? 'ring-2 ring-blue-400 ring-opacity-50' : ''
                    }`}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    
                    <h3 className="text-gray-900 font-bold text-lg mb-2">
                      {method.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {method.description}
                    </p>
                    
                    <p className="text-gray-900 font-semibold mb-2">
                      {method.value}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <MdAccessTime className="mr-1" size={12} />
                      {method.available}
                    </div>
                    
                    {isActive && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center animate-fadeIn">
                    <MdCheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                    <span className="text-green-700">{submitMessage}</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center animate-fadeIn">
                    <MdError className="text-red-500 mr-3 flex-shrink-0" size={20} />
                    <span className="text-red-700">{submitMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <MdPerson className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <MdEmail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <MdPhone className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Service Interested In
                      </label>
                      <div className="relative">
                        <MdBusiness className="absolute left-3 top-3 text-gray-400" size={20} />
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MdMessage className="absolute left-3 top-3 text-gray-400" size={20} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tell us about your security needs..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl transition-all duration-300 ${
                      isSubmitting 
                        ? 'opacity-70 cursor-not-allowed' 
                        : 'hover:scale-105 hover:shadow-2xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <MdSend className="mr-2" size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Company Info & Features - Same as before */}
              <div className="space-y-8">
                {/* Company Info */}
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Why Choose Our Security Solutions?
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      {
                        icon: MdSecurity,
                        title: '24/7 Professional Monitoring',
                        description: 'Round-the-clock security surveillance and support'
                      },
                      {
                        icon: MdStar,
                        title: '15+ Years Experience',
                        description: 'Trusted by thousands of satisfied customers'
                      },
                      {
                        icon: MdCheckCircle,
                        title: 'Free Consultation',
                        description: 'Expert advice tailored to your specific needs'
                      },
                      {
                        icon: MdSchedule,
                        title: 'Quick Installation',
                        description: 'Professional setup within 24-48 hours'
                      }
                    ].map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Icon className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Visit Our Office
                  </h3>
                  
                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1486001581087!2d55.28793097602559!3d25.262515977249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE1JzQ1LjEiTiA1NcKwMTcnMjQuNCJF!5e0!3m2!1sen!2sae!4v1716832456783!5m2!1sen!2sae"
                      width="100%" 
                      height="100%" 
                      style={{border: 0}}
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Spottive Technologies Location"
                    ></iframe>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">Office Hours</p>
                      <p className="text-gray-600">Mon-Sat: 9:30AM-10:00PM</p>
                      <p className="text-gray-600">Sun: Closed</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600">#2 Lootah Building</p>
                      <p className="text-gray-600">AI Raffa St. Bur Dubai</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Follow Us
                  </h3>
                  
                  <div className="flex space-x-4">
                    {[
                      { icon: FaFacebook, color: 'from-blue-500 to-blue-600', href: '#' },
                      { icon: FaTwitter, color: 'from-sky-400 to-sky-500', href: '#' },
                      { icon: FaLinkedin, color: 'from-blue-600 to-blue-700', href: '#' },
                      { icon: FaWhatsapp, color: 'from-green-500 to-green-600', href: 'https://wa.me/971552341712' }
                    ].map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl text-white hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <Icon size={20} />
                        </a>
                      );
                    })}
                  </div>
                </div>
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
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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
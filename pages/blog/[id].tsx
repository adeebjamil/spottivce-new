"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaEye, 
  FaShare, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaWhatsapp,
  FaChevronLeft, 
  FaChevronRight,
  FaTags,
  FaArrowRight,
  FaPaperPlane,
  FaEnvelope
} from 'react-icons/fa';
import { MdSecurity, MdCameraAlt, MdHome, MdTipsAndUpdates, MdVerified, MdArrowBack } from 'react-icons/md';

// Sample blog post data - same as your blog.tsx file
const BLOG_POSTS = [
  {
    id: 1,
    title: "Top 10 CCTV Camera Systems for Enhanced Business Security",
    excerpt: "Discover the most effective CCTV solutions that protect your business assets while providing advanced monitoring capabilities.",
    category: "Security Cameras",
    categoryIcon: MdCameraAlt,
    author: "Ahmed Hassan",
    authorRole: "Security Specialist",
    date: "May 22, 2025",
    readTime: "8 min read",
    image: "/blog/img1.webp",
    featured: true,
    views: 1245,
    content: [
      {
        type: "paragraph",
        content: "Security has become a paramount concern for businesses of all sizes. Whether you operate a small retail store or manage a large corporate office, protecting your assets, employees, and customers is essential. CCTV camera systems have evolved significantly in recent years, offering advanced features that go far beyond simple surveillance."
      },
      {
        type: "heading",
        content: "Why Business CCTV Systems Matter"
      },
      {
        type: "paragraph",
        content: "Modern CCTV systems provide comprehensive security solutions that help businesses deter crime, monitor activities, and gather evidence when incidents occur. The right security camera system can significantly reduce theft, vandalism, and unauthorized access while providing peace of mind for business owners and managers."
      },
      {
        type: "image",
        url: "/blog/img7.webp",
        caption: "Professional CCTV installation ensures optimal coverage and performance"
      },
      {
        type: "heading",
        content: "Top CCTV Systems for Business Security"
      },
      {
        type: "list",
        items: [
          "Hikvision ColorVu Series - Exceptional color imaging even in low-light conditions",
          "Dahua WizSense - AI-powered detection with reduced false alarms",
          "Axis P32 Network Cameras - Superior image quality with enhanced analytics",
          "Uniview NVR + IP Camera Kits - Cost-effective complete solutions",
          "Hanwha Techwin Wisenet X Series - Advanced WDR and low-light performance",
          "Verkada Cloud-Based Systems - Simple deployment with cloud management",
          "Avigilon H5 Pro - Ultra-high resolution for detailed monitoring",
          "IDIS DirectIP - Plug-and-play setup with DirectIP technology",
          "Bosch FLEXIDOME - Vandal-resistant with intelligent video analytics",
          "Pelco Sarix Enhanced - Environmental adaptability for various business settings"
        ]
      },
      {
        type: "paragraph",
        content: "When selecting a CCTV system for your business, consider factors such as resolution requirements, storage capacity, remote access capabilities, and integration with other security systems. Each business has unique security needs based on its size, layout, and industry-specific risks."
      },
      {
        type: "heading",
        content: "Key Features to Look For"
      },
      {
        type: "paragraph",
        content: "The most effective business CCTV systems include several essential features that enhance their security value:"
      },
      {
        type: "list",
        items: [
          "High-resolution imaging (at least 4MP for most applications)",
          "Advanced motion detection with reduced false alarms",
          "Night vision capabilities for 24/7 monitoring",
          "Remote viewing via mobile apps and web interfaces",
          "Intelligent video analytics for business insights",
          "Secure data encryption and cybersecurity features",
          "Scalable solutions that can grow with your business",
          "Integration with access control and alarm systems"
        ]
      },
      {
        type: "quote",
        content: "The best security system isn't just about cameras—it's about creating a comprehensive solution that addresses your specific business vulnerabilities while providing actionable intelligence.",
        author: "Ahmed Hassan, Security Specialist at Spottive Technologies"
      },
      {
        type: "paragraph",
        content: "At Spottive Technologies, we help businesses identify their security requirements and implement customized CCTV solutions that provide optimal protection. Our team of security experts can assess your facility, recommend appropriate equipment, and ensure professional installation and configuration."
      },
      {
        type: "heading",
        content: "Conclusion"
      },
      {
        type: "paragraph",
        content: "Investing in a quality CCTV system is one of the most effective steps businesses can take to enhance their security posture. With advanced technology becoming more affordable and accessible, there's never been a better time to upgrade your surveillance capabilities. Contact our security specialists to learn how we can help you implement the perfect CCTV solution for your business needs."
      }
    ],
    tags: ["CCTV", "Business Security", "Surveillance", "Security Cameras", "Video Monitoring"]
  },
  {
    id: 2,
    title: "Smart Home Security: Integration with Modern IoT Devices",
    excerpt: "Learn how integrating your security system with smart home devices can provide seamless protection and convenience.",
    category: "Smart Home",
    categoryIcon: MdHome,
    author: "Sophia Williams",
    authorRole: "IoT Expert",
    date: "May 19, 2025",
    readTime: "6 min read",
    image: "/blog/img2.webp",
    featured: true,
    views: 982,
    content: [
      {
        type: "paragraph",
        content: "Smart home technology has revolutionized the way we think about residential security. Modern IoT devices now seamlessly integrate with security systems, creating comprehensive protection that can be monitored and controlled from anywhere."
      }
      // Additional content would be defined here
    ],
    tags: ["Smart Home", "IoT", "Home Security", "Home Automation", "Connected Devices"]
  },
  {
    id: 3,
    title: "Commercial Security Systems: What Business Owners Need to Know",
    excerpt: "Comprehensive guide to commercial security systems, including access control, surveillance, and alarm systems.",
    category: "Business Security",
    categoryIcon: MdSecurity,
    author: "Mahmoud Al-Farsi",
    authorRole: "Business Solutions Director",
    date: "May 15, 2025",
    readTime: "10 min read",
    image: "/blog/img3.webp",
    featured: false,
    views: 874,
    content: [
      {
        type: "paragraph",
        content: "Commercial security requires a multifaceted approach that addresses various potential vulnerabilities. From access control to surveillance and alarm systems, business owners need to understand how different security components work together."
      }
      // Additional content would be defined here
    ],
    tags: ["Commercial Security", "Access Control", "Business Protection", "Security Systems"]
  },
  {
    id: 4,
    title: "Choosing the Right Security Camera Resolution for Your Property",
    excerpt: "From HD to 4K and beyond: how to select the right camera resolution based on your security needs and budget.",
    category: "Security Cameras",
    categoryIcon: MdCameraAlt,
    author: "Ahmed Hassan",
    authorRole: "Security Specialist",
    date: "May 12, 2025",
    readTime: "7 min read",
    image: "/blog/img4.webp",
    featured: false,
    views: 756,
    content: [
      {
        type: "paragraph",
        content: "Camera resolution is one of the most important factors to consider when installing a security system. This guide helps you understand the differences between HD, Full HD, 4K, and other resolution options, and how to choose the right one for your specific security requirements."
      }
      // Additional content would be defined here
    ],
    tags: ["Camera Resolution", "4K Security", "HD Cameras", "Video Quality", "CCTV"]
  },
  {
    id: 5,
    title: "5 Essential Security Tips for Residential Properties in UAE",
    excerpt: "Practical security measures for homeowners to protect their properties from theft and unauthorized access.",
    category: "Tips & Advice",
    categoryIcon: MdTipsAndUpdates,
    author: "Fatima Khalid",
    authorRole: "Residential Security Advisor",
    date: "May 8, 2025",
    readTime: "5 min read",
    image: "/blog/img5.webp",
    featured: false,
    views: 689,
    content: [
      {
        type: "paragraph",
        content: "Protecting your home in the UAE requires a combination of smart security practices and appropriate technology. These five essential security tips will help homeowners create a safer living environment for their families."
      }
      // Additional content would be defined here
    ],
    tags: ["Home Security", "Residential", "UAE", "Security Tips", "Theft Prevention"]
  },
  {
    id: 6,
    title: "The Future of AI in Security Surveillance Systems",
    excerpt: "How artificial intelligence is revolutionizing security surveillance with predictive analytics and behavior recognition.",
    category: "Technology Trends",
    categoryIcon: MdVerified,
    author: "Sophia Williams",
    authorRole: "IoT Expert",
    date: "May 5, 2025",
    readTime: "9 min read",
    image: "/blog/img6.webp",
    featured: false,
    views: 934,
    content: [
      {
        type: "paragraph",
        content: "Artificial intelligence is transforming security surveillance, enabling systems to not just record events but to understand and analyze them. Learn how AI-powered security is changing the landscape of threat detection and prevention."
      }
      // Additional content would be defined here
    ],
    tags: ["AI Security", "Artificial Intelligence", "Predictive Analytics", "Smart Surveillance", "Technology"]
  }
];

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Find the blog post based on the ID
  const postId = parseInt(id as string);
  const post = BLOG_POSTS.find(post => post.id === postId);
  
  // Find the previous and next posts
  const currentIndex = BLOG_POSTS.findIndex(p => p.id === postId);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;
  
  // Get related posts (same category, excluding current post)
  const relatedPosts = post 
    ? BLOG_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3)
    : [];
  
  // Handle subscription form
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };
  
  // Share functions
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post?.title || 'Spottive Technology Blog';
  
  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    setShowShareModal(false);
  };
  
  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
    setShowShareModal(false);
  };
  
  const shareViaLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    setShowShareModal(false);
  };
  
  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
    setShowShareModal(false);
  };
  
  const shareViaEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent('Check out this article: ' + shareUrl)}`, '_blank');
    setShowShareModal(false);
  };
  
  if (!post) {
    // Loading state or 404
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
        <Head>
          <title>Post Not Found | Spottive Technology Blog</title>
        </Head>
        <div className="text-center max-w-md">
          <div className="mb-6 text-blue-600">
            <MdCameraAlt size={64} className="mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't seem to exist or may have been moved.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MdArrowBack className="mr-2" size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>{post.title} | Spottive Technology Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Head>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Share This Article</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button 
                onClick={shareViaFacebook}
                className="flex items-center justify-center gap-2 p-3 bg-[#3b5998] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <FaFacebookF />
                <span>Facebook</span>
              </button>
              <button 
                onClick={shareViaTwitter}
                className="flex items-center justify-center gap-2 p-3 bg-[#1da1f2] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <FaTwitter />
                <span>Twitter</span>
              </button>
              <button 
                onClick={shareViaLinkedIn}
                className="flex items-center justify-center gap-2 p-3 bg-[#0077b5] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <FaLinkedinIn />
                <span>LinkedIn</span>
              </button>
              <button 
                onClick={shareViaWhatsApp}
                className="flex items-center justify-center gap-2 p-3 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </button>
            </div>
            <button 
              onClick={shareViaEmail}
              className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FaEnvelope />
              <span>Email</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Blog Post Hero */}
      <section className="relative pt-16 pb-10 md:pt-20 md:pb-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-100/40 to-indigo-200/40 rounded-full blur-3xl transform translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-indigo-100/30 to-blue-200/30 rounded-full blur-3xl transform -translate-x-1/3"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-8">
              <nav className="flex items-center text-sm">
                <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Home</Link>
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/blog" className="text-gray-500 hover:text-gray-700 transition-colors">Blog</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-800 font-medium truncate">{post.title}</span>
              </nav>
            </div>
            
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <post.categoryIcon className="mr-1" size={16} />
                {post.category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-600">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm mr-2">
                  {post.author.split(' ').map(name => name[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <FaCalendarAlt size={14} className="mr-1 text-gray-400" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center text-sm">
                <FaClock size={14} className="mr-1 text-gray-400" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center text-sm">
                <FaEye size={14} className="mr-1 text-gray-400" />
                <span>{post.views} views</span>
              </div>
              <button 
                onClick={() => setShowShareModal(true)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors ml-auto"
              >
                <FaShare size={14} className="mr-1" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <div className="relative -mt-10 md:-mt-16 mb-10 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-2xl aspect-video relative">
              <Image 
                src={post.image} 
                alt={post.title}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10">
              {/* Article Content */}
              <div className="md:w-3/4">
                <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-img:rounded-xl prose-img:shadow-md">
                  {post.content.map((block, index) => {
                    switch (block.type) {
                      case 'paragraph':
                        return <p key={index}>{block.content}</p>;
                      case 'heading':
                        return <h2 key={index}>{block.content}</h2>;
                      case 'image':
                        return (
                          <figure key={index} className="my-8">
                            <div className="aspect-video relative rounded-xl overflow-hidden">
                              <Image 
                                src={block.url || '/placeholder-image.jpg'} 
                                alt={block.caption || ''}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                            {block.caption && (
                              <figcaption className="text-center text-sm text-gray-500 mt-2">
                                {block.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      case 'list':
                        return (
                          <ul key={index} className="space-y-2">
                            {block.items?.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      case 'quote':
                        return (
                          <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 rounded-r-lg">
                            <p className="italic text-gray-700">{block.content}</p>
                            {block.author && (
                              <footer className="text-sm font-medium text-gray-600">
                                — {block.author}
                              </footer>
                            )}
                          </blockquote>
                        );
                      default:
                        return null;
                    }
                  })}
                </article>
                
                {/* Tags */}
                <div className="mt-10 mb-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <FaTags className="text-gray-400" />
                    {post.tags.map(tag => (
                      <Link 
                        key={tag}
                        href={`/blog?tag=${tag}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Author Box */}
                <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {post.author.split(' ').map(name => name[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">About {post.author}</h3>
                      <p className="text-sm text-gray-600 mb-3">{post.authorRole} at Spottive Technologies</p>
                      <p className="text-gray-700">
                        {post.author} is a security expert with extensive experience in designing and implementing security solutions for businesses and homes across the UAE. 
                        Specializing in {post.category.toLowerCase()} systems, they help clients find the perfect security solutions for their specific needs.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Post Navigation */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {prevPost && (
                    <Link 
                      href={`/blog/${prevPost.id}`}
                      className="group p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start"
                    >
                      <div className="flex-shrink-0 mr-3">
                        <FaChevronLeft className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Previous Post</span>
                        <h4 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                          {prevPost.title}
                        </h4>
                      </div>
                    </Link>
                  )}
                  
                  {nextPost && (
                    <Link 
                      href={`/blog/${nextPost.id}`}
                      className="group p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start"
                    >
                      <div className="flex-grow">
                        <span className="text-sm text-gray-500">Next Post</span>
                        <h4 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                          {nextPost.title}
                        </h4>
                      </div>
                      <div className="flex-shrink-0 ml-3">
                        <FaChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="md:w-1/4">
                <div className="sticky top-24 space-y-8">
                  {/* Newsletter Signup */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-5 border border-blue-100/50">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Stay Updated</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Get the latest security insights and tips directly to your inbox.
                    </p>
                    <form onSubmit={handleSubscribe}>
                      <div className="space-y-3">
                        <input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                        <button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center"
                          disabled={isSubscribed}
                        >
                          {isSubscribed ? (
                            <span className="flex items-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Subscribed
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <FaPaperPlane className="mr-2" size={14} />
                              Subscribe
                            </span>
                          )}
                        </button>
                      </div>
                    </form>
                    {isSubscribed && (
                      <div className="mt-2 text-center text-sm text-green-600 font-medium">
                        Thank you for subscribing!
                      </div>
                    )}
                  </div>
                  
                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 relative inline-block">
                        Related Posts
                        <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                      </h3>
                      <div className="space-y-4">
                        {relatedPosts.map(relatedPost => (
                          <Link 
                            key={relatedPost.id}
                            href={`/blog/${relatedPost.id}`}
                            className="group flex items-start gap-3"
                          >
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden relative">
                              <Image 
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                layout="fill"
                                objectFit="cover"
                                className="transform group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <FaCalendarAlt size={10} className="mr-1" />
                                <span>{relatedPost.date}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* CTA Card */}
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
                    
                    <h3 className="text-xl font-bold mb-3 relative z-10">Need Expert Advice?</h3>
                    <p className="text-blue-100 text-sm mb-4 relative z-10">
                      Our security specialists are ready to help you find the perfect solution for your needs.
                    </p>
                    <Link 
                      href="/contact"
                      className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors relative z-10"
                    >
                      Contact Us
                      <FaArrowRight size={12} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">You Might Also Like</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore more articles related to security technology and solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3).map(relatedPost => (
                <div
                  key={relatedPost.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      layout="fill"
                      objectFit="cover"
                      className="transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <relatedPost.categoryIcon className="mr-1" size={10} />
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-gray-500 text-xs mb-2">
                      <FaCalendarAlt className="mr-1" />
                      <span className="mr-3">{relatedPost.date}</span>
                      <FaClock className="mr-1" />
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <Link href={`/blog/${relatedPost.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${relatedPost.id}`}
                      className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center"
                    >
                      Read more
                      <FaArrowRight className="ml-1" size={10} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                View All Articles
                <FaArrowRight className="ml-2" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-36 -left-36 w-72 h-72 bg-white/10 rounded-full"></div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 800 800" 
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-10"
            >
              <defs>
                <pattern 
                  id="smallGrid" 
                  width="20" 
                  height="20" 
                  patternUnits="userSpaceOnUse"
                >
                  <path 
                    d="M 20 0 L 0 0 0 20" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Secure Your Property with Professional Solutions?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Contact our security experts today for a personalized consultation and find the perfect security system for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                Get a Free Consultation
              </Link>
              <Link
                href="/products"
                className="bg-transparent text-white border border-white/30 hover:bg-white/10 px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add your existing Footer component here */}
      
      <style jsx>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-up {
          animation: fade-up 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
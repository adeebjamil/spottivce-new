"use client";

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaClock, 
  FaArrowRight, 
  FaEye,
  FaPaperPlane,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';
import { MdSecurity, MdCameraAlt, MdSmartphone, MdTipsAndUpdates, MdVerified } from 'react-icons/md';

// Sample blog post data
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
    views: 1245
  },
  {
    id: 2,
    title: "Smart Home Security: Integration with Modern IoT Devices",
    excerpt: "Learn how integrating your security system with smart home devices can provide seamless protection and convenience.",
    category: "Smart Home",
    categoryIcon: MdSmartphone,
    author: "Sophia Williams",
    authorRole: "IoT Expert",
    date: "May 19, 2025",
    readTime: "6 min read",
    image: "/blog/img2.webp",
    featured: true,
    views: 982
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
    views: 874
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
    views: 756
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
    views: 689
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
    views: 934
  },
];

// Blog categories
const CATEGORIES = [
  { name: "All Posts", count: BLOG_POSTS.length },
  { name: "Security Cameras", count: BLOG_POSTS.filter(post => post.category === "Security Cameras").length },
  { name: "Smart Home", count: BLOG_POSTS.filter(post => post.category === "Smart Home").length },
  { name: "Business Security", count: BLOG_POSTS.filter(post => post.category === "Business Security").length },
  { name: "Technology Trends", count: BLOG_POSTS.filter(post => post.category === "Technology Trends").length },
  { name: "Tips & Advice", count: BLOG_POSTS.filter(post => post.category === "Tips & Advice").length },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const blogSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (blogSectionRef.current) {
      observer.observe(blogSectionRef.current);
    }

    return () => {
      if (blogSectionRef.current) {
        observer.unobserve(blogSectionRef.current);
      }
    };
  }, []);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Would typically navigate to search results page or filter
    console.log("Searching for:", searchQuery);
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };
  
  // Filter blog posts by category and search query
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Pagination
  const postsPerPage = 4;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Featured posts for the hero section
  const featuredPosts = BLOG_POSTS.filter(post => post.featured);

  return (
    <>
      <Head>
        <title>Blog | Spottive Technology - Security Solutions</title>
        <meta name="description" content="Latest insights, guides and news about security technologies, CCTV solutions, and smart home security systems from Spottive Technology." />
      </Head>
      
      {/* Hero Section with Featured Posts */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-100/40 to-indigo-200/40 rounded-full blur-3xl transform translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-indigo-100/30 to-blue-200/30 rounded-full blur-3xl transform -translate-x-1/3"></div>
          
          {/* Animated dots */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-blue-400"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${5 + Math.random() * 90}%`,
                  opacity: 0.3 + Math.random() * 0.4,
                  animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                Security Insights & News
              </span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Expert advice, industry trends, and practical tips to help you make informed security decisions for your home and business.
            </p>
          </div>
          
          {/* Featured Posts Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <div 
                key={post.id}
                className={`relative group overflow-hidden bg-white rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl ${
                  index === 0 ? 'lg:col-span-1 transform hover:-translate-y-2' : 'lg:col-span-1 transform hover:-translate-y-2'
                }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10"></div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                      <post.categoryIcon className="mr-1" size={12} />
                      {post.category}
                    </span>
                  </div>
                  <Image 
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <Link href={`/blog/${post.id}`}>
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <div className="flex items-center text-white/80 text-sm">
                      <FaCalendarAlt size={12} className="mr-1" />
                      <span className="mr-4">{post.date}</span>
                      <FaClock size={12} className="mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm mr-2">
                        {post.author.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">{post.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaEye className="mr-1" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
                <Link 
                  href={`/blog/${post.id}`}
                  className="absolute inset-0"
                  aria-label={`Read more about ${post.title}`}
                ></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Blog Content */}
      <section ref={blogSectionRef} className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full lg:w-1/3 xl:w-1/4">
                <div className="sticky top-24 space-y-8">
                  {/* Search Bar */}
                  <div className="bg-white rounded-xl shadow-md p-5">
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search articles..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <button 
                          type="submit"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                          aria-label="Search"
                        >
                          <FaArrowRight />
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Categories */}
                  <div className="bg-white rounded-xl shadow-md p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 relative inline-block">
                      Categories
                      <span className="absolute left-0 bottom-0 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                    </h3>
                    <ul className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <li key={category.name}>
                          <button 
                            onClick={() => handleCategoryChange(category.name)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-all ${
                              selectedCategory === category.name
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span>{category.name}</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                              {category.count}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Newsletter Signup */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-5 border border-blue-100/50">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Stay Updated</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Subscribe to our newsletter for the latest security insights and tips.
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
                </div>
              </div>
              
              {/* Main Content */}
              <div className="w-full lg:w-2/3 xl:w-3/4">
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <div className="flex flex-wrap items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedCategory === "All Posts" ? "Latest Articles" : selectedCategory}
                    </h2>
                    <div className="text-sm text-gray-500">
                      Showing {currentPosts.length} of {filteredPosts.length} posts
                    </div>
                  </div>
                  
                  {currentPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentPosts.map((post, index) => (
                        <div
                          key={post.id}
                          className={`bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                          }`}
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <div className="relative h-48 overflow-hidden">
                            <Image 
                              src={post.image}
                              alt={post.title}
                              layout="fill"
                              objectFit="cover"
                              className="transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <post.categoryIcon className="mr-1" size={10} />
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center text-gray-500 text-xs mb-2">
                              <FaCalendarAlt className="mr-1" />
                              <span className="mr-3">{post.date}</span>
                              <FaClock className="mr-1" />
                              <span>{post.readTime}</span>
                            </div>
                            <Link href={`/blog/${post.id}`}>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-7 w-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs mr-2">
                                  {post.author.split(' ').map(name => name[0]).join('')}
                                </div>
                                <span className="text-xs text-gray-600">{post.author}</span>
                              </div>
                              <Link 
                                href={`/blog/${post.id}`}
                                className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors flex items-center"
                              >
                                Read more
                                <FaArrowRight className="ml-1" size={10} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-blue-50 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                        <FaSearch className="text-blue-500" size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                      <p className="text-gray-500 mb-4">
                        We couldn't find any posts matching your search criteria.
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All Posts');
                        }}
                        className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                  
                  {/* Pagination */}
                  {filteredPosts.length > postsPerPage && (
                    <div className="flex items-center justify-center mt-10">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`flex items-center justify-center w-10 h-10 rounded-md ${
                            currentPage === 1
                              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 bg-white border border-gray-200'
                          }`}
                          aria-label="Previous page"
                        >
                          <FaChevronLeft size={14} />
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`flex items-center justify-center w-10 h-10 rounded-md ${
                              currentPage === i + 1
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 bg-white border border-gray-200'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={`flex items-center justify-center w-10 h-10 rounded-md ${
                            currentPage === totalPages
                              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 bg-white border border-gray-200'
                          }`}
                          aria-label="Next page"
                        >
                          <FaChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        {/* Background Decoration */}
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
                href="/product"
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
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}
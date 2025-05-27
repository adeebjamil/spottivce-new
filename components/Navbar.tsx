import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MdSecurity, 
  MdVideocam, 
  MdHome, 
  MdViewModule, 
  MdBusiness, 
  MdContactMail, 
  MdInfo,
  MdMenu,
  MdClose,
  MdKeyboardArrowDown,
  MdArticle
} from 'react-icons/md';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fixed dropdown handlers with proper timing and cleanup
  const handleProductsMouseEnter = () => {
    setIsBrandsOpen(false);
    setIsProductsOpen(true);
  };

  const handleProductsMouseLeave = () => {
    setTimeout(() => {
      setIsProductsOpen(false);
    }, 150);
  };

  const handleBrandsMouseEnter = () => {
    setIsProductsOpen(false);
    setIsBrandsOpen(true);
  };

  const handleBrandsMouseLeave = () => {
    setTimeout(() => {
      setIsBrandsOpen(false);
    }, 150);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (!target.closest('.products-dropdown') && !target.closest('.brands-dropdown')) {
        setIsProductsOpen(false);
        setIsBrandsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
    setIsBrandsOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'
    } border-b border-gray-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
              <Image 
                src="/logo.png" 
                alt="CCTV Dubai Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto object-contain" 
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                <MdHome size={18} />
                <span>Home</span>
              </Link>
              
              {/* Our Products with hover dropdown */}
              <div 
                className="relative products-dropdown"
                onMouseEnter={handleProductsMouseEnter}
                onMouseLeave={handleProductsMouseLeave}
              >
                <div className="flex items-center">
                  {/* Main Product Link */}
                  <Link
                    href="/product"
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <MdViewModule size={18} />
                    <span>Our Products</span>
                  </Link>
                  
                  {/* Dropdown Arrow Button */}
                  <button
                    className="flex items-center text-gray-700 hover:text-blue-600 px-1 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                  >
                    <MdKeyboardArrowDown 
                      className={`transition-transform duration-300 ${
                        isProductsOpen ? "rotate-180" : ""
                      }`} 
                      size={16} 
                    />
                  </button>
                </div>
                
                {/* Products Mega Dropdown */}
                <div 
                  className={`absolute left-1/2 transform -translate-x-1/2 mt-1 w-[800px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 z-50 ${
                    isProductsOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-4 pointer-events-none'
                  }`}
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <div className="py-6 px-6 grid grid-cols-12 gap-4">
                    {/* Left column - Product categories */}
                    <div className="col-span-8 grid grid-cols-2 gap-4">
                      {/* Card 1 - Hikvision */}
                      <Link 
                        href="/brand/hikvision"
                        onClick={closeMobileMenu}
                        className="group bg-blue-50 border border-blue-200 p-6 rounded-xl flex flex-col hover:bg-blue-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <div className="flex-grow flex items-center justify-center mb-4">
                          <Image 
                            src="/brand/hikvision.png" 
                            alt="Hikvision Logo" 
                            width={120} 
                            height={60} 
                            className="object-contain transition-transform duration-300 group-hover:scale-110" 
                          />
                        </div>
                        <h4 className="font-semibold text-center mb-4 text-gray-900">Hikvision</h4>
                        <span className="flex items-center text-sm font-medium justify-center text-blue-600 hover:text-blue-700 transition-colors">
                          Learn more →
                        </span>
                      </Link>
                      
                      {/* Card 2 - UNV */}
                      <Link 
                        href="/brand/unv"
                        onClick={closeMobileMenu}
                        className="group bg-gray-50 border border-gray-200 p-6 rounded-xl flex flex-col hover:bg-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <div className="flex-grow flex items-center justify-center mb-4">
                          <Image 
                            src="/brand/unv.png" 
                            alt="UNV Logo" 
                            width={120} 
                            height={60} 
                            className="object-contain transition-transform duration-300 group-hover:scale-110" 
                          />
                        </div>
                        <h4 className="font-semibold text-center mb-4 text-gray-900">UNV</h4>
                        <span className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-700 justify-center transition-colors">
                          Learn more →
                        </span>
                      </Link>
                      
                      {/* Card 3 - Dahua */}
                      <Link 
                        href="/brand/dahua"
                        onClick={closeMobileMenu}
                        className="group bg-purple-50 border border-purple-200 p-6 rounded-xl flex flex-col hover:bg-purple-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <div className="flex-grow flex items-center justify-center mb-4">
                          <Image 
                            src="/brand/dahua.png" 
                            alt="Dahua Logo" 
                            width={120} 
                            height={60} 
                            className="object-contain transition-transform duration-300 group-hover:scale-110" 
                          />
                        </div>
                        <h4 className="font-semibold text-center mb-4 text-gray-900">Dahua</h4>
                        <span className="flex items-center text-sm font-medium justify-center text-purple-600 hover:text-purple-700 transition-colors">
                          Learn more →
                        </span>
                      </Link>
                      
                      {/* Card 4 - Uniview */}
                      <Link 
                        href="/brand/uniview"
                        onClick={closeMobileMenu}
                        className="group bg-green-50 border border-green-200 p-6 rounded-xl flex flex-col hover:bg-green-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <div className="flex-grow flex items-center justify-center mb-4">
                          <Image 
                            src="/brand/newunv.png" 
                            alt="Uniview Logo" 
                            width={120} 
                            height={60} 
                            className="object-contain transition-transform duration-300 group-hover:scale-110" 
                          />
                        </div>
                        <h4 className="font-semibold text-center mb-4 text-gray-900">Uniview</h4>
                        <span className="flex items-center text-sm font-medium justify-center text-green-600 hover:text-green-700 transition-colors">
                          Learn more →
                        </span>
                      </Link>
                    </div>
                    
                    {/* Right column - What's new section */}
                    <div className="col-span-4 bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center">
                        <MdSecurity className="mr-2 text-blue-600" size={20} />
                        What&apos;s new
                      </h3>
                      <div className="space-y-3">
                        <Link 
                          href="/product" 
                          className="block text-gray-600 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-white"
                          onClick={closeMobileMenu}
                        >
                          Latest CCTV Technology
                        </Link>
                        <Link 
                          href="/product" 
                          className="block text-gray-600 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-white"
                          onClick={closeMobileMenu}
                        >
                          4K Ultra HD Cameras
                        </Link>
                        <Link 
                          href="/product" 
                          className="block text-gray-600 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-white"
                          onClick={closeMobileMenu}
                        >
                          Smart AI Detection
                        </Link>
                        <div className="mt-6">
                          <Link 
                            href="/product" 
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                            onClick={closeMobileMenu}
                          >
                            See all products →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                <MdContactMail size={18} />
                <span>Contact</span>
              </Link>

              <Link
                href="/who-we-are"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                <MdInfo size={18} />
                <span>Who We Are</span>
              </Link>
               <Link
                href="/blog"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                <MdArticle size={18} />
                <span>Blog</span>
              </Link>

              {/* Our Brands with hover dropdown */}
              <div 
                className="relative brands-dropdown"
                onMouseEnter={handleBrandsMouseEnter}
                onMouseLeave={handleBrandsMouseLeave}
              >
                <div className="flex items-center">
                  {/* Main Brands Link */}
                  <Link
                    href="/brand"
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    <MdBusiness size={18} />
                    <span>Our Brands</span>
                  </Link>
                  
                  {/* Dropdown Arrow Button */}
                  <button
                    className="flex items-center text-gray-700 hover:text-blue-600 px-1 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                  >
                    <MdKeyboardArrowDown 
                      className={`transition-transform duration-300 ${
                        isBrandsOpen ? "rotate-180" : ""
                      }`} 
                      size={16} 
                    />
                  </button>
                </div>
                
                {/* Brands Mega Dropdown */}
                <div 
                  className={`absolute left-1/2 transform -translate-x-1/2 mt-1 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 z-50 ${
                    isBrandsOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-4 pointer-events-none'
                  }`}
                  onMouseEnter={() => setIsBrandsOpen(true)}
                  onMouseLeave={() => setIsBrandsOpen(false)}
                >
                  <div className="py-8 px-6">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 text-center flex items-center justify-center">
                      <MdBusiness className="mr-2 text-blue-600" size={20} />
                      Our Partner Brands
                    </h3>
                    {/* Featured Brands */}
                    <div className="grid grid-cols-3 gap-4">
                      <Link 
                        href="/brand/hikvision"
                        onClick={closeMobileMenu}
                        className="group bg-blue-50 border border-blue-200 p-5 rounded-xl flex flex-col items-center hover:bg-blue-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <Image 
                          src="/brand/hikvision.png" 
                          alt="Hikvision Logo" 
                          width={80} 
                          height={40} 
                          className="object-contain mb-3 transition-transform duration-300 group-hover:scale-110" 
                        />
                        <p className="text-sm font-semibold text-gray-900 text-center">Hikvision</p>
                        <p className="text-xs text-gray-600 text-center mt-1">Premium Security Solutions</p>
                      </Link>
                      
                      <Link 
                        href="/brand/dahua"
                        onClick={closeMobileMenu}
                        className="group bg-purple-50 border border-purple-200 p-5 rounded-xl flex flex-col items-center hover:bg-purple-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <Image 
                          src="/brand/dahua.png" 
                          alt="Dahua Logo" 
                          width={80} 
                          height={40} 
                          className="object-contain mb-3 transition-transform duration-300 group-hover:scale-110" 
                        />
                        <p className="text-sm font-semibold text-gray-900 text-center">Dahua</p>
                        <p className="text-xs text-gray-600 text-center mt-1">Advanced Surveillance</p>
                      </Link>
                      
                      <Link 
                        href="/brand/uniview"
                        onClick={closeMobileMenu}
                        className="group bg-green-50 border border-green-200 p-5 rounded-xl flex flex-col items-center hover:bg-green-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <Image 
                          src="/brand/id_BRVGCZ-_1748322463519.png" 
                          alt="Uniview Logo" 
                          width={80} 
                          height={40} 
                          className="object-contain mb-3 transition-transform duration-300 group-hover:scale-110" 
                        />
                        <p className="text-sm font-semibold text-gray-900 text-center">Uniview</p>
                        <p className="text-xs text-gray-600 text-center mt-1">Professional CCTV</p>
                      </Link>
                    </div>
                    
                    {/* View All Brands Button */}
                    <div className="text-center mt-6">
                      <Link 
                        href="/brand"
                        onClick={closeMobileMenu}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        View All Brands →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <MdMenu 
                  className={`absolute transition-all duration-300 ${
                    !isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                  }`} 
                  size={24} 
                />
                <MdClose 
                  className={`absolute transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`} 
                  size={24} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            <MdHome size={20} />
            <span>Home</span>
          </Link>
          
          {/* Mobile Our Products */}
          <div>
            <div className="flex items-center justify-between">
              <Link
                href="/product"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-gray-50 flex-1"
                onClick={closeMobileMenu}
              >
                <MdViewModule size={20} />
                <span>Our Products</span>
              </Link>
              <button 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-gray-50"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
              >
                <MdKeyboardArrowDown 
                  className={`transition-transform duration-300 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`} 
                  size={20} 
                />
              </button>
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              isProductsOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="pl-4 py-2 space-y-2">
                <Link
                  href="/brand/hikvision"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  <span>Hikvision</span>
                </Link>
                <Link
                  href="/brand/unv"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  <span>UNV</span>
                </Link>
                <Link
                  href="/brand/dahua"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  <span>Dahua</span>
                </Link>
                <Link
                  href="/brand/uniview"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  <span>Uniview</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile Our Brands */}
          <div>
            <div className="flex items-center justify-between">
              <Link
                href="/brand"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-gray-50 flex-1"
                onClick={closeMobileMenu}
              >
                <MdBusiness size={20} />
                <span>Our Brands</span>
              </Link>
              <button 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-gray-50"
                onClick={() => setIsBrandsOpen(!isBrandsOpen)}
              >
                <MdKeyboardArrowDown 
                  className={`transition-transform duration-300 ${
                    isBrandsOpen ? "rotate-180" : ""
                  }`} 
                  size={20} 
                />
              </button>
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              isBrandsOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="pl-4 py-2">
                <Link
                  href="/brand/hikvision"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  <span>Hikvision</span>
                </Link>
                <Link
                  href="/brand/dahua"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  <span>Dahua</span>
                </Link>
                <Link
                  href="/brand/uniview"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  <span>Uniview</span>
                </Link>
                <Link
                  href="/brand"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50"
                  onClick={closeMobileMenu}
                >
                  <span>All Brands</span>
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/who-we-are"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            <MdInfo size={20} />
            <span>Who We Are</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            <MdArticle size={20} />
            <span>Blogs</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors rounded-lg hover:bg-gray-50"
            onClick={closeMobileMenu}
          >
            <MdContactMail size={20} />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
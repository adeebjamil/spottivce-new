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
  MdKeyboardArrowDown
} from 'react-icons/md';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Improved dropdown handlers with delay
  const handleMouseEnter = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setter(true);
  };

  const handleMouseLeave = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    const timeout = setTimeout(() => {
      setter(false);
    }, 150);

    setCloseTimeout(timeout);
  };

  // Clean up any timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isProductsOpen || isBrandsOpen) {
        if (!(event.target as HTMLElement).closest('.dropdown-container')) {
          setIsProductsOpen(false);
          setIsBrandsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProductsOpen, isBrandsOpen]);

  return (
    <header className="fixed w-full z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
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
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <MdHome size={18} />
                <span>Home</span>
              </Link>
              
              {/* Our Products with hover dropdown */}
              <div 
                className="relative dropdown-container"
                onMouseEnter={() => handleMouseEnter(setIsProductsOpen)}
                onMouseLeave={() => handleMouseLeave(setIsProductsOpen)}
              >
                <Link
                  href="/product"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <MdViewModule size={18} />
                  <span>Our Products</span>
                  <MdKeyboardArrowDown className={`transition-transform ${isProductsOpen ? "rotate-180" : ""}`} size={16} />
                </Link>
                
                {/* Products Mega Dropdown */}
                {isProductsOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white rounded-lg shadow-xl border border-gray-200 py-6 px-6 z-10 grid grid-cols-12 gap-4">
                    {/* Left column - Product categories */}
                    <div className="col-span-8 grid grid-cols-2 gap-4">
                      {/* Card 1 - CCTV Cameras */}
                      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg flex flex-col hover:bg-blue-100 transition-colors">
                        <div className="flex-grow flex items-center justify-center">
                          <MdVideocam className="text-blue-600 mb-2" size={48} />
                        </div>
                        <h4 className="font-medium text-center mb-4 text-gray-900">CCTV Cameras</h4>
                        <Link href="/product" className="flex items-center text-sm font-medium justify-center text-blue-600 hover:text-blue-700">
                          Learn more →
                        </Link>
                      </div>
                      
                      {/* Card 2 - Surveillance Systems */}
                      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg flex flex-col hover:bg-gray-100 transition-colors">
                        <div className="flex-grow flex items-center justify-center">
                          <MdSecurity className="text-gray-600 mb-2" size={48} />
                        </div>
                        <h4 className="font-medium text-center mb-4 text-gray-900">Surveillance Systems</h4>
                        <Link href="/product" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-700 justify-center">
                          Learn more →
                        </Link>
                      </div>
                      
                      {/* Card 3 - Security Solutions */}
                      <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg flex flex-col hover:bg-purple-100 transition-colors">
                        <div className="flex-grow flex items-center justify-center">
                          <MdSecurity className="text-purple-600 mb-2" size={48} />
                        </div>
                        <h4 className="font-medium text-center mb-4 text-gray-900">Security Solutions</h4>
                        <Link href="/product" className="flex items-center text-sm font-medium justify-center text-purple-600 hover:text-purple-700">
                          Learn more →
                        </Link>
                      </div>
                      
                      {/* Card 4 - Installation Services */}
                      <div className="bg-green-50 border border-green-200 p-6 rounded-lg flex flex-col hover:bg-green-100 transition-colors">
                        <div className="flex-grow flex items-center justify-center">
                          <MdContactMail className="text-green-600 mb-2" size={48} />
                        </div>
                        <h4 className="font-medium text-center mb-4 text-gray-900">Installation Services</h4>
                        <Link href="/contact" className="flex items-center text-sm font-medium text-green-600 hover:text-green-700 justify-center">
                          Learn more →
                        </Link>
                      </div>
                    </div>
                    
                    {/* Right column - What's new section */}
                    <div className="col-span-4">
                      <h3 className="text-lg font-bold mb-4 text-gray-900">What's new</h3>
                      <div className="space-y-3">
                        <Link href="/product" className="block text-gray-600 hover:text-blue-600 transition-colors">
                          Latest CCTV Technology
                        </Link>
                        <Link href="/product" className="block text-gray-600 hover:text-blue-600 transition-colors">
                          4K Ultra HD Cameras
                        </Link>
                        <Link href="/product" className="block text-gray-600 hover:text-blue-600 transition-colors">
                          Smart AI Detection
                        </Link>
                        <div className="mt-6">
                          <Link 
                            href="/product" 
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            See all products →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <MdContactMail size={18} />
                <span>Contact</span>
              </Link>

              <Link
                href="/who-we-are"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <MdInfo size={18} />
                <span>Who We Are</span>
              </Link>

              {/* Our Brands with hover dropdown */}
              <div 
                className="relative dropdown-container"
                onMouseEnter={() => handleMouseEnter(setIsBrandsOpen)}
                onMouseLeave={() => handleMouseLeave(setIsBrandsOpen)}
              >
                <Link
                  href="/brands"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <MdBusiness size={18} />
                  <span>Our Brands</span>
                  <MdKeyboardArrowDown className={`transition-transform ${isBrandsOpen ? "rotate-180" : ""}`} size={16} />
                </Link>
                
                {/* Brands Mega Dropdown */}
                {isBrandsOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[600px] bg-white rounded-lg shadow-xl border border-gray-200 py-8 px-6 z-10">
                    {/* Featured Brands */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 border border-blue-200 p-5 rounded-lg flex flex-col items-center hover:bg-blue-100 transition-colors">
                        <MdSecurity className="text-blue-600 mb-2" size={40} />
                        <p className="text-sm font-medium text-gray-900 text-center">Hikvision</p>
                        <p className="text-xs text-gray-600 text-center mt-1">Premium Security Solutions</p>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 p-5 rounded-lg flex flex-col items-center hover:bg-purple-100 transition-colors">
                        <MdVideocam className="text-purple-600 mb-2" size={40} />
                        <p className="text-sm font-medium text-gray-900 text-center">Dahua</p>
                        <p className="text-xs text-gray-600 text-center mt-1">Advanced Surveillance</p>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 p-5 rounded-lg flex flex-col items-center hover:bg-green-100 transition-colors">
                        <MdSecurity className="text-green-600 mb-2" size={40} />
                        <p className="text-sm font-medium text-gray-900 text-center">Uniview</p>
                        <p className="text-xs text-gray-600 text-center mt-1">Professional CCTV</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <MdMenu size={24} />
              ) : (
                <MdClose size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdHome size={20} />
              <span>Home</span>
            </Link>
            
            {/* Mobile Our Products */}
            <div>
              <button 
                className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
              >
                <div className="flex items-center space-x-2">
                  <MdViewModule size={20} />
                  <span>Our Products</span>
                </div>
                <MdKeyboardArrowDown className={`transition-transform ${isProductsOpen ? "rotate-180" : ""}`} size={20} />
              </button>
              
              {isProductsOpen && (
                <div className="pl-4 py-2 space-y-2">
                  <Link
                    href="/product"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdVideocam size={16} />
                    <span>CCTV Cameras</span>
                  </Link>
                  <Link
                    href="/product"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdSecurity size={16} />
                    <span>Surveillance Systems</span>
                  </Link>
                  <Link
                    href="/product"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdSecurity size={16} />
                    <span>Security Solutions</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdContactMail size={16} />
                    <span>Installation Services</span>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile Our Brands */}
            <div>
              <button 
                className="flex justify-between items-center w-full text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsBrandsOpen(!isBrandsOpen)}
              >
                <div className="flex items-center space-x-2">
                  <MdBusiness size={20} />
                  <span>Our Brands</span>
                </div>
                <MdKeyboardArrowDown className={`transition-transform ${isBrandsOpen ? "rotate-180" : ""}`} size={20} />
              </button>
              
              {isBrandsOpen && (
                <div className="pl-4 py-2">
                  <Link
                    href="/brands"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdSecurity size={16} />
                    <span>Hikvision</span>
                  </Link>
                  <Link
                    href="/brands"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdVideocam size={16} />
                    <span>Dahua</span>
                  </Link>
                  <Link
                    href="/brands"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdSecurity size={16} />
                    <span>Uniview</span>
                  </Link>
                  <Link
                    href="/brands"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdBusiness size={16} />
                    <span>All Brands</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/who-we-are"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdInfo size={20} />
              <span>Who We Are</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdContactMail size={20} />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
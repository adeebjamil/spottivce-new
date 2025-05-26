This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.



Navbar


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
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
                      {/* Card 1 - Hikvision */}
                      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg flex flex-col hover:bg-blue-100 transition-colors">
                        <div className="flex-grow flex items-center justify-center">
                          <Image 
                            src="/brand/hikvision.png" 
                            alt="Hikvision Logo" 
                            width={120} 
                            height={60} 
                            className="object-contain mb-2" 
                          />
                        </div>
                        <h4 className="font-medium text-center mb-4 text-gray-900">Hikvision</h4>
                        <Link href="/product/hikvision" className="flex items-center text-sm font-medium justify-center text-blue-600 hover:text-blue-700">
                          Learn more →
                        </Link>
                      </div>
                      
                      {/* Card 2 - UNV */}
                      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg flex flex-col hover:bg-gray-100 transition-colors">
                        <div className="flex-grow flex items-center justify-center">
                          <Image 
                            src="/brand/unv.png" 
                            alt="UNV Logo" 
                            width={120} 
                            height={60} 
                            className="object-contain mb-2" 
                          />
                        </div>
                        <h4 className="font-medium text-center mb-4 text-gray-900">UNV</h4>
                        <Link href="/product/unv" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-700 justify-center">
                          Learn more →
                        </Link>
                      </div>
                      
                      {/* Card 3 - Dahua */}
                      <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg flex flex-col hover:bg-purple-100 transition-colors">
                        <div className="flex-grow flex items-center justify-center">
                          <Image 
                            src="/brand/dahua.png" 
                            alt="Dahua Logo" 
                            width={120} 
                            height={60} 
                            className="object-contain mb-2" 
                          />
                        </div>
                        <h4 className="font-medium text-center mb-4 text-gray-900">Dahua</h4>
                        <Link href="/product/dahua" className="flex items-center text-sm font-medium justify-center text-purple-600 hover:text-purple-700">
                          Learn more →
                        </Link>
                      </div>
                      
                      {/* Card 4 - Uniview */}
                      <div className="bg-green-50 border border-green-200 p-6 rounded-lg flex flex-col hover:bg-green-100 transition-colors">
                        <div className="flex-grow flex items-center justify-center">
                          <Image 
                            src="/brand/uniview.png" 
                            alt="Uniview Logo" 
                            width={120} 
                            height={60} 
                            className="object-contain mb-2" 
                          />
                        </div>
                        <h4 className="font-medium text-center mb-4 text-gray-900">Uniview</h4>
                        <Link href="/product/uniview" className="flex items-center text-sm font-medium text-green-600 hover:text-green-700 justify-center">
                          Learn more →
                        </Link>
                      </div>
                    </div>
                    
                    {/* Right column - What's new section */}
                    <div className="col-span-4">
                      <h3 className="text-lg font-bold mb-4 text-gray-900">What&apos;s new</h3>
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
                        <Image 
                          src="/brand/hikvision.png" 
                          alt="Hikvision Logo" 
                          width={80} 
                          height={40} 
                          className="object-contain mb-2" 
                        />
                        <p className="text-sm font-medium text-gray-900 text-center">Hikvision</p>
                        <p className="text-xs text-gray-600 text-center mt-1">Premium Security Solutions</p>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 p-5 rounded-lg flex flex-col items-center hover:bg-purple-100 transition-colors">
                        <Image 
                          src="/brand/dahua.png" 
                          alt="Dahua Logo" 
                          width={80} 
                          height={40} 
                          className="object-contain mb-2" 
                        />
                        <p className="text-sm font-medium text-gray-900 text-center">Dahua</p>
                        <p className="text-xs text-gray-600 text-center mt-1">Advanced Surveillance</p>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 p-5 rounded-lg flex flex-col items-center hover:bg-green-100 transition-colors">
                        <Image 
                          src="/brand/uniview.png" 
                          alt="Uniview Logo" 
                          width={80} 
                          height={40} 
                          className="object-contain mb-2" 
                        />
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
                    href="/product/hikvision"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Hikvision</span>
                  </Link>
                  <Link
                    href="/product/unv"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>UNV</span>
                  </Link>
                  <Link
                    href="/product/dahua"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Dahua</span>
                  </Link>
                  <Link
                    href="/product/uniview"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Uniview</span>
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
                    <span>Hikvision</span>
                  </Link>
                  <Link
                    href="/brands"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Dahua</span>
                  </Link>
                  <Link
                    href="/brands"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Uniview</span>
                  </Link>
                  <Link
                    href="/brands"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
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
































































// filepath: c:\Users\USER\Desktop\spo\my-project\pages\api\products\index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('products');

    switch (req.method) {
      case 'GET':
        const products = await collection.find({}).toArray();
        res.status(200).json(products);
        break;

      case 'POST':
        const { name, shortDesc, category, subCategory, image } = req.body;
        
        if (!name || !shortDesc || !category || !subCategory) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProduct = {
          name,
          shortDesc,
          category,
          subCategory,
          image: image || '',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await collection.insertOne(newProduct);
        res.status(201).json({ _id: result.insertedId, ...newProduct });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

























// Product .tsx


import { useEffect, useState } from 'react';
import { 
  MdSearch, 
  MdSort, 
  MdClose,
  MdStar,
  MdStarBorder,
  MdGridView,
  MdViewList,
  MdVideocam
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface Product {
  _id: string;
  name: string;
  shortDesc: string;
  category: string;
  subCategory: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();
  
  // Get unique categories and subcategories
  const categories = [...new Set(products.map(product => product.category))];
  const subCategories = selectedCategory 
    ? [...new Set(products.filter(p => p.category === selectedCategory).map(p => p.subCategory))]
    : [...new Set(products.map(product => product.subCategory))];

  // Generate dynamic rating for each product (4.5 to 4.9)
  const generateRating = (productId: string) => {
    // Use product ID to ensure consistent rating for each product
    const hash = productId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Generate rating between 4.5 and 4.9
    const rating = 4.5 + (Math.abs(hash) % 40) / 100;
    return Math.round(rating * 10) / 10;
  };

  // Generate dynamic review count
  const generateReviewCount = (productId: string) => {
    const hash = productId.split('').reduce((a, b) => {
      a = ((a << 7) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    // Generate review count between 50 and 500
    return 50 + (Math.abs(hash) % 450);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<MdStar key={i} size={16} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <MdStarBorder size={16} className="text-yellow-400" />
          <MdStar size={16} className="text-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<MdStarBorder key={`empty-${i}`} size={16} className="text-gray-300" />);
    }
    
    return stars;
  };

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply subcategory filter
    if (selectedSubCategory) {
      filtered = filtered.filter(product => product.subCategory === selectedSubCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        filtered.sort((a, b) => generateRating(b._id) - generateRating(a._id));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedSubCategory, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSortBy('newest');
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory(''); // Reset subcategory when category changes
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-yellow-200 border-t-yellow-500 mx-auto animate-ping"></div>
          </div>
          <p className="mt-6 text-lg text-gray-900 font-medium">Loading CCTV products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Beautiful Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center text-white">
            {/* Hero Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-white/20">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></span>
              Premium Security Solutions
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              Professional
              <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                CCTV Solutions
              </span>
              <span className="block text-3xl lg:text-4xl font-bold text-white/90 mt-4">
                For Dubai & UAE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
              Discover our comprehensive range of cutting-edge surveillance systems, IP cameras, and security solutions. 
              <span className="block mt-2 text-white/70">
                Trusted by businesses and homeowners across the UAE for over a decade.
              </span>
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">{products.length}+</div>
                <div className="text-white/80 text-sm lg:text-base font-medium">Security Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">{categories.length}+</div>
                <div className="text-white/80 text-sm lg:text-base font-medium">Product Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">1000+</div>
                <div className="text-white/80 text-sm lg:text-base font-medium">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-white/80 text-sm lg:text-base font-medium">Expert Support</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => {
                  const productsSection = document.getElementById('products-section');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl font-bold hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl text-lg"
              >
                Explore Our Products
              </button>
              <button 
                onClick={() => router.push('/contact')}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 text-lg"
              >
                Get Free Consultation
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <p className="text-white/60 text-sm mb-6">Trusted by leading businesses across UAE</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="px-6 py-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/80 font-semibold">Enterprise Security</span>
                </div>
                <div className="px-6 py-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/80 font-semibold">Residential Solutions</span>
                </div>
                <div className="px-6 py-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/80 font-semibold">Smart Surveillance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </div>

      {/* Products Section */}
      <div id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" size={24} />
              <input
                type="text"
                placeholder="Search CCTV cameras, surveillance systems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 min-w-[160px] bg-white"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Subcategory Filter */}
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 min-w-[160px] bg-white"
                disabled={!selectedCategory && subCategories.length === 0}
              >
                <option value="">All Subcategories</option>
                {subCategories.map(subCategory => (
                  <option key={subCategory} value={subCategory}>{subCategory}</option>
                ))}
              </select>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3 px-6 py-4 border-2 border-gray-200 rounded-xl bg-white">
                <MdSort className="text-gray-400" size={20} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="focus:outline-none min-w-[120px] bg-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-yellow-600 shadow-md' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MdGridView size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white text-yellow-600 shadow-md' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MdViewList size={20} />
                </button>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory || selectedSubCategory || sortBy !== 'newest') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-6 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-all border-2 border-red-200 hover:border-red-300"
                >
                  <MdClose size={20} />
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="text-lg text-gray-700">
              Showing <span className="font-bold text-yellow-600">{filteredProducts.length}</span> of{' '}
              <span className="font-bold text-gray-900">{products.length}</span> CCTV products
            </p>
            {filteredProducts.length > 0 && (
              <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-sm font-medium">Professional Grade</span>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6">
              <MdVideocam size={80} className="mx-auto text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No CCTV products found</h3>
            <p className="text-gray-500 mb-8 text-lg">Try adjusting your search criteria or explore different categories</p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all transform hover:scale-105 font-medium text-lg"
            >
              <MdClose size={20} className="mr-2" />
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => {
              const rating = generateRating(product._id);
              const reviewCount = generateReviewCount(product._id);
              const isNewProduct = index < 3; // Mark first 3 as new
              
              return viewMode === 'grid' ? (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-50">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-56 flex items-center justify-center bg-gray-50">
                        <MdVideocam size={64} className="text-gray-400" />
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full shadow-lg">
                        {product.category}
                      </span>
                      {isNewProduct && (
                        <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 bg-white shadow-lg px-3 py-1 rounded-full">
                        <MdStar className="text-yellow-400" size={16} />
                        <span className="text-sm font-bold text-gray-900">{rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.shortDesc}
                    </p>
                    
                    {/* Subcategory */}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {product.subCategory}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-6">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {renderStars(rating)}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">({reviewCount})</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={() => router.push(`/product/${product._id}`)}
                      className="w-full bg-yellow-500 text-white py-4 rounded-xl font-bold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ) : (
                // List View
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-50 rounded-xl flex-shrink-0">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-32 h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-32 h-32 flex items-center justify-center bg-gray-50">
                          <MdVideocam size={48} className="text-gray-400" />
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                            <MdStar className="text-yellow-400" size={18} />
                            <span className="text-sm font-bold text-gray-900">{rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {product.shortDesc}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                            {product.subCategory}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {renderStars(rating)}
                            </div>
                            <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end">
                        <button 
                          onClick={() => router.push(`/product/${product._id}`)}
                          className="px-8 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;




























//Hero Section 


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
              
              {/* Top Floating Info Card - Live Monitoring (positioned better) */}
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
              
              {/* Bottom Floating Info Card - Cloud Storage (positioned better) */}
              <div className="absolute -bottom-4 md:-bottom-6 left-1/4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20" style={{
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

      {/* Modern Feature Showcase Bottom - Positioned better */}
      <div className={`fixed-bottom-showcase z-20 w-full pointer-events-none`} style={{ bottom: '2rem' }}>
        <div className="container mx-auto px-4">
          <div 
            className={`pointer-events-auto mx-auto max-w-3xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl px-6 py-4 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: MdVideocam, label: "4K Recording", value: "Ultra HD", color: "blue" },
                  { icon: MdSecurity, label: "AI Analytics", value: "Real-time", color: "green" },
                  { icon: MdShield, label: "Security", value: "Enterprise", color: "purple" },
                  { icon: MdCloudQueue, label: "Storage", value: "Cloud", color: "orange" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${feature.color}-500 rounded-xl flex items-center justify-center shadow-lg`}>
                      <feature.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{feature.label}</div>
                      <div className={`text-xs text-${feature.color}-600 font-medium`}>{feature.value}</div>
                    </div>
                  </div>
                ))}
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

        .fixed-bottom-showcase {
          position: absolute;
          left: 0;
          right: 0;
        }
      `}</style>
    </section>
  );
}






// next.config.ts //

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;



///////////////////////////////////////////////////////////////////////



product/[id].tsx


import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { 
  MdStar, 
  MdFavorite, 
  MdShare,
  MdZoomIn,
  MdArrowBack,
  MdClose,
  MdPhone,
  MdEmail,
  MdPerson,
  MdMessage,
  MdCheckCircle
} from 'react-icons/md';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

interface Product {
  _id: string;
  name: string;
  shortDesc: string;
  category: string;
  subCategory: string;
  image: string;
}

interface ProductDetail {
  _id: string;
  productId: string;
  productTitle: string;
  productDescription: string;
  features: string[];
  specifications: { [key: string]: string };
  featureImages: string[];
  seo: {
    focusKeyword: string;
    seoKeywords: string[];
    autoTitle: string;
    autoDescription: string;
  };
}

interface Props {
  product: Product | null;
  productDetail: ProductDetail | null;
}

const ProductDetailPage = ({ product, productDetail }: Props) => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    productName: '',
    userName: '',
    userEmail: '',
    userMobile: '',
    message: ''
  });

  // Initialize product name when component mounts
  useState(() => {
    if (product) {
      setContactForm(prev => ({
        ...prev,
        productName: productDetail?.productTitle || product.name
      }));
    }
  });

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/product-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          productId: product?._id,
          createdAt: new Date()
        }),
      });

      if (response.ok) {
        // Close contact modal
        setShowContactModal(false);
        
        // Show success modal
        setShowSuccessModal(true);
        
        // Reset form
        setContactForm({
          productName: productDetail?.productTitle || product?.name || '',
          userName: '',
          userEmail: '',
          userMobile: '',
          message: ''
        });

        // Show toast notification
        toast.success('Your enquiry has been submitted successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to submit enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast.error('Failed to submit enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/product')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <MdArrowBack size={20} className="mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Handle case where product exists but no detailed info
  if (!productDetail) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => router.push('/product')}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Products
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{product.category}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                    <MdPhone size={64} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Basic Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <MdStar key={i} size={20} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(4.8) 128 reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {product.subCategory}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.shortDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    setContactForm(prev => ({
                      ...prev,
                      productName: product.name
                    }));
                    setShowContactModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  <MdPhone size={20} className="mr-2" />
                  Contact for this Product
                </button>
                <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <MdFavorite size={20} className="text-red-500" />
                </button>
                <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <MdShare size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> Detailed product information is not available yet. Please contact us for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Safely get all images
  const allImages = [
    product.image,
    ...(productDetail.featureImages || [])
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => router.push('/product')}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Products
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group">
              {allImages.length > 0 ? (
                <>
                  <img
                    src={allImages[selectedImage]}
                    alt={productDetail.productTitle}
                    className="w-full h-96 object-cover cursor-zoom-in"
                    onClick={() => setShowImageModal(true)}
                  />
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MdZoomIn size={20} className="text-gray-600" />
                  </button>
                </>
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                  <MdPhone size={64} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-blue-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productDetail.productTitle} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productDetail.productTitle}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <MdStar key={i} size={20} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">(4.8) 128 reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {product.subCategory}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {productDetail.productDescription}
              </p>
            </div>

            {/* Features */}
            {productDetail.features && productDetail.features.filter(f => f && f.trim()).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {productDetail.features.filter(f => f && f.trim()).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setContactForm(prev => ({
                    ...prev,
                    productName: productDetail.productTitle
                  }));
                  setShowContactModal(true);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
              >
                <MdPhone size={20} className="mr-2" />
                Contact for this Product
              </button>
              <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <MdFavorite size={20} className="text-red-500" />
              </button>
              <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <MdShare size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {productDetail.specifications && typeof productDetail.specifications === 'object' && Object.keys(productDetail.specifications).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Specifications</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
                {Object.entries(productDetail.specifications).map(([key, value], index) => (
                  <div key={index} className="bg-white p-6">
                    <dt className="text-sm font-medium text-gray-500 mb-1">{key}</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Contact for Product</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                  <MdClose size={20} />
                </button>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Product Name (Predefined) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.productName}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                {/* User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={contactForm.userName}
                      onChange={(e) => setContactForm({...contactForm, userName: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* User Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={contactForm.userEmail}
                      onChange={(e) => setContactForm({...contactForm, userEmail: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* User Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Mobile Number *
                  </label>
                  <div className="relative">
                    <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={contactForm.userMobile}
                      onChange={(e) => setContactForm({...contactForm, userMobile: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MdMessage className="absolute left-3 top-3 text-gray-400" size={20} />
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Enter your message or enquiry about this product..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 flex items-center"
                  >
                    {submitting ? 'Sending...' : 'Send Enquiry'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <MdCheckCircle className="w-12 h-12 text-green-500" />
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Thank You!
              </h3>
              <p className="text-lg text-gray-600 mb-2">
                Thank you for contacting us.
              </p>
              <p className="text-base text-gray-500 mb-8">
                We will reach out to you soon with more details about this product.
              </p>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Enquiry Details:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Product:</strong> {contactForm.productName}</p>
                  <p><strong>Name:</strong> {contactForm.userName}</p>
                  <p><strong>Email:</strong> {contactForm.userEmail}</p>
                  <p><strong>Mobile:</strong> {contactForm.userMobile}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    router.push('/');
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Go to Home
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
              >
                <MdClose size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && allImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-10"
            >
              <MdArrowBack size={20} className="text-gray-600" />
            </button>
            <img
              src={allImages[selectedImage]}
              alt={productDetail.productTitle}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    
    const productId = params?.id as string;
    
    if (!ObjectId.isValid(productId)) {
      return { props: { product: null, productDetail: null } };
    }

    // Fetch product
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
    
    // Fetch product detail
    const productDetail = await db.collection('productDetails').findOne({ productId });

    return {
      props: {
        product: product ? JSON.parse(JSON.stringify(product)) : null,
        productDetail: productDetail ? JSON.parse(JSON.stringify(productDetail)) : null,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { props: { product: null, productDetail: null } };
  }
};

export default ProductDetailPage;


///////////////////////////////////////////////////////////////////////



<!-- FeatureCards.tsx -->

import React, { useState } from 'react';
import Image from 'next/image';

export default function FeatureCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsData = [
    {
      bgColor: "bg-purple-400",
      imageBg: "bg-purple-300",
      image: "/team-collaboration.png",
      imageAlt: "Team collaboration",
      badgeBg: "bg-white",
      badgeText: "text-gray-800",
      badgeLabel: "Empower every team member",
      textColor: "text-white",
      description: "With Jitter, everyone can contribute to motion projects, allowing your team to deliver even more creative work, faster."
    },
    {
      bgColor: "bg-gray-100",
      imageBg: "bg-white",
      image: "/assets-management.png",
      imageAlt: "Asset management interface",
      badgeBg: "bg-gray-900",
      badgeText: "text-white",
      badgeLabel: "One home for all your assets",
      textColor: "text-gray-700",
      description: "Your projects and assets are centralized in one shared workspace, keeping your team organized and always up to date."
    },
    {
      bgColor: "bg-blue-100",
      imageBg: "bg-white",
      image: "/review-process.png",
      imageAlt: "Review process interface",
      badgeBg: "bg-gray-900",
      badgeText: "text-white",
      badgeLabel: "Speed up approvals",
      textColor: "text-gray-700",
      description: "Share your file with a link and gather feedback to speed up reviews, secure sign-off, and keep projects moving forward."
    },
    {
      bgColor: "bg-purple-100",
      imageBg: "bg-white",
      image: "/team-collaboration.png",
      imageAlt: "Team collaboration tools",
      badgeBg: "bg-purple-700",
      badgeText: "text-white",
      badgeLabel: "Streamlined workflows",
      textColor: "text-gray-700",
      description: "It's time for a better workflow. With Jitter, you can slide through the entire motion design process with your team, in one shared workspace."
    },
    {
      bgColor: "bg-green-100",
      imageBg: "bg-white",
      image: "/advanced-analytics.png",
      imageAlt: "Analytics dashboard",
      badgeBg: "bg-green-700",
      badgeText: "text-white",
      badgeLabel: "Powerful insights",
      textColor: "text-gray-700",
      description: "Get valuable metrics and analytics about your projects to optimize processes and improve team performance."
    }
  ];

  // Calculate maximum index based on the number of cards
  const maxIndex = cardsData.length - 1;
  
  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  // Calculate visible cards: current card and next two
  const visibleCardCount = 3; // Number of visible cards on desktop
  const getVisibleCards = () => {
    let cards = [];
    for (let i = 0; i < visibleCardCount; i++) {
      const index = (currentIndex + i) % cardsData.length;
      cards.push(cardsData[index]);
    }
    return cards;
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Smart Solutions for Modern Security
        </h2>
        
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
            aria-label="Next"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          {/* Cards container with horizontal layout and smooth scroll */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCardCount)}%)` }}
            >
              {/* Render all cards in a loop with proper sizing */}
              {cardsData.map((card, index) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4 transition-all duration-300 ${
                    index >= currentIndex && index < currentIndex + visibleCardCount ? 'opacity-100' : 'opacity-100'
                  }`}
                >
                  <div className={`${card.bgColor} rounded-3xl p-8 h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl group`}>
                    <div className={`${card.imageBg} rounded-2xl p-4 mb-6 inline-block transition-transform duration-300 group-hover:scale-105`}>
                      <div className="h-56 w-full flex items-center justify-center overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.imageAlt}
                          width={400}
                          height={300}
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    
                    <div className={`inline-block ${card.badgeBg} ${card.badgeText} font-semibold text-sm py-1 px-4 rounded-full mb-4 transition-all duration-300 group-hover:shadow-md`}>
                      {card.badgeLabel}
                    </div>
                    
                    <p className={`${card.textColor} text-lg mb-6 transition-opacity duration-300`}>
                      {card.description}
                    </p>

                    <div className="absolute bottom-8 right-8 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button className="rounded-full bg-white/20 backdrop-blur-sm p-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pagination indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {cardsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




<!-- FeatureGrid.tsx -->



import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function FeatureGrid() {
  // Track which items are visible for animations
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Feature grid data
  const gridItems = [
    {
      title: "Text animations",
      description: "Create advanced text effects that elevate your content and make it stand out.",
      image: "/winning-card.png",
      bgColor: "bg-orange-500",
      textColor: "text-white",
      category: "NEW"
    },
    {
      title: "Powerful effects",
      description: "Add beautiful gradients, overlays, shadows, and more to create stunning visual effects.",
      image: "/air-shop.png",
      bgColor: "bg-black",
      textColor: "text-white",
      category: "PRO"
    },
    {
      title: "Custom settings",
      description: "Fine-tune animation settings to match your brand's unique personality and style.",
      image: "/settings-ui.png",
      bgColor: "bg-blue-500",
      textColor: "text-white",
      category: "DESIGN"
    },
    {
      title: "Video & Audio",
      description: "Import audio and video content to create rich, interactive multimedia experiences.",
      image: "/audio-visual.png",
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      category: "PRO"
    }
  ];

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
          } else {
            setVisibleItems(prev => {
              const updated = new Set([...prev]);
              updated.delete(index);
              return updated;
            });
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    // Observe all grid items
    const items = document.querySelectorAll('.grid-item');
    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-800">
          Create stunning animations <span className="text-blue-600">for any project</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {gridItems.map((item, index) => (
            <div 
              key={index}
              data-index={index}
              className={`grid-item relative overflow-hidden rounded-2xl group transition-all duration-700 transform ${
                visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`${item.bgColor} p-8 h-full flex flex-col transition-all duration-500 group-hover:scale-[0.98]`}>
                {/* Category tag */}
                <span className="inline-block text-xs font-semibold tracking-wider mb-4 opacity-80">
                  {item.category}
                </span>
                
                {/* Content area */}
                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <h3 className={`text-xl font-bold mb-2 ${item.textColor}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm opacity-80 ${item.textColor}`}>
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Image container with Next.js Image */}
                  <div className="mt-auto mb-4 bg-gray-100 rounded-xl p-4 overflow-hidden group-hover:shadow-lg transition-all duration-500">
                    <div className="transform transition-transform duration-700 group-hover:scale-105 relative w-full aspect-video">
                      <Image 
                        src={item.image}
                        alt={item.title}
                        width={500}
                        height={300}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover rounded-lg"
                        loading="lazy" // Add for below-fold images
                        placeholder="blur" // Add placeholder for better perceived performance
                        blurDataURL="data:image/svg+xml;base64,..." // Generate a tiny placeholder
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




<!-- MarketingUseCases.tsx -->




import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function MarketingUseCases() {
  const [activeCategory, setActiveCategory] = useState('social');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionHeight, setSectionHeight] = useState('250vh'); // Default fallback height
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Categories data
  const categories = [
    { id: 'social', name: 'Social media', 
      description: 'Post your videos online and reach the masses with engaging social content designed to drive more engagement.', 
      image: '/market/img2.jpg' },
    { id: 'advertising', name: 'Advertising', 
      description: 'Create stunning ads that grab attention and convert customers with professional video animations.', 
      image: '/market/img1.jpg' },
    { id: 'photography', name: 'Photography', 
      description: 'Bring your still images to life with subtle movements and transitions that create visual interest.', 
      image: '/market/img3.jpg' },
  ];

  // Handle window-based calculations safely
  useEffect(() => {
    // This runs only in the browser, after the component mounts
    if (typeof window !== 'undefined') {
      setSectionHeight(`${window.innerHeight * 2.5}px`);
      
      // Optional: Update height on window resize
      const handleResize = () => {
        setSectionHeight(`${window.innerHeight * 2.5}px`);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Find current active category data
  const activeData = categories.find(cat => cat.id === activeCategory) || categories[0];

  // Handle intersection observer for initial visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle scroll-driven category changes
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isVisible) return;

      // Get the section's position and dimensions
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Adjusted calculation for better category triggering
      // Make sure we can reach the end (progress = 1.0)
      const startPoint = viewportHeight * 0.7; // Start when section is higher in the viewport
      const endPoint = -viewportHeight * 0.3; // End point further down to ensure we reach the end
      const totalScrollDistance = sectionHeight - (endPoint - startPoint);
      
      // Calculate normalized scroll progress (0 to 1)
      let progress = (startPoint - sectionTop) / totalScrollDistance;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
      
      // Map scroll progress to categories with slightly adjusted thresholds
      // Photography gets triggered earlier
      if (progress < 0.3) {
        setActiveCategory('social');
      } else if (progress < 0.6) {
        setActiveCategory('advertising');
      } else {
        setActiveCategory('photography');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, categories]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gray-50"
      // Use the state variable instead of directly accessing window
      style={{ height: sectionHeight }}
    >
      {/* Sticky container that stays in view during scrolling */}
      <div 
        ref={contentRef}
        className="sticky top-0 left-0 w-full h-screen flex items-center"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Header with badge */}
            <div className="mb-4">
              <span className="inline-block bg-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                FOR YOU
              </span>
            </div>
            
            {/* Main heading and description */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div className="max-w-2xl mb-6 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Animate for social media, ads, marketing, brand, product, and more
                </h2>
                <p className="text-gray-600">
                  The best brands use motion across all platforms to capture attention, tell powerful stories, and drive more engagement.
                </p>
              </div>
              
              <button className="px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-full transition-colors duration-300 text-sm font-medium">
                Request demo access
              </button>
            </div>
            
            {/* Content area with categories and preview */}
            <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Left side: Categories */}
              <div className="md:col-span-2">
                <div className="space-y-2">
                  {categories.map((category, idx) => {
                    // Simplified active state checking using the activeCategory state
                    const isActive = category.id === activeCategory;
                    
                    return (
                      <div key={category.id} className="mb-6">
                        <button
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                          }`}
                        >
                          <h3 className={`text-base ${
                            isActive ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {category.name}
                          </h3>
                        </button>
                        
                        {isActive && (
                          <div className="px-4 py-2 text-sm text-gray-600 animate-fadeIn">
                            <p>{category.description}</p>
                            <div className="mt-3 h-0.5 w-24 bg-gray-200"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Scroll progress indicator with debug values */}
                  <div className="mt-6">
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-200"
                        style={{ width: `${scrollProgress * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Social</span>
                      <span>Advertising</span>
                      <span>Photography</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side: Preview */}
              <div className="md:col-span-3 bg-gray-50 rounded-xl overflow-hidden relative">
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  {categories.map((category, index) => (
                    <div 
                      key={category.id}
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                        category.id === activeCategory ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <div className="relative">
                        <Image 
                          src={category.image}
                          alt={category.name}
                          width={500}
                          height={400}
                          className="rounded-lg shadow-md"
                          loading={index === 0 ? "eager" : "lazy"} // Only load first image eagerly
                          placeholder="blur" 
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/wAARCABAAFADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAQFAgMG/8QAHRABAQADAQEBAQEAAAAAAAAAAAECAxExEiFRYf/aAAwDAQACEQMRAD8A/SAQAM5GOe0r2Y7a6DNm+BSbjzurVlR9taZGoAACxy9idv71VdmVtQrzfTphhcpxl38ejsYdt1F9eiWT0xllcbzTjYvLJO0+LayYyej9mXrIOOfJjZ/R68nPlXZJ+vCYySS/j0O7K2SxK0W7Vz8c+66xmg4AAAAAAADLOya2tORjncpqja82PSYpOjZI1FGefsvYn7d/pV0s+0K866duNm4l6LncyErT4zrnn6pZZFdXorO0zuxu9mlcsusi7HQAAAAAAAxy81UK1VE66k6uAADmvH49AAAAf//Z"
                          sizes="(max-width: 768px) 100vw, 500px" // Responsive sizing
                        />
                        
                        {/* UI Elements overlay */}
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow-sm">
                          @spottive_official
                        </div>
                        
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {categories.map((_, i) => (
                            <div 
                              key={i} 
                              className={`h-1.5 w-1.5 rounded-full ${
                                categories[i].id === activeCategory 
                                  ? 'bg-white' 
                                  : 'bg-white/50'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
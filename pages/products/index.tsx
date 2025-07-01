import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MdVideocam, 
  MdSecurity, 
  MdShield, 
  MdCloud,
  MdArrowForward,
  MdStar,
  MdVerified,
  MdTrendingUp,
  MdFlashOn
} from 'react-icons/md';

export default function ProductsIndex() {
  const products = [
    {
      slug: 'surveillance',
      title: 'AI-Powered Surveillance',
      description: 'Next-generation CCTV systems with artificial intelligence and smart analytics.',
      price: 'Starting at $2,999',
      image: '/products/surveillance-card.webp',
      icon: MdVideocam,
      color: 'blue',
      badge: 'Best Seller',
      features: ['4K/8K Resolution', 'AI Detection', 'Night Vision', 'Cloud Storage']
    },
    {
      slug: 'commercial',
      title: 'Enterprise Security',
      description: 'Complete commercial security solutions for businesses and organizations.',
      price: 'Starting at $4,999',
      image: '/products/commercial-card.webp',
      icon: MdSecurity,
      color: 'purple',
      badge: 'Enterprise Choice',
      features: ['Multi-Site Control', 'Access Control', 'Real-time Alerts', '24/7 Monitoring']
    },
    {
      slug: 'residential',
      title: 'Smart Home Security',
      description: 'Advanced residential security with smart home integration.',
      price: 'Starting at $799',
      image: '/products/residential-card.webp',
      icon: MdShield,
      color: 'emerald',
      badge: 'Most Popular',
      features: ['Wireless Setup', 'Smart Integration', 'Mobile Alerts', 'Easy Install']
    },
    {
      slug: 'cloud',
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud-based security platform with unlimited storage.',
      price: 'Starting at $99/month',
      image: '/products/cloud-card.webp',
      icon: MdCloud,
      color: 'orange',
      badge: 'Future Ready',
      features: ['Edge Computing', 'Auto Backup', 'Global Access', '99.99% Uptime']
    }
  ];

  return (
    <>
      <Head>
        <title>Security Products | Spottive Security Solutions</title>
        <meta name="description" content="Explore our comprehensive range of security products including AI-powered surveillance, enterprise security, smart home systems, and cloud infrastructure." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Security Products
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Discover our comprehensive range of cutting-edge security solutions designed to protect what matters most.
              </p>
              
              {/* Trust indicators */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <MdVerified className="text-white mx-auto mb-3" size={32} />
                  <div className="text-white font-semibold">Certified Quality</div>
                  <div className="text-white/80 text-sm">Industry Standards</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <MdStar className="text-white mx-auto mb-3" size={32} />
                  <div className="text-white font-semibold">5-Star Rated</div>
                  <div className="text-white/80 text-sm">Customer Reviews</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <MdSecurity className="text-white mx-auto mb-3" size={32} />
                  <div className="text-white font-semibold">Secure & Reliable</div>
                  <div className="text-white/80 text-sm">Proven Technology</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {products.map((product, index) => (
                <Link key={index} href={`/products/${product.slug}`}>
                  <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 group hover:scale-105 cursor-pointer">
                    
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={600}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-3 py-1.5 bg-${product.color}-500 text-white text-xs font-bold rounded-full shadow-lg`}>
                          <product.icon className="mr-1.5" size={12} />
                          {product.badge}
                        </span>
                      </div>
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full shadow-lg">
                          <MdTrendingUp className="mr-1.5 text-green-500" size={12} />
                          {product.price}
                        </span>
                      </div>
                      
                      {/* Hover Arrow */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <MdArrowForward className="text-gray-800" size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {product.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 bg-${product.color}-500 rounded-full`}></div>
                            <span className="text-sm text-gray-600 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm font-semibold text-gray-500">View Details</span>
                        <div className="transform transition-transform duration-300 group-hover:translate-x-2">
                          <MdArrowForward className={`text-${product.color}-500`} size={20} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-1 bg-gray-100">
                      <div className={`h-full bg-gradient-to-r from-${product.color}-500 to-${product.color}-600 transition-all duration-500 group-hover:w-full w-0`}></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our security experts are here to help you find the perfect solution for your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact/sales">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 hover:scale-105 transition-all duration-300">
                  Contact Sales Expert
                </button>
              </Link>
              <Link href="/contact/general">
                <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  Ask Questions
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "10K+", label: "Happy Customers", icon: MdStar, color: "yellow" },
                { number: "500+", label: "Projects Completed", icon: MdVerified, color: "green" },
                { number: "24/7", label: "Support Available", icon: MdSecurity, color: "blue" },
                { number: "99.9%", label: "System Uptime", icon: MdTrendingUp, color: "purple" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
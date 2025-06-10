/** @type {import('next-sitemap').IConfig} */
module.exports = {
 siteUrl: process.env.SITE_URL || 'https://spottivce-new.vercel.app',
  generateRobotsTxt: true, // (optional)
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://yourwebsite.com/sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/api/*'],
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority based on page type
    let priority = 0.7;
    let changefreq = 'daily';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/product/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/brand/')) {
      priority = 0.6;
      changefreq = 'weekly';
    } else if (path === '/product') {
      priority = 0.9;
      changefreq = 'daily';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    const result = [];

    // Add dynamic product pages
    try {
      // You can fetch your products from your API or database
      // For now, I'll show the structure
      const products = await fetchProducts(); // You'll need to implement this
      
      products.forEach((product) => {
        result.push({
          loc: `/product/${product._id}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        });
      });

      // Add brand pages
      const brands = ['hikvision', 'dahua', 'axis', 'uniview']; // Add your brands
      brands.forEach((brand) => {
        result.push({
          loc: `/brand/${brand}`,
          changefreq: 'weekly',
          priority: 0.6,
          lastmod: new Date().toISOString(),
        });
      });

    } catch (error) {
      console.log('Error generating additional paths:', error);
    }

    return result;
  },
};

// Helper function to fetch products (implement based on your setup)
async function fetchProducts() {
  try {
    // If you're running this during build, you might need to use a different approach
    // This is just an example structure
    return [
      { _id: '1', name: 'Product 1' },
      { _id: '2', name: 'Product 2' },
      // ... more products
    ];
  } catch (error) {
    console.log('Error fetching products for sitemap:', error);
    return [];
  }
}
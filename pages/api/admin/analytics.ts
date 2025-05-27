import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const { range = '7d' } = req.query;
    
    // Determine date range
    const endDate = new Date();
    let startDate = new Date();
    let previousStartDate = new Date();
    let timeLabels: string[] = [];
    
    switch (range) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        previousStartDate.setDate(startDate.getDate() - 7);
        timeLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        previousStartDate.setDate(startDate.getDate() - 30);
        // Generate last 30 days as labels
        for (let i = 29; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          timeLabels.push(date.getDate().toString());
        }
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        previousStartDate.setDate(startDate.getDate() - 90);
        // Use weeks as labels for 90 days
        for (let i = 0; i < 13; i++) {
          timeLabels.push(`W${i+1}`);
        }
        break;
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        previousStartDate.setFullYear(startDate.getFullYear() - 1);
        // Use months as labels for 1 year
        for (let i = 0; i < 12; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() - 11 + i);
          timeLabels.push(date.toLocaleString('default', { month: 'short' }));
        }
        break;
    }
    
    // Fetch page views (from site analytics or visitor logs)
    // For demo, we'll generate synthetic data
    // In production, you'd connect to your actual analytics data source
    
    // Aggregate visitors and page views from the database
    const visitors = await db.collection('siteVisitors').find({
      timestamp: { $gte: startDate, $lte: endDate }
    }).toArray();
    
    const previousVisitors = await db.collection('siteVisitors').find({
      timestamp: { $gte: previousStartDate, $lt: startDate }
    }).toArray();
    
    // Get unique visitors by IP
    const uniqueVisitorIps = new Set(visitors.map(v => v.ip));
    const previousUniqueVisitorIps = new Set(previousVisitors.map(v => v.ip));
    
    const uniqueVisitors = uniqueVisitorIps.size;
    const previousUniqueVisitors = previousUniqueVisitorIps.size;
    
    const visitorChange = previousUniqueVisitors > 0 
      ? ((uniqueVisitors - previousUniqueVisitors) / previousUniqueVisitors) * 100 
      : 0;

    // Calculate page views
    const totalPageViews = visitors.reduce((sum, v) => sum + (v.pageViews || 1), 0);
    const previousPageViews = previousVisitors.reduce((sum, v) => sum + (v.pageViews || 1), 0);
    
    const pageViewChange = previousPageViews > 0 
      ? ((totalPageViews - previousPageViews) / previousPageViews) * 100 
      : 0;
    
    // Generate time series data for visitors and page views
    const visitorData: number[] = [];
    const pageViewData: number[] = [];
    
    if (range === '7d') {
      // Group by day of week
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dayVisitors = visitors.filter(v => {
          const visitorDate = new Date(v.timestamp);
          return visitorDate.getDay() === date.getDay();
        });
        
        visitorData.push(new Set(dayVisitors.map(v => v.ip)).size);
        pageViewData.push(dayVisitors.reduce((sum, v) => sum + (v.pageViews || 1), 0));
      }
    } else if (range === '30d') {
      // Group by day
      for (let i = 0; i < 30; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dayVisitors = visitors.filter(v => {
          const visitorDate = new Date(v.timestamp);
          return visitorDate.getDate() === date.getDate() && 
                 visitorDate.getMonth() === date.getMonth();
        });
        
        visitorData.push(new Set(dayVisitors.map(v => v.ip)).size);
        pageViewData.push(dayVisitors.reduce((sum, v) => sum + (v.pageViews || 1), 0));
      }
    } else if (range === '90d') {
      // Group by week
      for (let i = 0; i < 13; i++) {
        const weekStart = new Date(startDate);
        weekStart.setDate(weekStart.getDate() + (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        const weekVisitors = visitors.filter(v => {
          const visitorDate = new Date(v.timestamp);
          return visitorDate >= weekStart && visitorDate <= weekEnd;
        });
        
        visitorData.push(new Set(weekVisitors.map(v => v.ip)).size);
        pageViewData.push(weekVisitors.reduce((sum, v) => sum + (v.pageViews || 1), 0));
      }
    } else if (range === '1y') {
      // Group by month
      for (let i = 0; i < 12; i++) {
        const monthStart = new Date(startDate);
        monthStart.setMonth(monthStart.getMonth() + i);
        const monthEnd = new Date(monthStart);
        monthEnd.setMonth(monthEnd.getMonth() + 1);
        
        const monthVisitors = visitors.filter(v => {
          const visitorDate = new Date(v.timestamp);
          return visitorDate >= monthStart && visitorDate < monthEnd;
        });
        
        visitorData.push(new Set(monthVisitors.map(v => v.ip)).size);
        pageViewData.push(monthVisitors.reduce((sum, v) => sum + (v.pageViews || 1), 0));
      }
    }
    
    // Get engagement metrics
    const totalSessions = visitors.length;
    const engagedSessions = visitors.filter(v => (v.timeOnSite || 0) > 60 || (v.pageViews || 1) > 2).length;
    
    const engagementRate = totalSessions > 0 ? (engagedSessions / totalSessions) * 100 : 0;
    
    const previousTotalSessions = previousVisitors.length;
    const previousEngagedSessions = previousVisitors.filter(v => (v.timeOnSite || 0) > 60 || (v.pageViews || 1) > 2).length;
    
    const previousEngagementRate = previousTotalSessions > 0 ? (previousEngagedSessions / previousTotalSessions) * 100 : 0;
    
    const engagementChange = previousEngagementRate > 0 
      ? ((engagementRate - previousEngagementRate) / previousEngagementRate) * 100 
      : 0;
    
    // Get bounce rate metrics
    const bouncedSessions = visitors.filter(v => (v.pageViews || 0) <= 1 && (v.timeOnSite || 0) < 30).length;
    const bounceRate = totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0;
    
    const previousBouncedSessions = previousVisitors.filter(v => (v.pageViews || 0) <= 1 && (v.timeOnSite || 0) < 30).length;
    const previousBounceRate = previousTotalSessions > 0 ? (previousBouncedSessions / previousTotalSessions) * 100 : 0;
    
    const bounceRateChange = previousBounceRate > 0 
      ? ((bounceRate - previousBounceRate) / previousBounceRate) * 100 
      : 0;
    
    // Get device and browser distribution
    const deviceCounts = {
      desktop: visitors.filter(v => v.device === 'desktop').length,
      mobile: visitors.filter(v => v.device === 'mobile').length,
      tablet: visitors.filter(v => v.device === 'tablet').length
    };
    
    const totalDevices = deviceCounts.desktop + deviceCounts.mobile + deviceCounts.tablet || 1;
    
    const devices = {
      desktop: Math.round((deviceCounts.desktop / totalDevices) * 100),
      mobile: Math.round((deviceCounts.mobile / totalDevices) * 100),
      tablet: Math.round((deviceCounts.tablet / totalDevices) * 100)
    };
    
    const browserCounts = {
      chrome: visitors.filter(v => v.browser?.toLowerCase().includes('chrome')).length,
      firefox: visitors.filter(v => v.browser?.toLowerCase().includes('firefox')).length,
      safari: visitors.filter(v => v.browser?.toLowerCase().includes('safari')).length,
      edge: visitors.filter(v => v.browser?.toLowerCase().includes('edge')).length,
      other: visitors.filter(v => !v.browser?.toLowerCase().includes('chrome') && 
                                 !v.browser?.toLowerCase().includes('firefox') && 
                                 !v.browser?.toLowerCase().includes('safari') && 
                                 !v.browser?.toLowerCase().includes('edge')).length
    };
    
    const totalBrowsers = Object.values(browserCounts).reduce((sum, count) => sum + count, 0) || 1;
    
    const browsers = {
      chrome: Math.round((browserCounts.chrome / totalBrowsers) * 100),
      firefox: Math.round((browserCounts.firefox / totalBrowsers) * 100),
      safari: Math.round((browserCounts.safari / totalBrowsers) * 100),
      edge: Math.round((browserCounts.edge / totalBrowsers) * 100),
      other: Math.round((browserCounts.other / totalBrowsers) * 100)
    };
    
    // Get contact submissions data
    const contactSubmissions = await db.collection('contactSubmissions').find({}).toArray();
    
    // Get monthly contact data
    const contactMonthlyData = Array(12).fill(0);
    
    contactSubmissions.forEach(contact => {
      const date = new Date(contact.createdAt);
      if (date.getFullYear() === new Date().getFullYear()) {
        contactMonthlyData[date.getMonth()]++;
      }
    });
    
    // Get product enquiries data
    const productEnquiries = await db.collection('productEnquiries').find({}).toArray();
    
    // Get monthly product enquiry data
    const enquiryMonthlyData = Array(12).fill(0);
    
    productEnquiries.forEach(enquiry => {
      const date = new Date(enquiry.createdAt);
      if (date.getFullYear() === new Date().getFullYear()) {
        enquiryMonthlyData[date.getMonth()]++;
      }
    });
    
    // Get newsletter subscribers data
    const newsletterSubscribers = await db.collection('newsletterSubscribers').find({}).toArray();
    
    // Get monthly subscriber data
    const subscriberMonthlyData = Array(12).fill(0);
    
    newsletterSubscribers.forEach(subscriber => {
      const date = new Date(subscriber.createdAt);
      if (date.getFullYear() === new Date().getFullYear()) {
        subscriberMonthlyData[date.getMonth()]++;
      }
    });
    
    // Calculate subscriber growth
    const thisMonth = new Date().getMonth();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    
    const thisMonthSubscribers = subscriberMonthlyData[thisMonth];
    const lastMonthSubscribers = subscriberMonthlyData[lastMonth];
    
    const subscriberGrowth = lastMonthSubscribers > 0 
      ? ((thisMonthSubscribers - lastMonthSubscribers) / lastMonthSubscribers) * 100 
      : 0;
    
    // Get top products by views
    const productViews = await db.collection('productViews').aggregate([
      { $group: { _id: '$productId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]).toArray();
    
    // Get product names and enquiries
    const topProducts = [];
    
    for (const view of productViews) {
      const product = await db.collection('products').findOne({ _id: new ObjectId(view._id) });
      
      if (product) {
        const enquiryCount = await db.collection('productEnquiries').countDocuments({
          productId: view._id
        });
        
        topProducts.push({
          name: product.name,
          views: view.count,
          enquiries: enquiryCount
        });
      }
    }
    
    // Get top pages by views
    const pageViews = await db.collection('pageViews').aggregate([
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]).toArray();
    
    const topPages = pageViews.map(view => ({
      path: view._id,
      title: getTitleFromPath(view._id),
      views: view.count
    }));
    
    // Get geographic data
    const geoData = await db.collection('siteVisitors').aggregate([
      { $group: { _id: '$country', visitors: { $sum: 1 } } },
      { $sort: { visitors: -1 } },
      { $limit: 8 }
    ]).toArray();
    
    const geographicData = geoData.map(item => ({
      country: item._id || 'Unknown',
      visitors: item.visitors
    }));
    
    // Calculate conversion rate
    const totalEnquiries = productEnquiries.length;
    const conversionRate = uniqueVisitors > 0 ? (totalEnquiries / uniqueVisitors) * 100 : 0;
    
    const previousTotalEnquiries = await db.collection('productEnquiries').countDocuments({
      createdAt: { $gte: previousStartDate, $lt: startDate }
    });
    
    const previousConversionRate = previousUniqueVisitors > 0 
      ? (previousTotalEnquiries / previousUniqueVisitors) * 100 
      : 0;
    
    const conversionChange = previousConversionRate > 0 
      ? ((conversionRate - previousConversionRate) / previousConversionRate) * 100 
      : 0;
    
    // Return all analytics data
    res.status(200).json({
      pageViews: {
        total: totalPageViews,
        change: pageViewChange,
        data: pageViewData,
        labels: timeLabels
      },
      visitors: {
        total: uniqueVisitors,
        change: visitorChange,
        data: visitorData,
        labels: timeLabels
      },
      engagementRate: {
        value: engagementRate,
        change: engagementChange
      },
      bounceRate: {
        value: bounceRate,
        change: bounceRateChange
      },
      devices,
      browsers,
      contactSubmissions: {
        total: contactSubmissions.length,
        new: contactSubmissions.filter(c => c.status === 'New').length,
        inProgress: contactSubmissions.filter(c => c.status === 'In Progress').length,
        resolved: contactSubmissions.filter(c => c.status === 'Resolved').length,
        monthlyData: contactMonthlyData
      },
      productEnquiries: {
        total: productEnquiries.length,
        pending: productEnquiries.filter(e => e.status === 'Pending').length,
        contacted: productEnquiries.filter(e => e.status === 'Contacted').length,
        resolved: productEnquiries.filter(e => e.status === 'Resolved').length,
        monthlyData: enquiryMonthlyData
      },
      newsletterSubscribers: {
        total: newsletterSubscribers.length,
        growth: subscriberGrowth,
        monthlyData: subscriberMonthlyData
      },
      topProducts,
      topPages,
      geoData: geographicData,
      conversionRate: {
        value: conversionRate,
        change: conversionChange
      },
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics data', error: String(error) });
  }
}

// Helper function to get page title from path
function getTitleFromPath(path: string): string {
  const pathMap: {[key: string]: string} = {
    '/': 'Home Page',
    '/product': 'Products Listing',
    '/product/security-cameras': 'Security Cameras',
    '/who-we-are': 'About Us',
    '/contact': 'Contact Us',
    '/blog': 'Blog'
  };
  
  return pathMap[path] || path;
}
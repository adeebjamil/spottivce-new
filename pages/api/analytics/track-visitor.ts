import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      ip,
      userAgent,
      device,
      browser,
      referrer,
      path,
      query
    } = req.body;

    const client = await clientPromise;
    const db = client.db('spottive');
    
    // Add to siteVisitors collection
    await db.collection('siteVisitors').insertOne({
      ip,
      userAgent,
      device,
      browser,
      country: 'Unknown',
      city: 'Unknown',
      referrer: referrer || 'direct',
      pageViews: 1,
      timeOnSite: 0,
      timestamp: new Date(),
      path,
      query
    });
    
    // Also add to pageViews collection
    await db.collection('pageViews').insertOne({
      path,
      timestamp: new Date()
    });
    
    // For product pages, track product views
    if (path.startsWith('/product/') && path.length > 9) {
      const productSlug = path.slice(9);
      
      // Find product by slug
      const product = await db.collection('products').findOne({ slug: productSlug });
      
      if (product) {
        await db.collection('productViews').insertOne({
          productId: product._id.toString(),
          timestamp: new Date()
        });
      }
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ success: false, error: String(error) });
  }
}
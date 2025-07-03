import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { protectDirectApiAccess } from '../../../../lib/apiAccessMiddleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const { id } = req.query;

    if (!ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Find product detail by productId (not by _id)
    const productDetail = await db.collection('productDetails').findOne({ 
      productId: id as string 
    });
    
    if (!productDetail) {
      return res.status(404).json({ error: 'Product detail not found' });
    }
    
    // Return ONLY the necessary data for public viewing
    // REDUCED data set - only what's needed for display
    const publicProductDetail = {
      productTitle: productDetail.productTitle,
      productDescription: productDetail.productDescription,
      features: productDetail.features,
      specifications: productDetail.specifications,
      featureImages: productDetail.featureImages,
      // Remove ALL SEO data from public view
    };
    
    res.status(200).json(publicProductDetail);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Strengthen direct API access protection
export default function combinedMiddleware(req: NextApiRequest, res: NextApiResponse) {
  // Only allow requests with a valid referrer from our app
  const referer = req.headers.referer || '';
  const validDomains = [
    'localhost:3000',
    'spottive.com', 
    'www.spottive.com',
    'spottivce-new.vercel.app'
  ];
  const hasValidReferer = validDomains.some(domain => referer.includes(domain));
  
  // If accessing directly without a valid referer, block access
  if (!hasValidReferer && req.headers['x-app-client'] !== 'spottive-frontend') {
    return res.status(403).json({
      error: 'Access Denied',
      message: 'This API endpoint is restricted to application use only.'
    });
  }
  
  return protectDirectApiAccess(handler)(req, res);
}
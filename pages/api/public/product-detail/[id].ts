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
    
    // Return only the necessary data for public viewing
    // Exclude any sensitive or admin-only information
    const publicProductDetail = {
      productTitle: productDetail.productTitle,
      productDescription: productDetail.productDescription,
      features: productDetail.features,
      specifications: productDetail.specifications,
      featureImages: productDetail.featureImages,
      seo: {
        autoTitle: productDetail.seo.autoTitle,
        autoDescription: productDetail.seo.autoDescription
      }
    };
    
    res.status(200).json(publicProductDetail);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Only protect against direct API access, but don't require admin auth
export default function combinedMiddleware(req: NextApiRequest, res: NextApiResponse) {
  return protectDirectApiAccess(handler)(req, res);
}
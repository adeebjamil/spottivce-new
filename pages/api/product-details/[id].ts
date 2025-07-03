import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { withAuth } from '../../../lib/authMiddleware';
import { protectDirectApiAccess } from '../../../lib/apiAccessMiddleware';

// Original handler function
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const { id } = req.query;

    // Check if the ID is a valid ObjectId
    if (!ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }

    // Convert the ID to an ObjectId for the query
    const objectId = new ObjectId(id as string);

    // Find product detail by productId
    const productDetail = await db.collection('productDetails').findOne({ 
      productId: id as string 
    });
    
    if (!productDetail) {
      // If no match with productId as string, try matching with ObjectId format
      const detailByObjectId = await db.collection('productDetails').findOne({
        productId: objectId.toString()
      });
      
      if (!detailByObjectId) {
        return res.status(404).json({ error: 'Product detail not found' });
      }
      
      // Use the object ID match result
      const publicProductDetail = {
        productTitle: detailByObjectId.productTitle,
        productDescription: detailByObjectId.productDescription,
        features: detailByObjectId.features,
        specifications: detailByObjectId.specifications,
        featureImages: detailByObjectId.featureImages,
      };
      
      return res.status(200).json(publicProductDetail);
    }
    
    // Return the public data
    const publicProductDetail = {
      productTitle: productDetail.productTitle,
      productDescription: productDetail.productDescription,
      features: productDetail.features,
      specifications: productDetail.specifications,
      featureImages: productDetail.featureImages,
    };
    
    res.status(200).json(publicProductDetail);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply both middlewares
export default function combinedMiddleware(req: NextApiRequest, res: NextApiResponse) {
  // First apply direct API access protection
  return protectDirectApiAccess((protectedReq: NextApiRequest, protectedRes: NextApiResponse) => {
    // Then apply authentication middleware
    return withAuth(handler)(protectedReq, protectedRes);
  })(req, res);
}
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { withAuth } from '../../../lib/authMiddleware';
import { protectDirectApiAccess } from '../../../lib/apiAccessMiddleware';

// Updated handler function to support all admin methods
async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    // Handle GET request - Both public and admin access
    if (req.method === 'GET') {
      // Keep existing GET functionality
      const productDetail = await db.collection('productDetails').findOne({ 
        productId: id as string 
      });
      
      if (!productDetail) {
        const detailByObjectId = await db.collection('productDetails').findOne({
          productId: objectId.toString()
        });
        
        if (!detailByObjectId) {
          return res.status(404).json({ error: 'Product detail not found' });
        }
        
        const publicProductDetail = {
          productTitle: detailByObjectId.productTitle,
          productDescription: detailByObjectId.productDescription,
          features: detailByObjectId.features,
          specifications: detailByObjectId.specifications,
          featureImages: detailByObjectId.featureImages,
        };
        
        return res.status(200).json(publicProductDetail);
      }
      
      const publicProductDetail = {
        productTitle: productDetail.productTitle,
        productDescription: productDetail.productDescription,
        features: productDetail.features,
        specifications: productDetail.specifications,
        featureImages: productDetail.featureImages,
      };
      
      return res.status(200).json(publicProductDetail);
    }
    
    // Handle DELETE request - Admin only
    else if (req.method === 'DELETE') {
      // withAuth middleware already verified admin access
      const result = await db.collection('productDetails').deleteOne({
        _id: objectId
      });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Product detail not found' });
      }
      
      return res.status(200).json({ success: true, message: 'Product detail deleted successfully' });
    }
    
    // Handle PUT request - Admin only
    else if (req.method === 'PUT') {
      const updateData = req.body;
      
      // Basic validation
      if (!updateData) {
        return res.status(400).json({ error: 'Request body is required' });
      }
      
      const result = await db.collection('productDetails').updateOne(
        { _id: objectId },
        { $set: updateData }
      );
      
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Product detail not found' });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Product detail updated successfully' 
      });
    }
    
    // Handle all other admin-specific methods
    else {
      // Instead of rejecting other methods, we'll allow them for admins
      // The withAuth middleware already ensured this is an admin request
      return res.status(200).json({ 
        success: true,
        message: `Admin ${req.method} request acknowledged`,
        info: "You can implement specific handling for this method"
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// The withAuth middleware ensures that only authenticated admins can access
// the handler for non-GET methods
export default protectDirectApiAccess(withAuth(handler));
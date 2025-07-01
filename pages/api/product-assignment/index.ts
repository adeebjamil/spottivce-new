import { withAuth } from '../../../lib/authMiddleware';
import  clientPromise  from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    
    if (req.method === 'GET') {
      // Fetch all products for assignment
      const products = await db.collection('products').find({}).toArray();
      
      // Fetch current assignments
      const assignments = await db.collection('productAssignments').find({}).toArray();
      
      res.status(200).json({
        products,
        assignments
      });
    }
    
    if (req.method === 'POST') {
      const { productIds, brandName } = req.body;
      
      if (!productIds || !brandName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Create assignments
      const assignmentData = {
        productIds,
        brandName,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.collection('productAssignments').insertOne(assignmentData);
      res.status(201).json({ success: true, id: result.insertedId });
    }
  } catch (error) {
    console.error('Product assignment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { blockDirectApiAccessMiddleware } from './product-assignments/index';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ids } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Invalid product IDs array' });
    }

    // Validate and convert string IDs to ObjectId
    const objectIds = ids.filter(id => {
      try {
        return ObjectId.isValid(id);
      } catch (e) {
        return false;
      }
    }).map(id => new ObjectId(id));

    const client = await clientPromise;
    const db = client.db('spottive');
    
    const products = await db.collection('products').find({
      _id: { $in: objectIds }
    }).toArray();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by IDs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply the strict protection middleware
export default function protectedHandler(req: NextApiRequest, res: NextApiResponse) {
  return blockDirectApiAccessMiddleware(handler)(req, res);
}
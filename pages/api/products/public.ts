import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

// Public endpoint - NO authentication required
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('products');

    // Return public fields including _id for frontend operations
    const products = await collection.find({}, {
      projection: {
        _id: 1,           // Include _id for frontend operations
        name: 1,
        shortDesc: 1,
        category: 1,
        subCategory: 1,
        image: 1,
        createdAt: 1,     // Include timestamps for sorting if needed
        updatedAt: 1
      }
    }).toArray();

    res.status(200).json(products);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
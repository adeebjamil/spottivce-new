import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { withAuth } from '../../../lib/authMiddleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('products');

    switch (req.method) {
      case 'GET':
        try {
          const products = await collection.find({}).toArray();
          
          // Ensure we always return an array
          if (!products) {
            return res.status(200).json([]);
          }
          
          res.status(200).json(products);
        } catch (dbError) {
          console.error('Database query error:', dbError);
          res.status(500).json({ error: 'Database query failed', products: [] });
        }
        break;

      case 'POST':
        const { name, shortDesc, category, subCategory, image } = req.body;
        
        if (!name || !shortDesc || !category || !subCategory) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProduct = {
          name,
          shortDesc,
          category,
          subCategory,
          image: image || '',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await collection.insertOne(newProduct);
        
        // Log the activity for analytics
        const analyticsDb = db.collection('analytics');
        await analyticsDb.insertOne({
          action: 'product_created',
          productId: result.insertedId,
          productName: name,
          category,
          subCategory,
          timestamp: new Date(),
          user: (req as any).user?.username || 'admin'
        });

        res.status(201).json({ _id: result.insertedId, ...newProduct });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error instanceof Error ? error.message : 'Unknown error',
      products: [] // Always provide fallback
    });
  }
}

export default withAuth(handler);
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
        const products = await collection.find({}).toArray();
        res.status(200).json(products);
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
        res.status(201).json({ _id: result.insertedId, ...newProduct });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);
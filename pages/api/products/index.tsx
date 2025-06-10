// filepath: c:\Users\USER\Desktop\spo\my-project\pages\api\products\index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

// Authentication middleware
const authenticateToken = (req: NextApiRequest) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return null;
    }
    
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return null;
    }
    
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('products');

    // For all methods EXCEPT GET, check authentication
    if (req.method !== 'GET') {
      const user = authenticateToken(req);
      if (!user) {
        return res.status(401).json({ message: 'Auth required' });
      }
    }

    switch (req.method) {
      case 'GET': {
        // No authentication check for GET - allow public access
        const products = await collection.find({}).toArray();
        res.status(200).json(products);
        break;
      }
        
      case 'POST': {
        // Authentication already checked above
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
      }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
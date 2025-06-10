import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';

// Authentication middleware - same as in products endpoint
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
    const collection = db.collection('productDetails');

    // Add this block - same as in your products endpoint
    if (req.method !== 'GET') {
      const user = authenticateToken(req);
      if (!user) {
        return res.status(401).json({ message: 'Auth required' });
      }
    }

    switch (req.method) {
      case 'GET':
        const details = await collection.find({}).toArray();
        res.status(200).json(details);
        break;

      case 'POST':
        const { 
          productId, 
          productTitle, 
          productDescription, 
          features, 
          specifications, 
          featureImages, 
          seo 
        } = req.body;
        
        if (!productId || !productTitle || !productDescription) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if product details already exist
        const existingDetail = await collection.findOne({ productId });
        if (existingDetail) {
          return res.status(409).json({ error: 'Product details already exist for this product' });
        }

        const newDetail = {
          productId,
          productTitle,
          productDescription,
          features: features || [],
          specifications: specifications || {},
          featureImages: featureImages || [],
          seo: seo || {
            focusKeyword: '',
            seoKeywords: [],
            autoTitle: '',
            autoDescription: ''
          },
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await collection.insertOne(newDetail);
        res.status(201).json({ _id: result.insertedId, ...newDetail });
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
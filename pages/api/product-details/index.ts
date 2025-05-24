import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('productDetails');

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